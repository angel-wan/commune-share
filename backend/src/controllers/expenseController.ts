import { Request, Response } from 'express';
import Event, { EventDocument } from '../models/event.model'; // Import your user model
import User from '../models/user.model';
import { Expense, ExpenseDocument, UserExpense, UserExpenseDocument } from '../models/expense.model';
import { ExpenseItemRequest, ExpenseRequest } from '../request/expense.request';
import UserGroup, { UserGroupDocument } from '../models/usergroup.model';
import { faker } from '@faker-js/faker';

const isUserCreator = (req: Request, expense: ExpenseDocument) => {
  const userId = (req.user as { _id: string })._id;
  const userGroupId = expense.userGroup;
  const creator = UserGroup.findById(userGroupId);
  return creator.toString() === userId.toString();
};

const isAdmin = async (userId: string) => {
  const user = await User.findOne({ _id: userId });
  return user && user.username === 'admin';
};

const isItemCreator = (req: Request, item: UserExpenseDocument) => {
  const userId = (req.user as { _id: string })._id;
  return item.user.toString() === userId.toString();
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { title } = req.body as ExpenseRequest;
    const { _id } = req.user as { _id: string };
    const creator = _id; // get the user id from the jwt
    const newUserGroup: UserGroupDocument = new UserGroup({
      users: [creator],
      code: faker.random.alphaNumeric(5),
      creator,
    });
    const savedUserGroupId = await newUserGroup.save();
    if (!savedUserGroupId) {
      return res.status(400).json({ error: 'Unable create user group' });
    }
    const newExpense: ExpenseDocument = new Expense({
      title,
      userGroup: savedUserGroupId,
      expenses: [],
    });
    const savedExpense = await newExpense.save();

    res.status(201).json({ expense: savedExpense });
  } catch (error) {
    res.status(500).json({ error: 'Expense creation failed' });
  }
};

export const addExpenseItem = async (req: Request, res: Response) => {
  try {
    const { expenses } = req.body as ExpenseItemRequest;
    const { expenseId } = req.params;
    const { _id } = req.user as { _id: string };
    const user = _id;
    // get the user id from the jwt

    const expense = await Expense.findById(expenseId).exec();
    if (!expense) {
      // Handle the case where the expense is not found
      return res.status(404).json({ error: 'Expense not found' });
    }

    const newUserExpense: UserExpenseDocument[] = expenses.map(
      (expense) =>
        new UserExpense({
          user,
          ...expense,
        }),
    );

    expense.expenses.push(...newUserExpense);

    await expense.save();

    res.status(201).json({ message: 'User expenses added', expense });
  } catch (error) {
    res.status(500).json({ error: 'User expenses creation failed' });
  }
};

export const removeExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(400).json({ error: 'Event does not exist' });
    }
    if (!isUserCreator(req, expense)) {
      return res.status(401).json({ error: 'You Are Not Expense Creator' });
    }
    await expense.deleteOne();
    res.status(200).json({ message: 'Expense removed', expense });
  } catch (error) {
    res.status(500).json({ error: 'Remove update failed' });
  }
};

export const removeExpenseItem = async (req: Request, res: Response) => {
  try {
    const { expenseId, expenseItemId } = req.params;
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(400).json({ error: 'Expense does not exist' });
    }

    // Find the index of the expense item you want to remove
    const itemIndex = expense.expenses.findIndex((item) => item._id.toString() === expenseItemId);

    if (itemIndex === -1) {
      return res.status(400).json({ error: 'Expense item not found' });
    }
    const item = expense.expenses[itemIndex];

    if (!isItemCreator(req, item)) {
      return res.status(401).json({ error: 'You Are Not Expense Item Creator' });
    }

    // Remove the expense item from the array
    expense.expenses.splice(itemIndex, 1);

    // Save the updated expense document
    await expense.save();
    res.status(200).json({ message: 'Expense item removed successfully', expenseItem: item });
  } catch (error) {
    res.status(500).json({ error: 'Remove update failed' });
  }
};

export const listExpenses = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { _id: string })._id;
    const groups = await UserGroup.find({ users: userId });
    // Query the database to find expense groups where the user is the creator or a member
    const expenses = await Expense.find({ userGroup: { $in: groups } });
    const admin = await isAdmin(userId);
    if (admin) {
      const expenses = await Expense.find({});
      return res.status(200).json(expenses);
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error listing expenses' });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ error: 'Error listing events' });
  }
};

interface GroupedExpenses {
  [userId: string]: {
    total: number;
    expenses: UserExpenseDocument[];
  };
}

interface userCalculation {
  from: string;
  to: string;
  amount: number;
}

export const getExpenseSummary = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    const userGroup = await UserGroup.findById(expense.userGroup);
    if (!userGroup) {
      return res.status(404).json({ error: 'User Group not found' });
    }
    let sum = 0;
    const groupedExpenses: GroupedExpenses = expense.expenses.reduce((result: GroupedExpenses, userExpense) => {
      const userId = userExpense.user;
      if (!result[userId]) {
        result[userId] = { total: 0, expenses: [] };
      }
      sum += userExpense.amount;
      result[userId].total += userExpense.amount;
      result[userId].expenses.push(userExpense);
      return result;
    }, {} as GroupedExpenses);

    const average = sum / userGroup.users.length;

    const calculation: userCalculation[] = [];
    const expenseCreator = userGroup?.creator?.toString() || Object.keys(groupedExpenses)[0];

    Object.keys(groupedExpenses).forEach((userId) => {
      if (groupedExpenses[userId].total < average) {
        calculation.push({
          from: userId,
          to: expenseCreator,
          amount: average - groupedExpenses[userId].total,
        });
      } else {
        calculation.push({
          from: expenseCreator,
          to: userId,
          amount: groupedExpenses[userId].total - average,
        });
      }
    });
    res.status(200).json({ sum, average, groupedExpenses, calculation });
  } catch (error) {
    res.status(500).json({ error: 'Error get expense summary' });
  }
};

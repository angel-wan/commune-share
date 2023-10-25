import { Request, Response } from 'express';
import Event, { EventDocument } from '../models/event.model'; // Import your user model
import User from '../models/user.model';
import { Expense, ExpenseDocument, ExpenseType, UserExpense, UserExpenseDocument } from '../models/expense.model';
import { ExpenseItemRequest, ExpenseRequest } from '../request/expense.request';

const isUserCreator = (req: Request, expense: ExpenseDocument) => {
  const userId = (req.user as { _id: string })._id;
  return expense.creator.toString() === userId.toString();
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { title, type, eventId, expenses } = req.body as ExpenseRequest;
    const { _id } = req.user as { _id: string };
    const creator = _id; // get the user id from the jwt

    if (!title || !type) {
      return res.status(400).json({ error: 'Title and type are required' });
    }

    if (type === ExpenseType.EVENT && !eventId) {
      return res.status(400).json({ error: 'EventId is required for event expenses' });
    }

    const creatorExpenses: UserExpenseDocument[] =
      expenses?.map((expense) => new UserExpense({ ...expense, user: creator })) || [];

    const newExpense: ExpenseDocument = new Expense({
      title,
      type,
      event: eventId,
      creator,
      expenses: creatorExpenses,
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

    if (!expenseId || !expenses) {
      return res.status(400).json({ error: 'Expense Id and expenses are required' });
    }
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
    const expense = await Expense.findOne({ _id: expenseId });
    if (!expense) {
      return res.status(400).json({ error: 'Event does not exist' });
    }
    if (!isUserCreator(req, expense)) {
      return res.status(401).json({ error: 'You Are Not Expense Creator' });
    }
    await expense.deleteOne();
    res.status(200).json({ message: 'Expense removed successfully', expense });
  } catch (error) {
    res.status(500).json({ error: 'Remove update failed' });
  }
};

export const removeExpenseItem = async (req: Request, res: Response) => {
  try {
    const { expenseId, expenseItemId } = req.params;
    const expense = await Expense.findOne({ _id: expenseId });

    if (!expense) {
      return res.status(400).json({ error: 'Expense does not exist' });
    }

    if (!isUserCreator(req, expense)) {
      return res.status(401).json({ error: 'You Are Not Expense Creator' });
    }
    // Find the index of the expense item you want to remove
    const itemIndex = expense.expenses.findIndex((item) => item._id.toString() === expenseItemId);

    if (itemIndex === -1) {
      return res.status(400).json({ error: 'Expense item not found' });
    }

    const item = expense.expenses[itemIndex];

    // Remove the expense item from the array
    expense.expenses.splice(itemIndex, 1);

    // Save the updated expense document
    await expense.save();
    res.status(200).json({ message: 'Expense item removed successfully', expenseItem: item });
  } catch (error) {
    res.status(500).json({ error: 'Remove update failed' });
  }
};

export const listExpense = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { _id: string })._id;

    // Query the database to find expense groups where the user is the creator or a member
    const expenses = await Expense.find({
      $or: [
        { creator: userId }, // User is the creator of the group
        { 'expenses.user': userId }, // User is a member of the group
      ],
    });
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

export const getExpenseSummary = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
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

    res.status(200).json({ sum, groupedExpenses });
  } catch (error) {
    res.status(500).json({ error: 'Error get expense summary' });
  }
};

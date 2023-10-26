import { faker } from '@faker-js/faker';
import Event, { VotesType, ScheduleType, Period } from '../models/event.model';
import { Expense, ExpenseDocument, UserExpense, UserExpenseDocument } from '../models/expense.model';
import UserGroup from '../models/usergroup.model';

const ExpenseGenerator = async (ids: string[], userGroupIds: string[] = []) => {
  try {
    // Remove all existing events
    await Expense.deleteMany();

    // random choose 1 event by the id insdie the ids array
    const id = ids[Math.floor(Math.random() * ids.length)];
    const userGroupId = userGroupIds[Math.floor(Math.random() * userGroupIds.length)];
    const userGroup = await UserGroup.findById(userGroupId);
    const users = userGroup?.users || [];
    // Load the even
    const event = await Event.findById(id);
    // Create a fake expense
    if (!event) {
      throw new Error('Event not found');
    }
    const fakeUserExpense: UserExpenseDocument = new UserExpense({
      user: users[Math.floor(Math.random() * users.length)],
      title: 'fake expense item',
      amount: 15,
    });
    const fakeExpense: ExpenseDocument = new Expense({
      title: 'fake expense',
      expenses: [fakeUserExpense],
      userGroup: userGroupId,
    });

    console.log('fakeExpense', fakeExpense);

    const expense = await fakeExpense.save();
    const expenseId = Object.values(expense._id);
    return { expenseId };
  } catch (error) {
    console.error('Error generating fake expense data:', error);
  }
};

export default ExpenseGenerator;

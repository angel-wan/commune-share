import { faker } from '@faker-js/faker';
import Event, { VotesType, ScheduleType, Period } from '../models/event.model';
import { Expense, ExpenseDocument, ExpenseType, UserExpense, UserExpenseDocument } from '../models/expense.model';

const ExpenseGenerator = async (ids: string[], userids: string[]) => {
  try {
    // Remove all existing events
    await Expense.deleteMany();

    // random choose 1 event by the id insdie the ids array
    const id = ids[Math.floor(Math.random() * ids.length)];
    const userid = userids[Math.floor(Math.random() * userids.length)];

    // Load the event
    const event = await Event.findById(id);
    // Create a fake expense
    if (!event) {
      throw new Error('Event not found');
    }
    const fakeUserExpense: UserExpenseDocument = new UserExpense({
      user: userids[Math.floor(Math.random() * userids.length)],
      title: 'fake expense item',
      amount: 15,
    });
    const fakeExpense: ExpenseDocument = new Expense({
      title: 'fake expense',
      type: ExpenseType.GROUP,
      creator: userid,
      expenses: [fakeUserExpense],
    });

    const fakeEventUserExpense: UserExpenseDocument = new UserExpense({
      user: userids[Math.floor(Math.random() * userids.length)],
      title: 'fake event expense item',
      amount: 35,
    });
    const fakeEventExpense: ExpenseDocument = new Expense({
      title: 'fake event expense',
      type: ExpenseType.EVENT,
      event: event.id,
      creator: userid,
      expenses: [fakeEventUserExpense],
    });

    console.log('fakeExpense', fakeExpense);
    console.log('fakeEventExpense', fakeEventExpense);

    const expense = await fakeExpense.save();
    const eventExpense = await fakeEventExpense.save();
    const expenseId = Object.values(expense._id);
    const eventExpenseId = Object.values(eventExpense._id);
    return [{ expenseId }, { eventExpenseId }];
  } catch (error) {
    console.error('Error generating fake expense data:', error);
  }
};

export default ExpenseGenerator;

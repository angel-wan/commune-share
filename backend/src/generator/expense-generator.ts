import { faker } from '@faker-js/faker';
import Event from '../models/event.model';
import { Expense, ExpenseDocument, UserExpense, UserExpenseDocument } from '../models/expense.model';
import UserGroup from '../models/usergroup.model';

const ExpenseGenerator = async (ids: string[], userGroupIds: string[] = []) => {
  try {

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
    let expenseArray = [];
    let expenseids = []
    for (let i = 0; i < 50; i++) {
      let fakeUserExpenseArray = [];
      for (let j = 0; j < 10; j++) {
        const fakeUserExpense: UserExpenseDocument = new UserExpense({
          user: users[Math.floor(Math.random() * users.length)],
          title: faker.company.name(),
          amount: faker.finance.amount(),
        });
        fakeUserExpenseArray.push(fakeUserExpense);
      }

      const fakeExpense: ExpenseDocument = new Expense({
        title: 'fake expense',
        expenses: fakeUserExpenseArray,
        userGroup: userGroupId,
      });
      const id = await fakeExpense.save();
      expenseids.push(id._id);
      // expenseArray.push(fakeExpense);
    }

    // const expense = await Expense.bulkSave(expenseArray);
    // const expenseId = Object.values(expense.insertedIds);
    const expenseId = expenseids

    return { expenseId };
  } catch (error) {
    console.error('Error generating fake expense data:', error);
  }
};

export default ExpenseGenerator;

// run user-generator
const mongoose = require('mongoose');
import { MONGO_URI } from '../config';
import userGenerator from './user-generator';
import EventGenerator from './event-generator';
import VoteGenerator from './vote-generator';
import ScheduleGenerator from './schedule-generator';
import ExpenseGenerator from './expense-generator';
import userGroupGenerator from './usergroup-generator';
import { Expense } from '../models/expense.model';
import User from '../models/user.model';
import UserGroup from '../models/usergroup.model';
// Import your User model here
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.error('MongoDB connection error:');
});

db.once('open', async () => {
  await Expense.deleteMany();
  await User.deleteMany();
  await UserGroup.deleteMany();

  const userids = await userGenerator();
  if (!userids) {
    throw new Error('No user ids');
  }

  const userGroup = await userGroupGenerator(userids);
  if (!userGroup) {
    throw new Error('No user group');
  }
  const eventids = await EventGenerator(userGroup);
  if (!eventids) {
    throw new Error('No event ids');
  }
  await VoteGenerator(eventids, userids);

  const eventidsWithSchedule = await ScheduleGenerator(userids);

  if (!eventidsWithSchedule) {
    throw new Error('No event ids with schedule');
  }

  const expenseIds = await ExpenseGenerator(eventids, userGroup);
  if (!expenseIds) {
    throw new Error('No expense ids');
  }
  console.log('Done');
  process.exit(0);
});

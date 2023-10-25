// run user-generator
const mongoose = require('mongoose');
import { MONGO_URI } from '../config';
import userGenerator from './user-generator';
import EventGenerator from './event-generator';
import VoteGenerator from './vote-generator';
import ScheduleGenerator from './schedule-generator';
import ExpenseGenerator from './expense-generator';
import userGroupGenerator from './usergroup-generator';
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
  const userids = await userGenerator();
  if (!userids) {
    throw new Error('No user ids');
  }

  const userGroup = await userGroupGenerator(userids);
  const eventids = await EventGenerator(userids);
  if (!eventids) {
    throw new Error('No event ids');
  }
  await VoteGenerator(eventids, userids);

  const eventidsWithSchedule = await ScheduleGenerator(userids);
  if (!eventidsWithSchedule) {
    throw new Error('No event ids with schedule');
  }

  const expenseIds = await ExpenseGenerator(eventids, userids);
  if (!expenseIds) {
    throw new Error('No expense ids');
  }
  console.log('Done');
  process.exit(0);
});

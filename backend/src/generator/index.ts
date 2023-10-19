// run user-generator
const mongoose = require('mongoose');
import { MONGO_URI } from '../config';
import userGenerator from './user-generator';
import EventGenerator from './event-generator';
import VoteGenerator from './vote-generator';
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
  const eventids = await EventGenerator(userids);
  if (!eventids) {
    throw new Error('No event ids');
  }
  await VoteGenerator(eventids, userids);
});

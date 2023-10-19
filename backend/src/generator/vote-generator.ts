import { faker } from '@faker-js/faker';
import Event, { VotesType, ScheduleType, Period } from '../models/event.model';

const VoteGenerator = async (ids: string[], userids: string[]) => {
  try {
    // random choose 1 event by the id insdie the ids array
    const id = ids[Math.floor(Math.random() * ids.length)];
    // Load the event
    const event = await Event.findById(id);
    // Create a fake vote
    if (!event) {
      throw new Error('Event not found');
    }
    const fakeVote: VotesType = {
      title: faker.company.name(),
      options: [
        {
          option: faker.company.name(),
          votes: [...userids].sort(() => Math.random() - 0.5).slice(0, 2),
        },
      ],
    };

    console.log('fakeVote', fakeVote);

    // Add the fake vote to the event

    event.votes.push(fakeVote);

    console.log(event.votes);

    const fakeSchedules = userids.map((userId) => {
      const randomPeriodIndex = Math.floor(Math.random() * Object.keys(Period).length);
      const randomPeriod = Object.values(Period)[randomPeriodIndex];
      const fakeSchedule: ScheduleType = {
        user: userId,
        slots: [{ date: new Date(), period: randomPeriod as Period }],
      };
      return fakeSchedule;
    });

    console.log('fakeSchedules', JSON.stringify(fakeSchedules));

    // Add the fake schedule to the event

    event.schedule = fakeSchedules;

    console.log(event.schedule);

    await event.save();
  } catch (error) {
    console.error('Error generating fake vote data:', error);
  }
};

export default VoteGenerator;

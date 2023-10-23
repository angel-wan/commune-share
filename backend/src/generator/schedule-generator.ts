import { faker } from '@faker-js/faker';
import Event, { Period, ScheduleType } from '../models/event.model';

const ScheduleGenerator = async (ids: string[]) => {
  try {
    // Generate and insert fake event data
    const numFakeEvents = 2; // Number of fake events to create
    const fakeEvents = [];

    for (let i = 0; i < numFakeEvents; i++) {
      const fakeSchedules: ScheduleType[] = [];
      for (let j = 0; j < 3; j++) {
        const fakeSchedule: ScheduleType = {
          user: ids[Math.floor(Math.random() * ids.length)],
          slots: [
            {
              date: new Date(),
              period: Object.values(Period)[Math.floor(Math.random() * Object.values(Period).length)],
            },
          ],
        };
        fakeSchedules.push(fakeSchedule);
      }

      const fakeEvent = {
        title: faker.company.name(),
        description: faker.lorem.paragraph(),
        location: faker.address.city(),
        creator: ids[Math.floor(Math.random() * ids.length)],
        schedule: fakeSchedules,
      };

      fakeEvents.push(new Event(fakeEvent));
    }

    const events = await Event.bulkSave(fakeEvents);
    const eventids = Object.values(events.insertedIds);
    return eventids;
  } catch (error) {
    console.error('Error generating fake event schedule data:', error);
  }
};

export default ScheduleGenerator;

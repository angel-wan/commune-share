import { faker } from '@faker-js/faker';
import Event from '../models/event.model';

const EventGenerator = async (ids: string[]) => {
  try {
    // Remove all existing events
    await Event.deleteMany();

    // Generate and insert fake event data
    const numFakeEvents = 10; // Number of fake events to create
    const fakeEvents = [];

    

    for (let i = 0; i < numFakeEvents; i++) {
      const fakeEvent = {
        title: faker.company.name(),
        description: faker.lorem.paragraph(),
        location: faker.address.city(),
        creator: ids[Math.floor(Math.random() * ids.length)],
      };

      fakeEvents.push(new Event(fakeEvent));
    }

    const events = await Event.bulkSave(fakeEvents);
    const eventids = Object.values(events.insertedIds);
    return eventids;
  } catch (error) {
    console.error('Error generating fake event data:', error);
  }
};

export default EventGenerator;

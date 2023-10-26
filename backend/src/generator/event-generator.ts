import { faker } from '@faker-js/faker';
import Event from '../models/event.model';

const EventGenerator = async (ids: any[]) => {
  try {
    // Remove all existing events
    await Event.deleteMany();

    // Generate and insert fake event data
    const numFakeEvents = 10; // Number of fake events to create
    const fakeEvents = [];

    for (let i = 0; i < numFakeEvents; i++) {
      const startDate = new Date().getTime();
      const endDate = startDate + Math.random() * 5;
      const fakeEvent = {
        title: faker.company.name(),
        description: faker.lorem.paragraph(),
        location: faker.address.city(),
        eventStartDate: startDate,
        eventEndDate: endDate,
        status: Math.random() > 0.5 ? 'PENDING' : 'UPCOMING',
        usergroupId: ids[i],
      };

      fakeEvents.push(new Event(fakeEvent));
    }
    const events = await Event.bulkSave(fakeEvents);
    const eventids = Object.values(events.insertedIds);
    console.log('eventids', eventids);
    return eventids;
  } catch (error) {
    console.error('Error generating fake event data:', error);
  }
};

export default EventGenerator;

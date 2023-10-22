import { Request, Response } from 'express';
import Event, { EventDocument } from '../models/event.model'; // Import your user model

const isUserCreator = (req: Request, event: EventDocument) => {
  const userId = (req.user as { _id: string })._id;
  return event.creator.toString() === userId.toString();
};
// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, location } = req.body;
    const { _id } = req.user as { _id: string };
    const creator = _id;
    // get the user id from the jwt
    if (!req.body || !req.body.title) {
      return res.status(400).json({ error: 'Invalid request event data' });
    }
    if (!title || !location) {
      throw new Error('All fields are required');
    }
    const event = new Event({ title, description, location, creator });
    await event.save();

    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Event creation failed' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return res.status(400).json({ error: 'Event does not exist' });
    }
    if (!isUserCreator(req, event)) {
      return res.status(401).json({ error: 'You Are Not Event Creator' });
    }
    const { title, description, location } = req.body;
    if (title) {
      event.title = title;
    }
    if (description) {
      event.description = description;
    }
    if (location) {
      event.location = location;
    }
    await event.save();
    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Event update failed' });
  }
};

export const removeEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return res.status(400).json({ error: 'Event does not exist' });
    }
    if (!isUserCreator(req, event)) {
      return res.status(401).json({ error: 'You Are Not Event Creator' });
    }
    await event.deleteOne();
  } catch (error) {
    res.status(500).json({ error: 'Remove update failed' });
  }
};

export const listEvent = async (req: Request, res: Response) => {
  try {
    //
    const userId = (req.user as { _id: string })._id;
    console.log('listEvent', userId);

    const events = await Event.find({ creator: userId });
    console.log('listEvent', userId, events);

    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: 'Error listing events' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Error listing events' });
  }
};

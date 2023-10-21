import { Request, Response } from 'express';
import Event, { EventDocument } from '../models/event.model'; // Import your user model

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
  // Check event exists
  console.log(req.body);
  try {
    const { eventId } = req.body;
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return res.status(400).json({ error: 'Event does not exist' });
    }
    // Check user is creator
    const { _id: userId } = req.user as { _id: string };
    if (event.creator.toString() !== userId.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Update event
    const { title, description, location } = req.body;
    event.title = title;
    event.description = description;
    event.location = location;
    await event.save();
    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Event update failed' });
  }
};

export const listEvent = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
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

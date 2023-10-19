import { Request, Response } from 'express';
import Event, { EventDocument } from '../models/event.model'; // Import your user model

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, location } = req.body;
    // get the user id from the jwt

    if (!req.body || !req.body.title) {
      return res.status(400).json({ error: 'Invalid request data' });
    }
    if (!title || !location) {
      throw new Error('All fields are required');
    }
    const event = new Event({ title, description, location });
    await event.save();

    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Event creation failed' });
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

import { Request, Response } from 'express';
import Event, { EventDocument } from '../models/event.model'; // Import your user model
import User from '../models/user.model';

const isUserCreator = (req: Request, event: EventDocument) => {
  const userId = (req.user as { _id: string })._id;
  return event.creator.toString() === userId.toString();
};

const isUserExist = async (userId: string) => {
  const user = await User.findOne({ _id: userId });
  return !!user;
};

const isAdmin = async (userId: string) => {
  const user = await User.findOne({ _id: userId });
  return user && user.username === 'admin';
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
    // 5 character with alpherbic and number code generator
    let isCodeUnique = false;
    let code;
    while (!isCodeUnique) {
      code = Math.random().toString(36).substr(2, 5);
      // Check if the code already exists in the database
      const existingEvent = await Event.findOne({ code });
      if (!existingEvent) {
        isCodeUnique = true; // Exit the loop if the code is unique
      }
    }
    // Add creator to attendees
    const attendees = {
      userid: creator,
      status: 'joined',
    };
    const event = new Event({ title, description, location, creator, code, attendees, status: 'pending' });
    await event.save();

    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ error: error });
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
    const userId = (req.user as { _id: string })._id;
    // check if user is admin
    const user = await User.findOne({ _id: userId });
    if (user && user.username === 'admin') {
      const events = await Event.find({});
      return res.json({ events });
    }
    // find user as attendee of the event
    const events = await Event.find({ 'attendees.userid': userId, 'attendees.status': 'joined' });
    // merge two arrays
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: 'Error listing events' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { _id } = req.user as { _id: string };
    // if user is admin or attendee of the event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    if (await isAdmin(_id)) {
      return res.json({ event });
    }

    if (event.creator.toString() !== _id.toString()) {
      const attendee = event.attendees.find((attendee) => {
        return attendee.userid.toString() === _id.toString();
      });
      if (!attendee) {
        return res.status(401).json({ error: 'You Are Not Event Attendee' });
      }
    }
    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Error listing events' });
  }
};

export const joinEventByCode = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { _id: string })._id;
    console.log('userId', userId);
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { code } = req.body;
    const event = await Event.findOne({ code });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const usergroup = await EventGroup.findOne({ _id: event.usergroupId });

    if (!usergroup) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (usergroup.creator.toString() === userId.toString()) {
      return res.status(401).json({ error: 'You Are Event Creator' });
    }

    if (usergroup.users.find((attendee) => attendee.toString() === userId.toString())) {
      return res.status(401).json({ error: 'You Are Already Attendee' });
    }

    usergroup.users.push(userId);
    await usergroup.save();
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Error joining events' });
  }
};

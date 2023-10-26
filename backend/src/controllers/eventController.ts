import { Request, Response } from 'express';
import Event, { EventDocument } from '../models/event.model'; // Import your user model
import User from '../models/user.model';
import EventGroup from '../models/usergroup.model';
import UserGroup, { UserGroupDocument } from '../models/usergroup.model';

const isUserCreator = async (req: Request, event: EventDocument, userId: string) => {
  const usergroupId = event.usergroupId;
  const usergroup = await UserGroup.findOne({ _id: usergroupId });
  if (!usergroup) {
    return false;
  }
  if (usergroup && usergroup.creator.toString() === userId.toString()) {
    return true;
  }
  return false;
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
    const { title, description, location, eventStartDate, eventEndDate } = req.body;
    const { _id } = req.user as { _id: string };
    const creator = _id;
    // get the user id from the jwt
    if (!req.body || !req.body.title) {
      return res.status(400).json({ error: 'Invalid request event data' });
    }
    if (!title) {
      // throw new Error('Title are required');
      return res.status(500).json({ error: "Title are required" });

    }
    // 5 character with alpherbic and number code generator
    let isCodeUnique = false;
    let code;
    while (!isCodeUnique) {
      code = Math.random().toString(36).substr(2, 5);
      // Check if the code already exists in the database
      const existingUserGroup = await UserGroup.findOne({ code });
      if (!existingUserGroup) {
        isCodeUnique = true; // Exit the loop if the code is unique
      }
    }
    // Create a user group
    const usergroup = new UserGroup({ users: [creator], creator, code });
    const usergroupId = (await usergroup.save())._id;
    const event = new Event({
      title,
      description,
      eventStartDate,
      eventEndDate,
      location,
      usergroupId,
      status: 'PENDING',
    });
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
    const userId = (req.user as { _id: string })._id;

    if (!event) {
      return res.status(400).json({ error: 'Event does not exist' });
    }

    const usergroup_id = event.usergroupId;
    const usergroup = await UserGroup.findOne({ _id: usergroup_id });
    if (!usergroup) {
      return res.status(400).json({ error: 'Usergroup does not exist' });
    }
    const isUserExistInGroup = usergroup.users.find((user) => user === userId);

    const { title, description, location, slots } = req.body;

    // check title, description, location is different from the existing one
    const isTitleChanged = title && title !== event.title;
    const isDescriptionChanged = description && description !== event.description;
    const isLocationChanged = location && location !== event.location;

    if (isTitleChanged || isDescriptionChanged || isLocationChanged) {
      if (!isUserCreator(req, event, userId)) {
        return res.status(401).json({ error: 'You Are Not Event Creator' });
      }
    }
    if (!isUserExistInGroup) {
      return res.status(401).json({ error: 'You Are Not Event Attendee' });
    }

    if (title) {
      event.title;
    }
    if (description) {
      event.description = description;
    }
    if (location) {
      event.location = location;
    }

    const schedule = event.schedule;

    if (schedule.length > 0) {
      // check if user is in the schedule
      const isUserExistInSchedule = schedule.find((schedule) => schedule.user === userId);
      if (!isUserExistInSchedule) {
        schedule.push({ user: userId, slots });
      } else {
        // update the schedule
        schedule.forEach((schedule) => {
          if (schedule.user === userId) {
            schedule.slots = slots;
          }
        });
      }
    } else {
      schedule.push({ user: userId, slots });
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
    console.log('remove', eventId);

    const event = await Event.findOne({ _id: eventId });
    const userId = (req.user as { _id: string })._id;

    if (!event) {
      return res.status(400).json({ error: 'Event does not exist' });
    }
    const admin = await isAdmin(userId);
    if (admin) {
      await event.deleteOne();
      return res.status(200).json({ error: 'Event removed' });
    }
    const iscreator = await isUserCreator(req, event, userId);
    if (!iscreator) {
      return res.status(401).json({ error: 'You Are Not Event Creator' });
    }
    await event.deleteOne();
    res.status(200).json({ event: event._id });
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
    // find user inside users in Event
    const usergroup = await UserGroup.find({ users: { $in: [userId] } });
    const usergroupIds = usergroup.map((usergroup) => usergroup._id);
    console.log('usergroupIds', usergroupIds);
    const events = await Event.find({ usergroupId: { $in: usergroupIds } });

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

    const admin = await isAdmin(_id);
    if (admin) {
      return res.json({ event, isSelectedEventCreator: true });
    }
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    // read user group and check if user is in the group
    const usergroup = await UserGroup.findOne({ _id: event.usergroupId });

    if (!usergroup) {
      return res.status(404).json({ error: 'Group not found' });
    }
    if (usergroup.creator.toString() === _id.toString()) {
      return res.json({ event, isSelectedEventCreator: true });
    }
    if (usergroup.creator.toString() !== _id.toString()) {
      const attendee = usergroup.users.find((attendee) => {
        return attendee === _id.toString();
      });
      if (!attendee) {
        return res.status(401).json({ error: 'You Are Not Event Attendee' });
      }
    }
    res.json({ event, isSelectedEventCreator: false });
  } catch (error) {
    res.status(500).json({ error: 'Error listing events' });
  }
};

export const joinEventByCode = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { _id: string })._id;
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

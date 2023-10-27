import { Request, Response } from 'express';
import Event from '../models/event.model'; // Import your user model
import User from '../models/user.model';
import UserGroup from '../models/usergroup.model';

export const joinUserGroupByCode = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { _id: string })._id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { code } = req.body;

    console.log(code)

    const usergroup = await UserGroup.findOne({ code: code });

    console.log(usergroup)
    if (!usergroup) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (usergroup.creator.toString() === userId.toString()) {
      return res.status(401).json({ error: 'You Are Event Creator' });
    }

    if (usergroup.users.find((attendee) => attendee.toString() === userId.toString())) {
      return res.status(401).json({ error: 'You Are Already Attendee' });
    }

    console.log('userId',userId)
    console.log(usergroup.users)
    usergroup.users.push(userId);
    await usergroup.save();
    res.status(200).json({ message: 'Successfully joined' });
  } catch (error) {
    res.status(500).json({ error: 'Error joining events' });
  }
};

export const getUsergroupCode = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { _id: string })._id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { usergroupId } = req.body;
    const usergroup = await UserGroup.findOne({ _id: usergroupId });
    return res.status(200).json({ code: usergroup?.code });
  } catch (error) {
    res.status(500).json({ error: 'Error getting code' });
  }
};

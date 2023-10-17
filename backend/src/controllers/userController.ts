import { Request, Response } from 'express';
import User, { UserDocument } from '../models/user.model'; // Import your user model
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config'; // Import your JWT secret key

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();

    // Create and send a JWT token upon successful registration
    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Log in a user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    // Create and send a JWT token upon successful login
    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Get the user's profile
export const profile = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserDocument; // The user is set in the authentication middleware
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Profile retrieval failed' });
  }
};

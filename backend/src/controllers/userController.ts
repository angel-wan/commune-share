import { Request, Response } from 'express';
import User, { UserDocument } from '../models/user.model'; // Import your user model
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config'; // Import your JWT secret key

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!req.body || !req.body.username) {
      return res.status(400).json({ error: 'Invalid request user data' });
    }
    if (!username || !email || !password) {
      throw new Error('All fields are required');
    }

    const findUsername = await User.findOne({ username });
    if (findUsername) {
      throw new Error('Username already exists');
    }
    const user = new User({ username, email, password });
    await user.save();

    // Create and send a JWT token upon successful registration
    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user: { token, id: user.id, username: user.username } });
    // return token and redirect to home page
    // res.redirect('/');
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
    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: '24h' });
    // Set the cookie as well
    // res.json({ user: { token, id: user.id, username: user.username } });
    res.status(200).json({ user: { token, id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Destroy the user's session to log them out
    // remove the cookie that contains the jwt
    console.log('remove');
    localStorage.removeItem('persist:auth');
    return res.json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Logout failed' });
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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params; // The user is set in the authentication middleware
    const user = await User.findById(userId.userId);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Profile retrieval failed' });
  }
};

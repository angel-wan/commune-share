import express from 'express';
import { register, login, profile, logout, getUserById } from '../controllers/userController';
import requireAuth from '../middlewares/AuthMiddleware';
const userRouter = express.Router();

// Define user routes
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

userRouter.get('/profile', requireAuth, profile);
userRouter.get('/:userId', requireAuth, getUserById);
export default userRouter;

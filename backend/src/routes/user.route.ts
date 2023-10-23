import express from 'express';
import { register, login, profile, logout } from '../controllers/userController';
import requireAuth from '../middlewares/AuthMiddleware';
const userRouter = express.Router();

// Define user routes
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

userRouter.get('/profile', requireAuth, profile);
export default userRouter;

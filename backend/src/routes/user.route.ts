import express from 'express';
import { register, login, profile,logout } from '../controllers/userController';
import requireAuth from '../middlewares/AuthMiddleware';
const userRouter = express.Router();

// Define user routes
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', requireAuth, profile);
userRouter.post('/logout', logout);
export default userRouter;

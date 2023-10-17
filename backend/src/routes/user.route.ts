import express from 'express';
import { register, login, profile } from '../controllers/userController';

const userRouter = express.Router();

// Define user routes
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', profile);

export default userRouter;

import express from 'express';
import { register, login, profile, logout } from '../controllers/userController';
import { listEvent } from '../controllers/eventController';
import requireAuth from '../middlewares/AuthMiddleware';
const eventRouter = express.Router();
// Define user routes
eventRouter.get('/list', listEvent);

// protected route
eventRouter.post('/create', requireAuth, register);
eventRouter.put('/update', requireAuth, logout);
eventRouter.put('/remove', requireAuth, logout);

export default eventRouter;

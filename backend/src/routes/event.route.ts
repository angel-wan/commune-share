import express from 'express';
import { createEvent, updateEvent, getEventById } from '../controllers/eventController';
import { listEvent } from '../controllers/eventController';
import requireAuth from '../middlewares/AuthMiddleware';
const eventRouter = express.Router();
// Define user routes
eventRouter.get('/list', listEvent);

// protected route
eventRouter.post('/create', requireAuth, createEvent);
eventRouter.put('/update', requireAuth, updateEvent);
eventRouter.put('/remove', requireAuth, createEvent);
eventRouter.get('/:eventId', requireAuth, getEventById);

export default eventRouter;

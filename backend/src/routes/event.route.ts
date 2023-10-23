import express from 'express';
import { createEvent, updateEvent, getEventById, removeEvent, listEvent, joinEventByCode } from '../controllers/eventController';
import requireAuth from '../middlewares/AuthMiddleware';
const eventRouter = express.Router();
// Define user routes
eventRouter.get('/list', requireAuth, listEvent);
eventRouter.get('/:eventId', requireAuth, getEventById);

// protected route
eventRouter.put('/update', requireAuth, updateEvent);
eventRouter.put('/remove', requireAuth, removeEvent);

eventRouter.post('/create', requireAuth, createEvent);
eventRouter.post('/code', requireAuth, joinEventByCode);



export default eventRouter;

import express from 'express';
import { joinUserGroupByCode } from '../controllers/usergroupController';
import requireAuth from '../middlewares/AuthMiddleware';
const usergroupRouter = express.Router();

// Define user routes
usergroupRouter.post('/code', requireAuth, joinUserGroupByCode);
export default usergroupRouter;

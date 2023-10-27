import express from 'express';
import { joinUserGroupByCode, getUsergroupCode } from '../controllers/usergroupController';
import requireAuth from '../middlewares/AuthMiddleware';
const usergroupRouter = express.Router();

// Define user routes
usergroupRouter.post('/code', requireAuth, joinUserGroupByCode);
usergroupRouter.post('/id', requireAuth, getUsergroupCode);
export default usergroupRouter;

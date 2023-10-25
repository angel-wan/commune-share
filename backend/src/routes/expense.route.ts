import express from 'express';
import requireAuth from '../middlewares/AuthMiddleware';
import {
  addExpenseItem,
  createExpense,
  getExpenseById,
  getExpenseSummary,
  listExpense,
  removeExpense,
  removeExpenseItem,
} from '../controllers/expenseController';
const expenseRouter = express.Router();

// protected route
expenseRouter.post('', requireAuth, createExpense);
expenseRouter.post('/:expenseId', requireAuth, addExpenseItem);
expenseRouter.delete('/:expenseId/:expenseItemId', requireAuth, removeExpenseItem);
expenseRouter.get('', requireAuth, listExpense);
expenseRouter.get('/:expenseId', requireAuth, getExpenseById);
expenseRouter.get('/:expenseId/summary', requireAuth, getExpenseSummary);

export default expenseRouter;

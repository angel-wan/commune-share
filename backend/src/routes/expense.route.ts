import express from 'express';
import requireAuth from '../middlewares/AuthMiddleware';
import {
  addExpenseItem,
  createExpense,
  getExpenseById,
  getExpenseSummary,
  listExpenses,
  removeExpense,
  removeExpenseItem,
} from '../controllers/expenseController';
const expenseRouter = express.Router();

// protected route
expenseRouter.post('', requireAuth, createExpense);
expenseRouter.post('/:expenseId', requireAuth, addExpenseItem);
// expenseRouter.put('/update', requireAuth, updateExpense);
expenseRouter.delete('/:expenseId', requireAuth, removeExpense);
expenseRouter.delete('/:expenseId/:expenseItemId', requireAuth, removeExpenseItem);
expenseRouter.get('', requireAuth, listExpenses);
expenseRouter.get('/:expenseId', requireAuth, getExpenseById);
expenseRouter.get('/:expenseId/summary', requireAuth, getExpenseSummary);

export default expenseRouter;

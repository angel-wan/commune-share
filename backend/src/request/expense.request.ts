import { ExpenseType } from '../models/expense.model';

export interface ExpenseRequest {
  title: string;
  type: ExpenseType;
  eventId?: string;
  expenses: { title: string; amount: number }[];
}

export interface ExpenseItemRequest {
  expenses: { title: string; amount: number }[];
}

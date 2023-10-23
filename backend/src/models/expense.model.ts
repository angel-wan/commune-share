import mongoose, { Schema, Document } from 'mongoose';

export enum ExpenseType {
  EVENT = 'Event',
  GROUP = 'Group',
}

const UserExpenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const expenseSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: Object.values(ExpenseType), required: true },
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the tracking
  expenses: [UserExpenseSchema],
});

// Create a TypeScript interface to describe the Expense document
export interface ExpenseDocument extends Document {
  title: string;
  type: ExpenseType;
  event?: string;
  user: string;
  expenses: { user: string; title: string; amount: number }[];
}

// Create the Expense model
const Expense = mongoose.model<ExpenseDocument>('Expense', expenseSchema);

export default Expense;

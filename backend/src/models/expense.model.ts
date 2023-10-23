import mongoose, { Schema, Document } from 'mongoose';

const expenseSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const expenseTrackingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: false },
  expenses: [expenseSchema],
});

export interface ExpenseDocument extends Document {
  title: string;
  amount: number;
}

export interface ExpenseTrackingDocument extends Document {
  user: string;
  event: string | null;
  expenses: ExpenseDocument[];
}

const Expense = mongoose.model<ExpenseDocument>('Expense', expenseSchema);
const ExpenseTracking = mongoose.model<ExpenseTrackingDocument>('ExpenseTracking', expenseTrackingSchema);

export { Expense, ExpenseTracking };

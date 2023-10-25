import mongoose, { Schema, Document, Model } from 'mongoose';

export enum ExpenseType {
  EVENT = 'Event',
  GROUP = 'Group',
}

const userExpenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const expenseSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: Object.values(ExpenseType), required: true },
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the tracking
  expenses: [userExpenseSchema],
});

// Create a TypeScript interface to describe the Expense document
export interface ExpenseDocument extends Document {
  title: string;
  type: ExpenseType;
  event?: string;
  creator: string;
  expenses: UserExpenseDocument[];
}

export interface UserExpenseDocument extends Document {
  user: string;
  title: string;
  amount: number;
}
// Create the Expense model
const Expense: Model<ExpenseDocument> = mongoose.model<ExpenseDocument>('Expense', expenseSchema);
const UserExpense: Model<UserExpenseDocument> = mongoose.model<UserExpenseDocument>('UserExpense', userExpenseSchema);

export { Expense, UserExpense };

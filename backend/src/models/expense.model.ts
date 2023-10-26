import mongoose, { Schema, Document, Model } from 'mongoose';

const userExpenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const expenseSchema = new Schema({
  title: { type: String, required: false },
  userGroup: { type: Schema.Types.ObjectId, ref: 'UserGroup' },
  expenses: [userExpenseSchema],
});

// Create a TypeScript interface to describe the Expense document
export interface ExpenseDocument extends Document {
  title?: string;
  userGroup: string;
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

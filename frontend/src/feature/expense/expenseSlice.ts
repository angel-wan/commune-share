import { createSlice } from "@reduxjs/toolkit";
import {
  createExpenseGroup,
  listExpense,
  getExpenseById,
  getExpenseSummary,
} from "./expenseActions";

export enum ExpenseType {
  EVENT = "Event",
  GROUP = "Group",
}

export interface ExpenseListState {
  list: ExpenseState[];
  selectedExpense?: ExpenseState;
  expenseSummary?: ExpenseSummaryState;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface ExpenseState {
  _id: string;
  title: string;
  userExpense: UserExpenseState[];
  userGroup: string;
}

export interface UserExpenseState {
  _id: string;
  user: string;
  title: string;
  amount: number;
}

export interface ExpenseSummaryState {
  sum: number;
  groupedExpenses: {
    [userId: string]: {
      total: number;
      expenses: [UserExpenseState];
    };
  };
  average: number;
  calculation: {
    from: string;
    to: string;
    amount: number;
  }[];
}

const initialState: ExpenseListState = {
  list: [],
  loading: false,
  error: null,
  success: false,
};

export const expenseListSlice = createSlice({
  name: "eventList",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearEventList: (state) => {
      state.list = [];
    },
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createExpenseGroup.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(createExpenseGroup.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(createExpenseGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(listExpense.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(listExpense.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.success = true;
      state.error = null;
    });
    builder.addCase(listExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getExpenseById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getExpenseById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedExpense = action.payload.expense;
      state.success = true;
    });
    builder.addCase(getExpenseById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getExpenseSummary.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getExpenseSummary.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseSummary = action.payload;
      state.success = true;
    });
    builder.addCase(getExpenseSummary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const resetState = expenseListSlice.actions.resetState;
export const clearEventList = expenseListSlice.actions.clearEventList;
export default expenseListSlice.reducer;

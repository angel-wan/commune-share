import { createSlice } from "@reduxjs/toolkit";
import { listExpense, getExpenseById } from "./expenseActions";

export enum ExpenseType {
  EVENT = "Event",
  GROUP = "Group",
}

export interface ExpenseListState {
  list: ExpenseState[];
  selectedExpense?: ExpenseState;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface ExpenseState {
  _id: string;
  title: string;
  userExpense: UserExpenseState[];
}
export interface UserExpenseState {
  user: string;
  title: string;
  amount: number;
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
    builder.addCase(listExpense.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(listExpense.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.expenses;
      state.success = true;
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
      state.selectedExpense = action.payload;
      state.success = true;
    });
    builder.addCase(getExpenseById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const resetState = expenseListSlice.actions.resetState;
export const clearEventList = expenseListSlice.actions.clearEventList;
export default expenseListSlice.reducer;

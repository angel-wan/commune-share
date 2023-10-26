import { createSlice } from "@reduxjs/toolkit";


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
  title: string;
  userExpense: UserExpenseState[];
}
export interface UserExpenseState {
  user: string;
  title: string;
  amount: number;
}

const initialState = {
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
  extraReducers: () => {},
});
export const resetState = expenseListSlice.actions.resetState;
export const clearEventList = expenseListSlice.actions.clearEventList;
export default expenseListSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface TodoListState {
  list: TodoItemState[];
}

export interface TodoItemState {
  id: number;
  title: string;
  completed: boolean;
}

const initialState: TodoListState = {
  list: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      const item: TodoItemState = {
        id:
          state.list.length > 0 ? state.list[state.list.length - 1].id + 1 : 0,
        title: action.payload,
        completed: false,
      };
      state.list.push(item);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    toggleItem: (state, action: PayloadAction<number>) => {
      const item = state.list.find((item) => item.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
    updateItemTitle: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      const item = state.list.find((item) => item.id === action.payload.id);
      if (item) {
        item.title = action.payload.title;
      }
    },
  },
});

export const { addItem, removeItem, toggleItem, updateItemTitle } =
  todoListSlice.actions;

export const todoListItem = (state: RootState) => state.root.list;
export default todoListSlice.reducer;

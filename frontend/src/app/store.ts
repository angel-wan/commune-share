import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { eventListSlice } from "../feature/event/eventSlice";
import { authSlice } from "../feature/auth/authSlice";
import { expenseListSlice } from "../feature/expense/expenseSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
// const eventReducer = persistReducer(eventPersistConfig, eventListSlice.reducer);
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventListSlice.reducer,
    expense: expenseListSlice.reducer,
  },
  middleware: customizedMiddleware,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const persistor = persistStore(store);

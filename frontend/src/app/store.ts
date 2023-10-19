import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { todoListSlice } from "../feature/ExampleSlice";
import authReducer from "../feature/auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, todoListSlice.reducer);
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export const store = configureStore({
  reducer: {
    root: persistedReducer,
    auth: authReducer,
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

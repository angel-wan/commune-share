import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";

interface AuthState {
  loading: boolean;
  userInfo?: {
    id: number;
    username: string;
    token: string;
  };
  error: string | null;
  success: boolean;
}

const initialState = {
  loading: false,
  error: null,
  success: false, // for monitoring the registration process.
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = undefined;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state: AuthState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerUser.fulfilled, (state: AuthState, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state: AuthState, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // register user

    // login user
    builder.addCase(loginUser.pending, (state: AuthState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loginUser.fulfilled, (state: AuthState, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
      state.success = true;
    });
    builder.addCase(loginUser.rejected, (state: AuthState, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectAuth = (state: AuthState) => state.userInfo;

export const { logout, setCredentials } = authSlice.actions;

export default authSlice;

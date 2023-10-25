import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "./authActions";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  userInfo?: {
    id: string;
    username: string;
    token: string;
  };
  error: string | null;
  success: boolean;
}

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false, // for monitoring the registration process.
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
      state.isAuthenticated = true;
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
      state.isAuthenticated = true;
      state.success = true;
    });
    builder.addCase(loginUser.rejected, (state: AuthState, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(logoutUser.pending, (state: AuthState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(logoutUser.fulfilled, (state: AuthState, action) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.success = true;
    });
    builder.addCase(logoutUser.rejected, (state: AuthState, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // logout user
  },
});

export const selectAuth = (state: AuthState) => state.userInfo;
export const isAuthenticated = (state: AuthState) => state.isAuthenticated;

export const { setCredentials } = authSlice.actions;

export default authSlice;

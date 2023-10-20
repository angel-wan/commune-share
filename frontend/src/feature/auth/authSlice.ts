import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authAction";

interface AuthState {
  loading: boolean;
  userInfo: object;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers :(builder) => {
    builder.addCase(registerUser.pending, (state: AuthState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    }
  );
  builder.addCase(registerUser.fulfilled, (state: AuthState, action) => {
    state.loading = false;
    state.userToken = action.payload as string;
    state.success = true;
  });
  builder.addCase(registerUser.rejected, (state: AuthState, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
    // register user
  },
});

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { joinUserGroupByCode } from "./usergroupActions";

interface UserGroupState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false, // for monitoring the registration process.
} as UserGroupState;

export const usergroupSlice = createSlice({
  name: "usergroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(joinUserGroupByCode.pending, (state: UserGroupState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      joinUserGroupByCode.fulfilled,
      (state: UserGroupState, action) => {
        state.loading = false;
        state.success = true;
      }
    );
    builder.addCase(
      joinUserGroupByCode.rejected,
      (state: UserGroupState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );

    // logout user
  },
});

export default usergroupSlice.reducer;

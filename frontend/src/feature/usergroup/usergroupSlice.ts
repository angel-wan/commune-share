import { createSlice } from "@reduxjs/toolkit";
import { joinUserGroupByCode, getUsergroupCode } from "./usergroupActions";

interface UserGroupState {
  loading: boolean;
  error: string | null;
  success: boolean;
  code: string;
}

const initialState = {
  isAuthenticated: false,
  code: "",
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

    builder.addCase(getUsergroupCode.pending, (state: UserGroupState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      getUsergroupCode.fulfilled,
      (state: UserGroupState, action) => {
        state.loading = false;
        state.success = true;
        state.code = action.payload.code;
      }
    );
    builder.addCase(
      getUsergroupCode.rejected,
      (state: UserGroupState, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );

    // logout user
  },
});

export default usergroupSlice.reducer;

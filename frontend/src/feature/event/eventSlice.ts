import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { listEvents } from "./eventActions";

export interface EventListState {
  list: EventState[];
  selectedEvent?: EventState;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface EventState {
  title: string;
  description: string;
  location: string | null;
  // attendees: Array<AttendeeType>;
  // votes: Array<VotesType>;
  //   schedule: Array<ScheduleType>;
}

interface AttendeeType {
  user: string;
  status: string;
}

export interface VotesType {
  title: string;
  options: Array<VoteOptionType>;
}

export interface VoteOptionType {
  option: string;
  votes: Array<string> | []; //User Id String
}

const initialState: EventListState = {
  list: [],
  loading: false,
  // for user object
  error: null,
  success: false, // for monitoring the registration process.
};

export const eventListSlice = createSlice({
  name: "eventList",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listEvents.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(listEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.events;
      state.success = true;
    });
    builder.addCase(listEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default eventListSlice.reducer;

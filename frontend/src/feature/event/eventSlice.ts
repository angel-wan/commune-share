import { createSlice } from "@reduxjs/toolkit";
import {
  createEvent,
  listEvents,
  removeEvent,
  updateEvent,
  getEventById,
} from "./eventActions";

export interface EventListState {
  list: EventState[];
  selectedEvent?: EventState;
  isSelectedEventCreator?: boolean;
  selectedTimeSlots?: Array<TimeSlotType>;
  loading: boolean;
  error: string | null;
  success: boolean;
  removedEvent?: boolean;
}

export interface EventState {
  _id: string;
  title: string;
  description: string;
  location?: string | null;
  eventStartDate: Date;
  eventEndDate: Date;
  attendees?: Array<AttendeeType>;
  votes?: Array<VotesType>;
  schedule?: Array<ScheduleType>;
  createdAt: Date;
  status: "PENDING" | "UPCOMING" | "PAST";
  removedEvent?: boolean;
}

export interface ScheduleType {
  user: string; // User ID who provided the schedule
  slots: Array<TimeSlotType>; // An array of time slot objects
}

export enum Period {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  NIGHT = "NIGHT",
  ALL_DAY = "ALL_DAY",
}
export interface TimeSlotType {
  date: Date; // Date of the time slot
  period: Period; // Time period
}
interface AttendeeType {
  userid: string;
  status: "invited" | "joined";
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
  reducers: {
    clearEventList: (state) => {
      state.list = [];
    },
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.isSelectedEventCreator = false;
      state.removedEvent = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.list.push(action.payload.event);
      state.success = true;
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.list = state.list.map((event) => {
        if (event.title === action.payload.event.title) {
          return action.payload.event;
        }
        return event;
      });
      state.success = true;
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.error = action.payload as string;
    });

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

    builder.addCase(removeEvent.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(removeEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.list = state.list.filter(
        (event) => event._id !== action.payload.event
      );
      state.success = true;
      state.removedEvent = true;
    });
    builder.addCase(removeEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getEventById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getEventById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedEvent = action.payload.event;
      state.isSelectedEventCreator = action.payload.isSelectedEventCreator;
      state.selectedTimeSlots = action.payload.selectedTimeSlots;
      state.success = true;
    });
    builder.addCase(getEventById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const removedEvent = (state: EventListState) => state.removedEvent;
export const resetState = eventListSlice.actions.resetState;
export const clearEventList = eventListSlice.actions.clearEventList;
export default eventListSlice.reducer;

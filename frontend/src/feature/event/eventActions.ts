import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:3000";

export interface EventData {
  title: string;
  description: string;
  location: string | null;
  creator: string;
  // attendees: Array<AttendeeType>;
  // votes: Array<VotesType>;
  //   schedule: Array<ScheduleType>;
}
export const createEvent = createAsyncThunk(
  "event/create",
  async (data: EventData, { rejectWithValue }) => {
    const { title, description, location, creator } = data;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${backendURL}/event/create`,
        { title, description, location, creator },
        config
      );
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      // return custom error message from the backend if present
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const listEvents = createAsyncThunk(
  "event/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/event/list`);
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      // return custom error message from the backend if present
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

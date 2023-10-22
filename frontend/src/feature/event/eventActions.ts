import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "../../app/store";
import { getAuthToken } from "../../utility/authToken";
const backendURL = "http://127.0.0.1:3000";
// get jwt from local storage

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
      const token = getAuthToken();
      // Place the JWT into the request header - remember the space after 'Bearer'
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${backendURL}/event/list`, config);
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      // return custom error message from the backend if present
      if (error instanceof Error) {
        console.log("get item", error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

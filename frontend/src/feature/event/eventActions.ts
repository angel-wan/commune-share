import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
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
  // schedule: Array<ScheduleType>;
}
export const createEvent = createAsyncThunk(
  "event/create",
  async (data: EventData, { rejectWithValue }) => {
    const { title, description, location } = data;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Place the JWT into the request header - remember the space after 'Bearer
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${backendURL}/event/create`,
        { title, description, location },
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
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getEventById = createAsyncThunk(
  "event/getbyid",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${backendURL}/event/${eventId}`,
        config
      );
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeEvent = createAsyncThunk(
  "event/remove",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      // Place the JWT into the request header - remember the space after 'Bearer'

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${backendURL}/event/remove`,
        { eventId },
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

export const updateEvent = createAsyncThunk(
  "event/update",
  async (data: EventData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      // Place the JWT into the request header - remember the space after 'Bearer'
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${backendURL}/event/update`,
        { data },
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

export const joinEventByCode = createAsyncThunk(
  "event/joinbycode",
  async (code: string, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      // Place the JWT into the request header - remember the space after 'Bearer'
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${backendURL}/event/code`,
        { code },
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

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../utility/authToken";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3000";

export const joinUserGroupByCode = createAsyncThunk(
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

      const response = await axios.post(
        `${backendURL}/usergroup/code`,
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

export const getUsergroupCode = createAsyncThunk(
  "event/getcode",
  async (usergroupId: string, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      // Place the JWT into the request header - remember the space after 'Bearer'
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${backendURL}/usergroup/id`,
        { usergroupId },
        config
      );
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (e) {
      // return custom error message from the backend if present
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
    }
  }
);

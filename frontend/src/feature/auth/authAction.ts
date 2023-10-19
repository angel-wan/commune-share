import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:3000";

interface RegistrationData {
  firstName: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegistrationData, { rejectWithValue }) => {
    const { firstName, email, password } = data;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}/user/register`,
        { firstName, email, password },
        config
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

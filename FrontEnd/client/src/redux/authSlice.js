import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_URL = "http://localhost:4002/api/v1/auth/authenticate";

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (newPost) => {
    const { data } = await axios.post(AUTH_URL, newPost);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    bear: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.bear = action.payload;
      })
  },
});

export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { InitialStateAdmin } from "../../types";
import { getAdmin } from "../Thunk/userThunk";

let i: InitialStateAdmin = {
  response: {
    message: "",
    admin: [],
    success: false,
  },
  admin: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: i,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmin.pending, (state) => {
        if (!state.loading) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        if (action.payload !== null || action.payload !== undefined) {
          // console.log(action.payload)
          state.admin = action.payload.admin;
          state.response.admin = action.payload.admin;
          // console.log(action.payload)
          // console.log(state.response.admin)
          state.response.message = action.payload.message;
          // console.log(state.response.message)
          state.response.success = action.payload.success;
          // console.log(state.response.success)
        }
      })
      .addCase(getAdmin.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        state.error = action.error;
      });
  },
});

export const getAdminSlice = userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  InitialStateAdmin,
  InitialStateUpdatedAdmin,
  InitialStateAllUsers,
  InitialStateSuggestions,
} from "../../types";
import { getUserProfile, getAllUsersThunk, getSuggestionsThunk } from "../Thunk/userThunk";

let userState: InitialStateAdmin = {
  response: {
    message: "",
    admin: undefined,
    success: false,
  },
  admin: undefined,
  loading: false,
  error: null,
  posts: [],
  bookmarks: [],
};

const userSliceFunction = createSlice({
  name: "user",
  initialState: userState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        if (!state.loading) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        if (action.payload !== null || action.payload !== undefined) {
          state.admin = action.payload.admin;
          state.response.admin = action.payload.admin;
          state.posts = action.payload.admin.posts;
          state.bookmarks = action.payload.admin.bookmarks;
          state.response.message = action.payload.message;
          state.response.success = action.payload.success;
        }
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const getUserSliceFunction = userSliceFunction.reducer;

let initialStateGetAllUsers: InitialStateAllUsers = {
  response: {
    message: "",
    data: {
      AllUsersWithoudAdmin: [],
      AllUsersIncludingAdmin: [],
    },
    success: false,
  },
  loading: false,
  error: null,
};

const getAllUserSliceFunction = createSlice({
  name: "getAllUsers",
  initialState: initialStateGetAllUsers,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersThunk.pending, (state) => {
        if (!state.loading) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        if (action.payload && action.payload.data) {
          const { allUsers, getAllUsers } = action.payload.data;
          if (allUsers !== undefined) {
            state.response.data.AllUsersWithoudAdmin = allUsers;
          }
          if (getAllUsers !== undefined) {
            state.response.data.AllUsersIncludingAdmin = getAllUsers;
          }
          state.response.message = action.payload.message || "";
          state.response.success = action.payload.success;
        }
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const getAllUserSlice = getAllUserSliceFunction.reducer;

let initialStateGetSuggestions: InitialStateSuggestions = {
  response: {
    message: "",
    data: {
      suggestedUsers:[]
    },
    success: false,
  },
  loading: false,
  error: null,
};


const getSuggestionsSliceFunction = createSlice({
  name: "getSuggestions",
  initialState: initialStateGetSuggestions,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestionsThunk.pending, (state) => {
        if (!state.loading) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getSuggestionsThunk.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        if (action.payload && action.payload.data) {
          const { suggestedUsers } = action.payload.data;
          if (suggestedUsers !== undefined) {
            state.response.data.suggestedUsers = suggestedUsers;
          }
          state.response.message = action.payload.message || "";
          state.response.success = action.payload.success;
        }
      })
      .addCase(getSuggestionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const getSuggestionsSlice = getSuggestionsSliceFunction.reducer;



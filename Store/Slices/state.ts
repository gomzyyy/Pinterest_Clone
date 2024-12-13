import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commentType, initialGlobalStateType, POST, USER,UserHistory } from "@/types";

const i: initialGlobalStateType = {
  post: {
    postsAvailable: false,
    feedPosts: [],
    postById: undefined,
    trendingPosts: [],
  },
  user: {
    suggestedUsers: [],
    history: {
      users:[],
      tags: [],
    },
  },
  admin: undefined,
  token: null,
};

const stateSlice = createSlice({
  name: "state",
  initialState: i,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    postsAvailabilityState: (state, action: PayloadAction<boolean>) => {
      state.post.postsAvailable = action.payload;
    },
    feedPostState: (state, action: PayloadAction<POST[]>) => {
      if (action.payload !== undefined) {
        state.post.feedPosts = action.payload;
      } else {
        state.post.feedPosts = [];
      }
    },
    getHistorystate: (
      state,
      action: PayloadAction<{
        users?: UserHistory[] | undefined;
        tags?: string[] | undefined;
      }>
    ) => {
      if (action.payload.users) {
        state.user.history.users = action.payload.users;
      }
      if (action.payload.tags) {
        state.user.history.tags = action.payload.tags;
      }
    },
    postById: (state, action: PayloadAction<POST | undefined>) => {
      state.post.postById = action.payload;
    },
    getTrendingPostsState: (state, action: PayloadAction<POST[]>) => {
      state.post.trendingPosts = action.payload;
    },
    setAdmin: (state, action: PayloadAction<USER>) => {
      state.admin = action.payload;
    },
    suggestedUsersState: (state, action: PayloadAction<USER[]>) => {
      state.user.suggestedUsers = action.payload;
    },
  },
});
export const stateFunctions = stateSlice.reducer;
export const {
  postsAvailabilityState,
  feedPostState,
  postById,
  setAdmin,
  getHistorystate,
  getTrendingPostsState,
  suggestedUsersState,
  setToken,
} = stateSlice.actions;

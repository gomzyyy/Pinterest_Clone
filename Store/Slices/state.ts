import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commentType, initialGlobalStateType, POST, USER } from "@/types";

const i: initialGlobalStateType = {
  post: {
    postsAvailable: false,
    feedPosts: [],
    postById: undefined,
    allCommentsOfPost: {
      comments: [],
      post: undefined,
    },
  },
  user: {
    suggestedUsers: [],
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
    allCommentsByPost: (
      state,
      action: PayloadAction<{
        comments: commentType[] | undefined;
        post: POST | undefined;
      }>
    ) => {
      state.post.allCommentsOfPost.comments = action.payload.comments;
      state.post.allCommentsOfPost.post = action.payload.post;
    },
    postById: (state, action: PayloadAction<POST>) => {
      console.log(action.payload);
      state.post.postById = action.payload;
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
  allCommentsByPost,
  setAdmin,
  suggestedUsersState,
  setToken,
} = stateSlice.actions;

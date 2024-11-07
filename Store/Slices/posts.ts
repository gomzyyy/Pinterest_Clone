import { createSlice } from "@reduxjs/toolkit";
import { getPostByIdType, updatePostByIdType } from "../../types";
import { getPostById, postActionsById } from "../Thunk/postThunk";

let initialStateGetPost: getPostByIdType = {
  loading: false,
  error: null,
  response: {
    message: "",
    requestedPost: undefined,
    success: false,
    comments: undefined,
  },
};

const receivePostById = createSlice({
  name: "getPostById",
  initialState: initialStateGetPost,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostById.pending, (state) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        if (action.payload) {
          state.response.message = action.payload.message;
          state.response.success = action.payload.success;
          state.response.requestedPost = action.payload.requestedPost;
          state.response.comments = action.payload.comments;
        }
      })
      .addCase(getPostById.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        state.error = action.error ? action.error : "Unknown error occured!";
      });
  },
});

export const getPostByIdSlice = receivePostById.reducer;

const initialStateUpdatePostById: updatePostByIdType = {
  loading: false,
  error: null,
  response: {
    message: "",
    success: false,
  },
};

const postActionsByIdSlice = createSlice({
  name: "postActions",
  initialState: initialStateUpdatePostById,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postActionsById.pending, (state) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(postActionsById.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        if (action.payload) {
          state.response.message = "Action performed successfully";
          state.response.success = true;
        }
      })
      .addCase(postActionsById.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        state.error = action.error ? action.error : "Unknown error occured!";
      });
  },
});
export const postActionSlice = postActionsByIdSlice.reducer;

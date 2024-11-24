import { createSlice } from "@reduxjs/toolkit";
import {
  getPostByIdType,
  updatePostByIdType,
  getAllPostType,
} from "../../types";
import {
  getPostById,
  postActionsById,
  getAllPostsThunk,
} from "../Thunk/postThunk";

let initialStateGetPost: getPostByIdType = {
  loading: false,
  error: null,
  response: {
    message: "",
    requestedPost: undefined,
    success: false,
    comments: undefined,
    peopleDisliked: undefined,
    peopleLiked: undefined,
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
          state.response.peopleLiked = action.payload.peopleLiked;
          state.response.peopleDisliked = action.payload.peopleDisliked;
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
    comments: undefined,
    peopleDisliked: undefined,
    peopleLiked: undefined,
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
          // console.log(action.payload.data);
          state.response.comments = action.payload.data.comments;
          state.response.peopleLiked = action.payload.data.peopleLiked;
          state.response.peopleDisliked = action.payload.data.peopleDisliked;
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

let initialStateGetAllPosts: getAllPostType = {
  loading: false,
  error: null,
  response: {
    message: "",
    posts: undefined,
    success: false,
  },
};

const getAllPosts = createSlice({
  name: "getAllPosts",
  initialState: initialStateGetAllPosts,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostsThunk.pending, (state) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(getAllPostsThunk.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        if (action.payload) {
          state.response.message = action.payload.message;
          state.response.success = action.payload.success;
          state.response.posts = action.payload.posts;
        }
      })
      .addCase(getAllPostsThunk.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        state.error = action.error ? action.error : "Unknown error occured!";
      });
  },
});
export const getAllPostsSlice = getAllPosts.reducer;

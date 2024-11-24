import { configureStore } from "@reduxjs/toolkit";
import {
  getAdminSliceFunction,
  updateAdminSliceFunction,
  followUnfollowSliceFunction,
  removeFollowerSliceFunction,
  getSearchQueryResponse
} from "./Slices/admin";
import { getAllUserSlice, getUserSliceFunction,getSuggestionsSlice } from "./Slices/user";
import {
  getPostByIdSlice,
  postActionSlice,
  getAllPostsSlice,
} from "./Slices/posts";

const Store = configureStore({
  reducer: {
    admin: getAdminSliceFunction,
    updateAdmin: updateAdminSliceFunction,
    getAllPosts: getAllPostsSlice,
    getPostById: getPostByIdSlice,
    postActions: postActionSlice,
    getUser: getUserSliceFunction,
    getAllUsers: getAllUserSlice,
    followUnfollow: followUnfollowSliceFunction,
    removeFollower: removeFollowerSliceFunction,
    getSuggestions:getSuggestionsSlice,
    searchQuery:getSearchQueryResponse
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

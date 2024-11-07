import { configureStore } from "@reduxjs/toolkit";
import {
  getAdminSliceFunction,
  updateAdminSliceFunction,
} from "./Slices/admin";
import { getPostByIdSlice, postActionSlice } from "./Slices/posts";

const Store = configureStore({
  reducer: {
    admin: getAdminSliceFunction,
    updateAdmin: updateAdminSliceFunction,
    getPostById: getPostByIdSlice,
    postActions: postActionSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

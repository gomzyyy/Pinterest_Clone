import { configureStore } from "@reduxjs/toolkit";
import {getAdminSliceFunction,updateAdminSliceFunction } from "./Slices/admin";

const Store = configureStore({
  reducer: {
    admin: getAdminSliceFunction,
    updateAdmin: updateAdminSliceFunction,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

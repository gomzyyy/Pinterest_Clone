import { configureStore } from "@reduxjs/toolkit";
import {getAdminSlice} from "./Slices/admin";

const Store = configureStore({
  reducer: {
    admin: getAdminSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

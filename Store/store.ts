import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/user";

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;

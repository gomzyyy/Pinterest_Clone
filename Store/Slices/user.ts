import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../types";
import { createAsyncThunk } from "@reduxjs/toolkit";

let i: InitialState = {
  discoveryFilter: [],
  collectionData: [],
};

const getUserInfo = createAsyncThunk("user/getId", async () => {});

const userSlice = createSlice({
  name: "user",
  initialState: i,
  reducers: {
    createPost: (state, action) => {},
    deletePost: (state, action) => {},
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getUserInfo.pending, (state)=>{})
    .addCase(getUserInfo.fulfilled,(state)=>{})
    .addCase(getUserInfo.rejected,(state)=>{})
  }
});

export default userSlice.reducer;
export const { createPost, deletePost } = userSlice.actions;

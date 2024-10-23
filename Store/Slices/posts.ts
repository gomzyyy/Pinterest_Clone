import { createSlice } from "@reduxjs/toolkit";
import { InitialStatePost } from "../../types";
import {getUserInfo} from '../Thunk/userThunk'

let i: InitialStatePost = {
  posts: [],
  filteredPosts: [],
  loading:false,
  error:null
};

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

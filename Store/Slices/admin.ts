import { createSlice } from "@reduxjs/toolkit";
import { InitialStateAdmin, InitialStateUpdatedAdmin, removeFollowerResponseType,followUnfollowResponseType,getSearchResultResponseType } from "../../types";
import { getAdmin,updateAdmin,handleFollowUnfollowThunk,handleRemoveFollowerThunk,getSearchResultThunk} from "../Thunk/userThunk";

let admin: InitialStateAdmin = {
  response: {
    message: "",
    admin: undefined,
    success: false,
  },
  admin: undefined,
  loading: false,
  error: null,
  posts:[],
  bookmarks:[]
};

const adminSlice = createSlice({
  name: "admin",
  initialState: admin,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmin.pending, (state) => {
        if (!state.loading) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        if (action.payload !== null || action.payload !== undefined) {
          state.admin = action.payload.admin;
          state.response.admin = action.payload.admin;
          state.posts = action.payload.admin.posts;
          state.bookmarks = action.payload.admin.bookmarks;
          state.response.message = action.payload.message;
          state.response.success = action.payload.success;
        }
      })
      .addCase(getAdmin.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        state.error = action.error;
      });
  },
});

export const getAdminSliceFunction = adminSlice.reducer;

const updatedAdminState:InitialStateUpdatedAdmin={
  response: {
    message: "",
    success: false,
  },
  updatedData:{
    userName:"",
    password:"",
    isPrivate:false,
    avatar:'',
    gender:'',
    dateOfBirth:new Date().toLocaleDateString(),
    bio:"",
  },
  loading: false,
  error: null,
}
const updateAdminSlice = createSlice({
  name:'updateAdmin',
  initialState: updatedAdminState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(updateAdmin.pending, (state)=>{
      if(!state.loading)state.loading = true
    })
    .addCase(updateAdmin.fulfilled, (state, action)=>{
      if(state.loading){
        state.loading = false
      }
      if (action.payload !== null || action.payload !== undefined){
        state.response.message = action.payload.message
        state.response.success = action.payload.success
        state.updatedData.userName = action.payload.userName
        state.updatedData.isPrivate = action.payload.isPrivate
        state.updatedData.avatar = action.payload.avatar
        state.updatedData.gender = action.payload.gender
        state.updatedData.bio = action.payload.bio
        state.updatedData.password = action.payload.password
        state.updatedData.dateOfBirth = action.payload.dateOfBirth
      }
    })
    .addCase(updateAdmin.rejected, (state, action)=>{
      if(state.loading){
        state.loading = false
      }
      action.error = state.error
    })
  }
})
export const updateAdminSliceFunction = updateAdminSlice.reducer

const initialStateFollowUnfollowResponse:followUnfollowResponseType={
  response: {
    message: "",
    success: false,
  },
  loading: false,
  error: null,
}
const followUnfollowSlice = createSlice({
  name:'followUnfollow',
  initialState: initialStateFollowUnfollowResponse,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(handleFollowUnfollowThunk.pending, (state)=>{
      if(!state.loading)state.loading = true
    })
    .addCase(handleFollowUnfollowThunk.fulfilled, (state, action)=>{
      if(state.loading){
        state.loading = false
      }
      if (action.payload !== null || action.payload !== undefined){
        state.response.message = action.payload.message
        state.response.success = action.payload.success
      }
    })
    .addCase(handleFollowUnfollowThunk.rejected, (state, action)=>{
      if(state.loading){
        state.loading = false
      }
      action.error = state.error
    })
  }
})
export const followUnfollowSliceFunction = followUnfollowSlice.reducer

const initialStateRemoveFollowerResponse:removeFollowerResponseType={
  response: {
    message: "",
    success: false,
  },
  loading: false,
  error: null,
}

const removeFollowerSlice = createSlice({
  name:'removeFollower',
  initialState:initialStateRemoveFollowerResponse,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(handleRemoveFollowerThunk.pending, (state)=>{
      if(!state.loading)state.loading = true
    })
    .addCase(handleRemoveFollowerThunk.fulfilled, (state, action)=>{
      if(state.loading){
        state.loading = false
      }
      if (action.payload && action.payload.message){
        state.response.message = action.payload.message
        state.response.success = action.payload.success
      }
    })
    .addCase(handleRemoveFollowerThunk.rejected, (state, action)=>{
      if(state.loading){
        state.loading = false
      }
      action.error = state.error
    })
  }
})

export const removeFollowerSliceFunction = removeFollowerSlice.reducer;

let initialStateGetSearchQuery: getSearchResultResponseType = {
  response: {
    message: "",
    data: {
      result:[],
      type:""
    },
    success: false,
  },
  loading: false,
  error: null,
};


const getSearchQueryResponseFunction = createSlice({
  name: "searchQuery",
  initialState: initialStateGetSearchQuery,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResultThunk.pending, (state) => {
        if (!state.loading) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getSearchResultThunk.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
        if (action.payload && action.payload.data) {
          const { result, type } = action.payload.data;
          if (result !== undefined) {
            state.response.data.result = result;
            state.response.data.type = type;
          }
          state.response.message = action.payload.message || "";
          state.response.success = action.payload.success;
        }
      })
      .addCase(getSearchResultThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const getSearchQueryResponse = getSearchQueryResponseFunction.reducer;


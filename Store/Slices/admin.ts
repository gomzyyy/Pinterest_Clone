import { createSlice } from "@reduxjs/toolkit";
import { InitialStateAdmin, InitialStateUpdatedAdmin } from "../../types";
import { getAdmin,updateAdmin } from "../Thunk/userThunk";

let admin: InitialStateAdmin = {
  response: {
    message: "",
    admin: [],
    success: false,
  },
  admin: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "user",
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
          // console.log(action.payload)
          state.admin = action.payload.admin;
          state.response.admin = action.payload.admin;
          // console.log(action.payload)
          // console.log(state.response.admin)
          state.response.message = action.payload.message;
          // console.log(state.response.message)
          state.response.success = action.payload.success;
          // console.log(state.response.success)
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
        state.response = action.payload
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

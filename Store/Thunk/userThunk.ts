import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk("user/getId", async () => {});
export const loginUser = createAsyncThunk("user/login", async () => {});
export const signupUser = createAsyncThunk("user/signup", async () => {});
export const logoutInfo = createAsyncThunk("user/logout", async () => {});
export const deleteInfo = createAsyncThunk("user/delete", async () => {});

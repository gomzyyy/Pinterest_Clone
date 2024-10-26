import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminUpdateData } from "@/types";

const convertToJson = (t: any) => {
  let f = JSON.stringify(t);
  return f;
};

export const getAdmin = createAsyncThunk(
  "user/getId",
  async (token: string | null) => {
    try {
      const getAdmin = await fetch(
        `http://192.168.1.64:6600/api/user/profile/get-user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await getAdmin.json();
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const loginUser = createAsyncThunk("user/login", async () => {});
export const signupUser = createAsyncThunk("user/signup", async () => {});
export const logoutInfo = createAsyncThunk("user/logout", async () => {});
export const deleteInfo = createAsyncThunk("user/delete", async () => {});
export const updateAdmin = createAsyncThunk(
  "user/update",
  async (updatedData:AdminUpdateData,{ rejectWithValue }) => {
    try {
      const data = {
        ...(updatedData.userName && { userName: updatedData.userName }),
        ...(updatedData.password && { password: updatedData.password }),
        ...(updatedData.isPrivate !== undefined && { isPrivate: updatedData.isPrivate }),
        ...(updatedData.gender && { gender: updatedData.gender }),
        ...(updatedData.dateOfBirth && { dateOfBirth: updatedData.dateOfBirth }),
        ...(updatedData.bio && { bio: updatedData.bio }),
      }
      const updateAdmin = await fetch(
        `http://192.168.1.64:6600/api/user/profile/update`,
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${updatedData.token}`,
          },
          body: JSON.stringify(data),
        }
      );
      const res = await updateAdmin.json();
      return res;
    } catch (error) {
      console.log(error);
     return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred")
    }
  }
);

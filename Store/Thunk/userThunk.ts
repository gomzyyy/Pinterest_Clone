import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminUpdateData } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
export const logoutInfo = createAsyncThunk(
  "user/logout",
  async (token: string, { rejectWithValue }) => {
    try {
      if (!token) throw new Error("Token not found!");
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteInfo = createAsyncThunk("user/delete", async () => {});
export const updateAdmin = createAsyncThunk(
  "user/update",
  async (updatedData: AdminUpdateData, { rejectWithValue }) => {
    try {
      let formData = new FormData();

      if (updatedData.avatar) {
        formData.append("avatar", {
          uri: updatedData.avatar,
          name: "avatar.jpg",
          type: "image/jpeg",
        } as any);
      }

      if (updatedData.userName) formData.append("userName", updatedData.userName);
      if (updatedData.password) formData.append("password", updatedData.password);
      if (updatedData.isPrivate !== undefined)
        formData.append("isPrivate", updatedData.isPrivate.toString());
      if (updatedData.gender) formData.append("gender", updatedData.gender);

      if (updatedData.dateOfBirth) {
        const formattedDate = updatedData.dateOfBirth;
        formData.append("dateOfBirth", formattedDate);
      }

      if (updatedData.bio) formData.append("bio", updatedData.bio);
      if (updatedData.isDisabled !== undefined)
        formData.append("isDisabled", JSON.stringify(updatedData.isDisabled));
      
      const updateAdminResponse = await fetch(
        `http://192.168.1.64:6600/api/user/profile/update`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${updatedData.token}`,
          },
          body: formData,
        }
      );

      const res = await updateAdminResponse.json();
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { redirectToLoginPage } from "@/constants/GlobalConstants";


export const getAdmin = createAsyncThunk("user/getId", async (token:string | null) => {
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
});
export const loginUser = createAsyncThunk("user/login", async () => {});
export const signupUser = createAsyncThunk("user/signup", async () => {});
export const logoutInfo = createAsyncThunk("user/logout", async () => {});
export const deleteInfo = createAsyncThunk("user/delete", async () => {});

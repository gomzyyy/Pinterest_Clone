import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AdminUpdateData,
  GetUserType,
  GetAllUserType,
  followUnfollowDataType,
  removeFollowerDataType,
  GetSuggestionsType,
  getSearchResultDataType,
} from "@/types";
import { IP_ADDRESS as ip } from "@/constants/GlobalConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAdmin = createAsyncThunk(
  "user/getId",
  async (token: string | null, { rejectWithValue }) => {
    try {
      const getAdmin = await fetch(
        `http://${ip}:6600/api/user/profile/get-user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!getAdmin.ok) {
        const res = await getAdmin.json();
        return rejectWithValue(res.message || "Failed to fetch admin details");
      }
      const response = await getAdmin.json();
      return response;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/get",
  async (data: GetUserType, { rejectWithValue }) => {
    try {
      const getUser = await fetch(
        `http://${ip}:6600/api/user/get/${data.userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      const response = await getUser.json();
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const getAllUsersThunk = createAsyncThunk(
  "user/get/all",
  async (data: GetAllUserType, { rejectWithValue }) => {
    try {
      const getAllUser = await fetch(
        `http://${ip}:6600/api/user/get-users/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      if (!getAllUser.ok) {
        const res = await getAllUser.json();
        return res;
      }
      const res = await getAllUser.json();
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);
export const getSuggestionsThunk = createAsyncThunk(
  "user/get/all",
  async (data: GetSuggestionsType, { rejectWithValue }) => {
    try {
      const getSuggestions = await fetch(
        `http://${ip}:6600/api/user/get-users/suggestions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      if (!getSuggestions.ok) {
        const res = await getSuggestions.json();
        // console.log(res)
        return res;
      }
      const res = await getSuggestions.json();
      // console.log(res)
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const handleFollowUnfollowThunk = createAsyncThunk(
  "user/followUnfollow",
  async (data: followUnfollowDataType, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (data.isUnfollowedId)
        formData.append("isUnfollowedId", String(data.isUnfollowedId));
      if (data.isFollowedId)
        formData.append("isFollowedId", String(data.isFollowedId));
      const fetchRes = await fetch(
        `http://${ip}:6600/api/user/connections/follow/change`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          body: formData,
        }
      );
      if (!fetchRes.ok) {
        const errorData = await fetchRes.json();
        throw new Error(errorData.message || `HTTP Error: ${fetchRes.status}`);
      }
      const res = await fetchRes.json();
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occured!"
      );
    }
  }
);
export const handleRemoveFollowerThunk = createAsyncThunk(
  "user/follower/remove",
  async (data: removeFollowerDataType, { rejectWithValue }) => {
    try {
      const apiData = {
        followerId:data.followerId
      }
      const fetchRes = await fetch(
        `http://${ip}:6600/api/user/connections/follower/remove`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type":"application/json"
          },
          body: JSON.stringify(apiData),
        }
      );
      if (!fetchRes.ok) {
        const errorData = await fetchRes.json();
        throw new Error(errorData.message || `HTTP Error: ${fetchRes.status}`);
      }
      const res = await fetchRes.json();
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occured!"
      );
    }
  }
);
export const signupUser = createAsyncThunk("user/signup", async () => {});
export const logoutInfo = createAsyncThunk(
  "user/logout",
  async (token: string, { rejectWithValue }) => {
    try {
      if (!token) throw new Error("Token not found!");
      await AsyncStorage.removeItem("token");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
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

      if (updatedData.userName)
        formData.append("userName", updatedData.userName);
      if (updatedData.password)
        formData.append("password", updatedData.password);
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
        `http://${ip}:6600/api/user/profile/update`,
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
      // console.log(error);
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const getSearchResultThunk = createAsyncThunk(
  "user/search/query",
  async (data: getSearchResultDataType, { rejectWithValue }) => {
    try {
      const getSuggestions = await fetch(
        `http://${ip}:6600/api/user/search/${data.query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      if (!getSuggestions.ok) {
        const res = await getSuggestions.json();
        return res;
      }
      const res = await getSuggestions.json();
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

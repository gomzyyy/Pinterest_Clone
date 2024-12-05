import { createAsyncThunk } from "@reduxjs/toolkit";
import { postActionsType, GetPostType, GetAllPostType } from "@/types";
import { IP_ADDRESS as ip } from "@/constants/GlobalConstants";

export const getPostById = createAsyncThunk(
  "user/post/get-post",
  async (data: GetPostType, { rejectWithValue }) => {
    try {
      if (!data.token) {
        return null;
      }
      const post = await fetch(
        `http://${ip}:6600/api/user/post/get-post/${data.postId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const res = await post.json();
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);
export const postActionsById = createAsyncThunk(
  "user/post/actions",
  async (postAction: postActionsType, { rejectWithValue }) => {
    try {
      const contentBody = {
        getComment:
          postAction.getComment && postAction.getComment.trim() !== ""
            ? postAction.getComment
            : undefined,
        postLiked:
          postAction.postLiked !== undefined ? postAction.postLiked : undefined,
        postUnLiked:
          postAction.postUnLiked !== undefined
            ? postAction.postUnLiked
            : undefined,
      };
      const performingPostAction = await fetch(
        `http://${ip}:6600/api/user/post/actions/${postAction.postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${postAction.token}`,
          },
          body: JSON.stringify(contentBody),
        }
      );
      // if (!performingPostAction.ok) {
      //   const res = await performingPostAction.json();
      //   return 
      // }
      const res = await performingPostAction.json();
      // console.log(res)
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const getAllPostsThunk = createAsyncThunk(
  "user/posts/get",
  async (data: GetAllPostType, { rejectWithValue }) => {
    try {
      const getPostsAPI = await fetch(`http://${ip}:6600/api/user/get-posts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      const res = await getPostsAPI.json();
      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occured"
      );
    }
  }
);

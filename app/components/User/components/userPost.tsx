import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import { USER, POST } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "@/Store/Thunk/postThunk";
import { AppDispatch, RootState } from "@/Store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { postById } from "@/Store/Slices/state";

interface ImageEl {
  i: POST | undefined;
  a: USER | undefined;
  lastPostMargin?: number;
}

const UserPost = ({ i, a, lastPostMargin }: ImageEl) => {
  const { loading } = useSelector((s: RootState) => s.getPostById);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const redirectToPost = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return null;
      }
      const data = {
        postId: i?._id,
        token,
      };
      const res = await dispatch(getPostById(data)).unwrap();
      if (res.success) {
        dispatch(postById(res.data.post))
        router.push('/components/FullPagePost/fullPagePost')
        return null;
      } else {
        return null;
      }
    } catch (error) {
      // console.log(error)
      return;
    }
  };

  return (
    <Pressable
      style={{
        alignItems: "center",
        marginTop: 20,
        borderRadius: 4,
        overflow: "hidden",
        marginBottom: lastPostMargin,
        marginHorizontal: 4,
      }}
      onPress={redirectToPost}
    >
      <View>
        <Image source={{ uri: i?.image }} style={{ height: 110, width: 110 }} />
      </View>
    </Pressable>
  );
};
export default UserPost;

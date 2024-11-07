import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "expo-router";
import { USER, POST, commentType } from "../../../types";
import { colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { profleImageSkeleton } from "@/constants/data";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { getPostById, postActionsById } from "@/Store/Thunk/postThunk";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAdmin } from "@/Store/Thunk/userThunk";

interface commentProps {
  c: commentType;
}
const Description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos molestias dolor dolores saepe dolorum quisquam vitae blanditiis perferendis amet, quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum.quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum`;

const FullPagePostImage = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refreshComment, setRefreshComment] = useState<boolean>(false);
  const [commentOverflow, setCommmentOverflow] = useState<boolean>(false);
  const i = useSelector((e: RootState) => e.getPostById.response.requestedPost);
  const c = useSelector((e: RootState) => e.getPostById.response.comments);
  const postActionLoading = useSelector(
    (f: RootState) => f.postActions.loading
  );
  const gettingPost = useSelector((e: RootState) => e.getPostById.loading);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleCommentLength = () => {
    if (comment.length > 60) {
      setCommmentOverflow(true);
      return null;
    } else {
      setCommmentOverflow(false);
      return null;
    }
  };
  const refreshPost = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const data ={
        token,
        postId:i?._id
      }
      await dispatch(getPostById(data));
    } catch (error) {
      router.replace("/components/GetStarted/GetStarted");
      return;
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      refreshPost();
    }, [refresh])
  );

  const handlePostActions = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }

      if (!comment.trim()) {
        alert("Comment can't be empty!");
        return;
      }

      const data = {
        getComment: comment,
        postId: i?._id,
        token,
      };

      const res = await dispatch(postActionsById(data)).unwrap();

      if (res.success) {
        setComment("");
        await dispatch(getAdmin(token));
        setRefresh((r) => !r);
        return;
      } else {
        setComment("");
        await dispatch(getAdmin(token));
        setRefresh((r) => !r);
        return;
      }
    } catch (error) {
      setComment("");
      console.error("An error occurred while posting the comment:", error);
      return;
    }
  };
  //   console.log(i)

  const Comment: React.FC<commentProps> = ({ c }): React.JSX.Element => {
    return (
      <View
        style={{
          width: "97%",
          marginTop: 6,
          padding: 1,
          height: "auto",
          flexDirection: "row",
          overflow: "hidden",
          gap: 8,
        }}
      >
        <View style={{ height: "auto", justifyContent: "flex-start" }}>
          <Image
            source={{
              uri: c?.admin?.avatar,
            }}
            style={{ height: 44, width: 44, borderRadius: 22 }}
          />
        </View>
        <View style={{ gap: 5, marginTop: 2 }}>
          <View>
            <Text style={{ color: colors.col.PressedIn3 }}>
              {c?.admin?.userId}
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <Text>{c?.text}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            paddingTop: 35,
            backgroundColor: colors.col.PressedIn,
            height: 100,
            opacity: postActionLoading ? 0.6 : 1,
          }}
        >
          <Pressable
            style={{ position: "absolute", left: 25, bottom: "26%" }}
            onPress={() => router.back()}
            disabled={postActionLoading}
          >
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color={colors.col.white}
            />
          </Pressable>
          <Text style={{ fontSize: 24, color: colors.col.white }}>Post</Text>
        </View>
        {/* {postActionLoading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{ fontFamily: "pop-b", marginBottom: 80, fontSize: 16 }}
            >
              Loading...
            </Text>
          </View>
        ) : ( */}
          <View
            style={{
              paddingTop: 10,
              alignItems: "center",
            }}
          >
            <View>
              <Image
                source={{ uri: i?.image }}
                style={{
                  height: 350,
                  width: 350,
                  borderRadius: 10,
                  objectFit: "contain",
                  backgroundColor: colors.col.PressedIn5,
                }}
              />
            </View>
            <View
              style={{
                height: 52,
                width: "97%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 42,
                paddingVertical: 10,
                alignItems: "flex-start",
                backgroundColor: colors.col.PressedIn5,
                marginTop: 6,
                borderRadius: 10,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <AntDesign name="hearto" size={22} color="black" />
                <Text>{i?.likes.length}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <FontAwesome5 name="comment-alt" size={22} color="black" />
                <Text>{i?.comments.length}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="google-analytics"
                  size={22}
                  color="black"
                />
                <Text>{i?.visits.length}</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 6,
                width: "97%",
                backgroundColor: colors.col.PressedIn5,
                borderRadius: 10,
                alignItems: "center",
                padding: 6,
                height: c?.length !== 0 ? 225 : "auto",
              }}
            >
              <View>
                <Text style={{ fontFamily: "pop-b" }}>
                  {c?.length !== 0 ? "Comments" : "No comments"}
                </Text>
              </View>
              {c?.length !== 0 && (
                <ScrollView style={{ flex: 1, width: "97%" }}>
                  {c?.map((t: commentType) => (
                    <Comment key={t._id} c={t} />
                  ))}
                </ScrollView>
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "97%",
                  gap: 5,
                  height: 30,
                }}
              >
                <TextInput
                  placeholder={
                    c?.length !== 0
                      ? "Leave a comment"
                      : "Be the first to comment"
                  }
                  style={{
                    width: "80%",
                    borderBottomColor: commentOverflow
                      ? colors.col.dangerRed
                      : colors.col.PressedIn3,
                    borderBottomWidth: 1,
                    paddingHorizontal: 4,
                    height: 30,
                    color: commentOverflow
                      ? colors.col.dangerRed
                      : colors.col.Black,
                  }}
                  value={comment}
                  onChangeText={(text) => {
                    setComment(text);
                    handleCommentLength();
                  }}
                  multiline={true}
                />
                <Pressable
                  style={{
                    width: "19%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.col.PressedIn2,
                    height: 28,
                    borderRadius: 6,
                  }}
                  onPress={handlePostActions}
                  disabled={postActionLoading}
                >
                  <Text style={{}}>Post</Text>
                </Pressable>
              </View>
            </View>
          </View>
        {/* )} */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default FullPagePostImage;

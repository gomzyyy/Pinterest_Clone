import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { USER, POST, commentType } from "../../../types";
import { colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import debounce from "lodash/debounce";
import Ionicons from "@expo/vector-icons/Ionicons";
import { profleImageSkeleton } from "@/constants/data";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import {
  getAllPostsThunk,
  getPostById,
  postActionsById,
} from "@/Store/Thunk/postThunk";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAdmin } from "@/Store/Thunk/userThunk";
import Header from "../header";
import { getAllPostsSlice } from "@/Store/Slices/posts";

interface commentProps {
  c: commentType | undefined;
}
const Description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos molestias dolor dolores saepe dolorum quisquam vitae blanditiis perferendis amet, quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum.quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum`;

const FullPagePostImage = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refreshComment, setRefreshComment] = useState<boolean>(false);
  const [commentSectionOpened, setCommmentSectionOpened] =
    useState<boolean>(false);
  const [commentOverflow, setCommmentOverflow] = useState<boolean>(false);
  const i = useSelector((e: RootState) => e.getPostById.response.requestedPost);
  const c = useSelector((e: RootState) => e.getPostById.response.comments);
  const a:USER|undefined = useSelector((e: RootState) => e.admin.admin);
  const postActionLoading = useSelector(
    (f: RootState) => f.postActions.loading
  );
  const gettingPost = useSelector((e: RootState) => e.getPostById.loading);
  const peopleLikedThisPost = useSelector(
    (e: RootState) => e.getPostById.response.peopleLiked
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const checkIfLiked = (): boolean => {
    return Array.isArray(peopleLikedThisPost) && a
      ? peopleLikedThisPost.includes(a?._id)
      : false;
  };

  const alreadyLikedByAdmin = checkIfLiked();
  // console.log(alreadyLikedByAdmin);

  const handleCommentLength = () => {
    if (comment.length > 60) {
      setCommmentOverflow(true);
      return null;
    } else {
      setCommmentOverflow(false);
      return null;
    }
  };
  const debouncedHandleCommentLength = useCallback(
    debounce(() => handleCommentLength(), 300),
    [comment]
  );
  const refreshPost = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const data = {
        token,
        postId: i?._id,
      };
      await dispatch(getPostById(data));
    } catch (error) {
      router.replace("/components/GetStarted/GetStarted");
      return;
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      if (!gettingPost) refreshPost();
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

  const Comment: React.FC<commentProps> = ({ c }): React.JSX.Element => {
    return (
      <View
        style={{
          width: "97%",
          marginVertical: 6,
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
              uri: c?.admin?.avatar || profleImageSkeleton,
            }}
            style={{ height: 44, width: 44, borderRadius: 22 }}
          />
        </View>
        <View style={{ gap: 5, marginTop: 2 }}>
          <Pressable>
            <Text style={{ color: colors.col.PressedIn3 }}>
              @{c?.admin?.userId}
            </Text>
          </Pressable>
          <View style={{ width: "100%" }}>
            <Text>{c?.text}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header
          headerText="Post"
          backButton={!gettingPost}
          showLoading={postActionLoading}
          disableBackButton={postActionLoading}
        >
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={postActionLoading ? colors.col.PressedIn2 : colors.col.white}
          />
        </Header>

        {gettingPost ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size={50} color={"black"} />
          </View>
        ) : (
          <View
            style={{
              paddingTop: 10,
              alignItems: "center",
            }}
          >
            <View>
              <Image
                source={{ uri: i?.image || profleImageSkeleton }}
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
            <Pressable
              style={{ width: "100%" }}
              onPress={() => setCommmentSectionOpened(true)}
            >
              <View
                style={{
                  marginTop: 6,
                  width: "97%",
                  backgroundColor: colors.col.PressedIn5,
                  borderRadius: 10,
                  padding: 6,
                  alignItems: "center",
                  alignSelf: "center",
                  height: commentSectionOpened ? 240 : "auto",
                }}
              >
                <View>
                  <Text style={{ fontFamily: "pop-b" }}>
                    {c?.length !== 0 ? "Comments" : "No comments"}
                  </Text>
                </View>
                {commentSectionOpened ? (
                  c?.length !== 0 && (
                    <ScrollView style={{ flex: 1, width: "97%" }}>
                      {c?.map((t: commentType) => (
                        <Comment key={t._id} c={t} />
                      ))}
                    </ScrollView>
                  )
                ) : (
                  <View style={{ flex: 1, width: "97%" }}>
                    <Comment c={c ? c[0] : undefined} />
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    width: "97%",
                    gap: 5,
                    height: 40,
                    overflow: "visible",
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
                      height: 40,
                      color: commentOverflow
                        ? colors.col.dangerRed
                        : colors.col.Black,
                    }}
                    value={comment}
                    onChangeText={(text) => {
                      setComment(text);
                      debouncedHandleCommentLength();
                    }}
                    multiline={true}
                    onBlur={Keyboard.dismiss}
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
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default FullPagePostImage;

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
import { feedPostState } from "@/Store/Slices/state";

interface commentProps {
  c: commentType | undefined;
}
const Description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos molestias dolor dolores saepe dolorum quisquam vitae blanditiis perferendis amet, quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum.quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum`;

const FullPagePostImage = () => {
  const i = useSelector((e: RootState) => e.state.post.postById);
  const a: USER | undefined = useSelector((e: RootState) => e.state.admin);
  const c = useSelector((e: RootState) => e.state.post.postById?.comments);
  const token = useSelector((s: RootState) => s.state.token);
  const checkIfLiked = (): boolean => {
    if (!a) return false;
    if (!i) return false;
    let s = i.likes.some((s) => s._id.toString() === a._id.toString());
    return s;
  };
  const feedPosts = useSelector((s: RootState) => s.state.post.feedPosts);

  const alreadyLikedByAdmin = checkIfLiked();
  const [likedOk, setLikedOk] = useState<boolean>(checkIfLiked());
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refreshComment, setRefreshComment] = useState<boolean>(false);
  const [commentSectionOpened, setCommmentSectionOpened] =
    useState<boolean>(false);
  const [commentOverflow, setCommmentOverflow] = useState<boolean>(false);
  const postActionLoading = useSelector(
    (f: RootState) => f.postActions.loading
  );
  const gettingPost = useSelector((e: RootState) => e.getPostById.loading);
  const peopleLikedThisPost = useSelector(
    (e: RootState) => e.getPostById.response.peopleLiked
  );
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
      // console.log(res);
      if (res.success) {
        await Promise.all([
          dispatch(getPostById({ token })),
          dispatch(getAdmin(token)),
        ]);
        const updatedFeedPosts = [...feedPosts];
        const feedPostIndex = updatedFeedPosts.findIndex(
          (s) => s._id.toString() === i?._id.toString()
        );

        if (feedPostIndex !== -1) {
          updatedFeedPosts[feedPostIndex] = res.post;

          dispatch(feedPostState(updatedFeedPosts));
        }
        setComment("");

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
    // console.log(c)
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
              @{c?.admin?.userId || "loading..."}
            </Text>
          </Pressable>
          <View style={{ width: "100%" }}>
            <Text>{c?.text || "loading..."}</Text>
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
              {checkIfLiked() ? (
                <AntDesign
                  name="heart"
                  size={22}
                  color={colors.col.tabActivePink}
                />
              ) : (
                <AntDesign name="hearto" size={22} color={colors.col.Black} />
              )}
              <Text>{i?.likes.length}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <FontAwesome5 name="comment-alt" size={22} color="black" />
              <Text>{i?.comments?.length}</Text>
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
              {commentSectionOpened
                ? c?.length !== 0 && (
                    <ScrollView style={{ flex: 1, width: "97%" }}>
                      {c?.map((t: commentType) => (
                        <Comment key={t._id} c={t} />
                      ))}
                    </ScrollView>
                  )
                : c &&
                  c.length > 0 && (
                    <View style={{ flex: 1, width: "97%" }}>
                      <Comment c={c[0]} />
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
        {/* )} */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default FullPagePostImage;

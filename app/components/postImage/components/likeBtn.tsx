import { View, Text, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants/Colors";
import React, { useRef } from "react";
import { POST } from "@/types";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { postActionsById } from "@/Store/Thunk/postThunk";
import { feedPostState } from "@/Store/Slices/state";

type likeBtnType = {
  i: POST | undefined;
};

const LikeBtn = ({ i }: likeBtnType) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const admin = useSelector((a: RootState) => a.state.admin);
  const adminId = admin?._id;
  const [likesCount, setLikesCount] = React.useState<number>(
    i ? i.likes.length : 0
  );
  const feedPosts = useSelector((s: RootState) => s.state.post.feedPosts);
  const token = useSelector((s: RootState) => s.state.token);

  const alreadyLiked = (): boolean => {
    if (!adminId) return false;
    if (!i) return false;
    // console.log(i)
    const allLikedIds = i.likes.map((a) => a._id.toString());
    const r = allLikedIds.some((i) => i === adminId.toString());
    return r;
  };

  const handleLikeBtnAsync = async (): Promise<boolean | void> => {
    try {
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const userId = admin?._id.trim();
      const data = {
        postLiked: likedOk ? userId : undefined,
        postUnLiked: !likedOk ? userId : undefined,
        postId: i?._id,
        token,
      };
      const res = await dispatch(postActionsById(data)).unwrap();
      if (res.success) {
        // Update only the post that changed, not the entire feed
        // const updatedPost = res.post;
        // const updatedFeedPosts = feedPosts.map((post) =>
        //   post._id.toString() === updatedPost._id.toString()
        //     ? updatedPost
        //     : post
        // );

        // // Dispatch only the updated post (not the whole feed)
        // dispatch(feedPostState(updatedFeedPosts));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const [likedOk, setLikedOk] = React.useState<boolean>(alreadyLiked());

  const handleLikeBtn = async () => {
    setLikedOk((p) => !p);
    setLikesCount((p) => (likedOk ? p - 1 : p + 1));
  };
  React.useEffect(() => {
    if (likedOk !== alreadyLiked()) {
      // console.log(likedOk);
      handleLikeBtnAsync();
    }
  }, [likedOk]);

  return (
    <Pressable
      style={{
        alignItems: "center",
      }}
      onPress={handleLikeBtn}
    >
      {likedOk ? (
        <AntDesign name="heart" size={24} color={colors.col.tabActivePink} />
      ) : (
        <AntDesign name="hearto" size={24} color={colors.col.PressedIn3} />
      )}
      <Text
        style={{
          textAlign: "center",
          color: colors.col.PressedIn,
        }}
      >
        {likesCount}
      </Text>
    </Pressable>
  );
};

export default LikeBtn;

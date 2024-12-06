import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { USER, POST } from "../../../types";
import { colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch, RootState } from "@/Store/store";
import {
  getAllPostsThunk,
  getPostById,
  postActionsById,
} from "@/Store/Thunk/postThunk";
import { getAdmin, getUserProfile } from "@/Store/Thunk/userThunk";
import LikeBtn from "./components/likeBtn";
import { postById } from "@/Store/Slices/state";

interface ImageEl {
  i: POST | undefined;
  a: USER | undefined;
  margin: number;
}
const Description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos molestias dolor dolores saepe dolorum quisquam vitae blanditiis perferendis amet, quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum.quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum`;

const ImageDiscovery = React.memo(({ i, a, margin }: ImageEl) => {
  const peopleLikedThisPost = useSelector(
    (e: RootState) => e.postActions.response.peopleLiked
  );
  const admn: USER | undefined = useSelector((s: RootState) => s.admin.admin);
  const po = useSelector(
    (s: RootState) => s.getPostById.response.requestedPost?.admin
  );
  const [commentsCount, setCommentsCount] = useState<number>(
    i?.comments ? i.comments.length : 0
  );

  const [likedBy, setLikedBy] = useState<USER[]>(i?.likes || []);

  const checkIfLiked = (): boolean => {
    if (!admn || !i) return false;
    return likedBy.some(
      (like) => like.toString().trim() === admn._id.toString().trim()
    );
  };
  const [likesCount, setLikesCount] = useState<number>(i ? i.likes.length : 0);

  const [visitsCount, setVisitsCount] = useState<number>(
    i ? i.visits.length : 0
  );
  const [adminView, setAdminView] = useState<boolean>(false);
  const [likedOk, setLikedOk] = useState<boolean>(false);
  useEffect(() => {
    setLikedOk(checkIfLiked());
  }, [likedBy, admn]);
  const [disliked, setdisliked] = useState<boolean>(false);

  const toggleImageNprofile = () => setAdminView((a) => !a);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const getPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const data = {
        token,
      };
      const res = await dispatch(getAllPostsThunk(data)).unwrap();
      if (res.success) {
        return;
      } else {
        return;
      }
    } catch (error) {
      return;
    }
  };

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
      router.push("/components/FullPagePost/fullPagePost");
      const res = await dispatch(getPostById(data)).unwrap();
      if (res.success) {
        dispatch(postById(res.data.post));
        return null;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const redirectToUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const userId = i?.admin._id.trim();
      const data = {
        token,
        userId,
      };
      const res = await dispatch(getUserProfile(data)).unwrap();
      if (res.success) {
        router.push("/components/User/userProfile");
        return;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: 8,
        borderBottomWidth: 0.8,
        marginBottom: margin,
        borderColor: colors.col.PressedIn3,
      }}
    >
      <View style={{ width: "100%", paddingHorizontal: 8, gap: 8 }}>
        <View style={{ flexDirection: "row", gap: 14, width: "100%" }}>
          <Pressable
            style={{ height: 40, width: 40 }}
            onPress={redirectToUserProfile}
          >
            <Image
              style={{ height: 48, width: 48, borderRadius: 24 }}
              source={{ uri: a?.avatar }}
            />
          </Pressable>
          <View>
            <View
              style={{
                gap: 3,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Pressable onPress={redirectToUserProfile}>
                <Text style={{ color: colors.col.PressedIn3, fontSize: 20 }}>
                  {a?.userName || "loading..."}
                </Text>
              </Pressable>

              {a?.verified && (
                <View>
                  <Octicons
                    name="verified"
                    size={14}
                    color={colors.col.PressedIn3}
                  />
                </View>
              )}
              <View style={{ paddingLeft: 4 }}>
                <Pressable onPress={redirectToUserProfile}>
                  <Text
                    style={{
                      color: colors.col.PressedIn2,
                      textDecorationLine: "underline",
                      fontSize: 16,
                    }}
                  >
                    {"@"}
                    {a?.userId || "loading..."}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <Pressable
          style={{ paddingHorizontal: 12, marginTop: 6 }}
          // onPress={redirectToPost}
        >
          <Text
            style={{
              fontFamily: "pop-red",
              fontSize: 17,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {i?.title}
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={{
          height: 360,
          width: "100%",
        }}
        onPress={redirectToPost}
      >
        {!adminView ? (
          <Image
            source={{ uri: i?.image }}
            style={{
              flex: 1,
              marginTop: 15,
              // borderRadius: 20,
              borderWidth: 0.8,
              borderColor: colors.col.PressedIn2,
              objectFit: "cover",
            }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              marginTop: 15,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <Pressable
              style={{
                position: "absolute",
                zIndex: 9999,
                right: 10,
                top: 10,
              }}
            >
              <MaterialIcons name="report" size={20} color="black" />
            </Pressable>
            <View
              style={{
                height: "100%",
                width: "100%",
                paddingHorizontal: 5,
                alignItems: "center",
              }}
            >
              <Pressable
                style={{ marginTop: 25 }}
                onPress={redirectToUserProfile}
              >
                <Image
                  source={{ uri: a?.avatar }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    backgroundColor: colors.col.white,
                  }}
                />
              </Pressable>
              <View>
                <View
                  style={{
                    marginTop: 20,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 200,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: colors.col.Black,
                          fontSize: 16,
                          fontFamily: "pop-b",
                        }}
                      >
                        {a?.userName || "Anonymous"}
                      </Text>
                    </View>

                    <Pressable onPress={redirectToUserProfile}>
                      <Text
                        style={{
                          color: colors.col.PressedIn,
                          fontSize: 12,
                          fontFamily: "pop-reg",
                          textDecorationLine: "underline",
                          position: "relative",
                          zIndex: 9999,
                        }}
                      >
                        @{a?.userId || "anonymous"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{ alignSelf: "center", marginTop: 5, flexShrink: 1 }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                    numberOfLines={1}
                  >
                    "{i?.title}"
                  </Text>
                </View>
                <View
                  style={{
                    height: 130,
                    borderRadius: 20,
                    borderWidth: 0.8,
                    borderColor: colors.col.PressedIn2,
                    marginTop: 10,
                    width: 290,
                    padding: 8,
                  }}
                >
                  <Text style={{ alignSelf: "center", fontSize: 16 }}>
                    Description.
                  </Text>
                  <View style={{ flex: 1, marginTop: 10 }}>
                    {i?.description?.trim() !== "" ? (
                      <Text
                        style={{ alignSelf: "center" }}
                        textBreakStrategy="highQuality"
                      >
                        {i?.description}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          alignSelf: "center",
                          color: colors.col.PressedIn2,
                          marginTop: 10,
                        }}
                      >
                        No description provided by the admin.
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </Pressable>
      <View
        style={{
          height: 60,
          width: "100%",
          paddingHorizontal: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <Pressable
          style={{
            alignItems: "center",
          }}
          // onPress={likeUnlikeLogic}s
        >
          <LikeBtn i={i} />
        </Pressable>
        <Pressable onPress={redirectToPost}>
          <FontAwesome6
            name="comment-alt"
            size={24}
            color={colors.col.PressedIn3}
          />
          <Text
            style={{
              textAlign: "center",
              color: colors.col.PressedIn,
            }}
          >
            {commentsCount}
          </Text>
        </Pressable>
        <Pressable
          onPress={toggleImageNprofile}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {adminView ? (
            <Ionicons name="close" size={28} color={colors.col.PressedIn3} />
          ) : (
            <Ionicons
              name="options-outline"
              size={28}
              color={colors.col.PressedIn3}
            />
          )}
          {/* <Text
            style={{
              textAlign: "center",
              color: colors.col.PressedIn,
            }}
          >
            {"Info"}
          </Text> */}
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons
            name="google-analytics"
            size={22}
            color={colors.col.PressedIn3}
          />
          <Text
            style={{
              textAlign: "center",
              color: colors.col.PressedIn3,
            }}
          >
            {visitsCount}
          </Text>
        </Pressable>
      </View>
    </View>
  );
});
export default ImageDiscovery;

// const handleUserActionOnPost = React.useCallback(async () => {
//   try {
//     console.log("triggered");
//     const token = await AsyncStorage.getItem("token");
//     if (!token) {
//       router.replace("/components/GetStarted/GetStarted");
//       console.log("no token");
//       return;
//     }
//     const data = {
//       token,
//       postId: i?._id,
//       postLiked: !alreadyLikedByAdmin,
//     };
//     console.log(data.postLiked);
//     const res = await dispatch(postActionsById(data)).unwrap();
//     if (res.success) {
//       const data0 = {
//         token,
//       };
//       await Promise.all([
//         dispatch(getAdmin(token)),
//         dispatch(getAllPostsThunk(data0)),
//       ]);

//       return;
//     } else {
//       const data2 = {
//         token,
//         postId: i?._id,
//       };
//       await dispatch(getPostById(data2));
//       return;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }, [alreadyLikedByAdmin, dispatch, i?._id, router]);

{
  /* {likedOk ? (
            <AntDesign
              name="heart"
              size={24}
              color={colors.col.tabActivePink}
            />
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
          </Text> */
}

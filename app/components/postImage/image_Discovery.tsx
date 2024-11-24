import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { USER, POST } from "../../../types";
import { colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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

interface ImageEl {
  i: POST | undefined;
  a: USER | undefined;
  margin: number;
}
const Description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos molestias dolor dolores saepe dolorum quisquam vitae blanditiis perferendis amet, quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum.quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum`;

const ImageDiscovery = React.memo(({ i, a, margin }: ImageEl) => {
  const gettingPost = useSelector((s: RootState) => s.getPostById.loading);
  const peopleLikedThisPost = useSelector(
    (e: RootState) => e.postActions.response.peopleLiked
  );
  // console.log(peopleLikedThisPost)
  // console.log(a?._id)
  // const checkIfLiked = React.useMemo(() => Array.isArray(peopleLikedThisPost) && a
  // ? peopleLikedThisPost.includes(a._id)
  // : false, [peopleLikedThisPost, a])

  // const alreadyLikedByAdmin = checkIfLiked;
  // console.log(alreadyLikedByAdmin)

  const [adminView, setAdminView] = useState<boolean>(false);
  const [reaction, setReaction] = useState<{ liked: boolean; disliked: boolean }>({
    liked: false,
    disliked: false,
  });  const [disliked, setdisliked] = useState<boolean>(false);

  // const handleDislikeBtn = () => {
  //   if (!disliked) {
  //     setdisliked(true);
  //     if (liked) {
  //       setLiked(false);
  //     }
  //   } else setdisliked(false);
  // };
  const toggleImageNprofile = () => setAdminView((a) => !a);

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
      router.push("/components/Profile/fullPagePost");
      const res = await dispatch(getPostById(data));
      if (getPostById.fulfilled.match(res)) {
        return null;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
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
        router.push("/components/Profile/userProfile");
        return;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleLikeBtn = async () => {
    setReaction((prevState) => ({
      ...prevState,
      liked: !prevState.liked,
      disliked: prevState.liked ? false : prevState.disliked, // reset dislike if liked
    }));
    // await handleUserActionOnPost();
  };

  return (
    <View
      style={{
        height: 405,
        width: 310,
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 0.8,
        marginBottom: margin,
        borderColor: colors.col.PressedIn3,
      }}
    >
      <Pressable
        style={{
          height: 360,
          width: 300,
        }}
        onPress={redirectToPost}
      >
        {!adminView ? (
          <Image
            source={{ uri: i?.image }}
            style={{
              flex: 1,
              marginTop: 15,
              borderRadius: 20,
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
              <View style={{ marginTop: 25 }}>
                <Image
                  source={{ uri: a?.avatar }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    backgroundColor: colors.col.white,
                  }}
                />
              </View>
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
          height: 45,
          width: "100%",
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
          onPress={handleLikeBtn}
        >
          {reaction.liked ? (
            <AntDesign
              name="heart"
              size={24}
              color={colors.col.tabActivePink}
            />
          ) : (
            <AntDesign name="hearto" size={24} color={colors.col.PressedIn3} />
          )}
        </Pressable>
        <Pressable onPress={redirectToPost}>
          <FontAwesome6
            name="comment-alt"
            size={26}
            color={colors.col.PressedIn3}
          />
          <Text
            style={{
              fontSize: 13,
              position: "absolute",
              alignSelf: "center",
              top: 5,
              color: colors.col.PressedIn,
            }}
          >
            {i?.comments.length}
          </Text>
        </Pressable>
        <Pressable
          onPress={toggleImageNprofile}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {adminView ? (
            <Ionicons name="close" size={26} color={colors.col.PressedIn3} />
          ) : (
            <MaterialIcons
              name="more-horiz"
              size={26}
              color={colors.col.PressedIn3}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
});
export default ImageDiscovery;

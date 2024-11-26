import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ToastAndroid,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Header from "../header";
import UserPost from "./components/userPost";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFocusEffect } from "expo-router";
import { colors } from "@/constants/Colors";
import { USER, InitialStateUpdatedAdmin, POST } from "../../../types";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdmin,
  updateAdmin,
  handleFollowUnfollowThunk,
  getUserProfile,
} from "@/Store/Thunk/userThunk";
import { RootState, AppDispatch } from "@/Store/store";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profleImageSkeleton =
  "https://www.hrnk.org/wp-content/uploads/2024/08/Placeholder-Profile-Image.jpg";

export default function Menu(): React.JSX.Element {
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [p, setp] = useState<POST[] | []>([]);
  const [privacyResponse, setPrivacyResponse] = useState<boolean>(false);
  const [privateAccount, setPrivateAccount] =
    useState<boolean>(privacyResponse);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [postsLength, setPostsLength] = useState<number | string>();
  const u: USER | undefined = useSelector(
    (s: RootState) => s.user.response.data.user
  );
  const a: USER | undefined = useSelector((s: RootState) => s.admin.admin);
  const fUfLoading = useSelector((s: RootState) => s.followUnfollow.loading);

  //   console.log(u);
  const loading: boolean = useSelector((s: RootState) => s.user.loading);
  const updatedAdmin: InitialStateUpdatedAdmin = useSelector(
    (s: RootState) => s.updateAdmin
  );
  const postLoading = useSelector((s: RootState) => s.getPostById.loading);
  const comments = useSelector(
    (s: RootState) => s.getPostById.response.comments
  );

  // console.log(comments)

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);

  const refreshAdmin = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setRefreshing(false);
        router.replace("/components/GetStarted/GetStarted");
        return null;
      }
      const res = await dispatch(getAdmin(token));
      if (getAdmin.fulfilled.match(res)) {
        const { payload } = res;
        if (payload.success) {
          setRefreshing(false);
          //   console.log(payload.admin);
          return null;
        } else {
          setRefreshing(false);
          router.replace("/components/GetStarted/GetStarted");
          return null;
        }
      } else {
        setRefreshing(false);
        router.replace("/components/GetStarted/GetStarted");
        return null;
      }
    } catch (error) {
      setRefreshing(false);
      console.log(error);
      return null;
    }
  };
  // console.log(p);
  useFocusEffect(
    React.useCallback(() => {
      refreshAdmin();
    }, [])
  );
  u;
  const handleFollowedByAdmin = (): boolean => {
    if (!a) return false;
    if (!u) return false;
    if (Array.isArray(u.followers)) {
      const b = (u.followers as USER[]).some((f) => {
        return f._id === a._id;
      });
      return b;
    }

    return false;
  };
  const handleFollowedByUser = (): boolean => {
    if (!a || !u) return false;

    if (Array.isArray(a.followers)) {
      return a.followers.some((f) => {
        if (typeof f === "string") {
          return f === u._id;
        }
        return f._id === u._id;
      });
    }

    return false;
  };

  const [followedByAdmin, setFollowedByAdmin] = useState<boolean | undefined>(
    handleFollowedByAdmin()
  );
  const [followedByUser, setFollowedByUser] = useState<boolean | undefined>(
    handleFollowedByUser()
  );
  const handleFollowUnfollowbtn = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/ErrorPages/sessionExpired");
        return;
      }
      const data = {
        token,
        isFollowedId: handleFollowedByAdmin() ? undefined : u?._id,
        isUnfollowedId: handleFollowedByAdmin() ? u?._id : undefined,
      };
      const res = await dispatch(handleFollowUnfollowThunk(data)).unwrap();
      if (res.success) {
        const data ={
          token,
          userId:u?._id
        }
       await Promise.all([ dispatch(getAdmin(token)),dispatch(getUserProfile(data))])
      }
      return;
    } catch (error) {
      // console.log(error);
      return;
    }
  };

  const UserInfo = (): React.JSX.Element => {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          gap: 20,
          borderBottomWidth: 1.5,
          borderBlockColor: colors.col.PressedIn5,
          paddingVertical: 10,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <View
            style={{
              height: 90,
              alignItems: "flex-end",
              flexDirection: "row",
              gap: 6,
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                overflow: "hidden",
              }}
            >
              <Image
                source={{
                  uri: u?.avatar ? u?.avatar : profleImageSkeleton,
                }}
                style={{ height: "100%" }}
              />
            </View>
            <View
              style={{
                paddingTop: 14,
                height: "100%",
              }}
            >
              <View
                style={{
                  gap: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "pop-b1",
                    fontSize: 24,
                    color: colors.col.PressedIn3,
                    marginLeft: 5,
                  }}
                >
                  {u?.userName}
                </Text>
                {u?.verified && (
                  <View>
                    <Octicons
                      name="verified"
                      size={20}
                      color={colors.col.PressedIn3}
                    />
                  </View>
                )}
                <View
                  style={{
                    borderRadius: 4,
                    // paddingHorizontal: 6,
                    backgroundColor: handleFollowedByAdmin()
                      ? colors.col.Black
                      : colors.col.link,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 5,
                    marginLeft: 9,
                    height: 25,
                    marginBottom: 8,
                    width:80
                  }}
                >
                  <Pressable onPress={handleFollowUnfollowbtn}>
                    {fUfLoading ? (
                      <ActivityIndicator color={colors.col.white} size={14} />
                    ) : (
                      <Text
                        style={{
                          color: colors.col.white,
                          fontSize: 14,
                          fontFamily: "pop-b",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        {handleFollowedByAdmin() ? "Unfollow" : "Follow"}
                      </Text>
                    )}
                  </Pressable>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  style={{
                    height: 30,
                    width: 110,
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                    backgroundColor: colors.col.PressedIn5,
                    paddingHorizontal: 8,
                  }}
                    onPress={() =>router.push("/components/User/components/userFollowers")}
                >
                  <Text style={{ fontSize: 16 }}>
                    {u?.followers.length}{" "}
                    {u && u.followers.length !== 1 ? "Followers" : "Follower"}
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    height: 30,
                    width: 110,
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                    backgroundColor: colors.col.PressedIn5,
                    paddingHorizontal: 8,
                  }}
                    onPress={() =>router.push("/components/User/components/userFollowing")}
                >
                  <Text style={{ fontSize: 16 }}>
                    {u?.following.length}{" "}
                    {u && u.following.length > 1 ? "Followings" : "Following"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 5 }}>
            <Text
              style={{
                fontFamily: "pop-reg",
                fontSize: 12,
                color: colors.col.PressedIn,
                position: "relative",
                left: 5,
              }}
            >
              @{u?.userId}
            </Text>
          </View>
          {u?.bio.trim() !== "" && (
            <View
              style={{
                marginTop: 10,
                backgroundColor: colors.col.PressedIn5,
                padding: 6,
                borderRadius: 8,
                width: "96%",
              }}
            >
              <Text style={{ fontSize: 16, color: colors.col.PressedIn4 }}>
                {u?.bio}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const UserUploads = (): React.JSX.Element => {
    return (
      <View style={{ flex: 1 }}>
        {p.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                height: 110,
                width: 110,
                backgroundColor: colors.col.PressedIn2,
                marginTop: 30,
                borderRadius: 55,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.col.white,
                  fontFamily: "pop-b",
                  fontSize: 16,
                }}
              >
                No posts
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={p}
              numColumns={3}
              contentContainerStyle={{
                paddingHorizontal: 4,
              }}
              style={{ paddingBottom: 10 }}
              keyExtractor={(i) => i._id}
              renderItem={({ item, index }) => (
                <UserPost key={item._id} i={item} a={u} lastPostMargin={0} />
              )}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        headerText="Profile"
        backButton={!postLoading}
        showLoading={postLoading}
      >
        <Ionicons
          name="arrow-back-outline"
          size={28}
          color={colors.col.white}
          style={{ width: 30 }}
        />
      </Header>
      {refreshing ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={50} color={colors.col.Black} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <UserInfo />
          <UserUploads />
        </View>
      )}
    </View>
  );
}

const profileMenuStyles = StyleSheet.create({
  profileOptions: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: colors.col.PressedIn,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  profileOptionsLogout: {
    height: 60,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.col.tabActivePink,
    margin: 10,
    borderRadius: 16,
  },
  profileOptionsText: {
    fontFamily: "pop-mid",
    fontSize: 14,
    marginTop: 5,
  },
  right_icon: {
    position: "relative",
  },
  profileOptionsTextDark: {
    fontFamily: "pop-mid",
    fontSize: 16,
    marginTop: 5,
    color: colors.col.PressedIn4,
  },
  profileOptionsTextDarkLogout: {
    fontFamily: "pop-b",
    fontSize: 16,
    marginTop: 5,
    color: colors.col.white,
  },
  lengthIcon: {
    minWidth: 18,
    height: 24,
    width: "auto",
    borderRadius: 8,
    paddingHorizontal: 4,
    backgroundColor: colors.col.PressedIn,
    alignItems: "center",
    justifyContent: "center",
  },
  customOnOffToogleBtn: {
    height: 30,
    width: 50,
    padding: 7,
    borderRadius: 8,
    backgroundColor: colors.col.PressedIn,
    alignItems: "center",
    justifyContent: "center",
  },
  ToogleBtnText: {
    fontSize: 16,
    color: colors.col.white,
  },
});

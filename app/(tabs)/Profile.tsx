import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Header from "../components/header";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFocusEffect } from "expo-router";
import { colors } from "@/constants/Colors";
import { InitialStateAdmin, USER, InitialStateUpdatedAdmin } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { getAdmin, updateAdmin } from "@/Store/Thunk/userThunk";
import { RootState, AppDispatch } from "@/Store/store";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestMediaPermission } from "@/constants/GlobalConstants";
import { POST } from "../../types";
import { feedPostState, postsAvailabilityState, setToken } from "@/Store/Slices/state";

const profleImageSkeleton =
  "https://www.hrnk.org/wp-content/uploads/2024/08/Placeholder-Profile-Image.jpg";

export default function Menu(): React.JSX.Element {
  const [returnMessage, setReturnMessage] = useState<string>("");
  // const [adminData, setAdminData] = useState<USER>();
  const [postsData, setPostsData] = useState<USER>();
  // const [avatarUri, setAvatarUri] = useState<string>("");
  const [privacyResponse, setPrivacyResponse] = useState<boolean>(false);
  const [privateAccount, setPrivateAccount] =
    useState<boolean>(privacyResponse);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [postsLength, setPostsLength] = useState<number | string>();
  const [bookmarksLength, setBookmarksLength] = useState<number | string>();
  const admin: InitialStateAdmin = useSelector((s: RootState) => s.admin);
  const updatedAdmin: InitialStateUpdatedAdmin = useSelector(
    (s: RootState) => s.updateAdmin
  );
  // useEffect(()=>{})

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const a: USER | undefined = admin.admin;
  const loading: boolean = updatedAdmin.loading;

  const checkIfArray = (t: any) => {
    if (!Array.isArray(t) || t !== undefined || t !== null) return t;
    else {
      return null;
    }
  };
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
          // console.log(payload.admin);
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
      // console.log(error);
      return null;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshAdmin();
    }, [])
  );

  const handleLogOut = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return null;
      } else {
        dispatch(feedPostState([]))
        dispatch(setToken(null))
        await AsyncStorage.removeItem("token");
        router.replace("/components/GetStarted/GetStarted");
        return null;
      }
    } catch (error) {
      // console.log(error);
      return;
    }
  };

  const MainProfilePage = (): React.JSX.Element => {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Pressable
          onPress={() => router.push("/components/Profile/adminProfile")}
          style={{
            height: 100,
            paddingHorizontal: 15,
            paddingVertical: 10,
            alignItems: "flex-end",
            flexDirection: "row",
            gap: 17,
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
                uri: a?.avatar ? a?.avatar : profleImageSkeleton,
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
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text
                style={{
                  fontFamily: "pop-b1",
                  fontSize: 24,
                  color: colors.col.PressedIn3,
                }}
              >
                {a?.userName}
              </Text>
              {a?.verified && (
                <View>
                  <Octicons
                    name="verified"
                    size={20}
                    color={colors.col.PressedIn3}
                  />
                </View>
              )}
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "pop-reg",
                  fontSize: 12,
                  color: colors.col.PressedIn,
                }}
              >
                @{a?.userId}
              </Text>
            </View>
          </View>
        </Pressable>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{ paddingHorizontal: 10, fontFamily: "pop-b", fontSize: 20 }}
          >
            Your account
          </Text>
          <View style={{ marginTop: 10 }}>
            <Pressable
              style={profileMenuStyles.profileOptions}
              onPress={() =>
                router.push({ pathname: "/components/Profile/EditProfile" })
              }
            >
              <Text style={profileMenuStyles.profileOptionsTextDark}>
                Acount center
              </Text>
              <AntDesign
                name="right"
                size={20}
                color="black"
                style={profileMenuStyles.right_icon}
              />
            </Pressable>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{ paddingHorizontal: 10, fontFamily: "pop-b", fontSize: 20 }}
          >
            Summary
          </Text>
          <View style={{ marginTop: 10 }}>
            <Pressable
              style={profileMenuStyles.profileOptions}
              onPress={() => router.push("/components/Profile/adminPosts")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text style={profileMenuStyles.profileOptionsTextDark}>
                  My Posts
                </Text>
                <View style={profileMenuStyles.lengthIcon}>
                  <Text style={{ color: colors.col.white, fontSize: 14 }}>
                    {a?.posts.length}
                  </Text>
                </View>
              </View>
              <View>
                <AntDesign
                  name="right"
                  size={20}
                  color={colors.col.PressedIn4}
                />
              </View>
            </Pressable>

            <Pressable
              style={profileMenuStyles.profileOptions}
              onPress={() => router.push("/components/Profile/savedPosts")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text style={profileMenuStyles.profileOptionsTextDark}>
                  Saved
                </Text>
                <View style={profileMenuStyles.lengthIcon}>
                  <Text style={{ color: colors.col.white, fontSize: 14 }}>
                    {a?.bookmarks.length}
                  </Text>
                </View>
              </View>
              <View>
                <AntDesign
                  name="right"
                  size={20}
                  color={colors.col.PressedIn4}
                />
              </View>
            </Pressable>
            <Pressable
              style={profileMenuStyles.profileOptions}
              onPress={() => router.push("/components/Profile/archivedPosts")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text style={profileMenuStyles.profileOptionsTextDark}>
                  Archived
                </Text>
                <View style={profileMenuStyles.lengthIcon}>
                  <Text style={{ color: colors.col.white, fontSize: 14 }}>
                    {bookmarksLength ? bookmarksLength : 0}
                  </Text>
                </View>
              </View>
              <View>
                <AntDesign
                  name="right"
                  size={20}
                  color={colors.col.PressedIn4}
                />
              </View>
            </Pressable>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontFamily: "pop-b",
                  fontSize: 20,
                }}
              >
                Settings
              </Text>
              <Pressable
                style={profileMenuStyles.profileOptions}
                onPress={() => router.push("/components/Profile/setPrivacy")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={profileMenuStyles.profileOptionsTextDark}>
                    Privacy
                  </Text>
                </View>
                <AntDesign
                  name="right"
                  size={20}
                  color={colors.col.PressedIn4}
                  style={profileMenuStyles.right_icon}
                />
              </Pressable>
            </View>

            <Pressable
              style={profileMenuStyles.profileOptions}
              onPress={() => router.push("/components/Profile/setDisable")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text style={profileMenuStyles.profileOptionsTextDark}>
                  Disable account
                </Text>
              </View>
              <AntDesign
                name="right"
                size={20}
                color={colors.col.PressedIn4}
                style={profileMenuStyles.right_icon}
              />
            </Pressable>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                style={profileMenuStyles.profileOptionsLogout}
                activeOpacity={0.8}
                onPress={handleLogOut}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    alignItems: "center",
                    borderRadius: 10,
                    paddingHorizontal: 14,
                    paddingVertical: 7,
                  }}
                >
                  <Text style={profileMenuStyles.profileOptionsTextDarkLogout}>
                    Logout
                  </Text>
                </View>
                <Feather
                  name="log-out"
                  size={22}
                  color={colors.col.white}
                  style={profileMenuStyles.right_icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, opacity: loading ? 0.6 : 1 }}>
       <Header headerText="Profile"/>
      {refreshing ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
         <ActivityIndicator color={"black"} size={50} />
        </View>
      ) : (
        <MainProfilePage />
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
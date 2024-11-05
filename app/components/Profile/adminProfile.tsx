import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ToastAndroid,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AdminPost from "./components/adminPost";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFocusEffect } from "expo-router";
import { colors } from "@/constants/Colors";
import {
  InitialStateAdmin,
  USER,
  InitialStateUpdatedAdmin,
} from "../../../types";
// import {ImageDiscovery} from "../"
import { useSelector, useDispatch } from "react-redux";
import { getAdmin, updateAdmin } from "@/Store/Thunk/userThunk";
import { RootState, AppDispatch } from "@/Store/store";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { requestMediaPermission } from "@/constants/GlobalConstants";
import { POST } from "../../../types";
import AdminPosts from "./archivedPosts";

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
  const [postsLength, setPostsLength] = useState<number | string>();
  const [bookmarksLength, setBookmarksLength] = useState<number | string>();
  const admin: InitialStateAdmin = useSelector((s: RootState) => s.admin);
  const updatedAdmin: InitialStateUpdatedAdmin = useSelector(
    (s: RootState) => s.updateAdmin
  );
  // useEffect(()=>{})

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const a: USER | undefined = admin.admin;
  const p: POST[] | undefined = admin.posts;
  const b: string[] | [] = admin.bookmarks;
  const loading: boolean = updatedAdmin.loading;

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

  useFocusEffect(
    React.useCallback(() => {
      refreshAdmin();
    }, [])
  );

  const AdminInfo = (): React.JSX.Element => {
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
                style={{
                  justifyContent: "center",
                  gap: 5,
                  width: 200,
                  marginLeft: 10,
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
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Pressable
                    style={{
                      height: 30,
                      width: 80,
                      flexGrow: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 4,
                      backgroundColor: colors.col.PressedIn5,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      Followers({a?.followers.length})
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      height: 30,
                      width: 80,
                      flexGrow: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 4,
                      backgroundColor: colors.col.PressedIn5,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      Following({a?.following.length})
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
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
          {a?.bio.trim() !== "" && (
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
                {a?.bio}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const AdminUploads = (): React.JSX.Element => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
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
          <View>
            {p.map((j,i)=>(<AdminPost key={j._id} i={j} a={a} lastPostMargin={i === p.length - 1 ? 10 : 0} />))}
          </View>

          // <FlatList
          //   data={p}
          //   keyExtractor={(p) => p._id}
          //   renderItem={({item, index}) => (
          //     <AdminPost i={item} a={a} lastPostMargin={index === p.length - 1 ? 10 : 0} />
          //   )}
          // />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, opacity: loading ? 0.6 : 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          paddingTop: 35,
          backgroundColor: colors.col.PressedIn,
          height: 100,
        }}
      >
        <Pressable
          style={{ position: "absolute", left: 25, bottom: "26%" }}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={colors.col.white}
          />
        </Pressable>
        <Text style={{ fontSize: 24, color: colors.col.white }}>Profile</Text>
      </View>
      {refreshing ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontFamily: "pop-b", marginBottom: 80, fontSize: 16 }}>
            Loading...
          </Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <AdminInfo />
          <AdminUploads />
        </ScrollView>
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

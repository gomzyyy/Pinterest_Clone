import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants/Colors";
import { InitialStateAdmin, USER, InitialStateUpdatedAdmin } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { updateAdmin } from "@/Store/Thunk/userThunk";
import { RootState, AppDispatch } from "@/Store/store";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestMediaPermission } from "@/constants/GlobalConstants";
import { POST } from "../../types";

const profleImageSkeleton =
  "https://www.hrnk.org/wp-content/uploads/2024/08/Placeholder-Profile-Image.jpg";

export default function Menu(): React.JSX.Element {
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [adminData, setAdminData] = useState<USER>();
  const [postsData, setPostsData] = useState<USER>();
  const [avatarUri, setAvatarUri] = useState<string>("");
  const [privacyResponse, setPrivacyResponse] = useState<boolean>(false);
  const [privateAccount, setPrivateAccount] =
    useState<boolean>(privacyResponse);
  const [refreshOnUpdate, setRefreshOnUpdate] = useState<boolean>(false);
  const [postsLength, setPostsLength] = useState<number | string>();
  const [bookmarksLength, setBookmarksLength] = useState<number | string>();
  const admin: InitialStateAdmin = useSelector((s: RootState) => s.admin);
  const updatedAdmin: InitialStateUpdatedAdmin = useSelector(
    (s: RootState) => s.updateAdmin
  );

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const a: USER | [] = admin.admin;
  const p: POST[] | [] = admin.posts;
  const b: string[] | [] = admin.bookmarks;
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

  useEffect(() => {
    const adm = checkIfArray(a);
    const pst = checkIfArray(p);
    const bmk = checkIfArray(b);
    if (adm) {
      setAdminData(adm);
    }
    if (pst) {
      setPostsData(pst);
    }
    setPostsLength(pst.length);
    setBookmarksLength(bmk.length);
  }, []);

  const getPrivacyValue = () => {
    //
  };

  const editProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return setReturnMessage("Authentication required!");
      }
      const data = {
        isPrivate: privateAccount,
        token,
      };
      const res = await dispatch(updateAdmin(data));
      if (updateAdmin.fulfilled.match(res)) {
        const { payload } = res;
        if (payload.success) {
          setPrivacyResponse(payload.data.isPrivate);
          setPrivateAccount((p) => !p);
          return null;
        } else {
          console.log("Error: ", payload.error);
          return setReturnMessage(payload.error);
        }
      } else {
        return setReturnMessage("Error occured while updating!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return setReturnMessage(
        "An unexpected error occurred. Please try again."
      );
    }
  };

  console.log(admin.admin)

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
        <FontAwesome name="user-circle-o" size={24} color={colors.col.white} />
        <Text style={{ fontSize: 24, color: colors.col.white }}>Profile</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            height: 90,
            paddingHorizontal: 15,
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
                uri: adminData?.avatar ? adminData?.avatar : profleImageSkeleton,
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
                {adminData?.userName}
              </Text>
              {!adminData?.verified ? (
                <View>
                  <Octicons
                    name="unverified"
                    size={20}
                    color={colors.col.PressedIn3}
                  />
                </View>
              ) : (
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
                @{adminData?.userId}
              </Text>
            </View>
          </View>
        </View>
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
                    {postsLength}
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
            <Pressable style={profileMenuStyles.profileOptions}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text style={profileMenuStyles.profileOptionsTextDark}>
                  Saved posts
                </Text>
                <View style={profileMenuStyles.lengthIcon}>
                  <Text style={{ color: colors.col.white, fontSize: 14 }}>
                    {bookmarksLength}
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
                color="black"
                style={profileMenuStyles.right_icon}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
  lengthIcon: {
    maxHeight: 20,
    minWidth: 20,
    height: "auto",
    width: "auto",
    padding: 4,
    borderRadius: 8,
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

// const getAdmin = async () => {
//   try {
//     setLoading(true);
//     setError("pending");
//     const token = await AsyncStorage.getItem("token");
//     if (!token || token === null) {
//       return setReturnMessage("Token not found");
//     }
//     const getAdmin = await fetch(
//       `http://192.168.1.64:6600/api/user/profile/get-user`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const response = await getAdmin.json();
//     console.log(response.admin);
//     if (response.success) {
//       setAdminInfo(response.admin);
//       setLoading(false);
//       setError("success");
//     } else {
//       setLoading(false);
//       setError("failed");
//       return setReturnMessage(response.message);
//     }
//   } catch (error) {
//     setLoading(false);
//     setError("failed");
//     console.log(error);
//     return error;
//   }
// };

import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
//   import Octicons from '@expo/vector-icons/Octicons';
//   import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants/Colors";
import {
  InitialStateAdmin,
  USER,
  InitialStateUpdatedAdmin,
} from "../../../types";
import { useSelector, useDispatch } from "react-redux";
import { updateAdmin } from "@/Store/Thunk/userThunk";
import { RootState, AppDispatch } from "@/Store/store";
import { getAdmin } from "@/Store/Thunk/userThunk";
  import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
//   import { requestMediaPermission } from "@/constants/GlobalConstants";

const profleImageSkeleton =
  "https://www.hrnk.org/wp-content/uploads/2024/08/Placeholder-Profile-Image.jpg";

export default function Menu(): React.JSX.Element {
  const [returnMessage, setReturnMessage] = useState<string>("");
  // const [adminData, setAdminData] = useState<USER>();
  // const [postsData, setPostsData] = useState<USER>();
  // const [avatarUri, setAvatarUri] = useState<string>("");
  const [privacyResponse, setPrivacyResponse] = useState<boolean>(false);
  const [privateAccount, setPrivateAccount] =
    useState<boolean>(privacyResponse);
  // const [refreshOnUpdate, setRefreshOnUpdate] = useState<boolean>(false);
  // const [postsLength, setPostsLength] = useState<number | string>();
  // const [bookmarksLength, setBookmarksLength] = useState<number | string>();
  // const admin: InitialStateAdmin = useSelector((s: RootState) => s.admin);
  const updatedAdmin: InitialStateUpdatedAdmin = useSelector(
    (s: RootState) => s.updateAdmin
  );

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // const a: USER | [] = admin.admin;
  // const p: string[] | [] = admin.posts;
  // const b: string[] | [] = admin.bookmarks;
  const loading: boolean = updatedAdmin.loading;

  // const checkIfArray = (t: any) => {
  //   if (!Array.isArray(t) || t !== undefined || t !== null) return t;
  //   else {
  //     return null;
  //   }
  // };
  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);

  // useEffect(() => {
  // //   const adm = checkIfArray(a);
  // //   const pst = checkIfArray(p);
  // //   const bmk = checkIfArray(b);
  //   if (adm) {
  //     setAdminData(adm);
  //   }
  //   if (pst) {
  //     setPostsData(pst);
  //   }
  //   setPostsLength(pst.length);
  //   setBookmarksLength(bmk.length);
  // }, []);

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
          return setReturnMessage(payload.error);
        }
      } else {
        return setReturnMessage("Error occured while updating!");
      }
    } catch (error) {
      return setReturnMessage(
        "An unexpected error occurred. Please try again."
      );
    }
  };
  useEffect(() => {
    const reload = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          // console.log("no token found");
          return null;
        }
        const res = await dispatch(getAdmin(token));
        if (getAdmin.fulfilled.match(res)) {
          const { payload } = res;
          if (payload.success) {
            return null;
          } else {
            router.replace("/components/GetStarted/GetStarted");
            return null;
          }
        } else {
          router.replace("/components/GetStarted/GetStarted");
          return null;
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };
    reload();
  }, [privacyResponse]);

  return (
    <View style={{ flex: 1}}>
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
            disabled={loading}
          >
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color={colors.col.white}
            />
          </Pressable>
        <Text style={{ fontSize: 24, color: colors.col.white }}>Settings</Text>
        {/* <View style={{ position: "absolute", right: 25, bottom: 17 }}>
            <Ionicons name="exit-outline" size={26} color={colors.col.white} />
          </View> */}
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{ paddingHorizontal: 10, fontFamily: "pop-b", fontSize: 20 }}
          >
            {!privateAccount ? "You're Private  😶‍🌫️" : "You're Public  😀"}
          </Text>
          <View style={{ marginTop: 30 }}>
            <Pressable
              style={profilePrivacyEditStyles.OpacityBtnBroad}
              onPress={editProfile}
              disabled={loading}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  alignItems: "center",
                  backgroundColor:loading?colors.col.PressedIn2:colors.col.PressedIn3,
                  height:'100%',
                  width:'90%',
                  borderRadius:10
                }}
              >
                <Text style={profilePrivacyEditStyles.profileOptionsTextDark}>
                  {loading?"Changing":"Change"}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const profilePrivacyEditStyles = StyleSheet.create({
  OpacityBtnBroad: {
    height:50,
    alignItems:'center'
  },
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
    color: colors.col.white,
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
    height: 35,
    width: 60,
    //   padding: 7,
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
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "@/constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { USER, UserHistory } from "@/types";
import { AppDispatch, RootState } from "@/Store/store";
import {
  handleFollowUnfollowThunk,
  getAdmin,
  getUserProfile,
  getUserProfileAndSetThunk,
  removeSpecificHistoryThunk,
  getAdminHistoryThunk,
} from "@/Store/Thunk/userThunk";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getHistorystate } from "@/Store/Slices/state";
import { ceil } from "lodash";

type searchResultListItem = {
  item: UserHistory;
  bottom: boolean;
};

const HistoryListItem = ({ item, bottom }: searchResultListItem) => {
  const token = useSelector((s: RootState) => s.state.token);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const admin = useSelector((a: RootState) => a.admin.admin);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [removalLoading, setRemovalLoading] = useState<boolean>(false);

  const handleRemoveHistory = async () => {
    try {
      setRemovalLoading(true);
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const res = await dispatch(
        removeSpecificHistoryThunk({ token, userHistoryId: item._id })
      ).unwrap();
      if (res.success) {
        const res1 = await dispatch(getAdminHistoryThunk(token)).unwrap();
        if (res1.success) {
          dispatch(getHistorystate({ users: res1.history.users }));
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setRemovalLoading(false);
    }
  };

  const redirectToUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const userId = item.user?._id.trim();
      const data = {
        token,
        userId,
      };
      if (item.user?._id === admin?._id) {
        const res = await dispatch(getAdmin(token)).unwrap();
        if (res.success) {
          router.push("/components/Profile/adminProfile");
          return;
        } else {
          return;
        }
      } else {
        const res = await dispatch(getUserProfileAndSetThunk(data)).unwrap();
        if (res.success) {
          router.push("/components/User/userProfile");
          return;
        } else {
          return;
        }
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <Pressable
      style={{
        height: 75,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 12,
        borderBottomWidth: bottom ? 0 : 0.2,
        borderColor: colors.col.PressedIn3,
        marginTop: 10,
        gap: 4,
      }}
      onPress={redirectToUserProfile}
    >
      <View
        style={{
          height: "100%",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            height: 60,
            width: 60,
          }}
        >
          <Image
            source={{ uri: item.user.avatar }}
            style={{ height: "100%", width: "100%", borderRadius: 30 }}
          />
        </View>
        <View style={{ height: "100%", justifyContent: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "pop-reg",
                fontSize: 11,
                color: colors.col.PressedIn3,
                textDecorationLine: "underline",
              }}
            >
              {item.user.userId}
            </Text>
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{
                fontFamily: "pop-b",
                fontSize: 18,
              }}
            >
              {item.user.userName}
            </Text>
          </View>
        </View>
      </View>
      {item.user?._id === admin?._id ? (
        <View
          style={{
            borderRadius: 4,
            paddingHorizontal: 6,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
            height: 30,
            width: 90,
            borderWidth: 0.8,
          }}
        >
          <Text
            style={{
              color: colors.col.Black,
              fontSize: 12,
              fontFamily: "pop-b",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            You
          </Text>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
            height: 30,
            width: 80,
            borderWidth: 0.8,
            borderColor: colors.col.PressedIn3,
            borderRadius: 6,
            // backgroundColor: colors.col.Black,
          }}
        >
          <Pressable onPress={handleRemoveHistory}>
            {removalLoading ? (
              <ActivityIndicator size={18} />
            ) : (
              <Text style={{ fontSize: 14, color: colors.col.Black }}>
                remove
              </Text>
            )}
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};

export default HistoryListItem;

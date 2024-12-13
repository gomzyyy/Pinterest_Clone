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
  import { USER } from "@/types";
  import { AppDispatch, RootState } from "@/Store/store";
  import { handleFollowUnfollowThunk, getAdmin, getUserProfile,getUserProfileAndSetThunk } from "@/Store/Thunk/userThunk";
  import { useRouter } from "expo-router";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  type searchResultListItem = {
    item:USER;
  };
  
  const SearchResultListItem = ({ item }: searchResultListItem) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const admin = useSelector((a: RootState) => a.admin.admin);
    const [removeLoading, setRemoveLoading] = useState<boolean>(false);
    const [actionLoading, setActionLoading] = useState<boolean>(false);
  
    const checkIfFollowed = (): boolean => {
      if (!admin) return false;
      if (!item) return false;
      const adminFollowingIds = admin.following.map((f: any) => String(f._id));
  
      const isAlreadyFollowed = adminFollowingIds.includes(item._id);
      return isAlreadyFollowed;
    };
  
    const handlefollowbtn = async () => {
      try {
        setActionLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setActionLoading(false);
          router.replace("/components/ErrorPages/sessionExpired");
          return;
        }
        // console.log(item?._id);
        const data = {
          token,
          isUnfollowedId: checkIfFollowed() ? item._id : undefined,
          isFollowedId: !checkIfFollowed() ? item._id : undefined,
        };
        const res = await dispatch(handleFollowUnfollowThunk(data)).unwrap();
        if (res.success) {
          setActionLoading(false);
          await dispatch(getAdmin(token));
        }
        setActionLoading(false);
        return;
      } catch (error) {
        setActionLoading(false);
        // console.log(error);
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
        const userId = item?._id.trim();
        const data = {
          token,
          userId,
        };
        if(item?._id===admin?._id){
          const res = await dispatch(getAdmin(token)).unwrap();
          if (res.success) {
            router.push("/components/Profile/adminProfile")
            return;
          } else {
            return;
          }
        }else{
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
          paddingHorizontal: 16,
          borderBottomWidth: 0.2,
          marginTop: 20,
          // width:"50%",
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
              source={{ uri: item.avatar }}
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
                {item.userId}
              </Text>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text
                style={{
                  fontFamily: "pop-b",
                  fontSize: 18,
                }}
              >
                {item.userName}
              </Text>
            </View>
          </View>
        </View>
        {item?._id === admin?._id ? (
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
              borderRadius: 4,
              paddingHorizontal: 6,
              backgroundColor: checkIfFollowed()
                ? colors.col.Black
                : colors.col.tabActiveBlue,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 5,
              height: 30,
              width: 90,
            }}
          >
            <Pressable onPress={handlefollowbtn}>
              {actionLoading ? (
                <View>
                  <ActivityIndicator color={colors.col.white} />
                </View>
              ) : (
                <Text
                  style={{
                    color: colors.col.white,
                    fontSize: 12,
                    fontFamily: "pop-b",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  {checkIfFollowed() ? "unfollow" : "follow"}
                </Text>
              )}
            </Pressable>
          </View>
        )}
      </Pressable>
    );
  };
  
  export default SearchResultListItem;
  
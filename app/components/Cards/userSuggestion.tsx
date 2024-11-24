import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { USER } from "@/types";
import { colors } from "@/constants/Colors";
import Octicons from "@expo/vector-icons/Octicons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import {
  getAdmin,
  handleFollowUnfollowThunk,
  getSuggestionsThunk,
} from "@/Store/Thunk/userThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type userSuggestionCard = {
  user: USER;
};

const imageDimentions = 75;

const UserSuggestionCard = ({ user }: userSuggestionCard) => {
  const s: USER | undefined = user;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const a: USER | undefined = useSelector((d: RootState) => d.admin.admin);
  const fUfLoading = useSelector((f: RootState) => f.followUnfollow.loading);
  const handleNewUsers = (): boolean => {
    if (
      new Date(s?.createdAt).getTime() >
      Date.now() - 2 * 24 * 60 * 60 * 1000
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getSuggestedUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const data = {
        token,
      };
      await dispatch(getSuggestionsThunk(data)).unwrap();
      return;
    } catch (error) {
      // console.log(error);
      return;
    }
  };

  const handleFollowedByAdmin = (): boolean => {
    if(!a) return false;
    if(!s) return false;
    if (Array.isArray(s.followers)) {
      return (s.followers as string[])
      .some((f)=>{
        return f === a._id
      })
    }

    return false;
  };
  const handleFollowedByUser = (): boolean => {
    if (!a || !s) return false;

    if (Array.isArray(a.followers)) {
      return a.followers.some((f) => {
        if (typeof f === "string") {
          return f === s._id;
        }
        return f._id === s._id;
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
        isFollowedId: handleFollowedByAdmin() ? undefined : s?._id,
        isUnfollowedId: handleFollowedByAdmin() ? s?._id : undefined,
      };
      // console.log(data)
      const res = await dispatch(handleFollowUnfollowThunk(data)).unwrap();
      console.log(res)
      if (res.success) {
        getSuggestedUsers();
        await dispatch(getAdmin(token));
      }
      return;
    } catch (error) {
      // console.log(error);
      return;
    }
  };

  return (
    <View
      style={{
        height: 220,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      {handleNewUsers() && (
        <View
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            borderRadius: 4,
            backgroundColor: colors.col.tabActiveBlue,
            paddingTop: 2,
            paddingHorizontal: 4,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: colors.col.white,
              fontFamily: "pop-b",
            }}
          >
            New
          </Text>
        </View>
      )}
      <Pressable
        style={{
          height: imageDimentions,
          width: imageDimentions,
          marginTop: 10,
        }}
      >
        <Image
          source={{ uri: s?.avatar }}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: imageDimentions / 2,
            overflow: "hidden",
          }}
        />
      </Pressable>

      <View style={{ marginTop: 3, gap: 6 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 22, paddingVertical: 4 }}
          >
            {s?.userName}
          </Text>
          {s?.verified && (
            <View>
              <Octicons name="verified" size={15} color={colors.col.Black} />
            </View>
          )}
        </View>
        <Text style={{ textAlign: "center" }}>
          {s?.posts.length} Post{s?.posts.length > 1 ? "s" : ""}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text>{s?.followers.length} Followers</Text>
          </View>
          <Text style={{ paddingBottom: 3 }}>.</Text>
          <View>
            <Text>{s?.following.length} Following</Text>
          </View>
        </View>
        <Text style={{ textAlign: "center" }}>
          {followedByUser ? "follows you*" : ""}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 4,
          paddingHorizontal: 6,
          backgroundColor: handleFollowedByAdmin() ? colors.col.Black : colors.col.link,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
          height: 30,
          width: 90,
        }}
      >
        <Pressable onPress={handleFollowUnfollowbtn}>
          {fUfLoading ? (
            <ActivityIndicator color={colors.col.white} size={14} />
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
              {handleFollowedByAdmin() ? "Unfollow" : "Follow"}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default UserSuggestionCard;

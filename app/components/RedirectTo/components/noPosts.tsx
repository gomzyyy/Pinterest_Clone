import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants/Colors-Urzyatin";
import UserSuggestionCard from "../../Cards/userSuggestion";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSuggestionsThunk } from "@/Store/Thunk/userThunk";
import UrlOpener from "./urlOpener";

const NoPosts = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const admin = useSelector((a: RootState) => a.admin.admin);
  const suggestedUsers = useSelector(
    (a: RootState) => a.getSuggestions.response.data.suggestedUsers
  );
  const suggestionsLoading = useSelector(
    (a: RootState) => a.getAllUsers.loading
  );

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
      const res = await dispatch(getSuggestionsThunk(data)).unwrap();
      return res;
    } catch (error) {
      // console.log(error);
      return;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      async () => {
        await getSuggestedUsers();
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {admin && admin.followers.length > 0 && admin?.following.length > 0 ? (
        <Text
          style={{ textAlign: "center", fontFamily: "pop-b", marginBottom: 10 }}
        >
          No new posts by your friends.
        </Text>
      ) : (
        <Text
          style={{ textAlign: "center", fontFamily: "pop-b", marginBottom: 10 }}
        >
          Find new friends or follow the suggested users.
        </Text>
      )}
      <View
        style={{
          height: 400,
          width: 300,
          borderRadius: 12,
          borderColor: colors.col.PressedIn2,
          borderWidth: 1,
          alignItems: "center",
        }}
      >
        {suggestedUsers && suggestedUsers.length > 0 && (
          <Text
            style={{ textAlign: "center", fontFamily: "pop-b", marginTop: 20 }}
          >
            Follow people to see their posts.
          </Text>
        )}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {suggestionsLoading ? (
            <View style={{ marginBottom: 50 }}>
              <ActivityIndicator size={40} color={colors.col.Black} />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                width: "100%",
                paddingVertical: 20,
                paddingHorizontal: suggestedUsers?.length===1?48:35,
                height: 300,
                marginTop: 30,
              }}
            >
              {suggestedUsers?.length !== 0 ? (
                <FlatList
                  data={suggestedUsers}
                  horizontal
                  style={{ flex: 1, gap: 16 }}
                  keyExtractor={(e) => e._id}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <UserSuggestionCard user={item} />
                  )}
                  ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 30,
                    marginTop: 50,
                  }}
                >
                  <Text style={{ fontSize: 15, fontFamily: "pop-b" }}>
                    {admin &&
                    admin.followers.length > 0 &&
                    admin?.following.length > 0
                      ? "Find new friends to see their posts."
                      : "No suggestions found, you can find new friends by searching them."}
                  </Text>
                  <Pressable
                    style={{ marginBottom: 110 }}
                    onPress={() => router.push("/(tabs)/Find")}
                  >
                    <View
                      style={{
                        height: 40,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                        backgroundColor: colors.col.Black,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      <AntDesign
                        style={{ alignSelf: "center" }}
                        name="search1"
                        size={22}
                        color={colors.col.white}
                      />
                      <Text
                        style={{
                          color: colors.col.white,
                          fontFamily: "pop-reg",
                          fontSize: 14,
                        }}
                      >
                        search
                      </Text>
                    </View>
                  </Pressable>
                </View>
              )}
            </View>
          )}
        </View>
        <View style={{ marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ textAlign: "center" }}>Please read our </Text>

          <UrlOpener
            title="terms & conditions."
            url="https://www.youtube.com/watch?v=6mFEYtdh-DM&ab_channel=AndTV"
            textStyle={{ color: colors.col.link }}
          />
        </View>
      </View>
    </View>
  );
};
export default NoPosts;

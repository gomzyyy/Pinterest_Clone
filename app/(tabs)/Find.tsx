import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { imageData } from "@/constants/data";
import { userController, messages } from "@/constants/GlobalConstants";
import { useRouter } from "expo-router";
import STATE from "@/ContextAPI";
import Header from "../components/header";
import { getTrendingPostsThunk } from "@/Store/Thunk/postThunk";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch, RootState } from "@/Store/store";
import {
  getAdminHistoryThunk,
  getSearchResultThunk,
} from "@/Store/Thunk/userThunk";
import { POST, USER } from "@/types";
import AdminPost from "../components/Profile/components/adminPost";
import SearchResultListItem from "../components/findPageComponents/components/searchResultListItem";
import { getHistorystate } from "@/Store/Slices/state";
import HistoryList from "../components/findPageComponents/historyList";

export default function Find() {
  const searchQueryRes = useSelector(
    (s: RootState) => s.searchQuery.response.data.result
  );
  const resultType = useSelector(
    (t: RootState) => t.searchQuery.response.data.type
  );
  const token = useSelector((s: RootState) => s.state.token);
  const adminUserHistory = useSelector(
    (s: RootState) => s.state.user.history.users
  );
  const adminTagsHistory = useSelector(
    (s: RootState) => s.state.user.history.tags
  );
  const dispatch = useDispatch<AppDispatch>();
  const logout = userController.logoutUser;
  const router = useRouter();
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<USER[] | POST[] | undefined>(
    []
  );
  const [searchBarActive, setSearchBarActive] = useState<boolean>(false);
  const setSearchBarStatusToActive = () => setSearchBarActive(true);
  const setSearchBarStatusToInActive = () => setSearchBarActive(false);
  const checkForUserType = (item: any): item is USER => item;
  const checkForPostType = (item: any): item is POST => item;

  const userData: USER[] =
    Array.isArray(searchQueryRes) &&
    searchQueryRes.every((i) => checkForUserType(i))
      ? searchQueryRes
      : [];
  const postData: POST[] =
    Array.isArray(searchQueryRes) &&
    searchQueryRes.every((i) => checkForPostType(i))
      ? searchQueryRes
      : [];

  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);
 

  const getTrendingPosts = async () => {
    try {
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const res = await dispatch(getTrendingPostsThunk({ token })).unwrap();
      if (res.success) {
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleSearchQuery = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/ErrorPages/sessionExpired");
        return;
      }
      const data = {
        token,
        query: searchText,
      };
      const res = await dispatch(getSearchResultThunk(data)).unwrap();
      if (res.success) {
        setSearchResult(searchQueryRes);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getSearchHistory = async () => {
    try {
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const res = await dispatch(getAdminHistoryThunk(token)).unwrap();
      if (res.success) {
        dispatch(getHistorystate({ users: res.history.users }));
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    if (searchText.trim() !== "") {
      handleSearchQuery();
    } else {
      setSearchResult([]);
    }
  }, [searchText]);

  const clearBtn = () => setSearchText("");
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          alignItems: "center",
          paddingVertical: 10,
          height: 80,
          gap: 2,
          borderBottomWidth: searchBarActive ? 1 : 0,
          borderBottomColor: searchBarActive ? colors.col.PressedIn3 : "",
          backgroundColor: searchBarActive ? "" : colors.col.PressedIn,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={colors.col.PressedIn5}
          />
        </Pressable>
        <TextInput
          placeholder="search"
          style={{
            height: 50,
            width: searchText.trim().length !== 0 ? "80%" : "88%",
            paddingHorizontal: 10,
            fontSize: 20,
            backgroundColor: searchBarActive ? "" : colors.col.PressedIn5,
            borderRadius: 10,
            marginLeft: 4,
          }}
          onFocus={getSearchHistory}
          onBlur={setSearchBarStatusToInActive}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== "" && (
          <TouchableOpacity
            onPress={clearBtn}
            style={{
              height: 32,
              width: 32,
              borderRadius: 16,
              backgroundColor: colors.col.PressedIn5,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 4,
            }}
          >
            <MaterialIcons
              name="clear"
              size={24}
              color={colors.col.PressedIn4}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 1,paddingHorizontal:6 }}>
        {searchResult?.length === 0 ? (
          adminTagsHistory.length === 0 && adminUserHistory.length === 0 ? (
            <Text
              style={{
                alignSelf: "center",
                fontFamily: "pop-mid",
                marginTop: 50,
                fontSize: 16,
              }}
            >
              {searchResult.length === 0 && searchText.trim() !== ""
                ? "No result found"
                : "Results will appear here!"}
            </Text>
          ) : (
            <HistoryList />
          )
        ) : userData.length !== 0 ? (
          <View style={{ flex: 1 }}>
            <FlatList
              data={userData}
              keyExtractor={(i) => i._id}
              // numColumns={2}
              renderItem={({ item }) => (
                <>
                  <Pressable>
                    <SearchResultListItem item={item} />
                  </Pressable>
                </>
              )}
            />
          </View>
        ) : (
          <FlatList
            data={postData}
            keyExtractor={(i) => i._id}
            numColumns={2}
            renderItem={({ item, index }) => (
              <>
                <Pressable>
                  <AdminPost
                    i={item}
                    a={item.admin}
                    lastPostMargin={postData.length - 1 === index ? 20 : 0}
                  />
                </Pressable>
              </>
            )}
          />
        )}
      </View>
    </View>
  );
}

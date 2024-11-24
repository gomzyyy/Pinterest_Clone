import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Image,
  ToastAndroid,
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
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch, RootState } from "@/Store/store";
import { getSearchResultThunk } from "@/Store/Thunk/userThunk";
import { POST, USER } from "@/types";
import FriendListItemFollowing from "../components/Profile/components/FriendListItem/friendsListItemFollowing";
import AdminPost from "../components/Profile/components/adminPost";

export default function Find() {
  const searchQueryRes = useSelector(
    (s: RootState) => s.searchQuery.response.data.result
  );
  const resultType = useSelector(
    (t: RootState) => t.searchQuery.response.data.type
  );
  const dispatch = useDispatch<AppDispatch>();
  const logout = userController.logoutUser;
  const { loginFalse, loginTrue } = useContext(STATE);
  const router = useRouter();
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<USER[] | POST[] | undefined>(
    []
  );
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

  // const getSearchResult = (t: string) => {
  //   let searchoptions;
  //   let result: string[] = [];
  //   imageData.forEach((f) => {
  //     f.images.forEach((i) => {
  //       searchoptions = i.tags;
  //       searchoptions.forEach((s) => {
  //         if (s.trim().toLocaleLowerCase().includes(t.trim().toLowerCase())) {
  //           if (!result.includes(i.image)) {
  //             result.push(i.image);
  //           }
  //         }
  //       });
  //     });
  //   });
  //   setSearchResult(result);
  // };

  const handleSearchQuery = async (query: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/ErrorPages/sessionExpired");
        return;
      }
      const data = {
        token,
        query,
      };
      const res = await dispatch(getSearchResultThunk(data)).unwrap();
      if (res.success) {
        setSearchResult(searchQueryRes);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  // useEffect(() => {
  //   if (searchText !== "") {
  //     getSearchResult(searchText);
  //   } else {
  //     setSearchResult([]);
  //   }
  // }, [searchText]);

  const clearBtn = () => setSearchText("");
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          alignItems: "center",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.col.PressedIn3,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={colors.col.Black}
            style={{ width: 30 }}
          />
        </Pressable>
        <TextInput
          placeholder="search"
          style={{
            alignSelf: "flex-start",
            height: 60,
            width: "80%",
            paddingHorizontal: 20,
            fontSize: 25,
          }}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== "" && (
          <Pressable onPress={clearBtn}>
            <MaterialIcons name="clear" size={28} color="black" />
          </Pressable>
        )}
      </View>
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        {searchResult?.length === 0 ? (
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
        ) : userData.length !== 0 ? (
          <FlatList
            data={userData}
            keyExtractor={(i) => i._id}
            numColumns={2}
            renderItem={({ item }) => (
              <>
                <Pressable>
                  <FriendListItemFollowing item={item} />
                </Pressable>
              </>
            )}
          />
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

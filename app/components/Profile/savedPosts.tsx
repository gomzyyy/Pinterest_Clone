import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Pressable,
  ToastAndroid,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { userController, messages } from "@/constants/GlobalConstants";
import { useRouter } from "expo-router";
import { RootState, AppDispatch } from "@/Store/store";
import { imageData } from "../../../constants/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { POST, USER } from "@/types";
import { UseDispatch, useSelector } from "react-redux";
import AdminPost from "./components/adminPost";
import Header from "../header";

export default function AdminPosts() {
  const router = useRouter();
  const logout = userController.logoutUser;
  const state = useSelector((s: RootState) => s.admin);
  const b = state.bookmarks;

  const handleBookmarkType = () => {
    if (!b) {
      setPosts([]);
      return;
    }
    if (Array.isArray(b) && b.every((i) => typeof i === "object")) {
      const c: POST[] = b;
      setPosts(c);
    } else {
      setPosts([]);
    }
  };

  const [posts, setPosts] = useState<POST[]>([]);
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [filtercount, setFiltercount] = useState<number>(6);
  const [collectionName, setCollectionName] = useState<string>("");
  const [tags, setTags] = useState<boolean>(false);
  const [adminPosts, setAdminPosts] = useState<POST[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
      } catch (error) {}
    };
    getPosts();
  }, [refresh]);

  // useEffect(()=>{
  //   setInterval(()=>setRefreshAtInterval(r=>!r), refreshInterval)
  //   getPosts();
  // },[refreshAtInterval])

  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);

  const AdminPostPage = (): React.JSX.Element => {
    return (
      <>
        <View style={{ flex: 1, alignItems: "center" }}>
          {loading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "pop-b",
                  fontSize: 20,
                  position: "relative",
                  bottom: 80,
                }}
              >
                Loading...
              </Text>
            </View>
          ) : posts.length > 0 ? (
            <FlatList
              data={posts}
              keyExtractor={(r) => r._id}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <AdminPost
                  i={item}
                  a={item.admin}
                  lastPostMargin={index === adminPosts.length - 1 ? 10 : 0}
                />
              )}
            />
          ) : (
            <View
            style={{flex:1, alignItems:'center', justifyContent:'center'}}
            >
              <Text
              style={{marginBottom:140, fontSize:16, fontFamily:'pop-b'}}
              >Saved posts will be shown here!</Text>
            </View>
          )}
        </View>
      </>
    );
  };

  const ErrorPage = () => {
    return (
      <>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontFamily: "pop-b", fontSize: 16 }}>
            Error occured while fetching data.
          </Text>
          <Button title="Refresh" onPress={() => setRefresh((e) => !e)} />
        </View>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header headerText="Saved Posts" backButton>
        <Ionicons
          name="arrow-back-outline"
          size={28}
          color={colors.col.white}
        />
      </Header>

      {error ? <ErrorPage /> : <AdminPostPage />}
    </View>
  );
}

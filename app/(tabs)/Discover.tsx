import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Pressable,
  ToastAndroid,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { userController, IP_ADDRESS as ip } from "@/constants/GlobalConstants";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
// import { imageData } from "../../constants/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllPostsThunk } from "@/Store/Thunk/postThunk";
import { POST, USER } from "@/types";
import ImageDiscovery from "../components/postImage/image_Discovery";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import Header from "../components/header";
import NoPosts from "../components/RedirectTo/components/noPosts";
import { getSuggestionsThunk } from "@/Store/Thunk/userThunk";
import Index from "..";

export default function Discover() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [tags, setTags] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const admin: USER | undefined = useSelector((a: RootState) => a.state.admin);
  const loading = useSelector((g: RootState) => g.getAllPosts.loading);
  const posts = useSelector((s: RootState) => s.state.post.feedPosts);
  console.log(posts)

  const DiscoverPage = (): React.JSX.Element => {
    return (
      <>
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            data={posts}
            keyExtractor={(r) => r._id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            windowSize={5}
            renderItem={({ item, index }) => (
              <ImageDiscovery i={item} a={item.admin} margin={0} />
            )}
          />
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
      <Header headerText="Home" showLoading={loading} />
      {error ? (
        <ErrorPage />
      ) : posts && admin?.following.length !== 0 && posts.length !== 0 ? (
        <DiscoverPage />
      ) : (
        <NoPosts />
      )}
    </View>
  );
}

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

export default function Discover() {
  const router = useRouter();
  const logout = userController.logoutUser;

  const [updatedPosts, setUpdatedPosts] = useState<string[]>([]);
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [filtercount, setFiltercount] = useState<number>(6);
  const [collectionName, setCollectionName] = useState<string>("");
  const [tags, setTags] = useState<boolean>(false);
  const [result, setResult] = useState<POST[] | []>([]);
  const [error, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showPosts, setShowPosts] = useState<boolean>()
  const postActionLoading = useSelector(
    (f: RootState) => f.postActions.loading
  );
  const adminLoading = useSelector((a: RootState) => a.admin.loading);
  const admin: USER | undefined = useSelector((a: RootState) => a.admin.admin);
  const loading = useSelector((g: RootState) => g.getAllPosts.loading);
  const data = useSelector((a: RootState) => a.getAllUsers.response.data);
  const dispatch = useDispatch<AppDispatch>();

  const getPosts = async () => {
    try {
      setError(false);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      const data = {
        token,
      };
      const res = await dispatch(getAllPostsThunk(data)).unwrap();
      if (res.success) {
        // console.log(res.posts)
        setResult(res.posts);
        return;
      } else {
        setReturnMessage(res.message);
        return;
      }
    } catch (error) {
      // console.log(error);
      setError(true);
      return;
    }
  };
  const getSuggestedUsers = async () => {
    try {
      setError(false);
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
      setError(true);
      return;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!admin) {
        router.replace("/components/GetStarted/GetStarted");
        return;
      }
      if (admin?.following.length !== 0) {
        getPosts();
      }
      if (result.length === 0) {
        getSuggestedUsers();
      }
    }, []
  )
  );

  useEffect(() => {
    if (!admin) {
      router.replace("/components/GetStarted/GetStarted");
      return;
    }
    if (admin?.following.length !== 0) {
      getPosts();
    } else {
      getSuggestedUsers();
    }
  }, [refresh]);

  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);

  const DiscoverPage = (): React.JSX.Element => {
    return (
      <>
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            data={result}
            keyExtractor={(r) => r._id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            windowSize={5}
            renderItem={({ item, index }) => (
              <ImageDiscovery
                i={item}
                a={item.admin}
                margin={index === result.length - 1 ? 0 : 0}
              />
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
      ) : admin?.following.length !== 0 && result.length !== 0 ? (
        <DiscoverPage />
      ) : (
        <NoPosts />
      )}
    </View>
  );
}

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
import { imageData } from "../../constants/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { POST } from "@/types";
import ImageDiscovery from "../components/postImage/image_Discovery";

const baseUrlGetPosts = `http://192.168.1.64:6600/api/user/get-posts`;
const baseUrlUser = `http://192.168.1.64:6600/api/user/`;

export default function Discover() {
  const router = useRouter();
  const logout = userController.logoutUser;

  const [updatedPosts, setUpdatedPosts] = useState<string[]>([]);
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [filtercount, setFiltercount] = useState<number>(6);
  const [collectionName, setCollectionName] = useState<string>("");
  const [tags, setTags] = useState<boolean>(false);
  const [result, setResult] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        setError(false);
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          const getPostsAPI = await fetch(baseUrlGetPosts, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const res = await getPostsAPI.json();
          setLoading(false);
          if (res.success) {
            setReturnMessage(`Welcome!`);
            setResult(() => [...res.data.reverse()]);
            if (error) setError(false);
            return null;
          } else {
            setReturnMessage(res.message);
          }
        } else {
          setReturnMessage("No token found!");
          return null;
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
        return null;
      }
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

  const DiscoverPage = (): React.JSX.Element => {
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
          ) : (
            <FlatList
              data={result}
              keyExtractor={(r) => r._id}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ImageDiscovery
                  i={item}
                  a={item.admin}
                  margin={index === result.length - 1 ? 10 : 0}
                />
              )}
            />
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          paddingTop: 35,
          backgroundColor:colors.col.PressedIn,
          height: 100,
          position: "relative",
          borderBottomColor:colors.col.PressedIn,
          borderBottomWidth:1.2
        }}
      >
        <AntDesign name="find" size={28} color={colors.col.white} />
        <Text style={{ fontSize: 24, color: colors.col.white }}>Discover</Text>
      </View>
      {error ? <ErrorPage /> : <DiscoverPage />}
    </View>
  );
}

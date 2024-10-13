import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Pressable,
  ToastAndroid,
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

const baseUrlGetPosts = `http://192.168.1.64:6600/api/user/get-posts`;
const baseUrlUser = `http://192.168.1.64:6600/api/user/`;

export default function Discover() {
  const router = useRouter();
  const logout = userController.logoutUser;

  const [discoverFilters, setDiscoverFilters] = useState<string[]>([]);
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [filtercount, setFiltercount] = useState<number>(6);
  const [collectionName, setCollectionName] = useState<string>("");
  const [tags, setTags] = useState<boolean>(false);
  const [result, setResult] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogOut = async () => {
    console.log("working");
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setReturnMessage("unauthorised action!");
        return null;
      }
      const signoutAPI = await fetch(baseUrlUser + "logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!signoutAPI) {
        throw new Error("Server error!");
      }
      const res = await signoutAPI.json();

      if (res.success) {
        await AsyncStorage.removeItem("token");
        router.replace("/components/GetStarted/GetStarted");
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        console.log("requested");
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          const getPostsAPI = await fetch(baseUrlGetPosts, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("requested");
          const res = await getPostsAPI.json();
          setLoading(false);
          if (res.success) {
            setResult((r: any) => [...res.data]);
            setReturnMessage(`Data served!`);
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
        setLoading(false);
        return null;
      }
    };
    getPosts();
  }, []);
  console.log(result);

  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          paddingTop: 35,
          backgroundColor: colors.col.tabActiveGreen,
          height: 100,
          position: "relative",
        }}
      >
        <AntDesign name="find" size={28} color={colors.col.white} />
        <Text style={{ fontSize: 24, color: colors.col.white }}>Discover</Text>
        <Pressable
          onPress={handleLogOut}
          style={{ position: "absolute", right: 25, bottom: 17 }}
        >
          <Ionicons name="exit-outline" size={26} color="white" />
        </Pressable>
      </View>
      {/* <View>

        <Text>
          Refresh
        </Text>
      </View> */}
      <View style={{ flex: 1, alignItems: "center" }}>
        <FlatList
          data={result}
          keyExtractor={(r) => r._id}
          numColumns={2}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.image }}
              style={{
                width: 160,
                height: 160,
                margin: 5,
                borderRadius: 10,
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

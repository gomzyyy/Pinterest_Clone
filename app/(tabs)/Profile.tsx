import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  ToastAndroid,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER } from "../../types";

const baseUrl = `http://192.168.1.64:6600/api/`;
export default function Menu(): React.JSX.Element {
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [admin, setAdmin] = useState<USER | null>();
  const [error, setError] = useState<"pending" | "success" | "failed" | "">("");

  const profleImageSkeleton =
    "https://www.hrnk.org/wp-content/uploads/2024/08/Placeholder-Profile-Image.jpg";

  const getAdmin = async () => {
    try {
      setLoading(true);
      setError("pending");
      const token = await AsyncStorage.getItem("token");
      if (!token || token === null) {
        return setReturnMessage("Token not found");
      }
      const getAdmin = await fetch(
        `http://192.168.1.64:6600/api/user/profile/get-user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await getAdmin.json();
      console.log(response.admin);
      if (response.success) {
        setAdmin(response.admin);
        setLoading(false);
        setError("success");
      } else {
        setLoading(false);
        setError("failed");
        return setReturnMessage(response.message);
      }
    } catch (error) {
      setLoading(false);
      setError("failed");
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    getAdmin();
  }, [refresh]);
  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);

  const handleRefresh = () => {
    setRefresh(!refresh);
    setError("");
  };

  console.log(admin)

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          paddingTop: 35,
          backgroundColor: colors.col.tabActiveBlue,
          height: 100,
        }}
      >
        <FontAwesome name="user-circle-o" size={24} color={colors.col.white} />
        <Text style={{ fontSize: 24, color: colors.col.white }}>Profile</Text>
        <View style={{ position: "absolute", right: 25, bottom: 17 }}>
          <Ionicons name="exit-outline" size={26} color={colors.col.white} />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        {error === "success" && (
          <View
            style={{
              height: 110,
              borderBottomColor: colors.col.PressedIn,
              borderBottomWidth: 0.8,
              paddingHorizontal: 6,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                overflow:'hidden'
              }}
            >
              <Image
                source={{
                  uri: admin && admin.avatar.trim()!==""? admin.avatar : profleImageSkeleton,
                }}
                style={{height:'100%'}}
              />
            </View>
            <View>
              {/* profile name and id  */}
              <View></View>
              <View></View>
            </View>
          </View>
        )}

        {error === "failed" && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Button title="Refresh" onPress={handleRefresh} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

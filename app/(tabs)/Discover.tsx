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
import { discoverFilters, imageData } from "../../constants/data";

export default function Discover() {
  const router = useRouter();
  const logout = userController.logoutUser;

  const [returnMessage, setReturnMessage] = useState<string>("");
  const [filtercount, setFiltercount] = useState<number>(6);

  const handleFilterCount = () => setFiltercount((p) => p + 1);

  const handleLogOut = async () => {
    const userRes = await logout();
    setReturnMessage(messages.user.returnMessage);
    if (userRes) {
      router.replace("/components/AuthPage/SignIn/SignIn");
    } else {
      setReturnMessage("Error occured while logging out!");
    }
  };

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
          backgroundColor: colors.col.tabActive,
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
      <View>
        <FlatList
          data={discoverFilters.slice(0, filtercount)}
          keyExtractor={(item) => item.name}
          numColumns={3}
          style={{ padding: 5 }}
          renderItem={(item) => (
            <>
              {filtercount === item.index + 1 ? (
                <Pressable
                  style={{
                    margin: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    backgroundColor: "colors.col.filterCol",
                    borderRadius: 10,
                    width: 80,
                  }}
                  onPress={handleFilterCount}
                >
                  <Ionicons name="add-circle-outline" size={28} color="black" />
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    flex: 1,
                    margin: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 15,
                    backgroundColor: colors.col.filterCol,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: colors.col.Black, fontSize: 20 }}>
                    {item.item.name}
                  </Text>
                </Pressable>
              )}
            </>
          )}
        />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={imageData}
          keyExtractor={(item) => item.collection}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                margin: 5,
                borderRadius: 20,
                backgroundColor: colors.col.filterCol,
                overflow: "hidden",
                alignItems: "center",
              }}
            >
              
                <Text style={{fontSize:20, marginVertical:8, fontFamily:'pop-b'}}>
                  {item.collection}
                </Text>
              
              <FlatList
                data={item.images.slice(0,4) || []}
                keyExtractor={(image) => image.image}
                numColumns={2}
                renderItem={({ item, index }) => (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: index % 2 === 0 && 200 || index % 3 === 0 && 140 || 120,
                      height: index % 2 === 0 && 150 || index % 3 === 0 && 150 || 180,
                      margin: 5,
                      borderRadius: 10,
                    }}
                  />
                )}
              />
              <Pressable>
              <Text style={{fontSize:20, marginVertical:8, fontFamily:'pop-b', textDecorationLine:'underline'}}>
                  More
                </Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
}

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

const baseUrlGet = `http://192.168.1.64:6600/api/user/get/`;
const baseUrlUser = `http://192.168.1.64:6600/api/user/`;

export default function Discover() {
  const router = useRouter();
  const logout = userController.logoutUser;

  const [discoverFilters, setDiscoverFilters] = useState<string[]>([]);
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [filtercount, setFiltercount] = useState<number>(6);
  const [collectionName, setCollectionName] = useState<string>("");
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const [filterResult, setFilterResult] = useState<string[] | null>([]);

  const handleFilterCount = () => setFiltercount((p) => p + 1);

  const handleLogOut = async () => {
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
      console.log(res);

      if (res.success) {
        console.log("called");
        await AsyncStorage.removeItem("token");
        router.replace('/components/GetStarted/GetStarted')
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("token");
  //       if (!token) {
  //         return setReturnMessage("no token found!, Can't load data!");
  //       }
  //       const loginEndPt = await fetch(baseUrlGet + "post-categories", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const res = await loginEndPt.json();
  //       setDiscoverFilters(res.data ? res.data : []);
  //       console.log(discoverFilters);
  //       if (!res.status) {
  //         setReturnMessage(res.message);
  //         return null;
  //       }
  //       return null;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getCategories();
  // }, []);

  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);

  const handleSuggestedFilter = (f: string) => {
    setFilterApplied(true);
    let data: string[] = [];
    imageData.forEach((i) => {
      const c: string = i.collection;
      if (c.trim().toLocaleLowerCase().includes(f.trim().toLowerCase())) {
        setCollectionName(c);
        i.images.forEach((i) => {
          if (!data.includes(i.image)) {
            data.push(i.image);
          }
        });
      }
    });
    let searchoptions;
    imageData.forEach((a) => {
      a.images.forEach((i) => {
        searchoptions = i.tags;
        searchoptions.forEach((s) => {
          if (s.trim().toLowerCase().includes(f.trim().toLowerCase())) {
            if (!data.includes(i.image)) {
              console.log(i.image);
              data.push(i.image);
            }
          }
        });
      });
    });
    console.log(data);
    setFilterResult(data);
    if (data.length === 0) {
      setFilterResult(null);
    }

    return null;
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

      {/* filters */}

      {/* <View>
        <FlatList
          data={discoverFilters.slice(0, filtercount)}
          keyExtractor={(item) => item}
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
                    paddingHorizontal: 8,
                    backgroundColor: colors.col.filterCol,
                    borderRadius: 10,
                  }}
                  onPress={() => handleSuggestedFilter(item.item)}
                >
                  <Text style={{ color: colors.col.Black, fontSize: 16 }}>
                    {item.item}
                  </Text>
                </Pressable>
              )}
            </>
          )}
        />
      </View> */}

      {/* render data according to the filter */}

      {/* <View style={{ flex: 1 }}>
        {filterResult !== null && filterResult.length !== 0 ? (
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
            <Pressable
              style={{
                position: "absolute",
                left: 20,
                top: 14,
              }}
              onPress={() => setFilterApplied(false)}
            >
              <Ionicons name="chevron-back" size={22} color={colors.col.Black} />
            </Pressable>
            <Text
              style={{
                fontSize: 20,
                marginVertical: 8,
                fontFamily: "pop-b",
              }}
            >
              {collectionName}
            </Text>
            <FlatList
              data={filterResult}
              keyExtractor={(i) => i}
              numColumns={2}
              renderItem={({ item }) => (
                <>
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 160,
                      height: 160,
                      margin: 5,
                      borderRadius: 10,
                    }}
                  />
                </>
              )}
            />
          </View>
        ) : (
          <Text>No pins available for this category</Text>
        )} */}

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
            <Text
              style={{
                fontSize: 20,
                marginVertical: 8,
                fontFamily: "pop-b",
              }}
            >
              {item.collection}
            </Text>

            <FlatList
              data={item.images.slice(0, 4) || []}
              keyExtractor={(image) => image.image}
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
            <Pressable>
              <Text
                style={{
                  fontSize: 20,
                  marginVertical: 8,
                  fontFamily: "pop-b",
                  textDecorationLine: "underline",
                }}
              >
                More
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
    // </View>
  );
}

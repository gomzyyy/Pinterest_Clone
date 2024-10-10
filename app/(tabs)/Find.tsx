import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Image,
  ToastAndroid
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

export default function Find() {
  const logout = userController.logoutUser;
  const {loginFalse, loginTrue} = useContext(STATE)
  const router = useRouter();
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const handleLogOut = async () => {
    const userRes = await logout();
    setReturnMessage(messages.user.returnMessage);
    if (userRes) {
      loginFalse()
      router.replace("/components/AuthPage/SignIn/SignIn");
    } else {
      setReturnMessage("Error occured while logging out!");
    }
  };

  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);

  const getSearchResult = (t: string) => {
    let searchoptions;
    let result: string[] = [];
    imageData.forEach((f) => {
      f.images.forEach((i) => {
        searchoptions = i.tags;
        searchoptions.forEach((s) => {
          if (s.trim().toLocaleLowerCase().includes(t.trim().toLowerCase())) {
            if (!result.includes(i.image)) {
              result.push(i.image);
            }
          }
        });
      });
    });
    setSearchResult(result);
  };
  useEffect(() => {
    if (searchText !== "") {
      getSearchResult(searchText);
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
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          paddingTop: 35,
          backgroundColor: colors.col.tabActivePink,
          height: 100,
        }}
      >
        <Feather name="search" size={28} color={colors.col.white} />
        <Text style={{ fontSize: 24, color: colors.col.white }}>Search</Text>
        <Pressable 
        onPress={handleLogOut}
        style={{ position: "absolute", right: 25, bottom: 17 }}>
          <Ionicons name="exit-outline" size={26} color="white" />
        </Pressable>
      </View>
      {/* //search bar */}
      <View>
        <TextInput
          placeholder="search"
          style={{
            alignSelf: "flex-start",
            height: 60,
            width: "86%",
            paddingHorizontal: 20,
            fontSize: 25,
          }}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== "" && (
          <Pressable
            onPress={clearBtn}
            style={{ position: "absolute", right: 20, bottom: 15 }}
          >
            <MaterialIcons name="clear" size={28} color="black" />
          </Pressable>
        )}
      </View>
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        {searchResult.length === 0 ? (
          <Text
            style={{
              alignSelf: "center",
              fontFamily: "pop-mid",
              marginTop: 50,
              fontSize: 16,
            }}
          >
            {searchResult.length===0&&searchText.trim()!==""?"No result found":"Results will appear here!"}
          </Text>
        ) : (
          <FlatList
            data={searchResult}
            keyExtractor={(i) => i}
            numColumns={2}
            renderItem={({ item }) => (
              <>
                <Pressable>
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 160,
                      height: 160,
                      margin: 5,
                      borderRadius: 10,
                    }}
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

import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { imageData } from "@/constants/data";

export default function Find() {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string[]>([]);

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
          backgroundColor: colors.col.tabActive,
          height: 100,
        }}
      >
        <Feather name="search" size={28} color={colors.col.white} />
        <Text style={{ fontSize: 24, color: colors.col.white }}>Search</Text>
        <View style={{ position: "absolute", right: 25, bottom: 17 }}>
          <Ionicons name="exit-outline" size={26} color="white" />
        </View>
      </View>
      {/* //search bar */}
      <View>
        <TextInput
          placeholder="search"
          style={{
            alignSelf: "flex-start",
            height: 60,
            width: "86%",
            paddingHorizontal: 10,
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
            Searches will appear here!
          </Text>
        ) : (
          <FlatList
            data={searchResult}
            keyExtractor={(i) => i}
            numColumns={2}
            renderItem={({ item, index }) => (
              <>
                <Pressable>
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: index % 2 === 0 ? 200 : 120,
                      height: index % 2 === 0 ? 200 : 150,
                      margin: 5,
                      borderRadius: 10,
                    }}
                    alt='Error'
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

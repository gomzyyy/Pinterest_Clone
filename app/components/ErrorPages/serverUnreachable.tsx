import { View, Text, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";

const ServerUnreachable = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ alignItems: "center", gap: 20 }}>
          <Text style={{ fontFamily: "pop-b", fontSize: 20 }}>
            Server unreachable!
          </Text>
          <Pressable
            style={{
              flexDirection: "row",
              backgroundColor: colors.col.Black,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: "auto",
              paddingHorizontal: 10,
              borderRadius: 14,
            }}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color={colors.col.white}
              style={{ width: 30 }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default ServerUnreachable;

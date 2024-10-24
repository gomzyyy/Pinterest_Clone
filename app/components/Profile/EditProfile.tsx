import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/constants/Colors";
import { InitialStateAdmin, USER } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { NavigationContainer } from "@react-navigation/native";
import { useRouter } from "expo-router";

const EditProfile = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          paddingTop: 35,
          backgroundColor: colors.col.PressedIn,
          height: 100,
        }}
      >
        <FontAwesome name="user-circle-o" size={24} color={colors.col.white} />
        <Text style={{ fontSize: 24, color: colors.col.white }}>Profile</Text>
        <View style={{ position: "absolute", right: 25, bottom: 17 }}>
          <Ionicons name="exit-outline" size={26} color={colors.col.white} />
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

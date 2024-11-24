import {
  View,
  Text,
  ActivityIndicator,
  Linking,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { colors } from "@/constants/Colors-Urzyatin";
import UserSuggestionCard from "../../Cards/userSuggestion";
import { Link, useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllUsersThunk } from "@/Store/Thunk/userThunk";

type UrlOpenerProps = {
  url: string;
  title: string;
  textStyle?: {};
};

const UrlOpener = ({
  title,
  url,
  textStyle,
}: UrlOpenerProps): React.JSX.Element => {
  const redirectToUrl = async () => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Can't redirect to this link.");
      }
    } catch (error) {
      console.error("An error occurred while opening the URL:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };
  return (
    <Pressable onPress={redirectToUrl}>
      <Text
        style={[
          textStyle,
          {
            alignItems: "center",
            fontWeight: 600,
            textDecorationLine: "underline",
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default UrlOpener;

import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import GetStarted from "./components/GetStarted/GetStarted";
import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import React, { useContext } from "react";
import STATE from "@/ContextAPI";
const { height, width } = Dimensions.get("window");
import { GlobalState } from "@/ContextAPI";

const Page = () => {
  const context = useContext(STATE);
  if (!context) {
    throw new Error("Error");
  } else {
    const { login } = context;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {login ? <Redirect href={"/(tabs)/Discover"} /> : <GetStarted />}
      </SafeAreaView>
    );
  }
};

export default function Index() {
  useFonts({
    "pop-blk": require("../assets/Fonts/Poppins-Black.ttf"),
    "pop-reg": require("../assets/Fonts/Poppins-Regular.ttf"),
    "pop-b": require("../assets/Fonts/Poppins-Bold.ttf"),
    "pop-b1": require("../assets/Fonts/Poppins-ExtraBold.ttf"),
    "pop-light1": require("../assets/Fonts/Poppins-ExtraLight.ttf"),
    "pop-light": require("../assets/Fonts/Poppins-Light.ttf"),
    "pop-mid": require("../assets/Fonts/Poppins-Medium.ttf"),
    "pop-sem-b": require("../assets/Fonts/Poppins-SemiBold.ttf"),
    "pop-thin": require("../assets/Fonts/Poppins-Thin.ttf"),
  });

  // Whenever the user success changes, the component re-renders
  // useEffect(() => {
  //   setUser(messages.user.success);
  // }, [messages.user.success]);

  return (
    <GlobalState>
      <Page />
    </GlobalState>
  );
}

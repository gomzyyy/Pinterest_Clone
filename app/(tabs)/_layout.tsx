import { Tabs } from "expo-router";
import { colors } from "@/constants/Colors";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import Store from "@/Store/store";

export default function MyTabs() {
  return (
    <Provider store={Store}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="Discover"
          options={{
            title: "Discover",

            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused
                    ? colors.col.PressedIn3
                    : "transparent",
                }}
              >
                <MaterialCommunityIcons
                  name="home-outline"
                  size={30}
                  color={focused ? colors.col.white : colors.col.PressedIn}
                />
              </View>
            ),
            tabBarStyle: iconStyle.tabStyle,
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="Find"
          options={{
            title: "Find",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused
                    ? colors.col.PressedIn3
                    : "transparent",
                }}
              >
                <Feather
                  name="search"
                  size={24}
                  color={focused ? colors.col.white : colors.col.PressedIn}
                />
              </View>
            ),
            tabBarStyle: iconStyle.tabStyle,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tabs.Screen
          name="Create"
          options={{
            title: "Create",

            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused
                    ? colors.col.PressedIn3
                    : "transparent",
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={26}
                  color={focused ? colors.col.white : colors.col.PressedIn}
                />
              </View>
            ),
            tabBarStyle: iconStyle.tabStyle,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused
                    ? colors.col.PressedIn3
                    : "transparent",
                }}
              >
                <FontAwesome
                  name="user-circle-o"
                  size={24}
                  color={focused ? colors.col.white : colors.col.PressedIn}
                />
              </View>
            ),
            tabBarStyle: iconStyle.tabStyle,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
          }}
        />
      </Tabs>
    </Provider>
  );
}

const iconStyle = StyleSheet.create({
  icon: {},
  tabStyle: {
    // position: "absolute",
    // bottom: 15,
    // left: 20,
    // right: 20,
    height: 55,
    // alignSelf: "center",
    // borderRadius: 20,
    // paddingHorizontal: 1,
    // paddingBottom: 1,
    // paddingTop: 1,
    elevation: 10, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderTopWidth: 1,
    borderTopColor: colors.col.PressedIn2,
    // zIndex: 10, // Ensure it overlaps other components
  },
});

import { Tabs } from "expo-router";
import { colors } from "@/constants/Colors";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function MyTabs() {
  return (
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
                backgroundColor: focused ? colors.col.tabActive : "transparent",
                borderRadius: 16,
              }}
            >
              <AntDesign name="find" size={24} color={focused?colors.col.white:colors.col.Black} />
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
                backgroundColor: focused ? colors.col.tabActive : "transparent",
                borderRadius: 16,
              }}
            >
              <Feather name="search" size={24} color={focused?colors.col.white:colors.col.Black}/>
            </View>
          ),
          tabBarStyle: iconStyle.tabStyle,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="Menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? colors.col.tabActive : "transparent",
                borderRadius: 16,
              }}
            >
              <FontAwesome name="user-circle-o" size={24} color={focused?colors.col.white:colors.col.Black} />
            </View>
          ),
          tabBarStyle: iconStyle.tabStyle,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}

const iconStyle = StyleSheet.create({
  icon: {},
  tabStyle: {
    position: "absolute",
    bottom: 15,  
    left: 20,
    right: 20,
    height: 55,
    alignSelf: "center",
    borderRadius: 20,
    paddingHorizontal: 3,
    paddingBottom: 3,
    paddingTop: 3,
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10, // Ensure it overlaps other components
  },
});

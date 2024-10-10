import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from "@/constants/Colors";


export default function Menu() {

  return (
    <View style={{ flex: 1}}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', gap:4, paddingTop: 35, backgroundColor:colors.col.tabActiveBlue, height:100}}>
        <FontAwesome name="user-circle-o" size={24} color={colors.col.white} />
        <Text style={{fontSize:24, color:colors.col.white}}
        >
        Profile
        </Text>
        <View style={{ position: "absolute", right: 25, bottom:17 }}>
        <Ionicons name="exit-outline" size={26} color={colors.col.white} />
        </View>
      </View>
      <ScrollView>
      </ScrollView>
    </View>
  );
}
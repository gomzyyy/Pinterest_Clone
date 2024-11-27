import { View, Text, Image } from "react-native";
import React from "react";
import Header from "../../header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/constants/Colors";

const FullSizeImage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.col.Black }}>
      <Header
        headerText="Image"
          backButton
        headerFillColor={colors.col.Black}
      >
        <Ionicons
          name="arrow-back-outline"
          size={28}
          color={colors.col.white}
        />
      </Header>
      <View>
        <Image />
      </View>
    </View>
  );
};

export default FullSizeImage;

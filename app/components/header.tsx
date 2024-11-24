import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";

interface HEADERPROPS {
  flexDirectionProp?:
    | "row"
    | "column"
    | undefined;
  alignItemsProp?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline";
  justifyContentProp?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  gapProp?: number;
  headerFillColor?: string;
  heightProp?: number;
  opacityProp?: number;
  loading?: boolean;
  disableBackButton?: boolean;
  headerText: string;
  headerTextSize?: number | undefined;
  headerTextColor?: string;
  children?: React.ReactNode;
  backButton?: boolean;
  showLoading?: boolean;
  loadingColor?: string;
  loadingSize?: "large" | "small" | number;
}

const Header = ({
  flexDirectionProp = "row",
  alignItemsProp = "center",
  justifyContentProp = "center",
  gapProp = 4,
  headerFillColor = colors.col.PressedIn,
  disableBackButton = false,
  heightProp = 75,
  opacityProp = 1,
  loading = false,
  headerText,
  headerTextColor = colors.col.white,
  headerTextSize = 26,
  children,
  backButton = false,
  showLoading = false,
  loadingColor = 'white',
  loadingSize = 26,
}: HEADERPROPS): React.JSX.Element => {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: flexDirectionProp,
        alignItems: alignItemsProp,
        justifyContent: justifyContentProp,
        gap: gapProp,
        backgroundColor: headerFillColor,
        height: heightProp,
        opacity: opacityProp,
      }}
    >
      {backButton && (
        <Pressable
          style={{ position: "absolute", left: 20, bottom: "26%" }}
          onPress={() => router.back()}
          disabled={disableBackButton}
        >
          {children}
        </Pressable>
      )}
      <Text style={{ fontSize: headerTextSize, color: headerTextColor }}>
        {headerText}
      </Text>
      {showLoading && (
        <View
        style={{position:'absolute', right:30}}
        >
        <ActivityIndicator color={loadingColor} size={loadingSize} />
        </View>
      )}
    </View>
  );
};

export default Header;

import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  ToastAndroid,
  Alert,
} from "react-native";
import { colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { userController, messages } from "@/constants/GlobalConstants";
import { useRouter } from "expo-router";
import STATE from "@/ContextAPI";
import { requestMediaPermission } from "../../constants/GlobalConstants";
import * as imagePicker from "expo-image-picker";

export default function Create(): React.JSX.Element {
  const logout = userController.logoutUser;
  const router = useRouter();
  const { loginFalse, loginTrue } = useContext(STATE);

  const [returnMessage, setReturnMessage] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");
  const [mediaPermissionGranted, setMediaPermissionGranted] =
    useState<boolean>(false);

  const handleLogOut = async () => {
    const userRes = await logout();
    setReturnMessage(messages.user.returnMessage);
    if (userRes) {
      loginFalse();
      router.replace("/components/AuthPage/SignIn/SignIn");
    } else {
      setReturnMessage("Error occured while logging out!");
    }
  };

  const getImageUri = async () => {
    try {
      await requestMediaPermission(setMediaPermissionGranted);
      if (mediaPermissionGranted) {
        const image = await imagePicker.launchImageLibraryAsync();
        if (image.canceled) {
          return (messages.user.returnMessage = "Action canceled by user");
        } else {
          let imagePath = image.assets[0].uri;
          console.log(imagePath);
          setImageUri(imagePath);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            paddingTop: 35,
            backgroundColor: colors.col.tabActiveYellow,
            height: 100,
          }}
        >
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={colors.col.white}
          />
          <Text style={{ fontSize: 24, color: colors.col.white }}>Create</Text>
          <Pressable
            onPress={handleLogOut}
            style={{ position: "absolute", right: 25, bottom: 17 }}
          >
            <Ionicons name="exit-outline" size={26} color="white" />
          </Pressable>
        </View>
        <Text></Text>
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            fontFamily: "pop-b",
            marginTop: 20,
          }}
        >
          Upload an image or GIF.
        </Text>
        <Pressable
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            width: 60,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
          onPress={getImageUri}
        >
          <Text>Click</Text>
        </Pressable>

        <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
          {imageUri.trim() !== "" && (
            <Pressable
              style={{
                position: "absolute",
                left: 20,
                top: 14,
                zIndex: 999,
              }}
              onPress={() => setImageUri("")}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color={colors.col.Black}
              />
            </Pressable>
          )}
          {imageUri.trim() !== "" ? (
            <Image
              source={{ uri: imageUri }}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <Text
            style={{fontFamily:'pop-mid', fontSize:13}}
            >No Image selected yet!</Text>
          )}
        </View>
      </View>
    </>
  );
}

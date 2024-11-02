import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { userController, messages } from "@/constants/GlobalConstants";
import { useRouter } from "expo-router";
import STATE from "@/ContextAPI";
import { requestMediaPermission } from "../../constants/GlobalConstants";
import * as imagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const baseUrl = "http://192.168.1.64:6600/api/user/";

export default function Create(): React.JSX.Element {
  const logout = userController.logoutUser;
  const router = useRouter();
  const { loginFalse } = useContext(STATE);

  const [returnMessage, setReturnMessage] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [mediaPermissionGranted, setMediaPermissionGranted] =
    useState<boolean>(false);
  const [tags, setTags] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const createPost = async () => {
    try {
      setLoading(true);
      if (
        !imageUri ||
        imageUri.trim() === "" ||
        !title ||
        title.trim() === "" ||
        !tags ||
        tags.trim() === ""
      ) {
        setReturnMessage("All fields are required!");
        setLoading(false);
        return;
      }
      const tagsArray: string[] = tags
        .trim()
        .split("#")
        .filter((t) => t);
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      formData.append("post", {
        uri: imageUri,
        type: "image/jpeg",
        name: "photo.jpg",
      } as any);
      formData.append("title", title);
      formData.append("tags", tagsArray.join(","));
      const createPostAPI = await fetch(
        `http://192.168.1.64:6600/api/user/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const res = await createPostAPI.json();
      if (res.success) {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
        setImageUri("");
        setTitle("");
        setTags("");
        setReturnMessage("");
        setLoading(false);
        return null;
      } else {
        setLoading(false);
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      ToastAndroid.show(
        "An error occurred while creating post.",
        ToastAndroid.SHORT
      );
    }
  };

  const getImageUri = async () => {
    try {
      await requestMediaPermission(setMediaPermissionGranted);
      if (mediaPermissionGranted) {
        const image = await imagePicker.launchImageLibraryAsync();
        if (image.canceled) {
          return null;
        } else {
          let imagePath = image.assets[0].uri;
          setImageUri(imagePath);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={colors.col.white}
          />
          <Text style={{ fontSize: 24, color: colors.col.white }}>Create</Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={styles.instructionText}>
            Choose Image from local file.
          </Text>

          {imageUri.trim() === "" && (
            <Pressable style={styles.imagePicker} onPress={getImageUri}>
              <MaterialIcons name="file-upload" size={36} color="black" />
              <Text style={{ alignSelf: "center", fontSize: 16 }}>
                Click to choose image
              </Text>
            </Pressable>
          )}
          <View style={{ alignItems: "center", marginTop: 10 }}>
            {imageUri.trim() !== "" ? (
              <Image
                source={{ uri: imageUri }}
                style={{
                  height: 250,
                  width: 320,
                  borderRadius: 10,
                  opacity: loading ? 0.4 : 1,
                }}
              />
            ) : (
              <Text style={styles.noImageText}>No Image selected yet!</Text>
            )}
          </View>

          {imageUri.trim() !== "" && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Enter title"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Tags (don't add spaces b/w tags i.e #image#photo)"
                value={tags}
                onChangeText={setTags}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  style={[styles.uploadButton, { flexDirection: "row" }]}
                  onPress={createPost}
                >
                  {!loading && (
                    <AntDesign
                      name="cloudupload"
                      size={20}
                      color={colors.col.Black}
                    />
                  )}
                  <Text>{loading ? "Uploading..." : "Upload"}</Text>
                </Pressable>
                <Pressable
                  style={[styles.clearButton, { flexDirection: "row" }]}
                  onPress={() => setImageUri("")}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color={colors.col.white}
                  />
                  <Text style={{ color: colors.col.white }}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}

          {returnMessage ? (
            <Text style={styles.errorMessage}>{returnMessage}</Text>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  instructionText: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "pop-b",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  imagePicker: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 80,
    height: 160,
    width: 160,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  clearButton: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: "49%",
    backgroundColor: colors.col.dangerRed,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  noImageText: {
    fontFamily: "pop-mid",
    fontSize: 13,
  },
  uploadButton: {
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: "49%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import { colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { userController, messages } from "@/constants/GlobalConstants";
import { useRouter } from "expo-router";
import STATE from "@/ContextAPI";
import { requestMediaPermission } from "../../constants/GlobalConstants";
import * as imagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "http://192.168.1.64:6600/api/user/";

export default function Create(): React.JSX.Element {
  const logout = userController.logoutUser;
  const router = useRouter();
  const { loginFalse } = useContext(STATE);

  const [returnMessage, setReturnMessage] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");
  const [title, setTitle] = useState<string>(""); // Added title state
  const [mediaPermissionGranted, setMediaPermissionGranted] =
    useState<boolean>(false);

  const createPost = async () => {
    try {
      
      if (!imageUri || imageUri.trim() === "" || !title || title.trim() === "") {
        setReturnMessage("All fields are required!");
        return;
      }

      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      console.log(imageUri)
      formData.append("post", {
        uri: imageUri,
        type: "image/jpeg",
        name: "photo.jpg",  
      } as any);
      formData.append("title", title);
      formData.append("tags", JSON.stringify(["arti", "puja"]))
      console.log(formData)
      const createPostAPI = await fetch(`http://192.168.1.64:6600/api/user/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const res = await createPostAPI.json();
      if (res.success) {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
        setImageUri("");
        setTitle(""); // Reset title after submission
        setReturnMessage("");
      } else {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("An error occurred while creating post.", ToastAndroid.SHORT);
    }
  };

  const handleLogOut = async () => {
    const userRes = await logout();
    setReturnMessage(messages.user.returnMessage);
    if (userRes) {
      loginFalse();
      router.replace("/components/AuthPage/SignIn/SignIn");
    } else {
      setReturnMessage("Error occurred while logging out!");
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
        <Ionicons name="add-circle-outline" size={24} color={colors.col.white} />
        <Text style={{ fontSize: 24, color: colors.col.white }}>Create</Text>
        <Pressable
          onPress={handleLogOut}
          style={{ position: "absolute", right: 25, bottom: 17 }}
        >
          <Ionicons name="exit-outline" size={26} color="white" />
        </Pressable>
      </View>

      <Text style={styles.instructionText}>
        Upload an image or GIF and enter a title.
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle} // Update title state on change
      />

      <Pressable
        style={styles.imagePicker}
        onPress={getImageUri}
      >
        <Text>Click to select image</Text>
      </Pressable>

      <View style={{ alignItems: "center", marginTop: 10 }}>
        {imageUri.trim() !== "" ? (
          <>
            <Pressable
              style={styles.clearButton}
              onPress={() => setImageUri("")}
            >
              <Ionicons name="chevron-back" size={22} color={colors.col.Black} />
            </Pressable>
            <Image
              source={{ uri: imageUri }}
              style={{ height: 200, width: 200 }}
            />
          </>
        ) : (
          <Text style={styles.noImageText}>
            No Image selected yet!
          </Text>
        )}
      </View>

      {imageUri.trim() !== "" && (
        <Pressable
          style={styles.uploadButton}
          onPress={createPost}
        >
          <Text>Upload</Text>
        </Pressable>
      )}

      {returnMessage ? (
        <Text style={styles.errorMessage}>{returnMessage}</Text>
      ) : null}
    </View>
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
    borderRadius: 5,
    margin: 20,
  },
  imagePicker: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  clearButton: {
    position: "absolute",
    left: 20,
    top: 14,
    zIndex: 999,
  },
  noImageText: {
    fontFamily: "pop-mid",
    fontSize: 13,
  },
  uploadButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: 80,
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


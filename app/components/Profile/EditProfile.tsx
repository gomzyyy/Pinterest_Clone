import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ToastAndroid,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import React, { useEffect, useRef, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/constants/Colors";
import { USER } from "../../../types";
import { RootState, AppDispatch } from "@/Store/store";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { requestMediaPermission } from "@/constants/GlobalConstants";
import * as imagePicker from "expo-image-picker";
import { useFocusEffect } from "expo-router";
import Header from "../header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAdmin, updateAdmin } from "../../../Store/Thunk/userThunk";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
const refreshInterval = 10000;
const { width, height } = Dimensions.get("window");

// const UserNameCheckIcon = (): React.JSX.Element => {
//   return <></>;
// };

const profleImageSkeleton =
  "https://www.hrnk.org/wp-content/uploads/2024/08/Placeholder-Profile-Image.jpg";
const EditProfile = () => {
  const a = useSelector((e: RootState) => e.admin.admin);
  const updatedAdmin = useSelector((u: RootState) => u.updateAdmin);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const inputUserNameRef = useRef<TextInput>(null);
  // const [a, sa] = useState<USER>();
  const [mediaPermissionGranted, setMediaPermissionGranted] =
    useState<boolean>(false);
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(
    a?.avatar
  );
  const [inputHeight, setInputHeight] = useState<number>(80);
  const [avatarUri, setAvatarUri] = useState<string | undefined>(
    currentAvatar ? currentAvatar : ""
  );
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [avatarEditMode, setAvatarEditMode] = useState<boolean>(false);
  const [adminBookmarks, setAdminBookmarks] = useState<string[]>([]);
  const [adminPosts, setAdminPosts] = useState<string[]>([]);
  const [verifiedOk, setVerifiedOk] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    new Date(Date.now()).toISOString().split("T")[0]
  );
  const [premiumUser, setPremiumUser] = useState<boolean>(false);
  const [privateOk, setPrivateOk] = useState<boolean>(false);
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [dob, setDob] = useState<string | undefined>(
    a?.dateOfBirth
      ? a?.dateOfBirth.toString()
      : selectedDate?.trim() !== ""
      ? selectedDate
      : new Date().toISOString()
  );
  const [bioFieldFocused, setBioFieldFocused] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userNameEditable, setUserNameEditable] = useState<boolean>(false);
  const [postsLength, setPostsLength] = useState<number | string>();
  const [saved, setSaved] = useState<boolean>(true);
  const [bookmarksLength, setBookmarksLength] = useState<number | string>();
  // const [updatedUserName, setUpdatedUserName] = useState<string>("")
  // useFocusEffect(() => {
  //   console.log(dob);
  //   console.log(selectedDate);
  // });

  const getAvatarUri = async () => {
    try {
      await requestMediaPermission(setMediaPermissionGranted);
      if (mediaPermissionGranted) {
        const avatar = await imagePicker.launchImageLibraryAsync();
        if (avatar.canceled) {
          return null;
        } else {
          const newAvatarUri = avatar.assets[0].uri;
          setAvatarUri(newAvatarUri);
          setCurrentAvatar(newAvatarUri);
          setAvatarEditMode(true);
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error picking image:", error);
      return;
    }
  };

  useEffect(() => {
    if (userNameEditable) {
      inputUserNameRef.current?.focus();
    }
  }, [userNameEditable]);

  const handleDob = (event: DateTimePickerEvent, choosedDate?: Date) => {
    if (event.type === "set") {
      let DOB = choosedDate || dob;
      setDob(DOB?.toLocaleString());
      setShowDate(false);
    } else {
      setShowDate(false);
    }
  };
  // useFocusEffect(() =>setBio(a?.bio || ""));

  const editProfile = async () => {
    try {
      setSaved(false);
      if (bioFieldFocused) setBioFieldFocused(false);
      if (userNameEditable) setUserNameEditable(false);
      setAvatarUri(currentAvatar ? currentAvatar : undefined);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return setReturnMessage("Authentication required!");
      }
      const data = {
        avatar: avatarUri?.trim() !== "" ? avatarUri : undefined,
        userName: userName.trim() !== "" ? userName : undefined,
        DateOfBirth: dob?.split(",")[0],
        bio: bio.trim() !== "" ? bio : undefined,
        token,
      };
      // console.log(data.DateOfBirth);
      const res = await dispatch(updateAdmin(data));
      if (updateAdmin.fulfilled.match(res)) {
        const { payload } = res;
        if (payload.success) {
          setSaved(true);
          await dispatch(getAdmin(token));
          // console.log(a?.userName);
          return null;
        } else {
          setSaved(true);
          // console.log("Error: ", payload.error);
          return setReturnMessage(payload.error);
        }
      } else {
        setSaved(true);
        return setReturnMessage("Error occured while updating!");
      }
    } catch (error) {
      setSaved(true);
      console.error("An error occurred:", error);
      return setReturnMessage(
        "An unexpected error occurred. Please try again."
      );
    }
  };
  // console.log(a?.avatar, currentAvatar);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        style={{ flex: 1}}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header
          headerText="Acount center"
          backButton={!updatedAdmin.loading}
          showLoading={updatedAdmin.loading}
        >
           <Ionicons
                name="arrow-back-outline"
                size={28}
                color={colors.col.white}
              />
        </Header>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              height: 150,
              alignItems: "center",
              // backgroundColor:'red'
            }}
          >
            <View style={{ position: "absolute", right: 25, top: 20 }}>
            <Pressable onPress={editProfile}>
              <Text
                style={{
                  fontSize: 24,
                  color: colors.col.PressedIn4,
                  opacity: saved ? 1 : 0.5,
                }}
              >
                Save
              </Text>
            </Pressable>
          </View>
            <Pressable
              style={{ height: 100, width: 100, marginTop: 15 }}
              onPress={getAvatarUri}
            >
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  borderWidth: 3,
                  borderColor: colors.col.PressedIn,
                  borderRadius: 55,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{
                    uri: avatarEditMode ? currentAvatar : a?.avatar,
                  }}
                  style={{ height: "100%" }}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 10,
                  height: 23,
                  width: 23,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  backgroundColor: colors.col.PressedIn,
                }}
              >
                <MaterialCommunityIcons
                  name="image-edit"
                  size={22}
                  color="white"
                />
              </View>
            </Pressable>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Pressable>
                <Text
                  style={{
                    fontFamily: "pop-reg",
                    fontSize: 14,
                    color: colors.col.PressedIn3,
                  }}
                >
                  {a?.userId}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={profileEditStyles.profileOptions}>
            <View>
              <TextInput
                style={[
                  profileEditStyles.profileInput,
                  {
                    color: userNameEditable
                      ? colors.col.Black
                      : colors.col.PressedIn3,
                  },
                ]}
                value={userName}
                placeholder={a?.userName}
                onChangeText={setUserName}
                maxLength={100}
                editable={userNameEditable}
                ref={inputUserNameRef}
                onBlur={() => setUserNameEditable((u) => false)}
              />
            </View>
            <Pressable
              style={profileEditStyles.editIcon}
              onPress={() => setUserNameEditable((u) => !u)}
            >
              {userNameEditable ? (
                <FontAwesome6
                  name="check"
                  size={22}
                  color={colors.col.PressedIn3}
                />
              ) : (
                <MaterialIcons
                  name="edit"
                  size={22}
                  color={colors.col.PressedIn3}
                />
              )}
            </Pressable>
          </View>
          <View style={profileEditStyles.profileOptions}>
            <Text
              style={[
                profileEditStyles.dateText,
                { color: showDate ? colors.col.Black : colors.col.PressedIn3 },
              ]}
            >
              {a?.dateOfBirth ? a?.dateOfBirth.toString() : dob?.split(",")[0]}
            </Text>
            {showDate && (
              <DateTimePickerAndroid
                value={
                  selectedDate ? new Date(selectedDate) : new Date(Date.now())
                }
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={handleDob}
              />
            )}
            <Pressable
              style={profileEditStyles.editIcon}
              onPress={() => setShowDate((d) => !d)}
            >
              <Fontisto name="date" size={20} color={colors.col.PressedIn3} />
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 10,
              height: 200,
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder={
                a?.bio.trim() !== "" ? a?.bio : "Write about yourself here!"
              }
              style={{
                padding: 12,
                fontSize: 12,
                color: colors.col.PressedIn4,
                fontFamily: "pop-mid",
                textAlign: "left",
                height: "100%",
                width: "96%",
                backgroundColor: bioFieldFocused
                  ? colors.col.PressedIn5
                  : "transparent",
                borderRadius: 12,
              }}
              onBlur={() => setBioFieldFocused(false)}
              onFocus={() => setBioFieldFocused(true)}
              placeholderTextColor={colors.col.PressedIn}
              maxLength={300}
              textAlignVertical="top"
              keyboardType="default"
              multiline={true}
              onContentSizeChange={(event) =>
                setInputHeight(event.nativeEvent.contentSize.height)
              }
              value={bio}
              onChangeText={setBio}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const profileEditStyles = StyleSheet.create({
  profileOptions: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.col.PressedIn2,
    width: width,
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    // backgroundColor:'red',
  },
  profileInput: {
    fontFamily: "pop-mid",
    // backgroundColor:'red',
    fontSize: 16,
    width: 280,
  },
  dateText: {
    fontFamily: "pop-mid",
    fontSize: 16,
    marginTop: 5,
  },
  profileOptionsText: {
    fontFamily: "pop-mid",
    fontSize: 16,
    marginTop: 5,
    color: colors.col.PressedIn3,
  },
  editIcon: {
    borderRadius: 18,
    height: 36,
    width: 36,
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
  },
  lengthIcon: {
    minHeight: 20,
    minWidth: 20,
    height: "auto",
    width: "auto",
    padding: 4,
    borderRadius: 8,
    backgroundColor: colors.col.Black,
    alignItems: "center",
    justifyContent: "center",
  },
  profileOptionsTextDark: {
    fontFamily: "pop-mid",
    fontSize: 16,
    marginTop: 5,
    color: colors.col.PressedIn4,
  },
});

export default EditProfile;

// const userNameCheckIcon = () => {
//   if (userNameEditable) {
//     if (userName?.trim() === "" || userName?.trim() === a?.userName) {
//       return <Entypo name="cross" size={24} color="black" />;
//     } else {
//       return ;
//     }
//   } else {
//     return <MaterialIcons name="edit" size={24} color="black" />;
//   }
// };

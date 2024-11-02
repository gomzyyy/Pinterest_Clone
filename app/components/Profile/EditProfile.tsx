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
  Button,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAdmin, updateAdmin } from "../../../Store/Thunk/userThunk";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
const refreshInterval = 10000;
const { width, height } = Dimensions.get("window");

const UserNameCheckIcon = (): React.JSX.Element => {
  return <></>;
};

const profleImageSkeleton =
  "https://www.hrnk.org/wp-content/uploads/2024/08/Placeholder-Profile-Image.jpg";
const EditProfile = () => {
  const { admin } = useSelector((e: RootState) => e.admin);
  const updatedAdmin = useSelector((u: RootState) => u.updateAdmin);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const checkAdmin = (t: any) => {
    if (!Array.isArray(t) || t !== undefined || t !== null) return t;
  };

  useEffect(() => {
    const adminData = checkAdmin(admin);
    sa(adminData);
  }, []);
  const inputUserNameRef = useRef<TextInput>(null);
  const [a, sa] = useState<USER>();
  const [mediaPermissionGranted, setMediaPermissionGranted] =
    useState<boolean>(false);
  const [currentAvatar, setCurrentAvatar] =
    useState<string>(profleImageSkeleton);
    const [inputHeight,setInputHeight] = useState<number>(80)
  const [avatarUri, setAvatarUri] = useState<string>(currentAvatar);
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [avatarEditMode, setAvatarEditMode] = useState<boolean>(false);
  const [adminBookmarks, setAdminBookmarks] = useState<string[]>([]);
  const [adminPosts, setAdminPosts] = useState<string[]>([]);
  const [verifiedOk, setVerifiedOk] = useState<boolean>(false);
  const [premiumUser, setPremiumUser] = useState<boolean>(false);
  const [privateOk, setPrivateOk] = useState<boolean>(false);
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [dob, setDob] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);
  const [bio, setBio] = useState<string>('');
  const [userName, setUserName] = useState<string>("");
  const [userNameEditable, setUserNameEditable] = useState<boolean>(false);
  const [postsLength, setPostsLength] = useState<number | string>();
  const [saved, setSaved] = useState<boolean>(true);
  const [bookmarksLength, setBookmarksLength] = useState<number | string>();
  // const [updatedUserName, setUpdatedUserName] = useState<string>("")

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
      setDob(DOB);
      setShowDate(false);
    } else {
      setShowDate(false);
    }
  };

  // const handleShowDate = () => setShowDate(true);
  const handlePostsCount = (): number | string => {
    if (!a?.posts || a?.posts.length === 0) return 0;
    if (a?.posts.length > 99) return 99 + "+";
    return a?.posts.length;
  };
  const handleBookmarksCount = (): number | string => {
    if (!a?.bookmarks || a?.bookmarks.length === 0) return 0;
    if (a?.bookmarks.length > 99) return 99 + "+";
    return a?.bookmarks.length;
  };

  useEffect(() => {
    const postCount = handlePostsCount();
    const bookmarkCount = handleBookmarksCount();
    setPostsLength(postCount);
    setBookmarksLength(bookmarkCount);
  }, []);

  const editProfile = async () => {
    try {
      setSaved(false);
      setAvatarUri(currentAvatar);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return setReturnMessage("Authentication required!");
      }
      console.log("clicked");
      console.log(avatarUri);
      const data = {
        avatar: avatarUri.trim()!==""?avatarUri: undefined,
        userName:userName.trim()!==""?userName: undefined,
        DateOfBirth: dob.toISOString,
        bio:bio.trim()!==""?bio:undefined,
        token,
      };
      const res = await dispatch(updateAdmin(data));
      if (updateAdmin.fulfilled.match(res)) {
        const { payload } = res;
        console.log(payload);
        if (payload.success) {
          setSaved(true);
          await dispatch(getAdmin(token));
          return null;
        } else {
          setSaved(true);
          console.log("Error: ", payload.error);
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
  console.log(a?.avatar, currentAvatar);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        style={{ flex: 1, opacity: updatedAdmin.loading ? 0.6 : 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
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
          <Pressable
            style={{ position: "absolute", left: 25, bottom: "26%" }}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color={colors.col.white}
            />
          </Pressable>
          <Text style={{ fontSize: 24, color: colors.col.white }}>
            Account center
          </Text>
          <View style={{ position: "absolute", right: 25, bottom: 20 }}>
            {/* <Ionicons name="exit-outline" size={26} color={colors.col.white} /> */}
            <Pressable onPress={editProfile}>
              <Text
                style={{
                  fontSize: 24,
                  color: colors.col.white,
                  opacity: saved ? 1 : 0.5,
                }}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              height: 150,
              alignItems: "center",
              // backgroundColor:'red'
            }}
          >
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
                  @{a?.userId}
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
                onBlur={() => setUserNameEditable((u) => !u)}
              />
            </View>
            <TouchableOpacity
              style={profileEditStyles.editIcon}
              onPress={() => setUserNameEditable((u) => !u)}
            >
              {userNameEditable && userName?.trim() !== "" ? (
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
            </TouchableOpacity>
          </View>
          <View style={profileEditStyles.profileOptions}>
            <Text
              style={[
                profileEditStyles.dateText,
                { color: showDate ? colors.col.Black : colors.col.PressedIn3 },
              ]}
            >
              {dob === new Date() ? "Choose D.O.B" : dob.toLocaleDateString()}
            </Text>
            {showDate && (
              <DateTimePickerAndroid
                value={dob}
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
              height:200,
              borderBottomColor:colors.col.PressedIn2,
              borderBottomWidth:1
            }}
          >
            <TextInput
              placeholder={a?.bio.trim()!==""?undefined:"Describe yourself here!"}
              style={{
                padding: 16,
                fontSize: 14,
                color: colors.col.PressedIn4,
                fontFamily: "pop-mid",
                textAlign:'left',
                height:'100%',
                width:'100%'
              }}
              placeholderTextColor={colors.col.PressedIn}
              maxLength={300}
              keyboardType="default"
              multiline={true}
              onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
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

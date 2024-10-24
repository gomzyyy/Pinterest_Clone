import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "@/constants/Colors";
import { InitialStateAdmin, USER } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { NavigationContainer } from "@react-navigation/native";
import { useRouter } from "expo-router";

const profleImageSkeleton =
  "https://www.hrnk.org/wp-content/uploads/2024/08/Placeholder-Profile-Image.jpg";

const baseUrl = `http://192.168.1.64:6600/api/`;
export default function Menu(): React.JSX.Element {
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [adminData, setAdminData] = useState<USER>();
  const admin: InitialStateAdmin = useSelector((s: RootState) => s.admin);
  const router = useRouter();

  const a: USER | [] = admin.admin;

  const checkAdmin = (t: any) => {
    if (!Array.isArray(t) || t !== undefined || t !== null) return t;
  };

  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);
  useEffect(() => {
    const adm = checkAdmin(a);
    setAdminData(adm);
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
        <FontAwesome name="user-circle-o" size={24} color={colors.col.white} />
        <Text style={{ fontSize: 24, color: colors.col.white }}>Profile</Text>
        {/* <View style={{ position: "absolute", right: 25, bottom: 17 }}>
          <Ionicons name="exit-outline" size={26} color={colors.col.white} />
        </View> */}
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            height: 90,
            paddingHorizontal: 15,
            alignItems: "flex-end",
            flexDirection: "row",
            gap: 17,
          }}
        >
          <View
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              overflow: "hidden",
            }}
          >
            <Image
              source={{
                uri:
                  adminData?.avatar.trim() !== ""
                    ? adminData?.avatar
                    : profleImageSkeleton,
              }}
              style={{ height: "100%" }}
            />
          </View>
          <View
            style={{
              paddingTop: 14,
              height: "100%",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "pop-b1",
                  fontSize: 24,
                  color: colors.col.PressedIn3,
                }}
              >
                {adminData?.userName}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "pop-reg",
                  fontSize: 12,
                  color: colors.col.PressedIn,
                }}
              >
                @{adminData?.userId}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
          style={{paddingHorizontal:10, fontFamily:'pop-b', fontSize:20}}
          >Your account</Text>
          <View style={{ marginTop: 10 }}>
            <Pressable
              style={profileMenuStyles.profileOptions}
              onPress={() =>
                router.push({ pathname: "components/Profile/EditProfile" })
              }
            >
              <Text
              style={profileMenuStyles.profileOptionsText}
              >Account center</Text>
              <AntDesign name="right" size={20} color="black" style={profileMenuStyles.right_icon} />
            </Pressable>
            {/* <Pressable
              style={profileMenuStyles.profileOptions}
              // onPress={() =>
              //   router.push({ pathname: "components/Profile/EditProfile" })
              // }
            >
              <Text
              style={profileMenuStyles.profileOptionsText}
              >View profile</Text>
            </Pressable> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const profileMenuStyles = StyleSheet.create({
  profileOptions: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.col.PressedIn,
    alignItems:'center',
    paddingHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between'
   
  },
  profileOptionsText:{
 fontFamily:'pop-mid',
 fontSize:14,
 marginTop:5
  },
  right_icon:{
  position:'relative',
  }
});

// const getAdmin = async () => {
//   try {
//     setLoading(true);
//     setError("pending");
//     const token = await AsyncStorage.getItem("token");
//     if (!token || token === null) {
//       return setReturnMessage("Token not found");
//     }
//     const getAdmin = await fetch(
//       `http://192.168.1.64:6600/api/user/profile/get-user`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const response = await getAdmin.json();
//     console.log(response.admin);
//     if (response.success) {
//       setAdminInfo(response.admin);
//       setLoading(false);
//       setError("success");
//     } else {
//       setLoading(false);
//       setError("failed");
//       return setReturnMessage(response.message);
//     }
//   } catch (error) {
//     setLoading(false);
//     setError("failed");
//     console.log(error);
//     return error;
//   }
// };

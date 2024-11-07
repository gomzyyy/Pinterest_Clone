import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { colors } from "@/constants/Colors";
import { ArrowForward } from "@/constants/icon";
import { getAdmin } from "@/Store/Thunk/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { redirectToLoginPage } from "@/constants/GlobalConstants";
import { AppDispatch, RootState } from "@/Store/store";
import { InitialStateAdmin } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function GetStartedPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const adminData = useSelector((e: RootState) => e.admin);
  // console.log(admin)
const admin = adminData.admin;
const loading = adminData.loading;
  const [returnMessage, setReturnMessage] = useState<string>("");

  const redirectToLoginPageIfNeeded = async () => {
    setReturnMessage("Authentication required!");
    const userRes = await redirectToLoginPage();
    if (userRes) {
      router.push("/components/AuthPage/SignIn/SignIn");
      return null;
    } else {
      return setReturnMessage("Please login again!");
    }
  };
  // console.log("APP REFRESHED!!!!!!!")

  const handleNextPage = async () => {
    try {
      const token: string | null = await AsyncStorage.getItem("token");
      if (!token) {
        return await redirectToLoginPageIfNeeded();
      }
      const res = await dispatch(getAdmin(token));
      if (getAdmin.fulfilled.match(res)) {
        const { payload } = res;
        if (payload.success) {
          router.push('/(tabs)/Discover');
          return null;
        } else {
          redirectToLoginPageIfNeeded();
          setReturnMessage("Authentication required!");
          return null;
        }
      } else {
        setReturnMessage("Authentication required!");
        const userRes = await redirectToLoginPage();
        if (userRes) {
          router.push("/components/AuthPage/SignIn/SignIn");
          return null;
        } else {
          return setReturnMessage("Please login again!");
        }
      }
    } catch (error) {
      if (error) {
        const userRes = await redirectToLoginPage();
        if (userRes) {
          router.push("/components/AuthPage/SignIn/SignIn");
          return null;
        } else {
          return setReturnMessage("Authentication Required");
        }
      }
    }
  };

  useEffect(() => {
    if (returnMessage !== "") {
      ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
    }
  }, [returnMessage]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: "60%",
          width: width,
          overflow: "hidden",
          alignSelf: "center",
        }}
      >
        <Image
          source={require("../../../assets/Images/img-collage2.jpg")}
          style={{ width: "auto", height: "100%" }}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: -30,
          backgroundColor: colors.col.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontFamily: "pop-b",
              marginTop: "0.5%",
            }}
          >
            Free Stock Images
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              fontFamily: "pop-reg",
              marginTop: "4%",
              paddingHorizontal: 25,
            }}
          >
            Find and download the latest collections of *copyright-free stock
            images that are absolutly free to use.
          </Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 35,
              fontFamily: "pop-reg",
              marginTop: "4%",
            }}
          >
            Get Started!
          </Text>
        </View>
        <Pressable
          onPress={handleNextPage}
          style={{
            backgroundColor: colors.col.Black,
            width: 80,
            height: 80,
            borderRadius: 80 / 2,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: "2%",
          }}
        >
          {loading ? (
            <Text
              style={{
                color: "#ffffff",
                fontSize: 30,
              }}
            >
              . . .
            </Text>
          ) : (
            <ArrowForward d="24" />
          )}
        </Pressable>
      </View>
    </View>
  );
}

// try {
//   setLoading(true);
//   const token = await AsyncStorage.getItem("token");
//   if (token === null) {
//     return;
//   }
//   const checkUser = await fetch(baseUrl + "check-user", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const res = await checkUser.json();
//   if (!res.success) {
//     setReturnMessage(res.message);
//     setLoading(false);
//     const userRes = await redirectToLoginPage();
//     if (userRes) {
//       return router.push("/components/AuthPage/SignIn/SignIn");
//     } else {
//       setReturnMessage('Please login first to get in.')
//       return null;
//     }
//   }
//   setLoading(false);
//   setReturnMessage(res.message);
//   router.replace("/(tabs)/Discover");
//   return res.user;
// } catch (error) {
//   setLoading(false);
//   console.log(error);
//   return null;
// }

import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  Alert,
  ActivityIndicator,
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
import {
  postsAvailabilityState,
  feedPostState,
  setToken,
  setAdmin,
} from "@/Store/Slices/state";
import { getAllPostsThunk } from "@/Store/Thunk/postThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function GetStartedPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const adminData = useSelector((e: RootState) => e.admin);
  const admin = adminData.admin;
  const postsLoading = useSelector((s: RootState) => s.getAllPosts.loading);
  const allPosts = useSelector((s: RootState) => s.getAllPosts.response.posts);
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [serverUnreachbale, setServerUnreachbale] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const redirectToLoginPageIfNeeded = async () => {
    setReturnMessage("Authentication required!");
    const userRes = await redirectToLoginPage();
    if (userRes) {
      router.push("/components/AuthPage/SignIn/SignIn");
      return;
    } else {
      return setReturnMessage("Please login again!");
    }
  };
  const handleNextPage = async () => {
    try {
      setLoading(true);
      const slowNetworkMessage = setTimeout(() => {
        setReturnMessage("Request timeout");
        return;
      }, 10000);
      const networkError = setTimeout(() => {
        setServerUnreachbale(true);
        router.push("/components/ErrorPages/serverUnreachable");
        return;
      }, 14000);
      const token: string | null = await AsyncStorage.getItem("token");
      if (!token) {
        setServerUnreachbale(false);
        clearTimeout(slowNetworkMessage);
        clearTimeout(networkError);
        router.replace("/components/ErrorPages/sessionExpired");
        return;
      }
      dispatch(setToken(token));
      const res = await dispatch(getAdmin(token));

      if (getAdmin.fulfilled.match(res)) {
        const { payload } = res;
        if (payload.success) {
          if (serverUnreachbale) {
            setServerUnreachbale(false);
          }
          dispatch(setAdmin(payload.admin));
          clearTimeout(slowNetworkMessage);
          clearTimeout(networkError);
          if (admin?.followers.length !== 0 && admin?.followers.length !== 0) {
            const postRes = await dispatch(
              getAllPostsThunk({ token })
            ).unwrap();
            // console.log(postRes);
            if (postRes.success) {
              // console.log("bvibvri");
              if (allPosts?.length !== 0) {
                dispatch(postsAvailabilityState(false));
                dispatch(feedPostState(postRes.posts));
              } else {
                // dispatch(feedPostState(postRes.posts));
                dispatch(postsAvailabilityState(true));
              }
            } else {
              // console.log("vibrviu");
              return;
            }
            if (!postsLoading) {
              router.push("/(tabs)/Discover");
            }
          } else {
            return;
          }
          return;
        } else {
          if (!serverUnreachbale) {
            redirectToLoginPageIfNeeded();
            setReturnMessage("Authentication required!");
            return;
          }
          return;
        }
      } else {
        if (!serverUnreachbale) {
          setReturnMessage("Authentication required!");
          const userRes = await redirectToLoginPage();
          if (userRes) {
            router.push("/components/AuthPage/SignIn/SignIn");
            return;
          } else {
            return setReturnMessage("Please login again!");
          }
        }
      }
    } catch (error) {
      if (error) {
        const userRes = await redirectToLoginPage();
        if (userRes && !serverUnreachbale) {
          router.push("/components/AuthPage/SignIn/SignIn");
          return;
        } else {
          router.push("/components/ErrorPages/serverUnreachable");
          return setReturnMessage("Authentication Required");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (returnMessage && returnMessage.trim().length !== 0) {
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
        {loading ? (
          <View style={{ marginTop: 30 }}>
            <ActivityIndicator color={"black"} size={50} />
          </View>
        ) : (
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
            <ArrowForward d="24" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

import { View, Text, Pressable, ToastAndroid } from "react-native";
import React, { ReactNode, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch, RootState } from "@/Store/store";
import { getAdmin } from "@/Store/Thunk/userThunk";

type NavBtn = {
  children?: ReactNode;
  title?: string;
  reverseDirection?: boolean;
};

const SessionExpired = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [serverUnreachbale, setServerUnreachbale] = useState<boolean>(false);

  const handleTryAgainBtn = async () => {
    try {
      router.replace("/components/GetStarted/GetStarted");
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
        router.push("/components/ErrorPages/sessionExpired");
        return;
      }
      const res = await dispatch(getAdmin(token));
      if (getAdmin.fulfilled.match(res)) {
        const { payload } = res;
        if (payload.success) {
          if (serverUnreachbale) {
            setServerUnreachbale(false);
          }
          clearTimeout(slowNetworkMessage);
          clearTimeout(networkError);
          router.push("/(tabs)/Discover");
          return;
        } else {
          if (!serverUnreachbale) {
            setReturnMessage("Authentication required!");
            return;
          }
          return;
        }
      } else {
        if (!serverUnreachbale) {
          setReturnMessage("Authentication required!");
        }
      }
    } catch (error) {
      router.push("/components/ErrorPages/serverUnreachable");
      return;
    }
  };

  useEffect(() => {
    if (returnMessage && returnMessage.trim().length !== 0) {
      ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
    }
  }, [returnMessage]);

  const NavBtn = ({
    children,
    title = "",
    reverseDirection = false,
  }: NavBtn) => {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.col.Black,
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          width: "auto",
          paddingHorizontal: 10,
          borderRadius: 14,
        }}
      >
        {reverseDirection ? (
          <View
            style={{
              backgroundColor: colors.col.Black,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row-reverse",
            }}
          >
            {children}
            {title?.trim().length !== 0 && (
              <Text style={{ color: colors.col.white, fontSize: 16 }}>
                {title}
              </Text>
            )}
          </View>
        ) : (
          <View
            style={{
              backgroundColor: colors.col.Black,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {children}
            {title?.trim().length !== 0 && (
              <Text style={{ color: colors.col.white, fontSize: 16 }}>
                {title}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ gap: 20 }}>
          <Text style={{ fontFamily: "pop-b", fontSize: 20 }}>
            Session expired, Please login again.
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "auto",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <Pressable
              onPress={() =>
                router.replace("/components/GetStarted/GetStarted")
              }
            >
              <NavBtn title="back">
                <Ionicons
                  name="arrow-back-outline"
                  size={22}
                  color={colors.col.white}
                />
              </NavBtn>
            </Pressable>
            <Pressable onPress={handleTryAgainBtn}>
              <NavBtn title="Try again" />
            </Pressable>
            <Pressable
              onPress={() =>
                router.replace("/components/AuthPage/SignIn/SignIn")
              }
            >
              <NavBtn title="login" reverseDirection>
                <Ionicons
                  name="arrow-forward-outline"
                  size={22}
                  color={colors.col.white}
                />
              </NavBtn>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SessionExpired;

import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import { PropsWithChildren } from "react";
import React, { useEffect, useState, useContext } from "react";
import { BackIcon } from "@/constants/icon";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import { messages } from "@/constants/GlobalConstants";
import STATE from "@/ContextAPI";
import { GlobalState } from "@/ContextAPI";
import { IP_ADDRESS as ip } from "@/constants/GlobalConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

type pngIcon = PropsWithChildren<{
  h: number;
  w: number;
}>;

const GoogleLogo = ({ h, w }: pngIcon) => {
  return (
    <Image
      source={require("../../../../assets/Images/google.png")}
      style={{ height: h, width: w }}
    />
  );
};

const SignIn = () => {
  return (
    <GlobalState>
      <SignInFun />
    </GlobalState>
  );
};
const baseUrl = `http://${ip}:6600/api/`;

function SignInFun() {
  const router = useRouter();
  // const loginUser = userController.loginUser;
  const context = useContext(STATE);
  if (!context) {
    throw new Error("error");
  }
  const [errMsgId, setErrMsgId] = useState<string>("");
  const [errMsgPass, setErrMsgPass] = useState<string>("");
  const [hidePass, setHidePass] = useState(true);
  const [idtext, setidtext] = useState<string>("");
  const [passText, setpassText] = useState<string>("");
  const [returnMessage, setReturnMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (returnMessage !== "" || returnMessage !== null)
      return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
  }, [returnMessage]);

  const chectUID = (t: string) => {
    if (t === "") setErrMsgId(messages.error.emptyField);
    else {
      setErrMsgId("");
    }
    return;
  };
  const chectPass = (t: string) => {
    if (t === "") setErrMsgPass(messages.error.emptyField);
    else {
      setErrMsgPass("");
    }
    return;
  };

  useEffect(() => {
    chectUID(idtext);
    chectPass(passText);
    return;
  }, [idtext]);
  useEffect(() => {
    chectPass(passText);
    return;
  }, [passText]);

  const handleSignIn = async () => {
    try {
      if (idtext.trim() === "" || passText.trim() === "") {
        return setReturnMessage("Empty fields are not allowed!");
      }
      setLoading(true);
      const loginEndPt = await fetch(baseUrl + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: idtext,
          password: passText,
        }),
      });
      const res = await loginEndPt.json();
      if (!res.success) {
        setReturnMessage(res.message);
        setLoading(false);
        return null;
      }
      const tokenAvailable = await AsyncStorage.getItem('token');
      if(tokenAvailable!==null){
        await AsyncStorage.removeItem('token');
      }
      await AsyncStorage.setItem("token", res.token);
      setLoading(false);
      setReturnMessage(res.message);
      router.replace("/(tabs)/Discover");
      return null;
    } catch (error) {
      setLoading(false);
      // console.log(error);
      return;
    }
  };

  useEffect(() => {
    if (returnMessage !== "") {
      ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
    }
  }, [returnMessage]);

  return (
    <View
      style={{
        flex: 1,
        padding: "3%",
      }}
    >
      <View
        // navbar
        style={{ paddingHorizontal: "1.5%" }}
      >
        <View
          style={{
            height: 60,
            width: 50,
            marginTop: "6%",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Pressable
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              paddingVertical: "2.5%",
              paddingHorizontal: "3%",
              gap: 5,
              borderRadius: 30,
            }}
            onPress={() => router.back()}
          >
            <BackIcon d="30" />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          marginTop: 40,
        }}
        // Greeting message
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontFamily: "pop-mid",
            paddingHorizontal: 15,
          }}
        >
          Welcome back!
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: 30,
            fontSize: 22,
            fontFamily: "pop-reg",
            paddingHorizontal: 15,
          }}
        >
          Login to continue.
        </Text>
      </View>

      <View style={[loginStyles.getLoginDataContainer, { flex: 1 }]}>
        <View>
          <TextInput
            style={loginStyles.getLoginData}
            placeholder="user ID (i.e:@muffins)"
            value={idtext}
            onChangeText={setidtext}
          />
          <Text style={{ color: "red", paddingLeft: 10 }}>{errMsgId}</Text>
        </View>
        <View style={{ position: "relative" }}>
          <TextInput
            style={loginStyles.getLoginData}
            placeholder="password"
            value={passText}
            secureTextEntry={hidePass}
            onChangeText={setpassText}
          />
          <Pressable
            style={{ position: "absolute", right: 10, top: 16 }}
            onPress={() => setHidePass(!hidePass)}
          >
            <Text style={{ fontSize: 13, fontFamily: "pop-b" }}>
              {hidePass ? "Show" : "Hide"}
            </Text>
          </Pressable>
          <Text style={{ color: "red", paddingLeft: 10 }}>{errMsgPass}</Text>
        </View>
        <View
          //login buttons
          style={{ marginTop: 30, gap: 8 }}
        >
          <Pressable style={loginStyles.loginBtn} onPress={handleSignIn}>
            <Text style={loginStyles.loginBtnText}>
              {loading ? "loading..." : "Login"}
            </Text>
          </Pressable>
          <Text
            style={{ alignSelf: "center", fontFamily: "pop-reg", fontSize: 17 }}
          >
            Or
          </Text>
          <Pressable
            style={[loginStyles.loginBtn, { gap: 8, flexDirection: "row" }]}
            disabled={true}
          >
            <Text style={loginStyles.loginBtnText}>Login with</Text>
            <GoogleLogo h={22} w={22} />
          </Pressable>
          <Text
            style={{
              alignSelf: "center",
              fontFamily: "pop-mid",
              fontSize: 12,
            }}
          >
            doesn't have any account?
          </Text>
          <Pressable
            style={loginStyles.signUpButton}
            onPress={() => router.replace("/components/AuthPage/SignUp/SignUp")}
          >
            <Text style={loginStyles.signUpBtnText}>create a new account.</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  getLoginDataContainer: {
    padding: 15,
    gap: 10,
    marginTop: 20,
  },
  getLoginData: {
    borderWidth: 1,
    borderColor: colors.col.Black,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 18,
  },
  loginBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.col.Black,
    borderRadius: 12,
    fontSize: 18,
    height: 50,
  },
  loginBtnText: {
    color: colors.col.white,
    fontSize: 17,
  },
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    height: 50,
    borderWidth: 2,
    borderColor: colors.col.Black,
  },
  signUpBtnText: {
    color: colors.col.Black,
    fontSize: 18,
  },
});

export default SignIn;

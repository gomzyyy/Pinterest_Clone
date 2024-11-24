import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useNavigation } from "expo-router";
import { colors } from "@/constants/Colors";
import { BackIcon } from "@/constants/icon";
import { IP_ADDRESS as ip } from "@/constants/GlobalConstants";
import { PropsWithChildren } from "react";
import { messages, requestMediaPermission } from "@/constants/GlobalConstants";
import * as ImagePicker from "expo-image-picker";

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
type bodyType = {
  userName: string;
  userId: string;
  password: string;
  confirmPassword: string;
};

const baseUrl = `http://${ip}:6600/api/`;

export default function SignUp() {
  const router = useRouter();

  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [errMsgId, setErrMsgId] = useState("");
  const [errMsgUserName, setErrMsgUserName] = useState("");
  const [errMsgPass, setErrMsgPass] = useState("");
  const [errMsgConfirmPass, setErrMsgConfirmPass] = useState("");
  const [idtext, setidtext] = useState("");
  const [userNametext, setUserNameText] = useState("");
  const [passText, setpassText] = useState("");
  const [confirmPassText, setConfirmPassText] = useState("");
  const [returnMessage, setReturnMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [mediaPermissionGranted, setMediaPermissionGranted] =
    useState<boolean>(false);

  const SignUpBackend = async () => {
    try {
      if (
        userNametext.trim() !== "" &&
        idtext.trim() !== "" &&
        passText.trim() !== "" &&
        confirmPassText.trim() !== ""
      ) {
        setLoading(true);
        const signupAPI = await fetch(baseUrl + "signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userNametext,
            userId: idtext,
            password: passText,
            confirmPassword: confirmPassText,
          }),
        });
        const res = await signupAPI.json();
        setLoading(false);
        setReturnMessage(res.message);
        if (res.success) {
          router.replace("/components/AuthPage/SignIn/SignIn");
        }
      } else {
        setReturnMessage("Entries missing!");
      }
    } catch (error) {
      setLoading(false);
      setReturnMessage("Error occured while creating account.");
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    if (returnMessage !== "") {
      ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
    }
  }, [returnMessage]);

  const checkUserName = (t: string) => {
    if (t.trim() === "") setErrMsgUserName(messages.error.emptyField);
    else {
      setErrMsgUserName("");
    }
    return;
  };
  useEffect(() => {
    checkUserName(userNametext);
    return;
  }, [userNametext]);

  const checkUID = (t: string) => {
    if (t.trim() === "") setErrMsgId(messages.error.emptyField);
    else {
      setErrMsgId("");
    }
    return;
  };
  useEffect(() => {
    checkUID(idtext);
    return;
  }, [idtext]);

  const checkPass = (t: string) => {
    if (t.trim() === "") setErrMsgPass(messages.error.emptyField);
    else {
      setErrMsgPass("");
    }
    return;
  };
  useEffect(() => {
    checkPass(passText);
    return;
  }, [passText]);
  const checkConfirmPass = (t: string) => {
    if (t.trim() === "") setErrMsgConfirmPass(messages.error.emptyField);
    else {
      setErrMsgConfirmPass("");
    }
    return;
  };
  useEffect(() => {
    checkConfirmPass(confirmPassText);
    return;
  }, [confirmPassText]);

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
            marginTop: "4%",
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
          marginTop: 10,
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
          Become a user!
        </Text>
      </View>

      <View style={[loginStyles.getLoginDataContainer, { flex: 1 }]}>
        <View>
          <TextInput
            style={loginStyles.getLoginData}
            placeholder="username"
            onChangeText={setUserNameText}
          />
          <Text style={{ color: "red", paddingLeft: 10 }}>
            {errMsgUserName}
          </Text>
        </View>

        <View>
          <TextInput
            style={loginStyles.getLoginData}
            placeholder="userID"
            onChangeText={setidtext}
          />
          <Text style={{ color: "red", paddingLeft: 10 }}>{errMsgId}</Text>
        </View>

        <View>
          <TextInput
            style={loginStyles.getLoginData}
            placeholder="password"
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
        <View>
          <TextInput
            style={loginStyles.getLoginData}
            placeholder="confirm password"
            secureTextEntry={hideConfirmPass}
            onChangeText={setConfirmPassText}
          />
          <Pressable
            style={{ position: "absolute", right: 10, top: 16 }}
            onPress={() => setHideConfirmPass(!hideConfirmPass)}
          >
            <Text style={{ fontSize: 13, fontFamily: "pop-b" }}>
              {hideConfirmPass ? "Show" : "Hide"}
            </Text>
          </Pressable>
          <Text style={{ color: "red", paddingLeft: 10 }}>
            {errMsgConfirmPass}
          </Text>
        </View>
        <View
          //login buttons
          style={{ marginTop: 30, gap: 10 }}
        >
          <Pressable style={loginStyles.loginBtn} onPress={SignUpBackend}>
            <Text style={loginStyles.loginBtnText}>
              {loading ? "loading..." : "Signup"}
            </Text>
          </Pressable>
          <Text
            style={{ alignSelf: "center", fontFamily: "pop-mid", fontSize: 16 }}
          >
            Or
          </Text>
          <Pressable
            style={[loginStyles.loginBtn, { gap: 8, flexDirection: "row" }]}
          >
            <Text style={loginStyles.loginBtnText}>Signup with</Text>
            <GoogleLogo h={22} w={22} />
          </Pressable>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontFamily: "pop-mid", fontSize: 12, gap: 8 }}>
            already a user?
          </Text>
          <Pressable
            onPress={() => router.replace("/components/AuthPage/SignIn/SignIn")}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                color: colors.col.link,
                fontFamily: "pop-mid",
                fontSize: 12,
              }}
            >
              login.
            </Text>
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
    marginTop: 10,
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
});

// const handleSignIn = async () => {
//   const NewUser = {
//     userName: userNametext,
//     userID: idtext,
//     password: passText,
//     confirmPassword: confirmPassText,
//   };
//   const userRes = await signUpUser(NewUser);
//   setReturnMessage(messages.user.returnMessage);
//   if (userRes) {
//     const success = await userCreatedSuccessPopUp();
//     if (success) {
//       router.replace("/components/AuthPage/SignIn/SignIn");
//     }
//   }
//   return null;
// };
// useEffect(() => {
//   if (returnMessage !== "" || returnMessage !== null)
//     return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
// }, [returnMessage]);

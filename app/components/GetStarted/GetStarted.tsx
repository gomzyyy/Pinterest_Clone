import { View, Text, Image, Dimensions, Pressable } from "react-native";
import { useRouter } from "expo-router";
import React,{useState} from "react";
import { colors } from "@/constants/Colors";
import { ArrowForward } from "@/constants/icon";

const { width } = Dimensions.get("window");



export default function GetStarted() {
  const router = useRouter();

  const [pressed, setPressed] = useState(false);
  const pressedIn = () => setPressed(true);
  const pressedOut = () => setPressed(false);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: "55%",
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
              marginTop: "3%",
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
              marginTop: "7%",
            }}
          >
            Get Started!
          </Text>
        </View>
        <Pressable
          onPress={() => router.push('/components/AuthPage/SignIn/SignIn')}
          style={{
            backgroundColor: pressed?colors.col.PressedIn2:colors.col.Black,
            width: 80,
            height: 80,
            borderRadius: 80 / 2,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop:"5%"
          }}
          onPressIn={pressedIn}
          onPressOut={pressedOut}
        >
          <ArrowForward d="24" />
        </Pressable>
      </View>
    </View>
  );
}

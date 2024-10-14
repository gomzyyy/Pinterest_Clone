import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { USER, POST } from "../../../types";
import { colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ImageEl {
  i: POST;
  a: USER;
}

const ImageDiscovery = ({ i, a }: ImageEl) => {
  const profleImageSkeleton =
    "https://www.hrnk.org/wp-content/uploads/2024/08/Placeholder-Profile-Image.jpg";
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setdisliked] = useState<boolean>(false);

  const handleLikeBtn = () => {
    if (!liked) {
      setLiked(true);
      if (disliked) {
        setdisliked(false);
      }
    } else {
      setLiked(false);
    }
  };
  const handleDislikeBtn = () => {
    if (!disliked) {
      setdisliked(true);
      if (liked) {
        setLiked(false);
      }
    } else setdisliked(false);
  };

  return (
    <View
      style={{
        height: 400,
        width: 320,
        paddingHorizontal: 10,
        marginTop: 20,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: colors.col.PressedIn2,
      }}
    >
      <View
        style={{
          height: 60,
          paddingHorizontal: 5,
          flexDirection: "row",
        }}
      >
        {/* profile */}
        <View style={{}}>
          <Image
            source={{
              uri: a.avatar.trim() !== "" ? a.avatar : profleImageSkeleton,
            }}
            style={{
              height: 38,
              width: 38,
              borderRadius: 19,
              backgroundColor: colors.col.white,
            }}
          />
        </View>
        <View>
          <View>
            {/* profile ID and name */}
            <View>
              <Text>{a.userName}</Text>
            </View>
            <View>
              <Text>@{a.userId}</Text>
            </View>
          </View>
          <View>
            <Text>{i.title}</Text>
          </View>
        </View>
      </View>
      <Image
        source={{ uri: i.image }}
        style={{
          flex: 1,
          margin: 5,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          height: 50,
          paddingHorizontal: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
            onPress={handleLikeBtn}
          >
            <AntDesign
              name="like1"
              size={21}
              color={liked ? colors.col.tabActivePink : colors.col.Black}
            />
            <Text style={{ fontSize: 16, fontFamily: "pop-mid", marginTop: 4 }}>
              {i.likes.length}
            </Text>
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
            onPress={handleDislikeBtn}
          >
            <AntDesign
              name="dislike1"
              size={21}
              color={disliked ? colors.col.dangerRed : colors.col.Black}
            />
            <Text style={{ fontSize: 16, fontFamily: "pop-mid", marginTop: 4 }}>
              {i.dislikes.length}
            </Text>
          </Pressable>
        </View>
        <Pressable>
          <Text style={{ fontSize: 18 }}>comment({i.comments.length})</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default ImageDiscovery;

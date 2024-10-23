import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { USER, POST } from "../../../types";
import { colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { profleImageSkeleton } from "@/constants/data";

interface ImageEl {
  i: POST;
  a: USER;
  margin:number;
}
const Description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos molestias dolor dolores saepe dolorum quisquam vitae blanditiis perferendis amet, quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum.quis sequi atque officiis fuga, eos, porro adipisci! Suscipit, voluptas laborum`;

const ImageDiscovery = ({ i, a, margin }: ImageEl) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [fullImage, setFullImage] = useState<boolean>(false);
  const [adminView, setAdminView] = useState<boolean>(false);

  const handleLikeBtn = () => {
    if (!liked) {
      setLiked(true);
      // if (disliked) {
      //   setdisliked(false);
      // }
    } else {
      setLiked(false);
    }
  };
  // const handleDislikeBtn = () => {
  //   if (!disliked) {
  //     setdisliked(true);
  //     if (liked) {
  //       setLiked(false);
  //     }
  //   } else setdisliked(false);
  // };
 const handleImageDimentions = () =>setFullImage(i=>!i)
  const toggleImageNprofile = () => setAdminView((a) => !a);

  return (
    <View
      style={{
        height: 405,
        width: 310,
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 0.8,
        marginBottom:margin,
        borderColor: colors.col.PressedIn3,
      }}
    >
      <Pressable
        style={{
          height: 360,
          width: 300,
        }}
        onPress={handleImageDimentions}
      >
        {!adminView ? (
          <Image
            source={{ uri: i.image }}
            style={{
              flex: 1,
              marginTop: 15,
              borderRadius: 20,
              borderWidth: 0.8,
              borderColor: colors.col.PressedIn2,
              objectFit:fullImage?'contain':'cover'
            }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              marginTop: 15,
              borderRadius: 20,
              // borderWidth: 0.8,
              // borderColor: colors.col.PressedIn2,
              overflow: "hidden",
            }}
          >
            <Pressable
              style={{
                position: "absolute",
                zIndex: 9999,
                right: 10,
                top: 10,
              }}
            >
              <MaterialIcons name="report" size={20} color="black" />
            </Pressable>
            <View
              style={{
                height: "100%",
                width: "100%",
                paddingHorizontal: 5,
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: 25 }}>
                <Image
                  source={{
                    uri:
                      a.avatar.trim() !== ""? a.avatar : profleImageSkeleton,
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    backgroundColor: colors.col.white,
                  }}
                />
              </View>
              <View>
                <View
                  style={{
                    marginTop: 20,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 200,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: colors.col.Black,
                          fontSize: 16,
                          fontFamily: "pop-b",
                        }}
                      >
                        {a.userName}
                      </Text>
                    </View>

                    <Pressable>
                      <Text
                        style={{
                          color: colors.col.PressedIn,
                          fontSize: 12,
                          fontFamily: "pop-reg",
                          textDecorationLine: "underline",
                          position: "relative",
                          zIndex: 9999,
                        }}
                      >
                        @{a.userId}
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{ alignSelf: "center", marginTop: 5, flexShrink: 1 }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                    numberOfLines={1}
                  >
                    "{i.title}"
                  </Text>
                </View>
                <View
                  style={{
                    height: 130,
                    borderRadius: 20,
                    borderWidth: 0.8,
                    borderColor: colors.col.PressedIn2,
                    marginTop: 10,
                    width: 290,
                    padding: 8,
                  }}
                >
                  <Text style={{ alignSelf: "center", fontSize: 16 }}>
                    Description.
                  </Text>
                  <View style={{ flex: 1, marginTop: 10 }}>
                    {i.description.trim() !== "" ? (
                      <Text
                        style={{ alignSelf: "center" }}
                        textBreakStrategy="highQuality"
                      >
                        {i.description}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          alignSelf: "center",
                          color: colors.col.PressedIn2,
                          marginTop: 10,
                        }}
                      >
                        No description provided by the admin.
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </Pressable>
      <View
        style={{
          height: 45,
          width: "100%",
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
          {liked ? (
            <AntDesign
              name="heart"
              size={24}
              color={colors.col.tabActivePink}
            />
          ) : (
            <AntDesign name="hearto" size={24} color={colors.col.PressedIn3} />
          )}
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="comment-alt"
            size={26}
            color={colors.col.PressedIn3}
          />
          <Text
            style={{
              fontSize: 13,
              position: "absolute",
              alignSelf: "center",
              top: 5,
              color: colors.col.PressedIn,
            }}
          >
            {i.comments.length}
          </Text>
        </Pressable>
        <Pressable
          onPress={toggleImageNprofile}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {adminView ? (
            <Ionicons name="close" size={26} color={colors.col.PressedIn3} />
          ) : (
            <MaterialIcons
              name="more-horiz"
              size={26}
              color={colors.col.PressedIn3}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};
export default ImageDiscovery;

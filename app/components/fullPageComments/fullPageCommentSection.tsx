import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Header from "../header";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppDispatch, RootState } from "@/Store/store";
import { commentType, POST } from "@/types";
import FullPageComment from "./components/fullPageComment";
import UploadComment from "../postImage/components/uploadComment";
import { colors } from "@/constants/Colors";

const FullPageCommentSection = () => {
  const p: POST | undefined = useSelector(
    (s: RootState) => s.state.post.postById
  );
  const loading = useSelector((s: RootState) => s.getPostById.loading);
  const c: commentType[] | undefined = [...(p?.comments??[])].reverse();

  const NoComments = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: "pop-reg", fontSize: 16 }}>No Comments</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        headerText={
          p
            ? p.title.trim().length > 25
              ? p.title.trim().slice(0, 22).trim() + "..."
              : p.title.trim()
            : "comment"
        }
        backButton={!loading}
        showLoading={loading}
      >
        <Ionicons
          name="arrow-back-outline"
          size={28}
          color={colors.col.white}
        />
      </Header>
      <View
      style={{ flex: 1,paddingHorizontal:5 }}
      >
        {c?.length === 0 ? (
          <NoComments />
        ) : (
          <View
            style={{
              paddingHorizontal: 10,
              flex: 1,
              marginTop: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius:10,
              backgroundColor: colors.col.PressedIn5,
            }}
          >
            <FlatList
              data={c}
              keyExtractor={(c: commentType) =>
                c._id ?? Math.random().toString()
              }
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <>
                  <FullPageComment c={item} />
                  {/* ads logic */}
                  {/* {index !== 0 && index % 6 === 0 && (
                <View
                style={{borderRadius:16,borderWidth:1,height:100}}
                >
                  
                </View>
              )} */}
                </>
              )}
            />
          </View>
        )}
        <UploadComment i={p} disable={loading} />
      </View>
    </View>
  );
};

export default FullPageCommentSection;

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
import { AppDispatch, RootState } from "@/Store/store";
import { commentType,POST } from "@/types";
import FullPageComment from "./components/fullPageComment";

const FullPageCommentSection = () => {
const p:POST|undefined=useSelector((s:RootState)=>s.state.post.postById)
const c:commentType[]|undefined=p?.comments
  // console.log(p)
  return (
    <View style={{ flex: 1 }}>
      <Header headerText="Comment"></Header>
      <View
      style={{paddingHorizontal:10,height:"75%", marginTop:10,borderRadius:20 }}
      >
        <FlatList
          data={c}
          keyExtractor={(c: commentType) => c._id ?? Math.random().toString()}
          renderItem={({ item, index }) => <FullPageComment c={item} />}
        />
      </View>
    </View>
  );
};

export default FullPageCommentSection;

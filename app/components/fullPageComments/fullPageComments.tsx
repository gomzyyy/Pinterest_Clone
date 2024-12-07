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
import React from "react";
import Header from "../header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { commentType } from "@/types";

const FullPageComments = () => {
  const c: commentType[] | undefined = useSelector(
    (s: RootState) => s.state.post.allComments
  );
  return (
    <View style={{ flex: 1 }}>
      <Header headerText="Comment"></Header>
    </View>
  );
};

export default FullPageComments;

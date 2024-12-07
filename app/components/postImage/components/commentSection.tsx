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
import { debounce } from "lodash";
import React, { useState } from "react";
import { colors } from "@/constants/Colors";
import { commentType, POST } from "@/types";
import Comment from "./comment";

type commentSectionType = {
  i: POST | undefined;
};

const CommentSection = ({ i }: commentSectionType) => {
  const c = i?.comments;
  const [commentsCount, setCommentsCount] = useState<number>(
    i?.comments ? i.comments.length : 0
  );
  const [comment, setComment] = useState<string>("");
  const [commentSectionOpened, setCommmentSectionOpened] =
    useState<boolean>(false);
  const [commentOverflow, setCommmentOverflow] = useState<boolean>(false);

  const handleCommentLength = () => {
    if (comment.length > 60) {
      setCommmentOverflow(true);
      return null;
    } else {
      setCommmentOverflow(false);
      return null;
    }
  };
  const debouncedHandleCommentLength = React.useCallback(
    debounce(() => handleCommentLength(), 300),
    [comment]
  );
  return (
    <Pressable style={{ width: "100%", marginBottom: 2 }}>
      <View
        style={{
          //   marginTop: 6,
          width: "97%",
          //   backgroundColor: colors.col.PressedIn5,
          //   borderRadius: 10,
          padding: 3,
          alignItems: "center",
          alignSelf: "center",
          height: commentSectionOpened ? 240 : "auto",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            width: "97%",
            gap: 5,
            height: 40,
            overflow: "visible",
          }}
        >
          <TextInput
            placeholder={
              c?.length !== 0 ? "Leave a comment" : "Be the first to comment"
            }
            style={{
              width: "80%",
              borderBottomColor: commentOverflow
                ? colors.col.dangerRed
                : colors.col.PressedIn3,
              height: 40,
              color: commentOverflow ? colors.col.dangerRed : colors.col.Black,
            }}
            value={comment}
            onChangeText={(text) => {
              setComment(text);
              debouncedHandleCommentLength();
            }}
            multiline={true}
            onBlur={Keyboard.dismiss}
          />
          <Pressable
            style={{
              width: "19%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.col.PressedIn2,
              height: 28,
              borderRadius: 6,
            }}
            // onPress={handlePostActions}
            // disabled={postActionLoading}
          >
            <Text style={{}}>Post</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};
export default CommentSection;

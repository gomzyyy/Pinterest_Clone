import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { commentType } from "@/types";
import { profleImageSkeleton } from "@/constants/data";
import { colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

interface commentProps {
  c: commentType | undefined;
}
const FullPageComment: React.FC<commentProps> = ({ c }): React.JSX.Element => {
  return (
    <View
      style={{
        width: "97%",
        marginVertical: 6,
        padding: 1,
        height: "auto",
        flexDirection: "row",
        overflow: "hidden",
        gap: 8,
      }}
    >
      <View style={{ height: "auto", justifyContent: "flex-start" }}>
        <Image
          source={{
            uri: c?.admin?.avatar || profleImageSkeleton,
          }}
          style={{ height: 44, width: 44, borderRadius: 22 }}
        />
      </View>
      <View style={{ gap: 5, marginTop: 2 }}>
        <Pressable>
          <Text style={{ color: colors.col.PressedIn3 }}>
            @{c?.admin?.userId || "loading..."}
          </Text>
        </Pressable>
        <View style={{ width: "100%" }}>
          <Text numberOfLines={5} style={{ flexWrap: "wrap", width: "90%" }}>
            {c?.text || "loading..."}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 18 }}>
          <View>
            <AntDesign name="like2" size={12} color="black" />
<Text>{c?.likes?.length}</Text>
          </View>
          <View>
            <AntDesign name="dislike2" size={12} color="black" />
            <Text>{c?.dislikes?.length}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default FullPageComment;

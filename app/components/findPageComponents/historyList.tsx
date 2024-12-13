import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import HistoryListItem from "./components/historyListItem";
import { colors } from "@/constants/Colors";

const HistoryList = () => {
  const userHistory = useSelector((s: RootState) => s.state.user.history.users);
  const tagsHistory = useSelector((s: RootState) => s.state.user.history.tags);
  const history = [...userHistory].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.col.PressedIn3,
        paddingBottom: 4,
        marginTop: 10,
      }}
    >
      <Text
        style={{ alignSelf: "center", fontFamily: "pop-reg", marginTop: 8 }}
      >
        Recent searches.
      </Text>
      <FlatList
        data={history}
        keyExtractor={(e) => e.user._id}
        renderItem={({ item, index }) => (
          <HistoryListItem
            item={item}
            bottom={index === history.length - 1 ? true : false}
          />
        )}
      />
      <View style={{alignItems:"center",justifyContent:"center",marginTop:4}}>
        <Pressable
        style={{backgroundColor:colors.col.PressedIn2,width:90,height:20,alignItems:"center",justifyContent:'center',borderRadius:4}}
        >
          <Text style={{textAlign:'center',fontWeight:"bold"}} >clear history</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default HistoryList;

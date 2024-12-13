import { View, FlatList,Text } from "react-native";
import React from "react";
import { POST } from "@/types";

type TrendingPage = {
  posts: POST[] | undefined;
};

const TrendingPosts: React.FC<TrendingPage> = ({
  posts,
}): React.JSX.Element => {
  return (
    <View>
      <FlatList
        data={posts}
        numColumns={2}
        keyExtractor={(e) => e._id}
        renderItem={({item,index}) => <View><Text>{item._id}</Text></View>}
      />
    </View>
  );
};

export default TrendingPosts;

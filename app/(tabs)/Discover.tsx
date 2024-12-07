import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { getAllPostsThunk } from "@/Store/Thunk/postThunk";
import { POST, USER } from "@/types";
import Header from "../components/header";
import ImageDiscovery from "../components/postImage/image_Discovery";
import NoPosts from "../components/RedirectTo/components/noPosts";
import { KeyboardAvoidingView } from "react-native";

export default function Discover() {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // Flag for refresh state

  const admin: USER | undefined = useSelector((a: RootState) => a.state.admin);
  const loading = useSelector((g: RootState) => g.getAllPosts.loading);
  const posts = useSelector((s: RootState) => s.state.post.feedPosts);
  const postsCopy = [...posts]

  // useEffect(() => {
  //   // Fetch posts only when the component first loads, not on refresh
  //   const fetchPosts = async () => {
  //     try {
  //       await dispatch(getAllPostsThunk());
  //     } catch (err) {
  //       console.log("Error fetching posts:", err);
  //       setError(true);
  //     }
  //   };

  //   fetchPosts();
  // }, [dispatch]);

  const handleRefresh = () => {
    // Only update refreshing state without re-fetching data
    setRefreshing(true);
    setRefreshing(false);
  };

  const DiscoverPage = (): React.JSX.Element => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <FlatList
          data={postsCopy}
          keyExtractor={(r) => r._id}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          windowSize={5}
          renderItem={({ item }) => (
            <ImageDiscovery i={item} a={item.admin} margin={0} />
          )}
          extraData={posts}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </View>
    );
  };

  const ErrorPage = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Text style={{ fontFamily: "pop-b", fontSize: 16 }}>
          Error occurred while fetching data.
        </Text>
        <Button title="Refresh" onPress={handleRefresh} />
      </View>
    );
  };

  return (
    // <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header headerText="Home" showLoading={loading} />
        {error ? (
          <ErrorPage />
        ) : posts && admin?.following.length !== 0 && posts.length !== 0 ? (
          <DiscoverPage />
        ) : (
          <NoPosts />
        )}
      </View>
    //  </KeyboardAvoidingView> 
  );
}

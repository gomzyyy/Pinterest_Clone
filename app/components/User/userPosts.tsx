import {
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    Pressable,
    ToastAndroid,
    Button,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { colors } from "@/constants/Colors";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import { userController, messages } from "@/constants/GlobalConstants";
  import { useRouter } from "expo-router";
  import { RootState, AppDispatch } from "@/Store/store";
  import { imageData } from "../../../constants/data";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { POST } from "@/types";
  import { UseDispatch, useSelector } from "react-redux";
import UserPost from "./components/userPost"; 
  
  export default function UserPosts() {
    const router = useRouter();
    const logout = userController.logoutUser;
    const state = useSelector((s:RootState)=>s.admin)
    const posts = state.posts
  
    const [updatedPosts, setUpdatedPosts] = useState<string[]>([]);
    const [returnMessage, setReturnMessage] = useState<string>("");
    const [filtercount, setFiltercount] = useState<number>(6);
    const [collectionName, setCollectionName] = useState<string>("");
    const [tags, setTags] = useState<boolean>(false);
    const [adminPosts, setAdminPosts] = useState<POST[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
  
    
    useEffect(() => {
      const getPosts = async () => {
        try {
         
        } catch (error) {
        
        }
      };
      getPosts();
    }, [refresh]);
  
    // useEffect(()=>{
    //   setInterval(()=>setRefreshAtInterval(r=>!r), refreshInterval)
    //   getPosts();
    // },[refreshAtInterval])
  
    useEffect(() => {
      if (returnMessage !== "" || returnMessage !== null)
        return ToastAndroid.show(returnMessage, ToastAndroid.SHORT);
    }, [returnMessage]);
  
    const UserPostPage = (): React.JSX.Element => {
      return (
        <>
          <View style={{ flex: 1, alignItems: "center" }}>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "pop-b",
                    fontSize: 20,
                    position: "relative",
                    bottom: 80,
                  }}
                >
                  Loading...
                </Text>
              </View>
            ) : (
               <FlatList
                 data={posts}
                 keyExtractor={(r) => r._id}
                 numColumns={1}
                 showsVerticalScrollIndicator={false}
                 renderItem={({ item, index }) => (
              
                    <UserPost
                      i={item}
                      a={item.admin}
                      lastPostMargin={index === adminPosts.length - 1 ? 10 : 0}
                    />
                 )}
               />
            )}
          </View>
        </>
      );
    };
  
    const ErrorPage = () => {
      return (
        <>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text style={{ fontFamily: "pop-b", fontSize: 16 }}>
              Error occured while fetching data.
            </Text>
            <Button title="Refresh" onPress={() => setRefresh((e) => !e)} />
          </View>
        </>
      );
    };
  
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            paddingTop: 35,
            backgroundColor:colors.col.PressedIn,
            height: 100,
            position: "relative",
            borderBottomColor:colors.col.PressedIn,
            borderBottomWidth:1.2
          }}
        >
            <Pressable
          style={{ position: "absolute", left: 25, bottom: "26%" }}
          onPress={() => router.back()}
          // disabled={isUpdating}
        >
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={colors.col.white}
          />
        </Pressable>
          {/* <AntDesign name="find" size={28} color={colors.col.white} /> */}
          <Text style={{ fontSize: 24, color: colors.col.white }}>Your Posts</Text>
        </View>
        {error ? <ErrorPage /> : <UserPostPage />}
      </View>
    );
  }
  
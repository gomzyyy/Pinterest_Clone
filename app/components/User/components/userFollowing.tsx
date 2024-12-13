import {
    View,
    Text,
    FlatList,
    TextInput,
    Image,
    Pressable,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import Header from "../../header";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import { colors } from "@/constants/Colors";
  import { useSelector, useDispatch } from "react-redux";
  import { USER } from "@/types";
  import { AppDispatch, RootState } from "@/Store/store";
  import { useRouter } from "expo-router";
import UserFollowingListItem from "./FriendListItems/userFollowingListItem";
  

  const FollowingPage = () => {
    const f: any = useSelector((s: RootState) => s.user.response.data.user?.following);
    const unFollowLoading = useSelector(
      (s: RootState) => s.followUnfollow.loading
    );
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const a: USER | undefined = useSelector((d: RootState) => d.admin.admin);
  
    const [searchText, setSearchText] = useState<string>("");
    const [searchResult, setSearchResult] = useState<USER[] | []>(f ? f : []);
  
    const handleSearchUserInFollowing = () => {
      let searchedUser;
      if (searchText.trim()[0] === "@") {
        setSearchResult(f ? f : []);
        searchedUser = searchResult.filter((u) =>
          u.userId
            .trim()
            .includes(searchText.trim().slice(1, searchText.trim().length - 1))
        );
      } else {
        searchedUser = searchResult.filter((u) =>
          u.userName
            .trim()
            .toLowerCase()
            .includes(searchText.toLowerCase().trim())
        );
      }
      setSearchResult(searchedUser);
      return;
    };

 
  
    useEffect(() => {
      if (searchText.trim().length !== 0) {
        handleSearchUserInFollowing();
      } else {
        setSearchResult(f ? f : []);
      }
    }, [searchText]);
  
    return (
      <View style={{ flex: 1 }}>
        <Header headerText="Following" backButton={true}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={colors.col.white}
            style={{ width: 30 }}
          />
        </Header>
        {searchResult.length !== 0 && (
          <TextInput
            placeholder="search"
            style={{
              alignSelf: "flex-start",
              height: 60,
              width: "80%",
              paddingHorizontal: 20,
              fontSize: 25,
            }}
            value={searchText}
            onChangeText={setSearchText}
          />
        )}
  
        {searchResult.length!==0 ? 
        <FlatList
          data={searchResult}
          keyExtractor={(s) => s._id}
          renderItem={({ item, index }) => (
            <UserFollowingListItem item={item} />
          )}
        />
        : (
          <View
          style={{flex:1, alignItems:'center', justifyContent:'center', gap:18}}
          >
            <Text
            style={{ fontSize:19, fontFamily:'pop-b'}}
            >
              Follow people to see here!
            </Text>
            <Pressable
            style={{marginBottom:110}}
            onPress={()=>router.push('/(tabs)/Find')}
            >
              <View
              style={{height:50, paddingHorizontal:10, borderRadius:30, backgroundColor:colors.col.Black, alignItems:'center', justifyContent:'center', flexDirection:'row', gap:10}}
              >
              <AntDesign style={{alignSelf:'center'}} name="search1" size={26} color={colors.col.white} />
              <Text
              style={{color:colors.col.white, fontFamily:'pop-reg', fontSize:16}}
              >
                search
              </Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    );
  };
  
  export default FollowingPage;
  
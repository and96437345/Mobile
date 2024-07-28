import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  Pressable,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminScreen = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = {
    email: email,
    password: password,
  };

  const isAdminCheck = () => {
    if(user.email === 'and96437345@yandex.ru') {
      checkUserData();
    }
  }
 
  const navigation = useNavigation();
  const checkAuthData = async () => {
    try {
      setEmail(await AsyncStorage.getItem("authEmail"));
      setPassword(await AsyncStorage.getItem("authPassword"));
    } catch (err) {
      console.log("error message", err);
    }
  };

  

  const checkUserData = () => {

    axios
      .post("https://stable-cat-certain.ngrok-free.app/usersList")
      .then((response) => {
        const users = response.data.users;
        navigation.navigate("Users", {users});
      })
      .catch((error) => {
        // Alert.alert("Connection Error", "Not connected");
        console.log(error);
      });
  };

  checkAuthData();

  isAdminCheck();

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 90 : 50,
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/5a62139deace967f8e026a5a.png",
          }}
        />
      </View>

      <Text style={{fontSize: 24, marginTop: 50}}>Access denied</Text>
      
    </SafeAreaView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({});
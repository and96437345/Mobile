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
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState('');
  const [userTime, setUserTime] = useState('0:00');
  const user = {
    email: email,
    password: password,
  };
  

  const navigation = useNavigation();
  const checkAuthData = async () => {
    try {
      setEmail(await AsyncStorage.getItem("authEmail"));
      setPassword(await AsyncStorage.getItem("authPassword"));
    } catch (err) {
      console.log("error message", err);
    }
  };
  checkAuthData();

  const checkUserData = () => {

    axios
      .post("https://stable-cat-certain.ngrok-free.app/userCheck", user)
      .then((response) => {
        const userHours = Math.floor(response.data.userData.time / 60);
        const userDecMin = (response.data.userData.time % 60 < 10) ? '0' : '';
        const userMinutes = response.data.userData.time % 60;
        setUserName(response.data.userData.name);
        setUserTime(`${userHours}:${userDecMin}${userMinutes}`);
        console.log(userName);
        console.log(userTime);
      })
      .catch((error) => {
        // Alert.alert("Connection Error", "Not connected");
        console.log(error);
      });
  };


  const returnHome = () => {
    navigation.replace("Main");
  }

  checkUserData();

  

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

      <Text style={{fontSize: 20}}>User: {userName}</Text>
      <Text style={{fontSize: 20, marginBottom: 17}}>Working Time: {userTime}</Text>
      
      <Pressable
        onPress={returnHome}
        style={{
          width: 300,
          backgroundColor: "#129400",
          borderRadius: 6,
          margin: "auto",
          padding: 45,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Return Home
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

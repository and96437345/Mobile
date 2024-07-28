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
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";



const ConnectScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userTime, setUserTime] = useState('0:00');
  const user = {
    email: email,
    password: password,
  };

  const navigation = useNavigation();

  const BACKGROUND_FETCH_TASK = "background-fetch";

// 1. Определите задачу, указав имя и функцию, которая должна быть выполнена
// Примечание: Она должна вызываться в глобальной области (например, за пределами ваших компонентов React).
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  // Обязательно верните тип успешного результата!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

  // 2. Зарегистрируйте задачу в какой-то момент в своем приложении, указав то же имя,
  // и некоторые параметры конфигурации для того, как должна работать фоновая выборка
  // Примечание: Это не обязательно должно быть в глобальной области и может использоваться в ваших компонентах React!
  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 3, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }

  const checkAuthData = async () => {
    try {
      setEmail(await AsyncStorage.getItem("authEmail"));
      setPassword(await AsyncStorage.getItem("authPassword"));
    } catch (err) {
      console.log("error message", err);
    }
  };
  
  checkAuthData();

  const workTime = () => {
    axios
      .post("https://stable-cat-certain.ngrok-free.app/connect", user)
      .then((response) => {
        const userHours = Math.floor(response.data.userData.time / 60);
        const userDecMin = (response.data.userData.time % 60 < 10) ? '0' : '';
        const userMinutes = response.data.userData.time % 60;
        setUserTime(`${userHours}:${userDecMin}${userMinutes}`);
        console.log(response);
        console.log(response.data.userData.time);
      })
      .catch((error) => {
        // Alert.alert("Connection Error", "Not connected");
        console.log(error);
      });
  };

  const startRegistration = async () => {
    await registerBackgroundFetchAsync();
  };

  useEffect(() => {
    startRegistration();
    const timer = setInterval(() => {
      workTime();
    }, 10000); // clearing interval
    return () => clearInterval(timer);
  });

  const endWork = () => {
    navigation.replace("Main");
  };

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

      <Text style={{ fontSize: 20 }}>Connected to Database</Text>
      <Text style={{ fontSize: 40, marginTop: 20, marginBottom: -80 }}>{userTime}</Text>


      <Pressable
        onPress={endWork}
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
          End work time
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ConnectScreen;

const styles = StyleSheet.create({});

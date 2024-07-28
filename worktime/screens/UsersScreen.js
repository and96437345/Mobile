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
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const UsersScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const users = route.params.users;
  let userNames = [];
  let i = 0;
  users.forEach((user) => {
    console.log(user.name);
    const userHours = Math.floor(user.workingTime / 60);
    const userDecMin = (user.workingTime % 60 < 10) ? '0' : '';
    const userMinutes = user.workingTime % 60;
    userNames[i] = [[user.name], [`${userHours}:${userDecMin}${userMinutes}`]];
    i++;
  });

  const returnHome = () => {
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

      <View>
        {userNames.map((item, index) => (
          <Text style={{ fontSize: 20, paddingBottom: 10 }} key={index}>
            {item[0]}, {item[1]}
          </Text>
        ))}
      </View>

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

export default UsersScreen;

const styles = StyleSheet.create({});

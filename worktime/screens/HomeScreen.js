import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  Pressable,
  View,
  Image,
  Alert,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

const HomeScreen = () => {
  const [wifiList, setWifiList] = React.useState([]);
  console.log(wifiList + "list");
  const [currentSSID, setCurrentSSID] = React.useState("");

  NetInfo.fetch().then((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });

  const connectionCheck = () => {
    NetInfo.fetch("wifi").then((state) => {
      if (state.details.ssid) {
        setCurrentSSID(state.details.ssid);
      } else {
        setCurrentSSID("None");
      }
      console.log("SSID", state.details.ssid);
      console.log("BSSID", state.details.bssid);
      console.log("Is connected?", state.isConnected);
    });
  }

  useEffect(() => {
    permission();
    const connectionTimer = setInterval(() => { connectionCheck() }, 5000); // clearing interval
    return () => clearInterval(connectionTimer);
  });

  const permission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location permission is required for WiFi connections",
        messege:
          "This app needs location permission as this required " +
          "to scan for wifi networks.",
        buttonNagative: "DENY",
        buttonPositive: "ALLOW",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use react-native-wifi-reborn
      console.log("granted");
    } else {
      // Permission denied
      console.log("not granted");
    }
  };

  const navigation = useNavigation();

  const startWork = () => {
    if (currentSSID === "None") {
      Alert.alert("Wifi not connected", "Please check your Wifi connection");
    } else {
      navigation.replace("Connect");
    }
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

      <Text style={{ fontSize: 20 }}>Not connected to the Database</Text>
      <Text style={{ marginTop: 20, color: "#008894", fontSize: 18, fontWeight: 700 }}>
        Wifi connection: {currentSSID}
      </Text>

      <Pressable
        onPress={startWork}
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
          Start work time
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

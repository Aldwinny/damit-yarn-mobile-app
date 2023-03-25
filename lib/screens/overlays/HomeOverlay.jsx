import React from "react";
import AdaptiveView from "../../components/adaptive/AdaptiveView";
import AdaptiveText from "../../components/adaptive/AdaptiveText";
import AdaptiveClickable from "../../components/adaptive/AdaptiveClickableIcons";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "../../../assets/logo/DamitYarnTextDark.png";
import logo2 from "../../../assets/logo/DamitYarnTextLight.png";

const HomeOverlay = ({ navigation }) => {
  const adaptiveIconColor = global.scheme === "light" ? "#C0C0C0" : "#000";

  return (
    <AdaptiveView classNames="flex-1 items-center">
      <AdaptiveView classNames="bg-darkPalette-4 h-24 w-full flex flex-row flex-wrap items-center">
        <Image
          className="h-16 w-36 ml-2"
          resizeMode="contain"
          source={global.scheme ? logo : logo2}
        />

        <AdaptiveClickable
          onPress={() => {
            console.log("Message has been clicked!!!");
          }}
          classNames="ml-auto"
        >
          <Ionicons
            name="ios-chatbox-ellipses"
            color={adaptiveIconColor}
            size={25}
          />
        </AdaptiveClickable>
        <AdaptiveClickable
          onPress={() => {
            console.log("Bell has been clicked!!!");
            navigation.navigate("notifications");
          }}
          classNames="mx-3"
        >
          <MaterialCommunityIcons
            name="bell"
            color={adaptiveIconColor}
            size={25}
          />
        </AdaptiveClickable>
        <AdaptiveClickable
          onPress={() => {
            console.log("Search has been clicked!!!");
          }}
          classNames="mr-3"
        >
          <Ionicons name="search" color={adaptiveIconColor} size={25} />
        </AdaptiveClickable>
      </AdaptiveView>
      <AdaptiveText>Tabbar</AdaptiveText>
    </AdaptiveView>
  );
};

export default HomeOverlay;

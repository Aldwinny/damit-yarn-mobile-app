import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useRef } from "react";

const ModifyItemScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  const adaptive = AdaptiveScheme(theme.theme);

  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      if (user.shopid === 0) {
        navigation.pop();
      }

      // Part 1: Get all items from shop

      // Do first run stuff here
      console.log(firstRun.current);
      firstRun.current = false;
    }
  });

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Shop Items"
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <Text>ModifyItemScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModifyItemScreen;

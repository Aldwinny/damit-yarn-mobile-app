import React, { useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import AdaptiveScheme from "../../shared/Adaptive";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useCallback } from "react";
import { useEffect } from "react";
import { TouchableRipple } from "react-native-paper";

const CartOverlay = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);

  const user = useSelector((state) => state.user);

  const adaptive = AdaptiveScheme(theme.theme);

  const [refreshing, setRefreshing] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  // Gets updated by api request
  const [items, setItems] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const timer = setTimeout(() => {
      if (refreshing) {
        setRefreshing(false);
      }
    }, 10000);

    // API request
    setRefreshing(false);
  });

  useEffect(() => {
    if (firstRender) {
      onRefresh();
      setFirstRender(false);
    }
  }, [onRefresh]);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar title="Cart" />
      <ScrollView
        className={`${adaptive.nativeWindBackground} h-full`}
        contentContainerStyle={{ paddingBottom: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Hello</Text>
      </ScrollView>
      <View className={`flex flex-row items-center`}>
        <TouchableRipple
          onPress={() => {}}
          rippleColor={"#C0C0C080"}
          className={`bg-palette-orange2 h-full flex-1 items-center px-4`}
        >
          <View className="flex flex-row items-center justify-center my-3">
            <Text
              className={`${adaptive.nativeWindText} font-bold text-center text-lg align-center`}
            >
              Checkout
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default CartOverlay;

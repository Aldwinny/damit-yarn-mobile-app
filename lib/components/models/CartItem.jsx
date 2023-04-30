import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";

const CartItem = ({ item, onQuantityChange }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  return (
    <View>
      <Text>CartItem</Text>
    </View>
  );
};

export default CartItem;

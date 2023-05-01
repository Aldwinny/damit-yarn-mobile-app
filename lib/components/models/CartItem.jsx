import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";

import { formatCurrency } from "../../utils/formatter";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableRipple } from "react-native-paper";
import { TextInput } from "react-native";
import { useState } from "react";

const CartItem = ({ item, onQuantityChange, onPressDeletion }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  return (
    <View
      className={`${adaptive.nativeWindNavbar} flex flex-row p-2 rounded-sm mt-3 w-11/12`}
    >
      <MaterialCommunityIcons
        name="cart-variant"
        color={adaptive.activeIconColor}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          opacity: 0.05,
        }}
        size={90}
      />
      <Image
        source={{ uri: item.image }}
        className={`w-32 h-32 rounded-sm self-center`}
      />
      <View className={`flex flex-col pl-4`}>
        <Text
          className={`${adaptive.nativeWindText} text-base font-bold`}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          className={`${adaptive.nativeWindText} text-sm`}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {item.shopname}
        </Text>
        <Text
          className={`${adaptive.nativeWindActiveNavText} text-base my-3`}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {formatCurrency(item.price)}
        </Text>
        <View className={`flex flex-row`}>
          <View className={`flex flex-row items-center justify-center`}>
            <TouchableRipple
              onPress={() => {
                if (parseInt(item.qty) - 1 > 0) {
                  onQuantityChange((parseInt(item.qty) - 1).toString());
                  return;
                }
                onQuantityChange(`${0}`);
              }}
              className={`${adaptive.nativeWindBackground} rounded-sm p-1`}
              borderless={true}
              rippleColor="rgba(0,0,0,0.4)"
            >
              <MaterialCommunityIcons
                name="minus"
                size={20}
                color={adaptive.iconColor}
              />
            </TouchableRipple>
            <TextInput
              maxLength={2}
              className={`bg-gray-200 text-black text-center w-10`}
              value={`${item.qty}`}
              editable={false}
            />
            <TouchableRipple
              onPress={() => {
                onQuantityChange((parseInt(item.qty) + 1).toString());
              }}
              className={`${adaptive.nativeWindBackground} rounded-sm p-1`}
              borderless={true}
              rippleColor="rgba(0,0,0,0.4)"
            >
              <MaterialCommunityIcons
                name="plus"
                color={adaptive.iconColor}
                size={20}
              />
            </TouchableRipple>
          </View>
          <TouchableRipple
            onPress={onPressDeletion}
            className={`rounded-full p-2 ml-5`}
            borderless={true}
            rippleColor="rgba(0,0,0,0.4)"
          >
            <MaterialCommunityIcons
              name="cart-remove"
              color={adaptive.activeIconColor}
              size={25}
            />
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

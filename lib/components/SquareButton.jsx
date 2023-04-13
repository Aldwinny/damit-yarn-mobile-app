import { View, Text } from "react-native";
import React from "react";
import { TouchableRipple } from "react-native-paper";
import { useEffect } from "react";

const SquareButton = ({ adaptive, title, icon, onPress }) => {
  return (
    <TouchableRipple
      onPress={onPress}
      className={`${adaptive.nativeWindNavbar} rounded-lg w-24 h-24 m-1 flex justify-center items-center`}
      borderless={true}
      rippleColor={adaptive.from("rgba(0,0,0,0.5)", "rgba(255,255,255,0.5)")}
    >
      <View className={`flex items-center justify-center p-2`}>
        {icon}
        <Text
          className={`mt-2 font-bold`}
          style={{
            color: adaptive.iconColor,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableRipple>
  );
};

export default SquareButton;

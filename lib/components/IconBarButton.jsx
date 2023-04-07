import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import AdaptiveScheme from "../shared/Adaptive";
import { useSelector } from "react-redux";

const IconBarButton = ({ icon, onPress, children, nativeWind }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`flex flex-row py-3 px-5 items-center border-darkPalette-3 ${
          nativeWind !== undefined ? nativeWind : "border-t"
        }`}
      >
        {icon ?? (
          <AntDesign
            name="questioncircle"
            size={25}
            color={adaptive.iconColor}
          />
        )}
        <Text
          className={`${adaptive.nativeWindNavText} flex-1 ml-4 font-bold text-lg`}
        >
          {children ?? "No Label"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconBarButton;

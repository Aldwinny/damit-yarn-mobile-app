import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import useGlobalScheme from "../hooks/UseGlobalScheme";
import AdaptiveScheme from "../shared/Adaptive";

const IconBarButton = ({ icon, onPress, children, nativeWind }) => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

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
            color={adaptive.palettedIconColor}
          />
        )}
        <Text
          className={`${adaptive.nativeWindPalettedText} flex-1 ml-4 font-bold text-lg`}
        >
          {children ?? "No Label"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconBarButton;

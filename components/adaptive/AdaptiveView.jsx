import { View } from "react-native";
import React from "react";

const AdaptiveView = ({
  children,
  classNames = "",
  classNameDark = "bg-darkPalette-5",
  classNameLight = "bg-white",
}) => {
  const adaptiveClassName =
    global.scheme === "light" ? classNameDark : classNameLight;

  return (
    <View className={`${adaptiveClassName} ${classNames ?? ""}`}>
      {children}
    </View>
  );
};

export default AdaptiveView;

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const AdaptiveClickable = ({
  children,
  classNames,
  onPress,
  onLongPress,
  classNameDark = "text-white",
  classNameLight = "text-black",
}) => {
  const adaptiveClassName =
    global.scheme === "light" ? classNameDark : classNameLight;

  return (
    <TouchableOpacity
      className={`${adaptiveClassName} ${classNames ?? ""}`}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default AdaptiveClickable;

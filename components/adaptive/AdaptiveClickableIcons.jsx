import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const AdaptiveClickable = ({ children, classNames, onPress, onLongPress }) => {
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

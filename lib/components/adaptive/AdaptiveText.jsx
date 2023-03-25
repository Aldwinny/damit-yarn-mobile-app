import { Text } from "react-native";
import React from "react";

const AdaptiveText = ({
  children,
  classNames = "",
  classNameDark = "text-white",
  classNameLight = "text-black",
  style,
  numberOfLines,
  ellipsisMode,
}) => {
  const adaptiveClassName =
    global.scheme === "light" ? classNameDark : classNameLight;

  return (
    <Text
      style={style}
      className={`${adaptiveClassName} ${classNames ?? ""}`}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsisMode}
    >
      {children}
    </Text>
  );
};

export default AdaptiveText;

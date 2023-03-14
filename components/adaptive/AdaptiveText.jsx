import { Text } from "react-native";
import React from "react";

const AdaptiveText = ({
  children,
  classNames = "",
  classNameDark = "text-white",
  classNameLight = "text-black",
}) => {
  const adaptiveClassName =
    global.scheme === "light" ? classNameDark : classNameLight;

  return (
    <Text className={`${adaptiveClassName} ${classNames ?? ""}`}>
      {children}
    </Text>
  );
};

export default AdaptiveText;

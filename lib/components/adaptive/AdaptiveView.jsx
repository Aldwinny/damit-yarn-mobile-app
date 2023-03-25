import { ScrollView, View } from "react-native";
import React from "react";

const AdaptiveView = ({
  children,
  scrollable = false,
  contentContainerStyle,
  classNames = "",
  classNameDark = "bg-darkPalette-5",
  classNameLight = "bg-white",
}) => {
  const adaptiveClassName =
    global.scheme === "light" ? classNameDark : classNameLight;

  return scrollable ? (
    <View className={`${adaptiveClassName} ${classNames ?? ""}`}>
      <ScrollView contentContainerStyle={contentContainerStyle}>
        {children}
      </ScrollView>
    </View>
  ) : (
    <View className={`${adaptiveClassName} ${classNames ?? ""}`}>
      {children}
    </View>
  );
};

export default AdaptiveView;

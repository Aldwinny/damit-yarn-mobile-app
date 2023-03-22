import { View, Text } from "react-native";
import React from "react";

import AdaptiveView from "../../components/adaptive/AdaptiveView";
import AdaptiveText from "../../components/adaptive/AdaptiveText";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AdaptiveClickable from "../../components/adaptive/AdaptiveClickableIcons";

const NotificationScreen = ({ navigation }) => {
  const adaptiveIconColor = global.scheme === "light" ? "#E5855B" : "#000";

  return (
    <AdaptiveView classNames="flex-1 items-center">
      <AdaptiveView classNames="bg-darkPalette-4 h-24 pt-12 w-full flex flex-row flex-wrap items-center">
        <AdaptiveClickable
          onPress={() => {
            navigation.goBack();
          }}
          classNames="flex flex-row align-center"
        >
          <MaterialIcons
            name="arrow-back-ios"
            style={{ marginLeft: 25 }}
            size={25}
            color={adaptiveIconColor}
          />
          <AdaptiveText classNames="text-xl text-palette-orange2 font-bold">
            Back
          </AdaptiveText>
        </AdaptiveClickable>
        <AdaptiveText classNames="font-bold text-xl mx-auto absolute bottom-5 left-0 right-0 text-center -z-10">
          Notifications
        </AdaptiveText>
      </AdaptiveView>
    </AdaptiveView>
  );
};

export default NotificationScreen;

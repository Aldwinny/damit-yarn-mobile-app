import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";

import logo from "../../assets/logo/DamitYarn.png";
import AdaptiveScheme from "../shared/Adaptive";
import { useSelector } from "react-redux";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("getting-started");
    }, 2000);
  });

  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  return (
    <View
      className={`${adaptive.nativeWindBackground} flex-1 items-center justify-center`}
    >
      <Image className="w-48 h-48" source={logo} />
    </View>
  );
};

export default SplashScreen;

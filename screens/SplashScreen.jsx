import { View, Text, useColorScheme, Image } from "react-native";
import React, { useEffect } from "react";
import AdaptiveView from "../components/adaptive/AdaptiveView";

import logo from "../assets/logo/DamitYarn.png";

const SplashScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();

  // TODO: research a better way to declare configurations. Maybe use custom hooks?
  global.scheme = "light";

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("getting-started");
    }, 2000);
  });

  return (
    <AdaptiveView classNames="flex-1 items-center justify-center">
      <Image className="w-48 h-48" source={logo} />
    </AdaptiveView>
  );
};

export default SplashScreen;

import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";

import logo from "../../assets/logo/DamitYarn.png";
import AdaptiveScheme from "../shared/Adaptive";
import { useDispatch, useSelector } from "react-redux";
import { toggleFirstOpen } from "../shared/redux/settingSlice";
import { StatusBar } from "expo-status-bar";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleFirstOpen());
      if (settings.firstOpen) {
        navigation.replace("getting-started");
        return;
      } else {
        navigation.replace("home");
        return;
      }
    }, 2000);
  }, [settings, dispatch]);

  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);
  const settings = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  return (
    <View
      className={`${adaptive.nativeWindSoftBackground} flex-1 items-center justify-center`}
    >
      <Image className="w-48 h-48" source={logo} />
      <StatusBar
        backgroundColor={adaptive.statusbarStartColor}
        style={adaptive.from("light", "dark")}
      />
    </View>
  );
};

export default SplashScreen;

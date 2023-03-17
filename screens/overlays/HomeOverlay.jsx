import React from "react";
import AdaptiveView from "../../components/adaptive/AdaptiveView";
import AdaptiveText from "../../components/adaptive/AdaptiveText";
import { Text, View, Image, TouchableOpacity } from "react-native";

import logo from "../../assets/logo/DamitYarnTextDark.png";
import logo2 from "../../assets/logo/DamitYarnTextLight.png";

const HomeOverlay = () => {
  return (
    <AdaptiveView classNames="flex-1 items-center">
      <AdaptiveView classNames="bg-darkPalette-4 h-20 pt-5 w-full flex flex-row flex-wrap">
        <Image
          className="h-16 w-36 ml-2"
          resizeMode="contain"
          source={global.scheme ? logo : logo2}
        ></Image>
        
      </AdaptiveView>
      <AdaptiveText>Tabbar</AdaptiveText>
    </AdaptiveView>
  );
};

export default HomeOverlay;

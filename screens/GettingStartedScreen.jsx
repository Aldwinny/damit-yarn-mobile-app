import { Image, TouchableOpacity } from "react-native";
import React from "react";

import AdaptiveView from "../components/adaptive/AdaptiveView";
import AdaptiveText from "../components/adaptive/AdaptiveText";

import AntDesign from "react-native-vector-icons/AntDesign";
import logo from "../assets/logo/DamitYarnTextDark.png";
import { styled } from "nativewind";

const StyledButton = styled(TouchableOpacity);

const GettingStartedScreen = ({ navigation }) => {
  return (
    <AdaptiveView classNames="flex-1 items-center">
      <AdaptiveText classNames="text-3xl mb-6 mt-24">Welcome to</AdaptiveText>
      <Image className="w-72 h-20 my-10 mb-10" source={logo} />
      <AdaptiveText classNames="text-lg mx-8 my-4 text-center text-darkPalette-2">
        Damit Yarn is a platform for hobbyists to post and sell their handmade
        apparel and clothing. Everyone can then come and purchase clothing that
        they want from the store.
      </AdaptiveText>
      <AdaptiveText classNames="text-lg mx-8 my-4 text-center text-darkPalette-2 italic">
        An Application by: Aldwin
      </AdaptiveText>
      <StyledButton
        onPress={() => navigation.replace("home")}
        className="bg-palette-orange3 p-4 m-4 px-14 rounded-full flex flex-row"
      >
        <AdaptiveText classNames="font-bold text-xl">
          Let's get shopping
        </AdaptiveText>
        <AntDesign
          name="arrowright"
          size={25}
          style={{ marginStart: 10, marginTop: 2, color: "#FFF" }}
        />
      </StyledButton>
    </AdaptiveView>
  );
};

export default GettingStartedScreen;

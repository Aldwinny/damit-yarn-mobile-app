import { Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import logoDark from "../../assets/logo/DamitYarnTextDark.png";
import logoLight from "../../assets/logo/DamitYarnTextLight.png";
import { styled } from "nativewind";
import AdaptiveScheme from "../shared/Adaptive";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

const StyledButton = styled(TouchableOpacity);

const GettingStartedScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  console.log(adaptive.nativeWindText);

  return (
    <View
      className={`${adaptive.nativeWindSoftBackground} flex-1 items-center`}
    >
      <Text className={`${adaptive.nativeWindText} text-3xl mb-6 mt-24`}>
        Welcome to
      </Text>
      <Image
        className="w-72 h-20 my-10 mb-10"
        source={adaptive.from(logoDark, logoLight)}
      />
      <Text
        className={`${adaptive.nativeWindSoftText} text-lg mx-8 my-4 text-center`}
      >
        Damit Yarn is a platform for hobbyists to post and sell their handmade
        apparel and clothing. Everyone can then come and purchase clothing that
        they want from the store.
      </Text>
      <Text
        className={`${adaptive.nativeWindSoftText} text-lg mx-8 my-4 text-center italic`}
      >
        An Application by: Aldwin
      </Text>
      <StyledButton
        onPress={() => navigation.replace("home")}
        className="bg-palette-orange3 p-4 m-4 px-14 rounded-full flex flex-row"
      >
        <Text className={`text-white font-bold text-xl`}>
          Let's get shopping
        </Text>
        <AntDesign
          name="arrowright"
          size={25}
          style={{ marginStart: 10, marginTop: 2, color: "#FFF" }}
        />
      </StyledButton>
      <StatusBar
        backgroundColor={adaptive.statusbarStartColor}
        style={adaptive.from("light", "dark")}
      />
    </View>
  );
};

export default GettingStartedScreen;

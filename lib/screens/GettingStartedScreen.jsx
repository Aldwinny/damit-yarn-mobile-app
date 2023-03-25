import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import logo from "../../assets/logo/DamitYarnTextDark.png";
import { styled } from "nativewind";
import AdaptiveScheme from "../shared/Adaptive";
import useGlobalScheme from "../hooks/UseGlobalScheme";

const StyledButton = styled(TouchableOpacity);

const GettingStartedScreen = ({ navigation }) => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

  return (
    <View className={`${adaptive.nativeWindBackground} flex-1 items-center`}>
      <Text className={`${adaptive.nativeWindText} text-3xl mb-6 mt-24`}>
        Welcome to
      </Text>
      <Image className="w-72 h-20 my-10 mb-10" source={logo} />
      <Text
        className={`${adaptive.nativeWindText} text-lg mx-8 my-4 text-center text-darkPalette-2`}
      >
        Damit Yarn is a platform for hobbyists to post and sell their handmade
        apparel and clothing. Everyone can then come and purchase clothing that
        they want from the store.
      </Text>
      <Text
        className={`${adaptive.nativeWindText} text-lg mx-8 my-4 text-center text-darkPalette-2 italic`}
      >
        An Application by: Aldwin
      </Text>
      <StyledButton
        onPress={() => navigation.replace("home")}
        className="bg-palette-orange3 p-4 m-4 px-14 rounded-full flex flex-row"
      >
        <Text className={`${adaptive.nativeWindText} font-bold text-xl`}>
          Let's get shopping
        </Text>
        <AntDesign
          name="arrowright"
          size={25}
          style={{ marginStart: 10, marginTop: 2, color: "#FFF" }}
        />
      </StyledButton>
    </View>
  );
};

export default GettingStartedScreen;

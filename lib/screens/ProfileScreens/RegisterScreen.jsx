import {
  View,
  Text,
  ScrollView,
  Button,
  Image,
  TextInput,
  Animated,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { TouchableRipple } from "react-native-paper";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import YarnImage from "../../../assets/logo/DamitYarn.png";

const RegisterScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  // const animation = StyleSheet.create({
  //   iconContainer: {
  //     transform: [{translateX: 10}]
  //   }
  // })

  const transformValue = new Animated.Value(1);
  const opacityValue = new Animated.Value(1);
  const transitionAnimation = () => {
    Animated.spring(transformValue, {
      toValue: -30,
      useNativeDriver: true,
    }).start();
    Animated.spring(opacityValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const animatedTransitionStyle = {
    transform: [{ translateX: transformValue }],
    opacity: opacityValue,
  };

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Register"
      />
      <Animated.ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
        style={animatedTransitionStyle}
      >
        <Image source={YarnImage} className={`h-36 w-36 mt-5 self-center`} />
        <Text
          className={`${adaptive.nativeWindActiveNavText} mx-4 mt-6 mb-2 font-bold text-lg text-center`}
        >
          Sign up, yarn!
        </Text>
        <View className={`m-4 flex-1`}>
          {/* Email Address */}
          <Text
            className={`${adaptive.nativeWindText} mb-2 ml-2 text-base font-bold`}
          >
            Email*
          </Text>
          <TextInput
            placeholder="Enter your email address"
            maxLength={320}
            className={"bg-white p-2 px-3 rounded-full"}
            cursorColor={adaptive.paletteColorOrange}
          />

          {/* Username */}
          <Text
            className={`${adaptive.nativeWindText} mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Username*
          </Text>
          <TextInput
            placeholder="Enter your username"
            maxLength={25}
            className={"bg-white p-2 px-3 rounded-full"}
            cursorColor={adaptive.paletteColorOrange}
          />

          {/* Password */}
          <Text
            className={`${adaptive.nativeWindText} mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Password*
          </Text>
          <TextInput
            placeholder="Enter your password"
            maxLength={100}
            className={"bg-white p-2 px-3 rounded-full"}
            selectionColor={"red"}
            cursorColor={adaptive.paletteColorOrange}
            secureTextEntry
          />

          {/* Confirm Password */}
          <Text
            className={`${adaptive.nativeWindText} mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Confirm Password*
          </Text>
          <TextInput
            placeholder="Confirm your password"
            maxLength={100}
            className={"bg-white p-2 px-3 rounded-full"}
            selectionColor={"red"}
            cursorColor={adaptive.paletteColorOrange}
            secureTextEntry
          />
          <TouchableRipple
            onPress={transitionAnimation}
            className={`${adaptive.nativeWindNavbar} mt-7 rounded-full`}
            rippleColor={adaptive.paletteColorLightOrange}
            borderless
          >
            <View className={`flex flex-row items-center justify-center`}>
              <Text
                className={`${adaptive.nativeWindText} text-base py-4 p-2 text-center font-bold`}
              >
                Continue
              </Text>
              <FontAwesome5Icon
                name="arrow-right"
                size={15}
                className={`ml-5`}
                color={adaptive.textColor}
              />
            </View>
          </TouchableRipple>

          <Text className={`${adaptive.nativeWindText} text-base mt-2 ml-3`}>
            I want to{" "}
            <Text
              className={`${adaptive.nativeWindButtonText}`}
              onPress={() => {
                navigation.replace("login");
              }}
            >
              sign in!
            </Text>
          </Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

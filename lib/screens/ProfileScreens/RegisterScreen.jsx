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
import React, { useEffect, useState } from "react";
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

  const [registerIndex, setRegisterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState("");

  const transformValue = new Animated.Value(
    isTransitioning === "left" ? 30 : isTransitioning === "right" ? -30 : 1
  );
  const opacityValue = new Animated.Value(isTransitioning !== "" ? 0 : 1);
  const transitionAnimation = () => {
    Animated.spring(transformValue, {
      toValue: -30,
      useNativeDriver: true,
    }).start();
    Animated.spring(opacityValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setRegisterIndex(registerIndex + 1);
      setIsTransitioning("left");
    }, 150);
  };

  const transitionBackAnimation = () => {
    Animated.spring(transformValue, {
      toValue: 30,
      useNativeDriver: true,
    }).start();
    Animated.spring(opacityValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setRegisterIndex(registerIndex - 1);
      setIsTransitioning("right");
    }, 150);
  };

  useEffect(() => {
    if (isTransitioning !== "") {
      Animated.spring(opacityValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      Animated.spring(transformValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setIsTransitioning("");
      }, 150);
    }
  }, [transformValue, opacityValue, isTransitioning]);

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
      <View className={`${adaptive.nativeWindBackground}`}>
        {registerIndex === 0 ? (
          <RegisterOverlay1
            adaptive={adaptive}
            animatedTransitionStyle={animatedTransitionStyle}
            transitionAnimation={transitionAnimation}
            navigation={navigation}
          />
        ) : registerIndex === 1 ? (
          <RegisterOverlay2
            adaptive={adaptive}
            animatedTransitionStyle={animatedTransitionStyle}
            transitionAnimation={transitionAnimation}
            transitionBackAnimation={transitionBackAnimation}
            navigation={navigation}
          />
        ) : (
          <RegisterOverlay3
            adaptive={adaptive}
            animatedTransitionStyle={animatedTransitionStyle}
            transitionAnimation={transitionAnimation}
            transitionBackAnimation={transitionBackAnimation}
            navigation={navigation}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const RegisterOverlay3 = ({
  adaptive,
  animatedTransitionStyle,
  transitionAnimation,
  transitionBackAnimation,
  navigation,
}) => {
  return (
    <Animated.ScrollView
      className={`${adaptive.nativeWindBackground} flex`}
      contentContainerStyle={{ paddingBottom: 25 }}
      style={animatedTransitionStyle}
    >
      <Image source={YarnImage} className={`h-36 w-36 mt-5 self-center`} />
      <Text
        className={`${adaptive.nativeWindActiveNavText} mx-4 mt-6 mb-2 font-bold text-lg text-center`}
      >
        Would you like to create your own shop?
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
        <View className="flex flex-row">
          <TouchableRipple
            onPress={transitionBackAnimation}
            className={`${adaptive.nativeWindNavbar} flex-1 mt-7 mr-2 rounded-full`}
            rippleColor={adaptive.paletteColorLightOrange}
            borderless
          >
            <View className={`flex flex-row items-center justify-center`}>
              <FontAwesome5Icon
                name="arrow-left"
                size={15}
                className={`mr-5`}
                color={adaptive.textColor}
              />
              <Text
                className={`${adaptive.nativeWindText} text-base py-4 p-2 text-center font-bold`}
              >
                Back
              </Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </Animated.ScrollView>
  );
};

const RegisterOverlay2 = ({
  adaptive,
  animatedTransitionStyle,
  transitionAnimation,
  transitionBackAnimation,
  navigation,
}) => {
  return (
    <Animated.ScrollView
      className={`${adaptive.nativeWindBackground} flex`}
      contentContainerStyle={{ paddingBottom: 25 }}
      style={animatedTransitionStyle}
    >
      <Image source={YarnImage} className={`h-36 w-36 mt-5 self-center`} />
      <Text
        className={`${adaptive.nativeWindActiveNavText} mx-4 mt-6 mb-2 font-bold text-lg text-center`}
      >
        Contact Information
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
        <View className="flex flex-row">
          <TouchableRipple
            onPress={transitionBackAnimation}
            className={`${adaptive.nativeWindNavbar} flex-1 mt-7 mr-2 rounded-full`}
            rippleColor={adaptive.paletteColorLightOrange}
            borderless
          >
            <View className={`flex flex-row items-center justify-center`}>
              <FontAwesome5Icon
                name="arrow-left"
                size={15}
                className={`mr-5`}
                color={adaptive.textColor}
              />
              <Text
                className={`${adaptive.nativeWindText} text-base py-4 p-2 text-center font-bold`}
              >
                Back
              </Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={transitionAnimation}
            className={`${adaptive.nativeWindNavbar} flex-1 mt-7 rounded-full`}
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
        </View>
      </View>
    </Animated.ScrollView>
  );
};

const RegisterOverlay1 = ({
  adaptive,
  animatedTransitionStyle,
  transitionAnimation,
  navigation,
}) => {
  return (
    <Animated.ScrollView
      className={`${adaptive.nativeWindBackground} flex`}
      contentContainerStyle={{ paddingBottom: 25 }}
      style={animatedTransitionStyle}
    >
      <Image source={YarnImage} className={`h-36 w-36 mt-5 self-center`} />
      <Text
        className={`${adaptive.nativeWindActiveNavText} mx-4 mt-6 mb-2 font-bold text-lg text-center`}
      >
        Personal Information
      </Text>
      <Text className={`${adaptive.nativeWindText} text-base my-2 ml-5`}>
        If you want to sign in,{" "}
        <Text
          className={`${adaptive.nativeWindButtonText}`}
          onPress={() => {
            navigation.replace("login");
          }}
        >
          click here!
        </Text>
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
      </View>
    </Animated.ScrollView>
  );
};

export default RegisterScreen;

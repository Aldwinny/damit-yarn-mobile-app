import { View, Text, ScrollView, TextInput, Image } from "react-native";
import React from "react";
import { Button as PaperButton, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";

import YarnImage from "../../../assets/logo/DamitYarn.png";

const LoginScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);

  const adaptive = AdaptiveScheme(theme.theme);
  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Login"
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <Image source={YarnImage} className={`h-36 w-36 mt-5 self-center`} />
        <Text
          className={`${adaptive.nativeWindActiveNavText} mx-4 mt-6 mb-2 font-bold text-lg text-center`}
        >
          Welcome back, yarn!
        </Text>
        <View className={`m-4 flex-1`}>
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
          <TouchableRipple
            onPress={() => console.log("TODO: Login")}
            className={`${adaptive.nativeWindNavbar} mt-7 rounded-full`}
            rippleColor={adaptive.paletteColorLightOrange}
            borderless
          >
            <View className={``}>
              <Text
                className={`${adaptive.nativeWindText} text-base py-4 p-2 text-center font-bold`}
              >
                Login
              </Text>
            </View>
          </TouchableRipple>

          <Text className={`${adaptive.nativeWindText} text-base mt-2 ml-3`}>
            I want to{" "}
            <Text
              className={`${adaptive.nativeWindButtonText}`}
              onPress={() => {
                navigation.replace("register");
              }}
            >
              sign up!
            </Text>
          </Text>
        </View>

        {/* <Button
          title="I want to Register"
          onPress={() => navigation.replace("register")}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

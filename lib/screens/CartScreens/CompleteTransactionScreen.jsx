import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";

import logo from "../../../assets/logo/DamitYarnTextDark.png";
import { TouchableRipple } from "react-native-paper";

const CompleteTransactionScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const { items, method } = route.params;
  console.log(items, method);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Checkout"
      />
      <View className={`flex flex-col pt-32 items-center justify-center`}>
        <Image className="w-72 h-20 mb-10" source={logo} />
        <Text className={`${adaptive.nativeWindText} text-xl font-bold mx-3`}>
          Purchase Successful!
        </Text>
        <Text
          className={`${adaptive.nativeWindText} text-lg mx-4 text-center my-5`}
        >
          {
            "Your transaction has been recorded.\nThank you for using Damit Yarn!"
          }
        </Text>
        <TouchableRipple
          onPress={() => {
            navigation.popToTop();
          }}
          className={`bg-palette-orange3 py-2 px-10 rounded-md mt-10`}
        >
          <Text className={`${adaptive.nativeWindText} font-bold text-xl`}>
            Go Back
          </Text>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default CompleteTransactionScreen;

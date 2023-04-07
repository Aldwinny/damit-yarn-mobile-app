import { View, Text, ScrollView, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";

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
        <Button
          title="I want to Register"
          onPress={() => navigation.replace("register")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

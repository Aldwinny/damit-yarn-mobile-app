import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { ScrollView } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Modal } from "react-native";
import { Alert } from "react-native";

const SettingsScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  const adaptive = AdaptiveScheme(theme.theme);

  const dispatch = useDispatch();

  const [response, setResponse] = useState();
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {});

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Account Settings"
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <TouchableRipple
          onPress={() => {
            navigation.push("updateaccount");
          }}
          className={`bg-purple-500 mt-3 mx-4 py-2 rounded-lg`}
        >
          <Text className={`text-center font-bold text-white text-lg`}>
            Update my account details
          </Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            Alert.alert(
              "Are you sure?",
              "This will delete your history, records, and shop",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    navigation.push("deleteaccount");
                  },
                },
                {
                  text: "No",
                },
              ]
            );
          }}
          className={`bg-red-500 mt-3 mx-4 py-2 rounded-lg`}
        >
          <Text className={`text-center font-bold text-white text-lg`}>
            Delete my account
          </Text>
        </TouchableRipple>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

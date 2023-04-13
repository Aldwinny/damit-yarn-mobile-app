import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { TouchableRipple } from "react-native-paper";
import { useState } from "react";

const DeliveryDetailsScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const { tab } = route.params;

  const [activeTab, setActiveTab] = useState(tab);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Details"
      />

      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <ScrollView
          className={`${adaptive.nativeWindNavbar} flex flex-row`}
          horizontal={true}
        >
          <TopTabNavigationTab
            active={activeTab === "pay"}
            onPress={() => setActiveTab("pay")}
            rippleColor={adaptive.from(
              "rgba(0,0,0,0.5)",
              "rgba(255,255,255,0.5)"
            )}
          >
            <Text
              className={`text-white ${activeTab === "pay" ? "font-bold" : ""}`}
            >
              To Pay
            </Text>
          </TopTabNavigationTab>
          <TopTabNavigationTab
            active={activeTab === "ship"}
            onPress={() => setActiveTab("ship")}
            rippleColor={adaptive.from(
              "rgba(0,0,0,0.5)",
              "rgba(255,255,255,0.5)"
            )}
          >
            <Text
              className={`text-white ${
                activeTab === "ship" ? "font-bold" : ""
              }`}
            >
              To Ship
            </Text>
          </TopTabNavigationTab>
          <TopTabNavigationTab
            active={activeTab === "receive"}
            onPress={() => setActiveTab("receive")}
            rippleColor={adaptive.from(
              "rgba(0,0,0,0.5)",
              "rgba(255,255,255,0.5)"
            )}
          >
            <Text
              className={`text-white ${
                activeTab === "receive" ? "font-bold" : ""
              }`}
            >
              To Receive
            </Text>
          </TopTabNavigationTab>
          <TopTabNavigationTab
            onPress={() => setActiveTab("complete")}
            active={activeTab === "complete"}
            rippleColor={adaptive.from(
              "rgba(0,0,0,0.5)",
              "rgba(255,255,255,0.5)"
            )}
          >
            <Text
              className={`text-white ${
                activeTab === "complete" ? "font-bold" : ""
              }`}
            >
              Completed
            </Text>
          </TopTabNavigationTab>
        </ScrollView>
        <Text className={`${adaptive.nativeWindText}`}>
          Content: {activeTab}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const TopTabNavigationTab = ({
  children,
  label,
  onPress,
  rippleColor,
  active = false,
}) => {
  return (
    <TouchableRipple onPress={onPress} rippleColor={rippleColor}>
      <View
        className={`py-4 px-7 ${active ? "border-b-2 border-red-400" : ""}`}
      >
        {children ?? <Text>{label}</Text>}
      </View>
    </TouchableRipple>
  );
};

export default DeliveryDetailsScreen;

import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";

const TrendingOverlay = () => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar title="Trending" />
      <View
        className={`${adaptive.nativeWindBackground} flex-1 justify-center items-center`}
      >
        <Text className={`${adaptive.nativeWindText}`}>
          Overlay reserved for trending stuff
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TrendingOverlay;

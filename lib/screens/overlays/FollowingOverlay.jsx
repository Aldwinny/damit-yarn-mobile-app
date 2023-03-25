import React from "react";
import { Text, View } from "react-native";
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";

const FollowingOverlay = () => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

  return (
    <View
      className={`${adaptive.nativeWindBackground} flex-1 justify-center items-center`}
    >
      <Text className={`${adaptive.nativeWindText}`}>
        Overlay reserved for Followed Accounts
      </Text>
    </View>
  );
};

export default FollowingOverlay;

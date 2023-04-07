import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

import AdaptiveScheme from "../../shared/Adaptive";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";

const CartOverlay = () => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const [times, setTimes] = useState(0);

  return (
    <View
      className={`${adaptive.nativeWindBackground} flex-1 justify-center items-center`}
    >
      <Button
        icon="account-cowboy-hat"
        mode="contained"
        onPress={() => setTimes(times + 1)}
      >
        {`You've pressed me ${times} times! Yeehaw!`}
      </Button>
    </View>
  );
};

export default CartOverlay;

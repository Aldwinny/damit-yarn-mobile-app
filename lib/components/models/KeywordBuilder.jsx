import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { TouchableRipple } from "react-native-paper";

const KeywordBuilder = ({ keywords }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  return (
    <View className="flex flex-row my-3">
      {keywords.map((k, index) => (
        <KeywordChip keyword={k} key={index} />
      ))}
    </View>
  );
};

const KeywordChip = ({ keyword }) => {
  return (
    <TouchableRipple
      className={`bg-palette-orange3 rounded-full py-1 px-2 mr-2`}
      rippleColor="rgba(0,0,0,0.5)"
      onPress={() => {
        console.log(keyword);
      }}
    >
      <Text className={`text-white font-bold`}>{keyword}</Text>
    </TouchableRipple>
  );
};

export default KeywordBuilder;

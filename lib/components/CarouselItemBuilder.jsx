import { View, Text, Dimensions, ImageBackground } from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-reanimated-carousel";

import AdaptiveScheme from "../shared/Adaptive";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const CarouselItemBuilder = ({ items }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const [isVertical, setIsVertical] = useState(false);

  const progressValue = useSharedValue(0);
  const [indexor, setIndexor] = useState(1);

  return (
    <View className="items-center">
      <Carousel
        width={width}
        height={300}
        loop={items.length > 1}
        autoPlayInterval={5000}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        onScrollEnd={(index) => {
          setIndexor(index + 1);
        }}
        data={items}
        renderItem={({ index, item }) => {
          return (
            <View style={{ flex: 1, borderWidth: 1, justifyContent: "center" }}>
              <ImageBackground
                source={item.image}
                resizeMode="cover"
                style={{ flex: 1 }}
              ></ImageBackground>
            </View>
          );
        }}
      />
      {!!progressValue && (
        <View className="flex-row justify-start w-full ml-2 absolute bottom-4 left-2">
          <Text
            className="text-white px-2  rounded-full"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            {indexor.toString()} / {items.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CarouselItemBuilder;

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

const CarouselBuilder = ({ items }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const [isVertical, setIsVertical] = useState(false);

  const progressValue = useSharedValue(0);

  return (
    <View className="items-center">
      <Carousel
        width={width}
        height={175}
        loop
        autoPlay={true}
        autoPlayInterval={5000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        data={items}
        renderItem={({ index, item }) => {
          return (
            <View style={{ flex: 1, borderWidth: 1, justifyContent: "center" }}>
              <ImageBackground
                source={item.image}
                resizeMode="cover"
                style={{ flex: 1 }}
              >
                <View
                  className={`flex-1 ${adaptive.from(
                    "bg-overlay-blackStrong",
                    ""
                  )}`}
                >
                  <Text
                    className={`${adaptive.nativeWindCarouselTitle} font-bold mt-auto ml-3 text-left text-lg`}
                  >
                    {item.title}
                  </Text>
                  <Text
                    className={`${adaptive.nativeWindCarouselSubtitle} text-left mb-5 ml-3`}
                  >
                    {item.description}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          );
        }}
      />
      {!!progressValue && (
        <View className="flex-row justify-start w-full ml-2 absolute bottom-2 left-0">
          {items.map((_, index) => {
            return (
              <PaginationItem
                backgroundColor="#E8632B"
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={isVertical}
                length={items.length}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const PaginationItem = ({
  animValue,
  index,
  length,
  backgroundColor,
  isRotate,
}) => {
  const width = 12;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      className="ml-1 rounded-full overflow-hidden"
      style={{
        backgroundColor: "#C0C0C0",
        width,
        height: width - 7,
        transform: [
          {
            rotateZ: isRotate ? "90deg" : "0deg",
          },
        ],
      }}
    >
      <Animated.View
        className="rounded-full flex-1"
        style={[
          {
            backgroundColor,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default CarouselBuilder;

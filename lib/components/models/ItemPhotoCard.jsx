import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";
import { TouchableOpacity } from "react-native-gesture-handler";

import AntDesign from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get("window");

const ItemPhotoCard = ({ image, stars, shopName, onPress }) => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`${adaptive.nativeWindBackground} p-3 my-1 mx-0.5 rounded-md flex flex-column`}
        style={{
          width: width / 3.2,
          height: width / 2.8,
        }}
      >
        <Image
          resizeMode="contain"
          className="rounded-md h-full w-full"
          style={{
            width: "100%",
            height: "80%",
          }}
          source={image}
        />
        <View className="flex flex-row items-center mt-2">
          <AntDesign name="star" color={adaptive.paletteColorYellow} />
          <Text
            className={`${adaptive.nativeWindText} mr-2`}
            style={{
              fontSize: 9,
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {` ${stars.toFixed(1)} · ${shopName}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemPhotoCard;

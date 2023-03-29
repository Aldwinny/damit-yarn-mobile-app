import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";
import { TouchableOpacity } from "react-native-gesture-handler";

import AntDesign from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get("window");

const ItemCard = ({ item, onPress }) => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`${adaptive.nativeWindNavbar} p-3 my-1 mx-0.5 rounded-md flex flex-row border-palette-orange2 border-2 w-full`}
        style={{
          width: width - 10,
          height: width / 2.8,
        }}
      >
        <Image
          resizeMode="contain"
          className="rounded-md h-full w-full"
          style={{
            width: width / 3.5,

            height: width / 3.5,
          }}
          source={item.image}
        />
        <View className="flex flex-col">
          <Text>{item.shopName}</Text>
          <Text>HIUHSIUHSIH</Text>
          <Text>HIUHSIUHSIH</Text>
          <Text>HIUHSIUHSIH</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

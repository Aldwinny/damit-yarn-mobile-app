import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";
import { TouchableOpacity } from "react-native-gesture-handler";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { numberCompactor } from "../../utils/formatter";

const { width } = Dimensions.get("window");

const ItemCard = ({
  item,
  onPress,
  borderColor = "#E5855B",
  textColor = "#E5855B",
  iconColor = "#EAD72C",
}) => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`${adaptive.nativeWindNavbar} p-3 my-1 mx-0.5 rounded-md flex flex-row border-2 w-full`}
        style={{
          width: width - 10,
          height: width / 2.8,
          borderColor: borderColor,
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
        <View className="flex flex-col ml-2">
          <Text className={`${adaptive.nativeWindText} font-bold mb-1`}>
            {item.shopName}
          </Text>
          <Text
            className={`text-base font-bold mb-auto`}
            style={{
              color: textColor,
            }}
          >
            {new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(item.price)}
          </Text>
          <View className="flex flex-row">
            <AntDesign
              name="star"
              color={iconColor}
              size={15}
              style={{
                textAlignVertical: "center",
                marginRight: 3,
              }}
            />
            <Text className={`${adaptive.nativeWindText}`}>
              {item.stars.toFixed(1)} · {item.shopName}
            </Text>
          </View>
          <View className="flex flex-row">
            <FontAwesome5
              name="box"
              color={iconColor}
              size={13}
              style={{
                textAlignVertical: "center",
                marginRight: 3,
              }}
            />
            <Text className={`${adaptive.nativeWindText}`}>
              {numberCompactor(item.sold)} sold
            </Text>
          </View>
          <View className="flex flex-row">
            <MaterialIcons
              name="location-on"
              color={iconColor}
              size={15}
              style={{
                textAlignVertical: "center",
                marginRight: 3,
              }}
            />
            <Text className={`${adaptive.nativeWindText}`}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

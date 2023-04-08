import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import AdaptiveScheme from "../../shared/Adaptive";
import { TouchableOpacity } from "react-native-gesture-handler";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { formatCurrency, numberCompactor } from "../../utils/formatter";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const ItemCard = ({
  item,
  onPress,
  borderColor = "#E5855B",
  textColor = "#E5855B",
  iconColor = "#EAD72C",
}) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

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
        <View className="flex-1 flex-col ml-2 w-full">
          <Text
            className={`${adaptive.nativeWindText} font-bold mb-1`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            className={`text-base font-bold mb-auto`}
            style={{
              color: textColor,
            }}
          >
            {formatCurrency(item.price)}
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

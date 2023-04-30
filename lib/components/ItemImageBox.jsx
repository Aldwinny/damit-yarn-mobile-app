import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableRipple } from "react-native-paper";

const ItemImageBox = ({
  image,
  adaptive,
  onPress,
  onPressDelete,
  hideOnSingleInstance,
}) => {
  if (image) {
    return (
      <View className={`flex flex-col justify-center items-center`}>
        <TouchableOpacity
          onPress={onPress}
          className={`border-2 border-dashed border-palette-blue flex justify-center items-center`}
        >
          <Image source={{ uri: image }} className={`w-24 h-24 `} />
        </TouchableOpacity>
        {!hideOnSingleInstance && (
          <TouchableRipple
            className={`w-10 h-10 flex justify-center items-center bg-red-500 rounded-full mt-3`}
            onPress={onPressDelete}
          >
            <Ionicons name="close-outline" size={30} color={"white"} />
          </TouchableRipple>
        )}
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`w-24 h-24 border-2 border-dashed border-palette-orange2 flex justify-center items-center`}
      >
        <Ionicons name="add" size={40} color={adaptive.palettedIconColor} />
      </View>
    </TouchableOpacity>
  );
};

export default ItemImageBox;

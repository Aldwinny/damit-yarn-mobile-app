import { View, Text } from "react-native";
import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const NavLink = ({ onPress, children, iconStyle, color, nativeWind }) => {
  if (onPress !== undefined) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={`flex flex-row ${
          nativeWind !== undefined ? nativeWind : ""
        }`}
      >
        <Text
          className="text-xl"
          style={{
            color: color,
          }}
        >
          {children}
        </Text>
        {onPress !== undefined ? (
          <MaterialIcons
            name="arrow-forward-ios"
            size={25}
            color={color}
            style={{
              ...iconStyle,
              textAlignVertical: "center",
              marginTop: 2,
            }}
          />
        ) : (
          ""
        )}
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        onPress={onPress}
        className={`${nativeWind !== undefined ? nativeWind : ""}`}
      >
        <Text
          className="text-xl"
          style={{
            color: color,
          }}
        >
          {children}
        </Text>
      </View>
    );
  }
};

export default NavLink;

import { View, Text, TouchableOpacity } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import React from "react";
import AdaptiveScheme from "../shared/Adaptive";
import { useSelector } from "react-redux";

const Navbar = ({
  action,
  actionLabel = "Back",
  icon,
  actionButtonOverride,
  title,
  children,
}) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const navBarIcon = icon ?? (
    <MaterialIcons
      name="arrow-back-ios"
      style={{ marginLeft: 25 }}
      size={25}
      color={adaptive.activeIconColor}
    />
  );

  return (
    <View
      className={`${
        adaptive.nativeWindNavbar
      } flex flex-row flex-wrap items-center ${
        action !== undefined ? "py-5" : "h-16"
      }`}
    >
      {children ?? actionButtonOverride !== undefined ? (
        actionButtonOverride
      ) : action !== undefined ? (
        <TouchableOpacity
          onPress={action}
          className={`${adaptive.nativeWindText} flex flex-row align-center`}
        >
          {navBarIcon}
          <Text
            className={`${adaptive.nativeWindButtonText} text-xl font-bold`}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
      {title !== undefined ? (
        <Text
          className={`${adaptive.nativeWindNavText} font-bold text-xl mx-auto absolute top-5 left-0 right-0 text-center -z-10`}
        >
          {title}
        </Text>
      ) : (
        ""
      )}
    </View>
  );
};

export default Navbar;

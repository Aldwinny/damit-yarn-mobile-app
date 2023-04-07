import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import AdaptiveScheme from "../../shared/Adaptive";
import { useSelector } from "react-redux";

const TabBars = ({ state, descriptors, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  return (
    <View
      className={`flex-row ${
        theme.theme === "dark" ? "bg-darkPalette-4" : "bg-palette-orange2"
      }`}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const Icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon({
                color: isFocused
                  ? adaptive.activeIconColor
                  : adaptive.iconColor,
                style: { textAlign: "center", marginVertical: 3 },
              })
            : "";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 p-2 justify-end"
            key={route.key}
          >
            {Icon}
            <Text
              className={`${
                isFocused
                  ? adaptive.nativeWindActiveNavText
                  : adaptive.nativeWindNavText
              } text-center`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBars;

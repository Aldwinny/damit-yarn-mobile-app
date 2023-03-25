import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import useGlobalScheme from "../../hooks/UseGlobalScheme";

const TabBars = ({ state, descriptors, navigation }) => {
  const [globalScheme] = useGlobalScheme();

  const adaptiveColor = globalScheme === "dark" ? "#C0C0C0" : "#fff";
  const adaptiveActiveColor = globalScheme === "dark" ? "#E5855B" : "#fff";
  const adaptiveActiveClassName =
    globalScheme === "dark" ? "text-palette-orange2" : "text-white font-bold";
  const adaptiveClassName =
    globalScheme === "dark" ? "text-darkPalette-2" : "text-white";

  return (
    <View
      className={`flex-row ${
        globalScheme === "dark" ? "bg-darkPalette-4" : "bg-palette-orange2"
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
                color: isFocused ? adaptiveActiveColor : adaptiveColor,
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
                isFocused ? adaptiveActiveClassName : adaptiveClassName
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

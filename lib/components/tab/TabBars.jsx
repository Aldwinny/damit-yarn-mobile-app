import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AdaptiveView from "../adaptive/AdaptiveView";
import AdaptiveText from "../adaptive/AdaptiveText";

const TabBars = ({ state, descriptors, navigation }) => {
  const adaptiveColor = global.scheme === "light" ? "#C0C0C0" : "#000";
  return (
    <AdaptiveView classNames="flex-row bg-darkPalette-4">
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
                color: isFocused ? "#E5855B" : adaptiveColor,
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
            <AdaptiveText
              classNames={`${
                isFocused ? "text-palette-orange2" : "text-darkPalette-2"
              } text-center`}
            >
              {label}
            </AdaptiveText>
          </TouchableOpacity>
        );
      })}
    </AdaptiveView>
  );
};

export default TabBars;

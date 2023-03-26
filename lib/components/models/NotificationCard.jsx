import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Notification } from "../../services/models/notification";
import React from "react";
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";

const NotificationCard = ({
  hint,
  notification,
  icon,
  title,
  description,
  isNew,
  color,
}) => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

  const notif =
    notification ??
    new Notification({
      hint: hint,
      icon: icon,
      title: title,
      description: description,
      isNew: isNew,
      color: color,
    });

  return (
    <TouchableOpacity>
      <View
        className={`${adaptive.nativeWindNavbar} rounded-lg w-11/12 px-3 h-24 flex flex-row justify-center items-center mt-3`}
      >
        {notif.icon}
        <View className={`flex-1 flex-column`}>
          <Text
            className={`${adaptive.nativeWindText} font-bold text-lg`}
            style={{ color: notif.color }}
            numberOfLines={1}
            ellipsisMode="tail"
          >
            {notif.title}
          </Text>
          <Text
            className={`${adaptive.nativeWindText} text-base text-ellipsis`}
            numberOfLines={2}
            ellipsisMode="tail"
            classNameDark="text-darkPalette-2"
          >
            {notif.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

import { View, Text, TouchableOpacity } from "react-native";
import { Notification } from "../../services/models/notification";
import React from "react";
import AdaptiveText from "../adaptive/AdaptiveText";
import AdaptiveView from "../adaptive/AdaptiveView";

const NotificationCard = ({
  hint,
  notification,
  icon,
  title,
  description,
  isNew,
  color,
}) => {
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
      <AdaptiveView classNames="bg-darkPalette-4 rounded-lg w-11/12 px-3 h-24 flex flex-row justify-center items-center mt-3">
        {notif.icon}
        <AdaptiveView
          classNames="flex-1 flex-column"
          classNameDark="bg-darkPalette-4"
        >
          <AdaptiveText
            classNames="font-bold text-lg"
            style={{ color: notif.color }}
            numberOfLines={1}
            ellipsisMode="tail"
          >
            {notif.title}
          </AdaptiveText>
          <AdaptiveText
            classNames="text-base text-ellipsis"
            numberOfLines={2}
            ellipsisMode="tail"
            classNameDark="text-darkPalette-2"
          >
            {notif.description}
          </AdaptiveText>
        </AdaptiveView>
      </AdaptiveView>
    </TouchableOpacity>
  );
};

export default NotificationCard;

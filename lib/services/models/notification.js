import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

/**
 * A notification builds with the following properties:
 * 1. icon - The icon displayed on the side of the notification box
 * 2. title - The title of the notification
 * 3. description - the information about the notification
 * 4. isNew - a boolean on whether the notification has been opened or not
 * 5. color - The color of the notification (based on whether its promotional, new shop posting, etc..)
 *
 */

// Originally, i was thinking of adding a colorblind support but.... ¯\_(ツ)_/¯
export let NotificationTheme = {
  normal: "#E5855B",
  promotional: "#E82BAF",
  update: global.scheme === "light" ? "#EAD72C" : "#63B93B",
  delivered: "#63B93B",
};

export let NotificationIcons = {
  normal: (color = NotificationTheme.normal, size = 35) => (
    <MaterialCommunityIcons
      name="bell"
      size={size}
      color={color}
      style={{ textAlignVertical: "center", padding: 7, marginEnd: 10 }}
    />
  ),
  promotional: (color = NotificationTheme.promotional, size = 35) => (
    <Entypo
      name="shop"
      size={size}
      color={color}
      style={{ textAlignVertical: "center", padding: 7, marginEnd: 10 }}
    />
  ),
  update: (color = NotificationTheme.update, size = 35) => (
    <MaterialCommunityIcons
      name="package-variant"
      size={size}
      color={color}
      style={{ textAlignVertical: "center", padding: 7, marginEnd: 10 }}
    />
  ),
  updateShipping: (color = NotificationTheme.update, size = 35) => (
    <MaterialCommunityIcons
      name="truck-delivery"
      size={size}
      color={color}
      style={{ textAlignVertical: "center", padding: 7, marginEnd: 10 }}
    />
  ),
  updateShippingOverseas: (color = NotificationTheme.update, size = 35) => (
    <MaterialCommunityIcons
      name="sail-boat"
      size={size}
      color={color}
      style={{ textAlignVertical: "center", padding: 7, marginEnd: 10 }}
    />
  ),
};

export function Notification({
  id,
  hint = "normal",
  icon,
  title = "Title",
  description = "No description added..",
  isNew = false,
  color,
}) {
  this.id = id;
  this.hint = hint;
  this.title = title;
  this.description = description;
  this.isNew = isNew;

  if (icon === undefined) {
    switch (hint) {
      case "update":
        this.color = NotificationTheme.delivered;
        this.icon = NotificationIcons.update(this.color);
        break;
      case "promotional":
        this.color = NotificationTheme.promotional;
        this.icon = NotificationIcons.promotional(this.color);
        break;
      case "delivery":
        this.color = NotificationTheme.update;
        this.icon = NotificationIcons.updateShipping(this.color);
        break;
      case "overseas":
        this.color = NotificationTheme.update;
        this.icon = NotificationIcons.updateShippingOverseas(this.color);
        break;
      default:
        this.color = NotificationTheme.normal;
        this.icon = NotificationIcons.normal(this.color);
        break;
    }
  } else {
    this.icon = icon;
  }
}

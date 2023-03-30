// Packages
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Local Components
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";
import { User } from "../../services/models/User";

// Asset imports
import DefaultImage from "../../../assets/images/avatar/avatar_male.png";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavLink from "../../components/NavLink";
import IconBarButton from "../../components/IconBarButton";

const user = new User({ firstname: "Alds" });

const ProfileOverlay = ({ navigation }) => {
  const [globalScheme, setGlobalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

  const profileColor = adaptive.from("bg-darkPalette-4", "bg-palette-orange2");

  return (
    <SafeAreaView className={`${profileColor} flex-1`}>
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <View className={`${profileColor} flex items-center`}>
          <Image
            source={user.image}
            className={`rounded-full m-10 mb-3 h-32 w-32`}
            resizeMode="cover"
          />
          {globalScheme === "dark" ? (
            <Ionicons
              name="moon"
              size={25}
              color={adaptive.paletteColorYellow}
              onPress={() => {
                setGlobalScheme(globalScheme === "dark" ? "light" : "dark");
              }}
              style={{
                position: "absolute",
                right: 20,
                top: 20,
              }}
            />
          ) : (
            <Ionicons
              name="sunny"
              size={25}
              color={adaptive.paletteColorYellow}
              onPress={() => {
                setGlobalScheme(globalScheme === "dark" ? "light" : "dark");
              }}
              style={{
                position: "absolute",
                right: 20,
                top: 20,
              }}
            />
          )}
          <Text
            className={`${adaptive.nativeWindActiveNavText} text-xl font-bold mb-1`}
          >
            Hello, {user.username}!
          </Text>
          <Text className={`${adaptive.nativeWindText} text-sm mb-7`}>
            Anything you want to do?
          </Text>
        </View>

        <NavLink
          color={adaptive.textColor}
          nativeWind="ml-3 mt-3"
          textNativeWind="font-bold"
        >
          Purchases
        </NavLink>
        <IconBarButton
          icon={
            <FontAwesome5
              name="history"
              size={25}
              color={adaptive.palettedIconColor}
            />
          }
          nativeWind={`border-t mt-3`}
          onPress={() =>
            navigation.navigate("categorized", {
              category: "history",
            })
          }
        >
          Purchase History
        </IconBarButton>
        <IconBarButton
          icon={
            <Ionicons name="eye" size={25} color={adaptive.palettedIconColor} />
          }
          onPress={() =>
            navigation.navigate("categorized", {
              category: "recent",
            })
          }
        >
          Recently Viewed
        </IconBarButton>
        <IconBarButton
          icon={
            <AntDesign
              name="heart"
              size={25}
              color={adaptive.palettedIconColor}
            />
          }
          onPress={() =>
            navigation.navigate("categorized", {
              category: "liked",
            })
          }
        >
          Liked
        </IconBarButton>
        <NavLink
          color={adaptive.textColor}
          nativeWind="ml-3 mt-3"
          textNativeWind="font-bold"
        >
          General
        </NavLink>
        <IconBarButton
          icon={
            <MaterialIcons
              name="account-circle"
              size={25}
              color={adaptive.palettedIconColor}
            />
          }
          nativeWind={"border-t mt-3"}
          onPress={() => navigation.navigate("settings")}
        >
          Account Settings
        </IconBarButton>
        <IconBarButton onPress={() => navigation.navigate("faq")}>
          Frequently Asked Questions
        </IconBarButton>
        <IconBarButton
          icon={
            <FontAwesome5
              name="dev"
              size={25}
              color={adaptive.palettedIconColor}
            />
          }
          onPress={() => navigation.navigate("about")}
        >
          About the developer
        </IconBarButton>
        <IconBarButton
          icon={
            <AntDesign
              name="logout"
              size={25}
              color={adaptive.palettedIconColor}
            />
          }
          nativeWind={"border-y"}
          onPress={() => console.log("Hmmm")}
        >
          Log out
        </IconBarButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileOverlay;

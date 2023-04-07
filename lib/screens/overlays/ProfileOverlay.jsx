// Packages
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Local Components
import AdaptiveScheme from "../../shared/Adaptive";
import { User } from "../../services/models/User";

// Asset imports
import DefaultImage from "../../../assets/images/avatar/avatar_male.png";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavLink from "../../components/NavLink";
import IconBarButton from "../../components/IconBarButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../shared/redux/themeSlice";
import { TouchableRipple } from "react-native-paper";

/**
 * Steps
 * 1. Get user from database after logging in
 * 2. Apply user as object
 * 3. Resolve all things
 */

// let user = new User({firstname: "Alds"});
let user;

const ProfileOverlay = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const adaptive = AdaptiveScheme(theme.theme);

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  const profileColor = adaptive.from("bg-darkPalette-4", "bg-palette-orange2");

  return (
    <SafeAreaView className={`${profileColor} flex-1`}>
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <View className={`${profileColor} flex items-center`}>
          <Image
            source={user?.image ?? DefaultImage}
            className={`rounded-full m-10 mb-3 h-32 w-32`}
            resizeMode="cover"
          />
          <TouchableRipple
            onPress={changeTheme}
            className="p-2 rounded-full"
            rippleColor="rgba(0, 0, 0, .32)"
            borderless={true}
            style={{
              position: "absolute",
              right: 20,
              top: 20,
            }}
          >
            {theme.theme === "dark" ? (
              <Ionicons
                name="moon"
                size={25}
                color={adaptive.paletteColorYellow}
              />
            ) : (
              <Ionicons
                name="sunny"
                size={25}
                color={adaptive.paletteColorYellow}
              />
            )}
          </TouchableRipple>
          <Text
            className={`${adaptive.nativeWindActiveNavText} text-xl font-bold mb-1`}
          >
            Hello, {user?.username ?? "User"}!
          </Text>
          <Text className={`${adaptive.nativeWindText} text-sm mb-7`}>
            {user === undefined
              ? "Please login to use all features"
              : "Anything you want to do?"}
          </Text>
        </View>

        <NavLink
          color={adaptive.palettedIconColor}
          nativeWind="ml-3 mt-3"
          textNativeWind="font-bold"
        >
          Purchases
        </NavLink>
        <IconBarButton
          icon={
            <FontAwesome5 name="history" size={25} color={adaptive.iconColor} />
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
          icon={<Ionicons name="eye" size={25} color={adaptive.iconColor} />}
          onPress={() =>
            navigation.navigate("categorized", {
              category: "recent",
            })
          }
        >
          Recently Viewed
        </IconBarButton>
        <IconBarButton
          icon={<AntDesign name="heart" size={25} color={adaptive.iconColor} />}
          onPress={() =>
            navigation.navigate("categorized", {
              category: "liked",
            })
          }
        >
          Liked
        </IconBarButton>
        <NavLink
          color={adaptive.palettedIconColor}
          nativeWind="ml-3 mt-3"
          textNativeWind="font-bold"
        >
          General
        </NavLink>
        {user === undefined ? (
          <IconBarButton
            icon={
              <AntDesign name="login" size={25} color={adaptive.iconColor} />
            }
            nativeWind={"border-t mt-3"}
            onPress={() => navigation.navigate("login")}
          >
            Login
          </IconBarButton>
        ) : (
          ""
        )}

        <IconBarButton
          icon={
            <MaterialIcons
              name="account-circle"
              size={25}
              color={adaptive.iconColor}
            />
          }
          nativeWind={`border-t ${user === undefined ? "" : "mt-3"}`}
          onPress={() => navigation.navigate("settings")}
        >
          Account Settings
        </IconBarButton>
        <IconBarButton
          color={adaptive.iconColor}
          onPress={() => navigation.navigate("faq")}
        >
          Frequently Asked Questions
        </IconBarButton>
        <IconBarButton
          icon={
            <FontAwesome5 name="dev" size={25} color={adaptive.iconColor} />
          }
          onPress={() => navigation.navigate("about")}
        >
          About the developer
        </IconBarButton>
        {user !== undefined ? (
          <IconBarButton
            icon={
              <AntDesign name="logout" size={25} color={adaptive.iconColor} />
            }
            nativeWind={"border-y"}
            onPress={() => console.log("Hmmm")}
          >
            Log out
          </IconBarButton>
        ) : (
          ""
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileOverlay;

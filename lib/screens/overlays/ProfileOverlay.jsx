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

// Asset imports
import DefaultImage from "../../../assets/images/avatar/avatar_male.png";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavLink from "../../components/NavLink";
import IconBarButton from "../../components/IconBarButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../shared/redux/themeSlice";
import { TouchableRipple } from "react-native-paper";
import SquareButton from "../../components/SquareButton";
import { logOut } from "../../shared/redux/userSlice";

/**
 * Steps
 * 1. Get user from database after logging in
 * 2. Apply user as object
 * 3. Resolve all things
 */

// let user = new User({ firstname: "Alds" });

const ProfileOverlay = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const adaptive = AdaptiveScheme(theme.theme);

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  const removeAccount = () => {
    dispatch(logOut());
    console.log("dispatched");
    console.log(user);
  };

  console.log(user);

  const profileColor = adaptive.from("bg-darkPalette-4", "bg-palette-orange2");

  return (
    <SafeAreaView className={`${profileColor} flex-1`}>
      <ScrollView
        className={`${adaptive.nativeWindSoftBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <View className={`${profileColor} flex items-center`}>
          <Image
            source={user?.image ? { uri: user.image } : DefaultImage}
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
            Hello, {user.token === "" ? "User" : user.username}
          </Text>
          <Text className={`text-white text-sm mb-7`}>
            {user.token === ""
              ? "Please login to access all features"
              : "Anything you want to do?"}
          </Text>
        </View>

        {/* <NavLink
          color={adaptive.palettedIconColor}
          nativeWind="ml-3 mt-3"
          textNativeWind="font-bold"
        >
          Shipping
        </NavLink>

        <View className="flex flex-row justify-center items-center mt-3">
          <SquareButton
            adaptive={adaptive}
            title="To Pay"
            onPress={() =>
              navigation.push("details", {
                tab: "pay",
              })
            }
            icon={
              <MaterialIcons
                name="payment"
                size={30}
                color={adaptive.iconColor}
              />
            }
          />
          <Text className={`${adaptive.nativeWindText} text-5xl`}>·</Text>
          <SquareButton
            adaptive={adaptive}
            title="To Ship"
            onPress={() =>
              navigation.push("details", {
                tab: "ship",
              })
            }
            icon={
              <MaterialIcons
                name="directions-ferry"
                size={30}
                color={adaptive.iconColor}
              />
            }
          />
          <Text className={`${adaptive.nativeWindText} text-5xl`}>·</Text>
          <SquareButton
            adaptive={adaptive}
            title="To Receive"
            onPress={() =>
              navigation.push("details", {
                tab: "receive",
              })
            }
            icon={
              <MaterialIcons
                name="local-shipping"
                size={30}
                color={adaptive.iconColor}
              />
            }
          />
        </View> */}

        <NavLink
          color={adaptive.palettedIconColor}
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
              color={adaptive.iconSoftColor}
            />
          }
          nativeWind={`border-t mt-3`}
          onPress={() => {
            if (user.id === 0) {
              Alert.alert("Login", "Please log in first!");
              return;
            }
            navigation.navigate("categorized", {
              category: "history",
            });
          }}
        >
          Purchase History
        </IconBarButton>
        <IconBarButton
          icon={
            <AntDesign name="heart" size={25} color={adaptive.iconSoftColor} />
          }
          onPress={() => {
            if (user.id === 0) {
              Alert.alert("Login", "Please log in first!");
              return;
            }
            navigation.navigate("categorized", {
              category: "liked",
            });
          }}
        >
          Liked
        </IconBarButton>
        {user.token !== "" && user.shopid ? (
          <>
            <NavLink
              color={adaptive.palettedIconColor}
              nativeWind="ml-3 mt-3"
              textNativeWind="font-bold"
            >
              Shop Maintenance
            </NavLink>
            <IconBarButton
              icon={
                <AntDesign
                  name="login"
                  size={25}
                  color={adaptive.iconSoftColor}
                />
              }
              nativeWind={"border-t mt-3"}
              onPress={() => navigation.navigate("modifyitem")}
            >
              Modify / Add Items
            </IconBarButton>
          </>
        ) : (
          ""
        )}

        <NavLink
          color={adaptive.palettedIconColor}
          nativeWind="ml-3 mt-3"
          textNativeWind="font-bold"
        >
          General
        </NavLink>
        {user.token === "" ? (
          <IconBarButton
            icon={
              <AntDesign
                name="login"
                size={25}
                color={adaptive.iconSoftColor}
              />
            }
            nativeWind={"border-t mt-3"}
            onPress={() => navigation.navigate("login")}
          >
            Login / Register
          </IconBarButton>
        ) : (
          <IconBarButton
            icon={
              <MaterialIcons
                name="account-circle"
                size={25}
                color={adaptive.iconSoftColor}
              />
            }
            nativeWind={`border-t ${user.token === "" ? "" : "mt-3"}`}
            onPress={() => navigation.navigate("settings")}
          >
            Account Settings
          </IconBarButton>
        )}

        <IconBarButton
          color={adaptive.iconSoftColor}
          onPress={() => navigation.navigate("faq")}
        >
          Frequently Asked Questions
        </IconBarButton>
        <IconBarButton
          icon={
            <FontAwesome5 name="dev" size={25} color={adaptive.iconSoftColor} />
          }
          onPress={() => navigation.navigate("about")}
        >
          About the developer
        </IconBarButton>
        {user.token !== "" ? (
          <IconBarButton
            icon={
              <AntDesign
                name="logout"
                size={25}
                color={adaptive.iconSoftColor}
              />
            }
            nativeWind={"border-y"}
            onPress={removeAccount}
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

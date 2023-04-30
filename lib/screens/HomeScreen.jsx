import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, { useEffect } from "react";
import HomeOverlay from "./overlays/HomeOverlay";
import TrendingOverlay from "./overlays/TrendingOverlay";
import CartOverlay from "./overlays/CartOverlay";
import ProfileOverlay from "./overlays/ProfileOverlay";
import TabBars from "../components/tab/TabBars";

import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import AdaptiveScheme from "../shared/Adaptive";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  return (
    <>
      <Tab.Navigator
        initialRouteName={
          global.debug ? global.debugOverlayScreen : "HomeOverlay"
        }
        screenOptions={{
          headerShown: false,
          lazy: true,
        }}
        tabBar={(props) => <TabBars {...props} />}
      >
        <Tab.Screen
          name="HomeOverlay"
          component={HomeOverlay}
          options={{
            lazy: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size, style }) => (
              <Ionicons
                name="home"
                color={color}
                size={size ?? 25}
                style={style}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TrendingOverlay"
          component={TrendingOverlay}
          options={{
            tabBarLabel: "Trending",
            tabBarIcon: ({ color, size, style }) => (
              <Feather
                name="trending-up"
                color={color}
                size={size ?? 25}
                style={style}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CartOverlay"
          component={CartOverlay}
          options={{
            tabBarLabel: "Cart",
            tabBarIcon: ({ color, size, style }) => (
              <MaterialIcons
                name="shopping-cart"
                color={color}
                size={size ?? 25}
                style={style}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileOverlay"
          component={ProfileOverlay}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size, style }) => (
              <FontAwesomeIcon
                name="user-circle"
                color={color}
                size={size ?? 25}
                style={style}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style={adaptive.from("light", "dark")} />
    </>
  );
};

export default HomeScreen;

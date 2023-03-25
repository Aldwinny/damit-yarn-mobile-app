import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";
import HomeOverlay from "./overlays/HomeOverlay";
import TrendingOverlay from "./overlays/TrendingOverlay";
import CartOverlay from "./overlays/CartOverlay";
import FollowingOverlay from "./overlays/FollowingOverlay";
import ProfileOverlay from "./overlays/ProfileOverlay";
import TabBars from "../components/tab/TabBars";

import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeOverlay"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBars {...props} />}
    >
      <Tab.Screen
        name="HomeOverlay"
        component={HomeOverlay}
        options={{
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
        name="FollowingOverlay"
        component={FollowingOverlay}
        options={{
          tabBarLabel: "Following",
          tabBarIcon: ({ color, size, style }) => (
            <Entypo name="shop" color={color} size={size ?? 25} style={style} />
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
  );
};

export default HomeScreen;

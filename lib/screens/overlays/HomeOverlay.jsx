import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "../../../assets/logo/DamitYarnTextDark.png";
import logo2 from "../../../assets/logo/DamitYarnTextLight.png";
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";
import CarouselBuilder from "../../components/CarouselBuilder";

import defaultFeaturedImage from "../../../assets/images/temp/bg-features.jpg";

const featuredItems = [
  {
    image: defaultFeaturedImage,
    title: "It's Autumn Clothing Month!",
    description: "Check out our warm clothes to prepare you for winter!",
  },
  {
    image: defaultFeaturedImage,
    title: "It's another carousel item",
    description: "I don't know what to put in here!",
  },
  {
    image: defaultFeaturedImage,
    title: "It's Autumn Clothing Month!",
    description: "I also don't know what to put in here!",
  },
];

const HomeOverlay = ({ navigation }) => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar}`}>
      <View
        className={`${adaptive.nativeWindNavbar} flex flex-row flex-nowrap items-center py-2`}
      >
        <Image
          className="h-16 w-36 ml-2"
          resizeMode="contain"
          source={globalScheme === "dark" ? logo : logo2}
        />

        <TouchableOpacity
          onPress={() => {
            console.log("Message has been clicked!!!");
          }}
          className={`${adaptive.nativeWindText} ml-auto`}
        >
          <Ionicons
            name="ios-chatbox-ellipses"
            color={adaptive.iconColor}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("notifications");
          }}
          className={`${adaptive.nativeWindText} mx-3`}
        >
          <MaterialCommunityIcons
            name="bell"
            color={adaptive.iconColor}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Search has been clicked!!!");
          }}
          className={`${adaptive.nativeWindText} mr-3`}
        >
          <Ionicons name="search" color={adaptive.iconColor} size={25} />
        </TouchableOpacity>
      </View>
      <CarouselBuilder items={featuredItems} />
      <View className={`${adaptive.nativeWindBackground} h-full flex`}>
        <View></View>
        <Text className={`${adaptive.nativeWindText}`}>Trending</Text>
        <Text className={`${adaptive.nativeWindText}`}>Following</Text>
        <Text className={`${adaptive.nativeWindText}`}>More Products</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeOverlay;

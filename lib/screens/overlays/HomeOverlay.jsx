import React from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "../../../assets/logo/DamitYarnTextDark.png";
import logo2 from "../../../assets/logo/DamitYarnTextLight.png";
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";
import CarouselBuilder from "../../components/CarouselBuilder";

import defaultFeaturedImage from "../../../assets/images/temp/bg-features.jpg";
import defaultItemImage from "../../../assets/images/temp/bg-item.png";
import NavLink from "../../components/NavLink";
import ItemPhotoCard from "../../components/models/ItemPhotoCard";
import ItemCard from "../../components/models/ItemCard";
import { StatusBar } from "expo-status-bar";

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

const trendingItems = [
  {
    id: 1,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The Crocheteers",
  },
  {
    id: 2,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "Clothes Society",
  },
  {
    id: 3,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "Wanna Wear Shirt Shop",
  },
  {
    id: 4,
    image: defaultItemImage,
    stars: 5,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "Puppeteers and Toys",
  },
  {
    id: 5,
    image: defaultItemImage,
    stars: 5,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "Idealists & Artisans",
  },
  {
    id: 6,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
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
      <ScrollView
        className={`${adaptive.nativeWindBackground} h-full`}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <CarouselBuilder items={featuredItems} />
        <View className={`${adaptive.nativeWindNavbar} h-full flex-1`}>
          <NavLink
            onPress={() => {
              navigation.navigate("TrendingOverlay");
            }}
            color={adaptive.paletteColorOrange}
            nativeWind="ml-3 mt-3"
          >
            Trending
          </NavLink>
          <View className="flex flex-wrap flex-row mt-2 my-3 w-full items-center justify-center">
            {trendingItems.map((item) => {
              return (
                <ItemPhotoCard
                  key={item.id}
                  image={item.image}
                  shopName={item.shopName}
                  stars={item.stars}
                />
              );
            })}
          </View>

          <View className={`${adaptive.nativeWindBackground} flex-1 mt-3`}>
            <NavLink
              onPress={() => {
                navigation.navigate("FollowingOverlay");
              }}
              color={adaptive.paletteColorPink}
              nativeWind="ml-3 mt-3"
            >
              Following
            </NavLink>
            <View
              className={`flex flex-wrap flex-row mt-2 my-3 w-full items-center justify-center`}
            >
              {trendingItems.map((item) => {
                return (
                  <ItemPhotoCard
                    key={item.id}
                    image={item.image}
                    shopName={item.shopName}
                    stars={item.stars}
                  />
                );
              })}
            </View>

            <NavLink color={adaptive.paletteColorYellow} nativeWind="ml-3 mt-3">
              More Products
            </NavLink>
            <View
              className={`flex mt-2 my-3 w-full items-center justify-center`}
            >
              {/* TODO: Edit the following to be an actual card */}
              {trendingItems.map((item) => {
                return <ItemCard item={item} key={item.id} />;
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeOverlay;

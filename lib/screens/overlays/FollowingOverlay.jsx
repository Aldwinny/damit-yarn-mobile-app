import React from "react";
import { Text, View, ScrollView } from "react-native";
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";
import ItemCard from "../../components/models/ItemCard";

import defaultItemImage from "../../../assets/images/temp/bg-item.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";

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

const FollowingOverlay = () => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar title="Following" />
      <ScrollView
        className={`${adaptive.nativeWindBackground} h-full`}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View
          className={`${adaptive.nativeWindBackground} flex-1 items-center mt-2`}
        >
          {trendingItems.map((item) => {
            return (
              <ItemCard
                item={item}
                key={item.id}
                borderColor={adaptive.paletteColorPink}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FollowingOverlay;

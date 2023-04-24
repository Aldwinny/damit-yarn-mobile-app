import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../shared/Adaptive";

import defaultFeaturedImage from "../../assets/images/temp/bg-features.jpg";
import defaultAvatarImage from "../../assets/images/temp/bg-avatar-circle.jpg";
import defaultItemImage from "../../assets/images/temp/bg-item.png";
import catDarkMode from "../../assets/images/cat-dark-mode.png";
import catLightMode from "../../assets/images/cat-light-mode.png";
import { Image } from "react-native";
import ItemCard from "../components/models/ItemCard";

const shopData = {
  image: defaultAvatarImage,
  name: "Elaina Shop",
  hint: "Cute Elaina-related clothes",
  description:
    "Here in Elaina shop, you get all handmade Elaina-related clothings made with love!",
};

const shopItems = [
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

const ShopScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const { id } = route.params;
  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title={`View Shop`}
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <View className={`flex items-center justify-center`}>
          <Image
            source={shopData.image}
            className={`rounded-full mt-5 h-32 w-32`}
            resizeMode="cover"
          />
          <Text
            className={`${adaptive.nativeWindText} text-center font-bold text-lg mt-2`}
          >
            {shopData.name}
          </Text>
          {shopData.hint && (
            <Text
              className={`${adaptive.nativeWindNavText} text-center italic`}
            >
              {shopData.hint}
            </Text>
          )}
          <Text
            className={`${adaptive.nativeWindText} mt-2 text-center text-base`}
          >
            {shopData.description}
          </Text>
          <View className={`${adaptive.nativeWindNavbar} pt-5 mt-5`}>
            <Text
              className={`${adaptive.nativeWindText} font-bold text-xl mx-3 mb-3`}
            >
              SHOP ITEMS:
            </Text>
            {shopItems.map((item) => {
              return (
                <ItemCard
                  item={item}
                  key={item.id}
                  onPress={() =>
                    navigation.push("item", {
                      uid: item.id,
                      item: item,
                      reversible: true,
                    })
                  }
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

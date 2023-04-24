import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";

import defaultItemImage from "../../../assets/images/temp/bg-item.png";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import ItemCard from "../../components/models/ItemCard";
import { numberCompactor, toCamelCase } from "../../utils/formatter";

const placeholderItems = [
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
  {
    id: 7,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 8,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 9,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 10,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 11,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 12,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 13,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 14,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 15,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 16,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 17,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 18,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 19,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 20,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 21,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 22,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 23,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 24,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
  {
    id: 25,
    image: defaultItemImage,
    stars: 5.0,
    price: 450,
    sold: 11250,
    name: "Lorem Ipsum Dolor Sit amet Consectetur Rainbow socks so cool",
    location: "Quezon City, Metro Manila",
    shopName: "The art of clotheswar",
  },
];

const CategorizedViewerScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const { category } = route.params;

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar title={toCamelCase(category)} action={() => navigation.pop()} />

      <View
        className={`${adaptive.nativeWindBackground} flex-1 items-center mt-2`}
      >
        <FlatList
          data={placeholderItems}
          renderItem={(item) => (
            <ItemCard
              item={item.item}
              key={item.id}
              borderColor={adaptive.paletteColorOrange}
              onPress={() => {
                navigation.push("item", {
                  uid: item.item.id,
                  item: item.item,
                });
              }}
            />
          )}
        />
        {/* {placeholderItems.map((item) => {
          return (
            <ItemCard
              item={item}
              key={item.id}
              borderColor={adaptive.paletteColorOrange}
            />
          );
        })} */}
      </View>
    </SafeAreaView>
  );
};

export default CategorizedViewerScreen;

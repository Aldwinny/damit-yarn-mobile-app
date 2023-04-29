import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import AdaptiveScheme from "../../shared/Adaptive";
import ItemCard from "../../components/models/ItemCard";

import defaultItemImage from "../../../assets/images/temp/bg-item.png";
import { useSelector } from "react-redux";
import { getAllItems } from "../../services/api/items";

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

const TrendingOverlay = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const [refreshing, setRefreshing] = useState(false);

  const [firstRender, setFirstRender] = useState(true);
  const items = useRef();
  let trendingItems;

  if (items.current !== undefined) {
    trendingItems = items.current;
    trendingItems.sort((a, b) => {
      if (a.taps > b.taps) {
        return -1;
      }
      if (a.taps < b.taps) {
        return 1;
      }
      return 0;
    });
    console.log(trendingItems);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const getItems = async () => {
      return await getAllItems();
    };

    const timer = setTimeout(() => {
      if (refreshing) {
        setRefreshing(false);
      }
    }, 10000);

    getItems()
      .then((res) => {
        console.log(res.data);
        items.current = JSON.parse(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setRefreshing(false);
        clearTimeout(timer);
      });
  });

  useEffect(() => {
    if (firstRender) {
      onRefresh();
      setFirstRender(false);
    }
  }, [onRefresh]);

  if (items.current !== undefined) {
    items.current = items.current.map((obj) => {
      obj.image = defaultItemImage;
      return obj;
    });
  }

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar title="Trending" />
      <ScrollView
        className={`${adaptive.nativeWindBackground} h-full`}
        contentContainerStyle={{ paddingBottom: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          className={`${adaptive.nativeWindBackground} flex-1 items-center mt-2`}
        >
          {trendingItems &&
            trendingItems.map((item) => {
              return (
                <ItemCard
                  item={item}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("item", { uid: item.id, item: item })
                  }
                />
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrendingOverlay;

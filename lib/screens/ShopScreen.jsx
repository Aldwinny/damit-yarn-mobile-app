import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../shared/Adaptive";

import defaultFeaturedImage from "../../assets/images/temp/bg-features.jpg";
import defaultAvatarImage from "../../assets/images/avatar/avatar_male.png";
import defaultAvatarImage2 from "../../assets/images/avatar/avatar_female.png";
import defaultItemImage from "../../assets/images/temp/bg-item.png";
import catDarkMode from "../../assets/images/cat-dark-mode.png";
import catLightMode from "../../assets/images/cat-light-mode.png";
import { Image } from "react-native";
import ItemCard from "../components/models/ItemCard";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";
import { getItemsFromShop } from "../services/api/items";
import { RefreshControl } from "react-native";

const ShopScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const { id, shopname, shopdescription, shophint, shopimage } = route.params;

  const [firstRender, setFirstRender] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const items = useRef([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const getShopItems = async () => {
      return await getItemsFromShop({ shopid: id });
    };

    const timer = setTimeout(() => {
      console.log("o");
      if (refreshing) {
        setRefreshing(false);
      }
    }, 10000);

    getShopItems()
      .then((res) => {
        items.current = JSON.parse(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        clearTimeout(timer);
        setRefreshing(false);
      });
  });

  useEffect(() => {
    if (firstRender) {
      onRefresh();
      setFirstRender(false);
    }
  }, [onRefresh, setFirstRender]);

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className={`flex items-center justify-center`}>
          <Image
            source={
              shopimage
                ? { uri: shopimage }
                : Math.floor(Math.random() * 2) + 1 === 1
                ? defaultAvatarImage
                : defaultAvatarImage2
            }
            className={`rounded-full mt-5 h-32 w-32`}
            resizeMode="cover"
          />
          <Text
            className={`${adaptive.nativeWindText} text-center font-bold text-lg mt-2`}
          >
            {shopname}
          </Text>
          {shophint && (
            <Text
              className={`${adaptive.nativeWindNavText} text-center italic`}
            >
              {shophint}
            </Text>
          )}
          <Text
            className={`${adaptive.nativeWindText} mt-2 text-center text-base`}
          >
            {shopdescription}
          </Text>
          <View className={`${adaptive.nativeWindNavbar} pt-5 mt-5`}>
            <Text
              className={`${adaptive.nativeWindText} font-bold text-xl mx-3 mb-3`}
            >
              SHOP ITEMS:
            </Text>
            {items.current.length !== 0 ? (
              items.current.map((item) => {
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
              })
            ) : (
              <Text className={`${adaptive.nativeWindText} p-7`}>
                {refreshing ? "Loading.." : "No items found.."}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

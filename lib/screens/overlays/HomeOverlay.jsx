import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "../../../assets/logo/DamitYarnTextDark.png";
import logo2 from "../../../assets/logo/DamitYarnTextLight.png";
import AdaptiveScheme from "../../shared/Adaptive";
import CarouselBuilder from "../../components/CarouselBuilder";

import defaultFeaturedImage from "../../../assets/images/temp/bg-features.jpg";
import defaultItemImage from "../../../assets/images/temp/bg-item.png";
import NavLink from "../../components/NavLink";
import ItemPhotoCard from "../../components/models/ItemPhotoCard";
import ItemCard from "../../components/models/ItemCard";
import { useSelector } from "react-redux";
import { RefreshControl } from "react-native";
import { getAllItems } from "../../services/api/items";
import { Dimensions } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

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

const { width } = Dimensions.get("window");

const HomeOverlay = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const [isSearching, setIsSearching] = useState(false);
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
  }, [onRefresh, setFirstRender]);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar}`}>
      <View
        className={`${adaptive.nativeWindNavbar} flex flex-row flex-nowrap items-center py-2 h-20`}
      >
        <Image
          className="h-16 w-36 ml-2"
          resizeMode="contain"
          source={theme.theme === "dark" ? logo : logo2}
        />
        <TouchableOpacity
          // onPress={() => {
          //   navigation.push("chatlist");
          // }}
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
            // navigation.push("notifications");
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
            setIsSearching(true);
          }}
          className={`${adaptive.nativeWindText} mr-3`}
        >
          <Ionicons name="search" color={adaptive.iconColor} size={25} />
        </TouchableOpacity>
      </View>
      <ScrollView
        className={`${adaptive.nativeWindSoftBackground} h-full`}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        nestedScrollEnabled
      >
        <CarouselBuilder items={featuredItems} />
        <View className={`${adaptive.nativeWindNavbar} h-full flex-1`}>
          <NavLink
            onPress={() => {
              navigation.navigate("TrendingOverlay");
            }}
            color={adaptive.APaletteColorOrange}
            nativeWind="ml-3 mt-3"
          >
            Trending
          </NavLink>
          <View className="flex flex-wrap flex-row mt-2 my-3 w-full items-center justify-center">
            {trendingItems !== undefined ? (
              trendingItems.slice(0, 6).map((item) => {
                return (
                  <ItemPhotoCard
                    key={item.id}
                    item={item}
                    onPress={() =>
                      navigation.push("item", { uid: item.id, item: item })
                    }
                  />
                );
              })
            ) : (
              <SkeletonLoader
                className={`flex flex-wrap flex-row mt-2 my-3 w-full items-center justify-center`}
                boneColor={adaptive.statusbarStartColor}
              >
                <SkeletonLoader.Item
                  style={{
                    width: width / 3.2,
                    height: width / 2.8,
                    borderRadius: 10,
                    padding: 3,
                    marginHorizontal: 2,
                    marginVertical: 3,
                  }}
                />
                <SkeletonLoader.Item
                  style={{
                    width: width / 3.2,
                    height: width / 2.8,
                    borderRadius: 10,
                    padding: 3,
                    marginHorizontal: 2,
                    marginVertical: 3,
                  }}
                />
                <SkeletonLoader.Item
                  style={{
                    width: width / 3.2,
                    height: width / 2.8,
                    borderRadius: 10,
                    padding: 3,
                    marginHorizontal: 2,
                    marginVertical: 3,
                  }}
                />
                <SkeletonLoader.Item
                  style={{
                    width: width / 3.2,
                    height: width / 2.8,
                    borderRadius: 10,
                    padding: 3,
                    marginHorizontal: 2,
                    marginVertical: 3,
                  }}
                />
                <SkeletonLoader.Item
                  style={{
                    width: width / 3.2,
                    height: width / 2.8,
                    borderRadius: 10,
                    padding: 3,
                    marginHorizontal: 2,
                    marginVertical: 3,
                  }}
                />
                <SkeletonLoader.Item
                  style={{
                    width: width / 3.2,
                    height: width / 2.8,
                    borderRadius: 10,
                    padding: 3,
                    marginHorizontal: 2,
                    marginVertical: 3,
                  }}
                />
              </SkeletonLoader>
            )}
          </View>

          <View className={`${adaptive.nativeWindBackground} flex-1 mt-3`}>
            <NavLink
              color={adaptive.APaletteColorYellow}
              nativeWind="ml-3 mt-3"
            >
              More Products
            </NavLink>
            <View
              className={`flex mt-2 my-3 w-full items-center justify-center`}
            >
              {/* TODO: Edit the following to be an actual card */}
              {items.current !== undefined ? (
                items.current.map((item) => {
                  return (
                    <ItemCard
                      item={item}
                      id={item.id}
                      key={item.id}
                      onPress={() =>
                        navigation.push("item", { uid: item.id, item: item })
                      }
                    />
                  );
                })
              ) : (
                <SkeletonLoader
                  className={`flex flex-wrap flex-row mt-2 my-3 w-full items-center justify-center`}
                  boneColor={adaptive.statusbarStartColor}
                >
                  <SkeletonLoader.Item
                    style={{
                      width: width - 10,
                      height: width / 2.8,
                      borderRadius: 5,
                      padding: 1,
                      marginHorizontal: 2,
                      marginVertical: 3,
                    }}
                  />
                  <SkeletonLoader.Item
                    style={{
                      width: width - 10,
                      height: width / 2.8,
                      borderRadius: 5,
                      padding: 1,
                      marginHorizontal: 2,
                      marginVertical: 3,
                    }}
                  />
                  <SkeletonLoader.Item
                    style={{
                      width: width - 10,
                      height: width / 2.8,
                      borderRadius: 5,
                      padding: 1,
                      marginHorizontal: 2,
                      marginVertical: 3,
                    }}
                  />
                  <SkeletonLoader.Item
                    style={{
                      width: width - 10,
                      height: width / 2.8,
                      borderRadius: 5,
                      padding: 1,
                      marginHorizontal: 2,
                      marginVertical: 3,
                    }}
                  />
                  <SkeletonLoader.Item
                    style={{
                      width: width - 10,
                      height: width / 2.8,
                      borderRadius: 5,
                      padding: 1,
                      marginHorizontal: 2,
                      marginVertical: 3,
                    }}
                  />
                  <SkeletonLoader.Item
                    style={{
                      width: width - 10,
                      height: width / 2.8,
                      borderRadius: 5,
                      padding: 1,
                      marginHorizontal: 2,
                      marginVertical: 3,
                    }}
                  />
                </SkeletonLoader>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeOverlay;

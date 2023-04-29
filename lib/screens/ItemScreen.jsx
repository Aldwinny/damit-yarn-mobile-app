import { View, Text, ScrollView, Share, Alert, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../shared/Adaptive";
import CarouselItemBuilder from "../components/CarouselItemBuilder";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

import defaultFeaturedImage from "../../assets/images/temp/bg-features.jpg";
import defaultAvatarImage from "../../assets/images/avatar/avatar_male.png";
import defaultAvatarImage2 from "../../assets/images/avatar/avatar_female.png";
import catDarkMode from "../../assets/images/cat-dark-mode.png";
import catLightMode from "../../assets/images/cat-light-mode.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { formatCurrency, numberCompactor } from "../utils/formatter";
import { TouchableRipple } from "react-native-paper";
import ReviewCard from "../components/models/ReviewCard";
import StarBuilder from "../components/StarBuilder";
import { RefreshControl } from "react-native";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { addItemToCart, getItemReviews } from "../services/api/items";
import { useRef } from "react";
import KeywordBuilder from "../components/models/KeywordBuilder";

const featuredItems = [
  {
    image: defaultFeaturedImage,
  },
  {
    image: defaultFeaturedImage,
  },
  {
    image: defaultFeaturedImage,
  },
];

const ItemScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const user = useSelector((state) => state.user);

  const { uid, item, reversible } = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const reviews = useRef([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const getReviews = async () => {
      return await getItemReviews({
        id: item.id,
      });
    };

    const timer = setTimeout(() => {
      if (refreshing) {
        setRefreshing(false);
      }
    }, 10000);

    getReviews()
      .then((res) => {
        // console.log(res.data);
        reviews.current = JSON.parse(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setRefreshing(false);
        clearTimeout(timer);
      });
  });

  const addToCart = () => {
    console.log("runnign");
    addItemToCart({
      item: item.id,
      user: user.id,
      token: user.token,
    })
      .then((res) => {
        // console.log(res); // TODO: poerform
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  console.log(reviews);

  useEffect(() => {
    if (firstRender) {
      onRefresh();
      setFirstRender(false);
    }
  }, [onRefresh, setFirstRender]);

  /**
   * Function that allows for sharing of data by sharing it as text
   */
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: item.name,
        message:
          "Look at this item that I found on Damit Yarn!\n[Insert link to damit yarn backend that will relay the user back to the app]",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (err) {
      Alert.alert(
        "An error has occurred",
        global.debug === true ? err.message : "Please try again later."
      );
    }
  };

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CarouselItemBuilder items={featuredItems} />
        <View className={`m-4`}>
          <Text
            className={`${adaptive.nativeWindText} ${
              item.name.length < 60 ? "font-bold" : ""
            } text-base leading-5 text-justify mb-3`}
          >
            {item.name}
          </Text>
          <Text className={`${adaptive.nativeWindActiveNavText} text-base`}>
            {formatCurrency(item.price)}
          </Text>
          <View className="flex flex-row mt-4">
            <StarBuilder stars={item.stars} />
            <Text
              className={`${adaptive.nativeWindIconColor} ml-2 text-sm`}
            >{`${item.stars.toFixed(1)} | ${numberCompactor(
              item.sold
            )} Sold`}</Text>
          </View>
          <View className="flex flex-row mt-6">
            <TouchableRipple
              onPress={() => {
                item.heart === true;
              }}
              className="p-2 rounded-full"
              rippleColor={
                theme.theme === "dark" ? "#C0C0C080" : "rgba(0, 0, 0, .32)"
              }
              borderless={true}
            >
              <FontAwesome
                name={item.heart ? "heart" : "heart-o"}
                size={20}
                color={adaptive.paletteColorYellow}
              />
            </TouchableRipple>
            <TouchableRipple
              onPress={onShare}
              className="p-2 ml-5 rounded-full"
              rippleColor={
                theme.theme === "dark" ? "#C0C0C080" : "rgba(0, 0, 0, .32)"
              }
              borderless={true}
            >
              <FontAwesome
                name="share-alt"
                size={20}
                color={adaptive.paletteColorYellow}
              />
            </TouchableRipple>
          </View>
          <Text
            className={`${adaptive.nativeWindActiveNavText} mt-4 font-bold text-lg`}
          >
            Keywords
          </Text>
          <KeywordBuilder keywords={item.keywords} />
          <Text
            className={`${adaptive.nativeWindActiveNavText} mt-4 font-bold text-lg`}
          >
            Description
          </Text>
          <Text className={`${adaptive.nativeWindText} text-base mt-2`}>
            {item.description}
          </Text>
        </View>
        <TouchableRipple
          onPress={() => {
            if (reversible) {
              navigation.pop();
            } else {
              navigation.push("shop", {
                id: item.shopid,
                shopname: item.shopname,
                shopdescription: item.shopdescription,
                shophint: item.shophint,
                shopimage: item.shopimage,
              });
            }
          }}
          rippleColor={adaptive.paletteColorLightOrange}
          className={`${adaptive.nativeWindNavbar}`}
        >
          <View className={`flex flex-row items-center my-2 px-4 py-1`}>
            <View className={`w-16 h-16`}>
              <Image
                source={
                  item.shopimage
                    ? { uri: item.shopimage }
                    : Math.floor(Math.random() * 2) + 1 === 1
                    ? defaultAvatarImage
                    : defaultAvatarImage2
                }
                className={`rounded-full w-full h-full`}
                resizeMode="cover"
              />
            </View>
            <View className={`flex-1 ml-3`}>
              <Text
                className={`font-bold`}
                style={{ color: adaptive.paletteColorYellow }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item.shopname}
              </Text>
              <View className="flex flex-row items-center mt-1">
                <FontAwesome5
                  name="map-marker-alt"
                  size={13}
                  color={adaptive.paletteColorYellow}
                />
                <Text
                  className={`${adaptive.nativeWindIconColor} font-bold text-xs ml-1`}
                >
                  {item.location}
                </Text>
              </View>
              {item.shophint && (
                <Text
                  className={`${adaptive.nativeWindIconColor} text-xs mt-1`}
                >
                  {item.shophint}
                </Text>
              )}
            </View>
          </View>
        </TouchableRipple>
        <Text
          className={`${adaptive.nativeWindActiveNavText} mx-4 mt-6 mb-2 font-bold text-lg`}
        >
          Reviews
        </Text>
        {reviews.current.length === 0 ? (
          <View
            className={`${adaptive.nativeWindNavbar} p-3 flex items-center justify-center`}
          >
            <Image
              source={theme.theme === "dark" ? catDarkMode : catLightMode}
              className="h-16 w-16"
              resizeMode="contain"
            />
            <Text
              className={`${adaptive.nativeWindIconColor} text-base text-center`}
            >
              This item has no reviews..
            </Text>
          </View>
        ) : (
          <>
            <ReviewCard review={reviews.current[0]} adaptiveTheme={adaptive} />
            <TouchableRipple
              onPress={() =>
                navigation.push("reviews", {
                  reviews: reviews.current,
                })
              }
              rippleColor={adaptive.paletteColorLightOrange}
              className={`${adaptive.nativeWindNavbar} mt-2`}
            >
              <View className={`p-2 flex items-center justify-center`}>
                <Text
                  className={`${adaptive.nativeWindPalettedText} text-base font-bold text-center`}
                >
                  See all reviews
                </Text>
              </View>
            </TouchableRipple>
          </>
        )}
      </ScrollView>
      <View className={`flex flex-row items-center`}>
        <TouchableRipple
          onPress={() => {
            item.heart === true;
          }}
          className="px-4 py-2 m-2 rounded-full"
          rippleColor={
            theme.theme === "dark" ? "#C0C0C080" : "rgba(0, 0, 0, .32)"
          }
          borderless={true}
        >
          <FontAwesome
            name={item.heart ? "heart" : "heart-o"}
            size={20}
            color={adaptive.paletteColorYellow}
          />
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            console.log("no functions yet");
          }}
          rippleColor={adaptive.paletteColorLightOrange}
          className={`${adaptive.nativeWindNavbar} h-full flex-1 items-center px-4 border-l-2 border-l-overlay-blackLight`}
        >
          <View className="flex flex-row items-center justify-center mt-3">
            <Ionicons
              name="chatbubble-ellipses"
              size={25}
              color={adaptive.textColor}
              style={{ marginRight: 10 }}
            />
            <Text
              className={`${adaptive.nativeWindText} font-bold text-center align-center`}
            >
              Chat Now?
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            addToCart();
          }}
          rippleColor={"#C0C0C080"}
          className={`bg-palette-orange2 h-full flex-1 items-center px-4`}
        >
          <View className="flex flex-row items-center justify-center mt-3">
            <Ionicons
              name="cart"
              size={25}
              color={adaptive.textColor}
              style={{ marginRight: 10 }}
            />
            <Text
              className={`${adaptive.nativeWindText} font-bold text-center align-center`}
            >
              Add to cart
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ItemScreen;

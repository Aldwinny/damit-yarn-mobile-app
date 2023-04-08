import { View, Text, ScrollView, Share, Alert, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../shared/Adaptive";
import CarouselItemBuilder from "../components/CarouselItemBuilder";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import defaultFeaturedImage from "../../assets/images/temp/bg-features.jpg";
import defaultAvatarImage from "../../assets/images/temp/bg-avatar-circle.jpg";
import catDarkMode from "../../assets/images/cat-dark-mode.png";
import catLightMode from "../../assets/images/cat-light-mode.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { formatCurrency, numberCompactor } from "../utils/formatter";
import { TouchableRipple } from "react-native-paper";
import ReviewCard from "../components/models/ReviewCard";
import StarBuilder from "../components/StarBuilder";

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

  const { uid, item } = route.params;

  item.review = [];
  // Sample review info
  item.review = [
    {
      id: 1,
      uid: 1,
      name: "Elaina so cuteeeeeee",
      image: defaultAvatarImage,
      description: "I like your product. Please make more!",
      stars: 5,
    },
  ];

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
          <View className="flex flex-row my-2">
            <Text className="text-white">Hi</Text>
            <Text className="text-white">Hi</Text>
            <Text className="text-white">Hi</Text>
            <Text className="text-white">Hi</Text>
          </View>
        </View>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("shop", { id: item.sid });
          }}
          rippleColor={adaptive.paletteColorLightOrange}
          className={`${adaptive.nativeWindNavbar}`}
        >
          <View className={`flex flex-row items-center my-2 px-4 py-1`}>
            <View className={`w-16 h-16`}>
              <Image
                source={defaultAvatarImage}
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
                {item.shopName}
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
              {item.hint && (
                <Text
                  className={`${adaptive.nativeWindIconColor} text-xs mt-1`}
                >
                  {item.hint}
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
        {item.review.length === 0 ? (
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
            <ReviewCard review={item.review[0]} adaptiveTheme={adaptive} />
            <TouchableRipple
              onPress={() =>
                navigation.navigate("reviews", {
                  id: item.uid,
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
    </SafeAreaView>
  );
};

export default ItemScreen;

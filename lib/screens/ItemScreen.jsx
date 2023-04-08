import { View, Text, ScrollView, Share, Alert } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../shared/Adaptive";
import CarouselItemBuilder from "../components/CarouselItemBuilder";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import defaultFeaturedImage from "../../assets/images/temp/bg-features.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import {
  formatCurrency,
  numberCompactor,
  starRepresentation,
} from "../utils/formatter";
import { TouchableRipple } from "react-native-paper";

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
                name="share-square-o"
                size={20}
                color={adaptive.paletteColorYellow}
              />
            </TouchableRipple>
          </View>
          <Text
            className={`${adaptive.nativeWindActiveNavText} mt-4 font-bold text-base`}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const StarBuilder = ({ color = "#EAD72C", size = 20, stars = 0 }) => {
  let rep = starRepresentation(stars);
  let starComponents = [];

  for (let i = 0; i < 5; i++) {
    starComponents.push(
      rep - 1 >= 0 ? (
        <FontAwesome
          key={i}
          color={color}
          name="star"
          size={size}
          style={{
            marginHorizontal: 1,
          }}
        />
      ) : rep % 1 > 0 ? (
        <FontAwesome
          key={i}
          color={color}
          name="star-half-full"
          size={size}
          style={{
            marginHorizontal: 1,
          }}
        />
      ) : (
        <FontAwesome
          key={i}
          color={color}
          name="star-o"
          size={size}
          style={{
            marginHorizontal: 1,
          }}
        />
      )
    );
    if (rep - 1 >= 0) {
      rep--;
    } else if (rep % 1 > 0) {
      rep -= 0.5;
    }
  }

  return starComponents;
};

export default ItemScreen;

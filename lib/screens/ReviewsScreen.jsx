import { View, Text, ScrollView, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../shared/Adaptive";
import ReviewCard from "../components/models/ReviewCard";

import catDarkMode from "../../assets/images/cat-dark-mode.png";
import catLightMode from "../../assets/images/cat-light-mode.png";

import defaultAvatarImage from "../../assets/images/temp/bg-avatar-circle.jpg";

const reviews = [
  {
    id: 1,
    uid: 1,
    name: "Elaina so cuteeeeeee",
    image: defaultAvatarImage,
    description: "I like your product. Please make more!",
    stars: 5,
  },
  {
    id: 2,
    uid: 1,
    name: "WOWWWWWWW",
    image: defaultAvatarImage,
    description: "I like your product. Please make more!",
    stars: 5,
  },
  {
    id: 3,
    uid: 1,
    name: "WOWWWWWWW",
    image: defaultAvatarImage,
    description: "I like your product. Please make more!",
    stars: 5,
  },
  {
    id: 4,
    uid: 1,
    name: "WOWWWWWWW",
    image: defaultAvatarImage,
    description: "I like your product. Please make more!",
    stars: 5,
  },
  {
    id: 5,
    uid: 1,
    name: "WOWWWWWWW",
    image: defaultAvatarImage,
    description: "I like your product. Please make more!",
    stars: 5,
  },
  {
    id: 6,
    uid: 1,
    name: "WOWWWWWWW",
    image: defaultAvatarImage,
    description: "I like your product. Please make more!",
    stars: 5,
  },
  {
    id: 7,
    uid: 1,
    name: "WOWWWWWWW",
    image: defaultAvatarImage,
    description: "I like your product. Please make more!",
    stars: 5,
  },
  {
    id: 8,
    uid: 1,
    name: "WOWWWWWWW",
    image: defaultAvatarImage,
    description: "I like your product. Please make more!",
    stars: 5,
  },
  {
    id: 9,
    uid: 1,
    name: "WOWWWWWWW",
    image: defaultAvatarImage,
    description: "I like your product. Please make more!",
    stars: 3.5,
  },
];

const ReviewsScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const { id } = route.params;
  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title={"Reviews"}
      />

      <View className={`${adaptive.nativeWindBackground} flex-1 mt-2`}>
        <FlatList
          data={reviews}
          renderItem={(review) => (
            <View className="mt-2">
              <ReviewCard
                adaptiveTheme={adaptive}
                review={review.item}
                key={review.id}
              />
            </View>
          )}
          ListFooterComponent={
            <View
              className={`${adaptive.nativeWindBackground} p-3 flex items-center justify-center`}
            >
              <Image
                source={theme.theme === "dark" ? catDarkMode : catLightMode}
                className="h-16 w-16"
                resizeMode="contain"
              />
              <Text
                className={`${adaptive.nativeWindIconColor} text-base text-center`}
              >
                You have reached the end
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ReviewsScreen;

import { View, Text, ScrollView, Image, Linking } from "react-native";
import React from "react";
import Navbar from "../../components/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";

import DevPhoto from "../../../assets/images/about-dev.jpg";

const DevInfo = {
  name: "Aldwin",
  future_career: "Mobile Developer",
  likes: ["🍂 Autumn", "🐈 Cats", "🐕 Dogs", "☕ Coffee"],
  hobbies: [
    "🧶 Crocheting",
    "🎶 Guitar",
    "✏️ Pixel Art",
    "📺 Watching Anime & Videos",
    "🎮 Playing games",
  ],
  general_description:
    "And this is an application made as my final project in Mobile Computing",
  website: "https://aldwinny.github.io",
};

const AboutScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);

  const adaptive = AdaptiveScheme(theme.theme);

  const Info = ({ label, children, onPress }) => {
    return (
      <Text className={`${adaptive.nativeWindText} text-base mx-6 my-1`}>
        {label}:{" "}
        <Text
          className={`${
            onPress !== undefined
              ? adaptive.nativeWindActiveNavText
              : adaptive.nativeWindText
          } ${onPress !== undefined ? "underline" : ""} text-base mx-6 my-1`}
          onPress={onPress}
        >
          {children}
        </Text>
      </Text>
    );
  };

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="About the dev"
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <View className={`${adaptive.nativeWindBackground} flex`}>
          <Image
            source={DevPhoto}
            className={`rounded-full m-10 mb-3 h-32 w-32 self-center`}
            resizeMode="cover"
          />
          <Text
            className={`${adaptive.nativeWindText} text-center font-bold text-lg mx-2`}
          >
            Hello, I'm {DevInfo.name}!
          </Text>
          <Text className={`${adaptive.nativeWindText} text-center mx-2`}>
            {DevInfo.general_description}
          </Text>
          <Text
            className={`${adaptive.nativeWindText} font-bold text-lg mx-4 mt-5`}
          >
            More about me:
          </Text>
          <Info label="I want to be a">{DevInfo.future_career}</Info>
          <Info label="Likes">{DevInfo.likes.join(", ")}</Info>
          <Info label="Hobbies">{DevInfo.hobbies.join(", ")}</Info>
          <Info
            label="Website Portfolio"
            onPress={() => Linking.openURL(DevInfo.website)}
          >
            {DevInfo.website}
          </Info>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;

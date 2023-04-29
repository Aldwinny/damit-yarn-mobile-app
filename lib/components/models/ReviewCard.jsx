import { View, Text, Image } from "react-native";
import React from "react";
import StarBuilder from "../StarBuilder";

import defaultAvatarImage from "../../../assets/images/avatar/avatar_male.png";
import defaultAvatarImage2 from "../../../assets/images/avatar/avatar_female.png";

const ReviewCard = ({ review, adaptiveTheme }) => {
  const adaptive = adaptiveTheme;

  console.log(review);

  return (
    <View className={`${adaptive.nativeWindNavbar} flex px-4 py-3`}>
      <View className={`flex flex-row items-center mb-3`}>
        <View className={`w-12 h-12`}>
          <Image
            source={
              review.reviewerimage
                ? { uri: review.reviewerimage }
                : Math.floor(Math.random() * 2) + 1 === 1
                ? defaultAvatarImage
                : defaultAvatarImage2
            }
            className={`rounded-full w-full h-full`}
            resizeMode="cover"
          />
        </View>
        <View className={`flex-1 ml-3 my-2`}>
          <Text
            className={`font-bold`}
            style={{ color: adaptive.paletteColorYellow }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {review.name}
          </Text>
          <View className={`flex flex-row items-center mt-1`}>
            <StarBuilder stars={review.stars} size={15} />
          </View>
        </View>
      </View>
      <Text
        className={`${adaptive.nativeWindIconColor} text-xs `}
        numberOfLines={5}
        ellipsizeMode="tail"
      >
        {review.review}
      </Text>
    </View>
  );
};

export default ReviewCard;

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NotificationCard from "../../components/models/NotificationCard";
import useGlobalScheme from "../../hooks/UseGlobalScheme";
import AdaptiveScheme from "../../shared/Adaptive";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationScreen = ({ navigation }) => {
  const [globalScheme] = useGlobalScheme();
  const adaptive = AdaptiveScheme(globalScheme);
  const backColor = adaptive.from("#E5855B", "#000");

  return (
    <>
      <View
        className={`${adaptive.nativeWindNavbar} h-24 pt-12 w-full flex flex-row flex-wrap items-center`}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className={`${adaptive.nativeWindText} flex flex-row align-center`}
        >
          <MaterialIcons
            name="arrow-back-ios"
            style={{ marginLeft: 25 }}
            size={25}
            color={backColor}
          />
          <Text
            className={`${adaptive.nativeWindText} text-xl text-palette-orange2 font-bold`}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text
          className={`${adaptive.nativeWindText} font-bold text-xl mx-auto absolute bottom-5 left-0 right-0 text-center -z-10`}
        >
          Notifications
        </Text>
      </View>
      <View
        className={`${adaptive.nativeWindBackground} flex-1 items-center flex-column`}
      >
        <NotificationCard
          hint="promotional"
          title="From CapicheAdverts"
          description="Congratulations! You are one of the winners of our ticketing promos. Iphone 7 is almost at your grasp!"
        />
        <NotificationCard
          hint="overseas"
          title="Your delivery is en route internationally!"
          description="The delivery is now en route from Japan to Philippines."
        />
        <NotificationCard
          hint="delivery"
          title="Your package is being transferred."
          description="Your package is now on its way to Damit Yarn Novaliches Warehouse!"
        />
        <NotificationCard
          hint="update"
          title="Your delivery is on its way!"
          description="Your package will be delivered today. Please stay on the line and wait for our deliveryman to contact you!"
        />
        <NotificationCard
          hint="maintenance"
          title="Servers will be down for maintenance."
          description="You may not be able to access Damit Yarn! servers from 8:00 AM - 10:00 AM PHT."
        />
        <NotificationCard
          hint="maintenance"
          title="Servers will be down for maintenance."
          description="You may not be able to access Damit Yarn! servers from 8:00 AM - 10:00 AM PHT."
        />
        <NotificationCard
          hint="maintenance"
          title="Servers will be down for maintenance."
          description="You may not be able to access Damit Yarn! servers from 8:00 AM - 10:00 AM PHT."
        />
        <NotificationCard
          hint="maintenance"
          title="Servers will be down for maintenance."
          description="You may not be able to access Damit Yarn! servers from 8:00 AM - 10:00 AM PHT."
        />
      </View>
    </>
  );
};

export default NotificationScreen;

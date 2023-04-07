import { ScrollView } from "react-native";
import React from "react";

import NotificationCard from "../../components/models/NotificationCard";
import AdaptiveScheme from "../../shared/Adaptive";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

const NotificationScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} h-full`}>
      <Navbar action={() => navigation.goBack()} title="Notifications" />
      {/* Convert to Flatlist or SectionList */}
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex-1`}
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: 15,
        }}
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
        <NotificationCard
          hint="maintenance"
          title="Servers will be down for maintenance."
          description="You may not be able to access Damit Yarn! servers from 8:00 AM - 10:00 AM PHT."
        />
        <NotificationCard
          hint="maintenance"
          title="Servers will be down for maintenance."
          description="End of scroll"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

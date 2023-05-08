import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";

import { List, Accordion } from "react-native-paper";

const FAQScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="FAQ"
      />
      <ScrollView
        className={`${adaptive.nativeWindSoftBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <List.AccordionGroup>
          <List.Accordion
            title="What is Damit Yarn?"
            id="1"
            className={`${adaptive.nativeWindBackground} border-2`}
            titleStyle={{
              color: adaptive.palettedIconColor,
            }}
          >
            <List.Item
              title="Damit yarn is a platform that allows users to buy and sell clothing and accessories. We offer a convenient mobile app to do all of that in one place."
              titleStyle={{
                color: adaptive.textColor,
              }}
              titleNumberOfLines={10}
            />
          </List.Accordion>
          <List.Accordion
            title="How does Damit Yarn earn revenue?"
            id="2"
            className={`${adaptive.nativeWindBackground} border-2`}
            titleStyle={{
              color: adaptive.palettedIconColor,
            }}
          >
            <List.Item
              title="Damit Yarn earns money through advertisements hosted in our application. We also have a shop of our own where we sell our stuff."
              titleStyle={{ color: adaptive.textColor }}
              titleNumberOfLines={10}
            />
          </List.Accordion>
          <List.Accordion
            title="What technology does Damit Yarn use?"
            id="3"
            className={`${adaptive.nativeWindBackground} border-2`}
            titleStyle={{
              color: adaptive.palettedIconColor,
            }}
          >
            <List.Item
              title="React Native & Expo for frontend, NodeJS and ExpressJS for backend, PostgreSQL for database, and Cloudinary for Content Management System."
              titleStyle={{ color: adaptive.textColor }}
              titleNumberOfLines={10}
            />
          </List.Accordion>
          <List.Accordion
            title="Is Damit Yarn a real company?"
            id="4"
            className={`${adaptive.nativeWindBackground} border-2`}
            titleStyle={{
              color: adaptive.palettedIconColor,
            }}
          >
            <List.Item
              title="No. Damit Yarn is not a real company."
              titleStyle={{ color: adaptive.textColor }}
              titleNumberOfLines={10}
            />
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;

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
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <List.AccordionGroup>
          <List.Accordion
            title="Why are there no questions in the FAQ yet?"
            id="1"
            className={`${adaptive.nativeWindBackground} border-y-2`}
            titleStyle={{
              color: adaptive.palettedIconColor,
            }}
          >
            <List.Item
              title="We're still working on it. This will be dependent from the web database."
              titleStyle={{ color: adaptive.textColor }}
              titleNumberOfLines={10}
            />
          </List.Accordion>
          <List.Accordion
            title="Why are there no questions in the FAQ yet?"
            id="2"
            className={`${adaptive.nativeWindBackground}  border-y-2`}
            titleStyle={{
              color: adaptive.palettedIconColor,
            }}
          >
            <List.Item
              title="We're still working on it. This will be dependent from the web database."
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

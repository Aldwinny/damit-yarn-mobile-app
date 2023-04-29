import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useRef } from "react";
import { TextInput } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useState } from "react";
import KeywordBuilder from "../../components/models/KeywordBuilder";

const ModifyItemScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  const adaptive = AdaptiveScheme(theme.theme);

  const [itemState, setItemState] = useState("add");
  const [itemPhotos, setItemPhotos] = useState([]);

  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      if (user.shopid === 0) {
        navigation.pop();
      }

      // Part 1: Get all items from shop

      // Do first run stuff here
      console.log(firstRun.current);
      firstRun.current = false;
    }
  });

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Shop Items"
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <View className={`flex flex-row mx-3 mb-2 justify-around items-center`}>
          <TouchableRipple
            className={`bg-blue-500 px-2`}
            onPress={() => {
              setItemState("add");
            }}
          >
            <Text className={`text-white font-bold text-center text-base py-3`}>
              Add an Item
            </Text>
          </TouchableRipple>
          <TouchableRipple
            className={`bg-purple-500 px-2`}
            onPress={() => {
              setItemState("change");
            }}
          >
            <Text className={`text-white font-bold text-center text-base py-3`}>
              Change an Item
            </Text>
          </TouchableRipple>
          <TouchableRipple
            className={`bg-red-500 px-2`}
            onPress={() => {
              setItemState("delete");
            }}
          >
            <Text className={`text-white font-bold text-center text-base py-3`}>
              Delete an Item
            </Text>
          </TouchableRipple>
        </View>
        <Text className={`text-palette-orange2 text-xl font-bold mx-3 my-5`}>
          {itemState === "add"
            ? "Add an Item"
            : itemState === "change"
            ? "Update Item Information"
            : "Delete an Item"}
        </Text>
        {/* Form to create item */}
        {itemState === "add" ? (
          <View>
            <TouchableRipple
              className={`bg-purple-500 mx-3 rounded-full mb-2`}
              onPress={() => {}}
            >
              <Text
                className={`text-white font-bold text-center text-base py-3`}
              >
                {itemPhotos.length <= 0
                  ? "Upload Photo*"
                  : "Upload Another Photo"}
              </Text>
            </TouchableRipple>

            <View className={`mx-5`}>
              <Text
                className={`${adaptive.nativeWindText} mb-2 ml-2 text-base`}
              >
                Name
              </Text>
              <TextInput
                className={`bg-white rounded-full mb-3 p-2`}
                placeholder="Add the name of your item"
              />

              <Text
                className={`${adaptive.nativeWindText} mb-2 ml-2 text-base`}
              >
                Description
              </Text>
              <TextInput
                className={`bg-white rounded-full mb-3 p-2`}
                placeholder="Add the description of your item"
              />

              <Text
                className={`${adaptive.nativeWindText} mb-2 ml-2 text-base`}
              >
                Price
              </Text>
              <TextInput
                className={`bg-white rounded-full mb-3 p-2`}
                keyboardType="numeric"
                placeholder="Price your item"
              />
              <Text
                className={`${adaptive.nativeWindText} mb-2 ml-2 text-base`}
              >
                Keywords
              </Text>
              <TextInput
                className={`bg-white rounded-full mb-3 p-2`}
                placeholder="Separate keywords with a space"
              />
              {/* <KeywordBuilder /> */}
            </View>
          </View>
        ) : itemState === "update" ? (
          <View></View>
        ) : (
          <View></View>
        )}

        {/* item components with delete and update */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModifyItemScreen;

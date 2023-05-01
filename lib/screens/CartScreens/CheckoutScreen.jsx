import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import AdaptiveScheme from "../../shared/Adaptive";
import { useSelector } from "react-redux";
import { RadioButton, TouchableRipple } from "react-native-paper";
import { formatCurrency } from "../../utils/formatter";
import { useState } from "react";

// Payment Method Images
import GCashImage from "../../../assets/images/method/gcash.png";
import MayaImage from "../../../assets/images/method/maya.jpg";
import PaypalImage from "../../../assets/images/method/paypal.png";

const CheckoutScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const user = useSelector((state) => state.user);

  const { items, reqref } = route.params;

  reqref.current = true;

  const [method, setMethod] = useState("cod");

  const ItemBreakDown = ({ item }) => {
    return (
      <View
        className={`flex flex-row mx-2 my-1 p-2 border-2 border-palette-yellow`}
      >
        <Image source={{ uri: item.images[0] }} className={`w-20 h-20`} />
        <View className={`flex flex-col ml-2`}>
          <Text
            className={`${adaptive.nativeWindText}`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            className={`${adaptive.nativeWindText} text-xs`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item.shopname}
          </Text>
          <Text
            className={`${adaptive.nativeWindText}`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            qty: {item.qty}
          </Text>
          <Text
            className={`${adaptive.nativeWindButtonText} mt-1`}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Item total: {formatCurrency(item.price * item.qty)}
          </Text>
        </View>
      </View>
    );
  };

  const RadioChoice = ({ value, onPressSetter, children }) => {
    return (
      <View className={`flex flex-row mx-3 mb-1`}>
        <RadioButton
          value={value}
          status={method === value ? "checked" : "unchecked"}
          onPress={() => onPressSetter(value)}
        />
        {children}
      </View>
    );
  };

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Checkout"
        // Will be removed soon
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <Text className={`${adaptive.nativeWindActiveNavText} m-4 text-xl`}>
          Cart Items
        </Text>
        <View className={`flex flex-col`}>
          {items.map((item, index) => {
            return <ItemBreakDown key={index} item={item} />;
          })}
        </View>
        <Text
          className={`${adaptive.nativeWindActiveNavText} m-4 mt-7 text-xl`}
        >
          Payment Method
        </Text>
        <View>
          <RadioChoice value={"cod"} onPressSetter={setMethod}>
            <Text
              className={`${adaptive.nativeWindText} self-center font-bold ml-2`}
            >
              Cash on Delivery
            </Text>
          </RadioChoice>
          <RadioChoice value={"credit card"} onPressSetter={setMethod}>
            <Text
              className={`${adaptive.nativeWindText} self-center font-bold ml-2`}
            >
              Credit Card / Debit Card
            </Text>
          </RadioChoice>
          <RadioChoice value={"bank transfer"} onPressSetter={setMethod}>
            <Text
              className={`${adaptive.nativeWindText} self-center font-bold ml-2`}
            >
              Bank Transfer
            </Text>
          </RadioChoice>
          <RadioChoice value={"gcash"} onPressSetter={setMethod}>
            <Image
              source={GCashImage}
              className={`h-10 w-28 ml-2`}
              resizeMode="center"
            />
          </RadioChoice>
          <RadioChoice value={"maya"} onPressSetter={setMethod}>
            <Image
              source={MayaImage}
              className={`h-10 w-24 ml-2`}
              resizeMode="center"
            />
          </RadioChoice>
          <RadioChoice value={"paypal"} onPressSetter={setMethod}>
            <Image
              source={PaypalImage}
              className={`h-10 w-24 ml-2`}
              resizeMode="center"
            />
          </RadioChoice>
        </View>
        <Text
          className={`${adaptive.nativeWindActiveNavText} m-4 mt-7 text-xl`}
        >
          User Information
        </Text>
        <View className={`ml-5`}>
          <Text className={`${adaptive.nativeWindText} mb-1`}>
            {`Full Address: ${user.zip}, ${user.street}, ${user.city}, ${user.country}`}
          </Text>
          <Text className={`${adaptive.nativeWindText} mb-1`}>
            {`Email Address: ${
              user.email
            },\nContact Number: *******${user.contact.slice(-4)}`}
          </Text>
        </View>
      </ScrollView>
      <View className={`flex flex-row items-center`}>
        <View className={`flex flex-1 flex-row items-center`}>
          <Text className={`${adaptive.nativeWindText} font-bold text-sm ml-3`}>
            Total:{" "}
          </Text>
          <Text className={`${adaptive.nativeWindActiveNavText} text-sm`}>
            {formatCurrency(
              items.reduce((prev, curr) => {
                return prev + curr.price * curr.qty;
              }, 0)
            )}
          </Text>
        </View>
        <TouchableRipple
          onPress={() => {
            navigation.push("transact", {
              items: items,
              method: method,
              reqref: reqref,
            });
          }}
          className={`bg-palette-orange3 p-4`}
        >
          <Text className={`text-white font-bold text-lg text-center`}>
            Proceed to Checkout
          </Text>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

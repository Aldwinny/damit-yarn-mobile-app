import React, { useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import AdaptiveScheme from "../../shared/Adaptive";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useCallback } from "react";
import { useEffect } from "react";
import { TouchableRipple } from "react-native-paper";
import CartItem from "../../components/models/CartItem";
import { formatCurrency } from "../../utils/formatter";
import { deleteItemFromCart } from "../../services/api/items";

const CartOverlay = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);

  const adaptive = AdaptiveScheme(theme.theme);

  const [refreshing, setRefreshing] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image:
        "http://res.cloudinary.com/dzwlv5von/image/upload/c_fill,h_700,w_700/5fe83672e2768726cec7efb1a860d9b0",
      name: "test",
      shopname: "Shop name",
      price: 1500,
      qty: 5,
      updated: false,
    },
    {
      id: 2,
      image:
        "http://res.cloudinary.com/dzwlv5von/image/upload/c_fill,h_700,w_700/5fe83672e2768726cec7efb1a860d9b0",
      name: "test 2",
      shopname: "Shop name",
      price: 2500,
      qty: 1,
      updated: false,
    },
  ]);

  // Gets updated by api request
  const [items, setItems] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const timer = setTimeout(() => {
      if (refreshing) {
        setRefreshing(false);
      }
    }, 10000);

    // API request
    setRefreshing(false);
  });

  const deleteFromCart = (index) => {
    console.log(index);

    deleteItemFromCart({
      item: cartItems[index].id,
    });
  };

  useEffect(() => {
    if (firstRender) {
      onRefresh();
      setFirstRender(false);
    }
  }, [onRefresh]);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar title="My Cart" />
      <ScrollView
        className={`${adaptive.nativeWindBackground} h-full`}
        contentContainerStyle={{ paddingBottom: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className={`flex flex-col items-center`}>
          {cartItems &&
            cartItems.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  item={item}
                  onPressDeletion={() => {
                    deleteFromCart(index);
                  }}
                  onQuantityChange={(e) => {
                    const newCartItems = [...cartItems];
                    newCartItems[index].qty = e;
                    setCartItems(newCartItems);
                  }}
                />
              );
            })}
        </View>
      </ScrollView>
      <View className={`flex flex-row items-center`}>
        <View className={`flex flex-1 flex-row items-center`}>
          <Text className={`${adaptive.nativeWindText} font-bold text-lg ml-3`}>
            Total:{" "}
          </Text>
          <Text className={`${adaptive.nativeWindActiveNavText} text-lg ml-3`}>
            {formatCurrency(
              cartItems.reduce((prev, curr) => {
                return prev + curr.price * curr.qty;
              }, 0)
            )}
          </Text>
        </View>
        <TouchableRipple
          onPress={() => {
            if (cartItems.length > 0) {
              navigation.push("checkout", { items: cartItems });
            }
          }}
          rippleColor={"#C0C0C080"}
          className={`bg-palette-orange2 h-full items-center px-6`}
        >
          <View className="flex flex-row items-center justify-center my-3">
            <Text
              className={`${adaptive.nativeWindText} font-bold text-center text-lg align-center`}
            >
              Checkout
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default CartOverlay;

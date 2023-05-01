import React, { useRef, useState } from "react";
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
import {
  deleteItemFromCart,
  getCartItems,
  updateCart,
} from "../../services/api/items";

import CatDarkMode from "../../../assets/images/cat-dark-mode.png";
import CatLightMode from "../../../assets/images/cat-light-mode.png";
import { Image } from "react-native";

/*
    {
      id: 1,
      itemid: 6
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

      itemid: 7
      image:
        "http://res.cloudinary.com/dzwlv5von/image/upload/c_fill,h_700,w_700/5fe83672e2768726cec7efb1a860d9b0",
      name: "test 2",
      shopname: "Shop name",
      price: 2500,
      qty: 1,
      updated: false,
    },
*/

const CartOverlay = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const user = useSelector((state) => state.user);

  const [refreshing, setRefreshing] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const requestRefresh = useRef(false);

  const [cartItems, setCartItems] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const timer = setTimeout(() => {
      if (refreshing) {
        setRefreshing(false);
      }
    }, 10000);

    if (user.id !== 0) {
      if (cartItems.length === 0) {
        getCartItems({
          user: user.id,
          token: user.token,
        })
          .then((res) => {
            if (res.status === 200) {
              const temp = res.data.items;

              setCartItems(
                temp.map((e) => {
                  e.updated = false;
                  return e;
                })
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const checkUpdates = cartItems.some((e) => e.updated); // TODO:

        if (checkUpdates) {
          const filteredItems = cartItems
            .map((e) => {
              return { id: e.id, qty: e.qty, updated: e.updated };
            })
            .filter((e) => e.updated);

          console.log(filteredItems);

          updateCart({
            items: filteredItems,
            user: user.id,
            token: user.token,
          })
            .then((res) => {
              if (res.status === 200) {
                setCartItems(res.data.items);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {});
        } else {
          getCartItems({
            user: user.id,
            token: user.token,
          })
            .then((res) => {
              if (res.status === 200) {
                const temp = res.data.items;

                setCartItems(
                  temp.map((e) => {
                    e.updated = false;
                    return e;
                  })
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }

    // API request
    setRefreshing(false);
  });

  const deleteFromCart = (index) => {
    console.log("called");

    // Update synchronize first
    // then delete the item

    deleteItemFromCart({
      item: cartItems[index].itemid,
      user: user.id,
      token: user.token,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        const checkUpdates = cartItems.some((e) => e.updated); // TODO:

        if (checkUpdates) {
          const filteredItems = cartItems
            .map((e) => {
              return { id: e.id, qty: e.qty, updated: e.updated };
            })
            .filter((e) => e.updated);

          console.log(filteredItems);

          updateCart({
            items: filteredItems,
            user: user.id,
            token: user.token,
          })
            .then((res) => {
              if (res.status === 200) {
                setCartItems(res.data.items);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          getCartItems({
            user: user.id,
            token: user.token,
          })
            .then((res) => {
              if (res.status === 200) {
                const temp = res.data.items;

                setCartItems(
                  temp.map((e) => {
                    e.updated = false;
                    return e;
                  })
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  useEffect(() => {
    if (firstRender || requestRefresh.current) {
      onRefresh();
      setFirstRender(false);
      requestRefresh.current = false;
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
          {cartItems.length === 0 && (
            <View className={`p-3 flex items-center justify-center`}>
              <Image
                source={theme.theme === "dark" ? CatDarkMode : CatLightMode}
                className="h-16 w-16"
                resizeMode="contain"
              />
              <Text
                className={`${adaptive.nativeWindIconColor} text-base text-center`}
              >
                {user.id === 0 ? "Please login first" : "Your cart is empty"}
              </Text>
            </View>
          )}
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
                    newCartItems[index].updated = true;
                    newCartItems[index].qty = e;
                    if (e == 0) {
                      deleteFromCart(index);
                    } else {
                      setCartItems(newCartItems);
                    }
                  }}
                />
              );
            })}
        </View>
      </ScrollView>
      {cartItems.length !== 0 && (
        <View className={`flex flex-row items-center`}>
          <View className={`flex flex-1 flex-row items-center`}>
            <Text
              className={`${adaptive.nativeWindText} font-bold text-lg ml-3`}
            >
              Total:{" "}
            </Text>
            <Text
              className={`${adaptive.nativeWindActiveNavText} text-lg ml-3`}
            >
              {formatCurrency(
                cartItems.reduce((prev, curr) => {
                  return prev + curr.price * curr.qty;
                }, 0)
              )}
            </Text>
          </View>
          <TouchableRipple
            onPress={() => {
              onRefresh();
              if (cartItems.length > 0) {
                navigation.push("checkout", {
                  items: cartItems,
                  reqref: requestRefresh,
                });
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
      )}
    </SafeAreaView>
  );
};

export default CartOverlay;

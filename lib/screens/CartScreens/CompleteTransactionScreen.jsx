import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";

import logo from "../../../assets/logo/DamitYarnTextDark.png";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import { recordTransaction } from "../../services/api/items";
import { useState } from "react";

const CompleteTransactionScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const user = useSelector((state) => state.user);

  const { items, method, reqref } = route.params;

  const [response, setResponse] = useState();

  useEffect(() => {
    if (response === undefined) {
      const itemIDs = items.map((e) => e.itemid);
      const itemQuantities = items.map((e) => parseInt(e.qty));

      console.log(itemIDs);
      console.log(itemQuantities);
      console.log(method);

      recordTransaction({
        id: user.id,
        token: user.token,
        items: itemIDs,
        quantities: itemQuantities,
        total: items.reduce((prev, curr) => {
          return prev + curr.price * curr.qty;
        }, 0),
        method: method,
      })
        .then((res) => {
          console.log(res);
          setResponse(res.status);
        })
        .catch((err) => {
          console.log(err);
          setResponse(err.response.status);
        })
        .finally(() => {
          reqref.current = true;
        });
      // set reqref
    }
  }, [response, items, user]);

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Checkout"
      />
      <View className={`flex flex-col pt-32 items-center justify-center`}>
        {response ? (
          <>
            <Image className="w-72 h-20 mb-10" source={logo} />
            <Text
              className={`${adaptive.nativeWindText} text-xl font-bold mx-3`}
            >
              Purchase Successful!
            </Text>
            <Text
              className={`${adaptive.nativeWindText} text-lg mx-4 text-center my-5`}
            >
              {response === 200
                ? "Your transaction has been recorded.\nThank you for using Damit Yarn!"
                : "Failed to record transaction. Please try again. :("}
            </Text>
            <TouchableRipple
              onPress={() => {
                navigation.popToTop();
              }}
              className={`bg-palette-orange3 py-2 px-10 rounded-md mt-10`}
            >
              <Text className={`${adaptive.nativeWindText} font-bold text-xl`}>
                Go Back
              </Text>
            </TouchableRipple>
          </>
        ) : (
          <View>
            <ActivityIndicator size={50} />
            <Text className={`${adaptive.nativeWindText} mt-3 text-lg`}>
              Loading, please wait
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CompleteTransactionScreen;

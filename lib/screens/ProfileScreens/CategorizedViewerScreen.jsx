import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, Dimensions } from "react-native";

import defaultItemImage from "../../../assets/images/temp/bg-item.png";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import ItemCard from "../../components/models/ItemCard";
import {
  formatCurrency,
  numberCompactor,
  toCamelCase,
} from "../../utils/formatter";
import { getLikes, getTransactions } from "../../services/api/items";
import { RefreshControl } from "react-native";
import { useCallback } from "react";

const { width } = Dimensions.get("window");

const CategorizedViewerScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  const user = useSelector((state) => state.user);

  const { category } = route.params;

  const [firstRender, setFirstRender] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    switch (category) {
      case "liked":
        console.log("Liked");
        if (user.likes.length <= 0) {
          setItems([]);
          setRefreshing(false);
        } else {
          getLikes({
            id: user.id,
            token: user.token,
            likes: user.likes,
          })
            .then((res) => {
              if (res.status === 200) {
                setItems(res.data.items);
              }
            })
            .catch((err) => {
              console.log(err.response);
            })
            .finally(() => {
              setRefreshing(false);
            });
        }

        break;
      case "history":
        console.log("History");
        getTransactions({
          id: user.id,
          token: user.token,
        })
          .then((res) => {
            if (res.status === 200) {
              setItems(res.data.transactions);
            }
          })
          .catch((err) => {
            console.log(err.response);
          })
          .finally(() => {
            setRefreshing(false);
          });
        break;
      default:
        navigation.pop();
        break;
    }
  });

  // A vague representation of either transactions or items
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (firstRender) {
      console.log("get that api request <3");
      onRefresh();
      setFirstRender(false);
    }
  }, [firstRender, setFirstRender, category, navigation]);

  const TransactionCard = ({ item }) => {
    return (
      <View
        className={`${adaptive.nativeWindNavbar} p-3 my-1 mx-0.5 rounded-md flex flex-col w-full`}
        style={{
          width: width - 10,
          height: width / 2.8,
        }}
      >
        <View className={`w-full`}></View>
        <Text className={`${adaptive.nativeWindText} text-lg`}>
          Date: {item.transaction_date.split("T")[0]}
        </Text>
        <Text className={`${adaptive.nativeWindText} text-lg`}>
          Total: {formatCurrency(item.total)}
        </Text>
        <Text className={`${adaptive.nativeWindActiveNavText} text-lg`}>
          Method: {item.method}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar title={toCamelCase(category)} action={() => navigation.pop()} />

      <View
        className={`${adaptive.nativeWindBackground} flex-1 items-center mt-2`}
      >
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={items}
          renderItem={(item) => {
            switch (category) {
              case "liked":
                return (
                  <ItemCard
                    item={item.item}
                    key={item.id}
                    borderColor={adaptive.paletteColorOrange}
                    onPress={() => {
                      navigation.push("item", {
                        uid: item.item.id,
                        item: item.item,
                      });
                    }}
                  />
                );
              case "history":
                return (
                  <TransactionCard
                    item={item.item}
                    key={item.id}
                    borderColor={adaptive.paletteColorOrange}
                    onPress={() => {
                      navigation.push("item", {
                        uid: item.item.id,
                        item: item.item,
                      });
                    }}
                  />
                );
            }
          }}
        />
        {/* {placeholderItems.map((item) => {
          return (
            <ItemCard
              item={item}
              key={item.id}
              borderColor={adaptive.paletteColorOrange}
            />
          );
        })} */}
      </View>
    </SafeAreaView>
  );
};

export default CategorizedViewerScreen;

import { View, Text, Alert } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useRef } from "react";
import { TextInput } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import { useState } from "react";
import KeywordBuilder from "../../components/models/KeywordBuilder";
import CarouselItemBuilder from "../../components/CarouselItemBuilder";
import validator from "../../utils/validate";

import defaultItemImage from "../../../assets/images/temp/bg-item.png";

import mime from "mime";
import * as ImagePicker from "expo-image-picker";
import {
  createItem,
  deleteItem,
  deleteItemImage,
  getItemsFromShop,
  updateItem,
  uploadItemImage,
} from "../../services/api/items";
import ItemImageBox from "../../components/ItemImageBox";
import { Dropdown } from "react-native-element-dropdown";

const ModifyItemScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  const adaptive = AdaptiveScheme(theme.theme);

  // Selected Items
  const [shopItems, setShopItems] = useState([]);
  const [currentItem, setCurrentItem] = useState();

  // Local states
  const [itemState, setItemState] = useState("add");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [restState, setRestState] = useState("");

  // Form Data
  const [itemPhotos, setItemPhotos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [keywords, setKeywords] = useState("");

  const firstRun = useRef(true);

  const cleanVariables = () => {
    setName("");
    setDescription("");
    setPrice("");
    setKeywords("");
    setItemPhotos([]);
    setCurrentItem(undefined);
  };

  const refreshItems = () => {
    setIsRefreshing(true);

    getItemsFromShop({ shopid: user.shopid })
      .then((res) => {
        if (res.status === 200) {
          setShopItems(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  const setCurrentItemStates = (item) => {
    console.log(item);
    setItemPhotos(item.image);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setKeywords(item.keywords.reduce((str, e) => `${str} ${e}`, ""));
    setCurrentItem(item);
  };

  const uploadPhoto = async (index, updateDB = false) => {
    setRestState("Uploading");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageURI =
        `file:///` + result.assets[0].uri.split("file:/").join("");

      let formData = new FormData();

      formData.append("image", {
        uri: newImageURI,
        name: newImageURI.split("/").pop(),
        type: mime.getType(newImageURI),
      });

      uploadItemImage(formData, {
        token: user.token,
        id: updateDB ? currentItem.id : null,
        old: itemPhotos[index],
        update: updateDB,
      })
        .then((res) => {
          if (res.status === 201) {
            const photoSet = itemPhotos;
            photoSet[index] = res.data.image;
            console.log(res.data.image);
            setItemPhotos(photoSet);

            if (updateDB) {
              refreshItems();
            }
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setRestState("");
        });
    } else {
      setRestState("");
    }
  };

  const deletePhoto = async (index, updateDB = false) => {
    setRestState("Deleting");

    deleteItemImage({
      token: user.token,
      id: updateDB ? currentItem.id : null,
      old: itemPhotos[index],
      update: updateDB,
    })
      .then((res) => {
        console.log(res);
        console.log(res.status);
        console.log(res.data.message);
        console.log(res.data.info);
        console.log(res.data.kaocode);
        if (res.status === 200) {
          const photoSet = itemPhotos;
          photoSet[index] = undefined;
          setItemPhotos(photoSet);

          if (updateDB) {
            refreshItems();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRestState("");
      });

    // launch API request
    // if success
    // else console log error
    // finally setRestState(false)
  };

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

  const [inputErrors, setInputErrors] = useState([
    [false, ""],
    [false, ""],
    [false, ""],
    [false, ""],
    [false, ""],
  ]);

  const validate = () => {
    const keywordArray = keywords.split(" ").filter((e) => e !== "");
    console.log(keywordArray);

    const arrayValidation = [
      itemPhotos.filter((e) => e !== undefined).length !== 0,
      validator.validate(name, validator.INFO.ALL_L50_ONLY)[0],
      validator.validate(description, validator.INFO.ALL_L256_ONLY)[0],
      validator.validate(price, validator.INFO.ALL_L50_ONLY)[0],

      !keywordArray.some(
        (e) => !validator.validate(e, validator.INFO.TEXT_L20_ONLY)[0]
      ) && keywordArray.length !== 0,
    ];

    setInputErrors(arrayValidation.map((val) => [!val, ""]));
    console.log(arrayValidation);

    return !arrayValidation.some((e) => !e);
  };

  const changeItem = async () => {
    setIsSubmitting(true);

    const isValid = validate();

    if (isValid) {
      const itemMap = {
        id: currentItem.id,
        name: name,
        description: description,
        price: price,
        keywords: keywords.split(" ").filter((e) => e !== ""),
        images: itemPhotos.filter((e) => e !== undefined),
      };

      updateItem(itemMap, user)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        })
        .finally(() => {
          cleanVariables();
          refreshItems();
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
    }
  };

  const removeItem = async () => {
    setIsSubmitting(true);

    deleteItem({
      id: currentItem.id,
      token: user.token,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        cleanVariables();
        refreshItems();
        setIsSubmitting(false);
      });
  };

  // This function will reset above values..
  const addItem = async () => {
    setIsSubmitting(true);
    const isValid = validate();

    if (isValid) {
      const itemMap = {
        name: name,
        description: description,
        price: price,
        keywords: keywords.split(" ").filter((e) => e !== ""),
        images: itemPhotos.filter((e) => e !== undefined),
      };
      console.log(itemMap);

      createItem(itemMap, user)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            console.log("successfully created");
            cleanVariables();
            Alert.alert("Success", "Item successfully created");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
    }
  };

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
            className={`bg-blue-500 px-2 flex-1`}
            onPress={() => {
              if (itemState === "change") {
                cleanVariables();
              }
              setItemState("add");
            }}
          >
            <Text className={`text-white font-bold text-center text-base py-3`}>
              Add an Item
            </Text>
          </TouchableRipple>
          <TouchableRipple
            className={`bg-orange-500 px-2 flex-1`}
            onPress={() => {
              if (itemState === "add") {
                cleanVariables();
              }
              setItemState("change");
              refreshItems();
            }}
          >
            <Text className={`text-white font-bold text-center text-base py-3`}>
              Change an Item
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
            <View className={`flex flex-row justify-around mb-5`}>
              <ItemImageBox
                image={itemPhotos[0]}
                adaptive={adaptive}
                onPress={() => {
                  uploadPhoto(0);
                }}
                onPressDelete={() => {
                  deletePhoto(0);
                }}
              />
              <ItemImageBox
                image={itemPhotos[1]}
                adaptive={adaptive}
                onPress={() => {
                  uploadPhoto(1);
                }}
                onPressDelete={() => {
                  deletePhoto(1);
                }}
              />
              <ItemImageBox
                image={itemPhotos[2]}
                adaptive={adaptive}
                onPress={() => {
                  uploadPhoto(2);
                }}
                onPressDelete={() => {
                  deletePhoto(2);
                }}
              />
            </View>
            {inputErrors[0][0] && (
              <Text className={`text-red-600 mx-5 mb-3 text-base`}>
                * Upload at least 1 photo{" "}
              </Text>
            )}
            {restState !== "" && (
              <View
                className={`flex flex-row items-center justify-center my-3`}
              >
                <ActivityIndicator size={30} />
                <Text className={`${adaptive.nativeWindText} ml-5`}>
                  {restState}...
                </Text>
              </View>
            )}
            <View className={`mx-5`}>
              <Text
                className={`${
                  inputErrors[1][0] ? "text-red-600" : adaptive.nativeWindText
                } mb-2 ml-2 text-base`}
              >
                Name*
              </Text>
              <TextInput
                className={`${
                  inputErrors[1][0] && "text-red-600 border-2 border-red-600"
                } bg-darkPalette-1 rounded-full mb-3 p-2`}
                placeholder="Add the name of your item"
                maxLength={30}
                onChangeText={setName}
                value={name}
                onEndEditing={validate}
              />

              <Text
                className={`${
                  inputErrors[2][0] ? "text-red-600" : adaptive.nativeWindText
                } mb-2 ml-2 text-base`}
              >
                Description*
              </Text>
              <TextInput
                className={`${
                  inputErrors[2][0] && "text-red-600 border-2 border-red-600"
                } bg-darkPalette-1 rounded-full mb-3 p-2`}
                placeholder="Add the description of your item"
                maxLength={999}
                onChangeText={setDescription}
                value={description}
                onEndEditing={validate}
              />

              <Text
                className={`${
                  inputErrors[3][0] ? "text-red-600" : adaptive.nativeWindText
                } mb-2 ml-2 text-base`}
              >
                Price*
              </Text>
              <TextInput
                className={`${
                  inputErrors[3][0] && "text-red-600 border-2 border-red-600"
                } bg-darkPalette-1 rounded-full mb-3 p-2`}
                keyboardType="numeric"
                placeholder="Price your item"
                onChangeText={setPrice}
                value={price}
                onEndEditing={validate}
              />
              {keywords.split(" ").filter((e) => e !== "").length !== 0 && (
                <KeywordBuilder
                  keywords={keywords.split(" ").filter((e) => e !== "")}
                />
              )}
              <Text
                className={`${
                  inputErrors[4][0] ? "text-red-600" : adaptive.nativeWindText
                } mb-2 ml-2 text-base`}
              >
                Keywords*
              </Text>
              <TextInput
                className={`${
                  inputErrors[4][0] && "text-red-600 border-2 border-red-600"
                } bg-darkPalette-1 rounded-full mb-3 p-2`}
                placeholder="Separate keywords with a space"
                onChangeText={setKeywords}
                value={keywords}
                onEndEditing={validate}
              />
              {isSubmitting && (
                <View
                  className={`flex flex-row items-center justify-center my-3`}
                >
                  <ActivityIndicator size={30} />
                  <Text className={`${adaptive.nativeWindText} ml-5`}>
                    Please wait...
                  </Text>
                </View>
              )}
              <TouchableRipple
                className={`bg-purple-500 mx-3 rounded-full mt-4`}
                onPress={() => {
                  addItem();
                }}
              >
                <Text
                  className={`text-white font-bold text-center text-base py-3`}
                >
                  Submit
                </Text>
              </TouchableRipple>
            </View>
          </View>
        ) : (
          <View>
            {isRefreshing && (
              <View className={`flex flex-row items-center justify-center`}>
                <ActivityIndicator size={40} />
                <Text className={`${adaptive.nativeWindText} ml-3`}>
                  Fetching database..
                </Text>
              </View>
            )}
            {!isRefreshing &&
              (shopItems.length !== 0 ? (
                <View>
                  <Dropdown
                    data={shopItems}
                    labelField={"name"}
                    valueField={"id"}
                    placeholder="Select an item for editing"
                    className={`bg-darkPalette-1 border-2 border-solid mx-3 px-2`}
                    search
                    searchPlaceholder="Search an item.."
                    value={currentItem}
                    onChange={(item) => {
                      setCurrentItemStates(item);
                    }}
                  />
                  {currentItem && (
                    <View>
                      <View className={`flex flex-row justify-around my-5`}>
                        <ItemImageBox
                          image={itemPhotos[0]}
                          adaptive={adaptive}
                          onPress={() => {
                            uploadPhoto(0, true);
                          }}
                          onPressDelete={() => {
                            deletePhoto(0, true);
                          }}
                          hideOnSingleInstance={
                            itemPhotos.filter((e) => e !== undefined).length <=
                            1
                          }
                        />
                        <ItemImageBox
                          image={itemPhotos[1]}
                          adaptive={adaptive}
                          onPress={() => {
                            uploadPhoto(1, true);
                          }}
                          onPressDelete={() => {
                            deletePhoto(1, true);
                          }}
                          hideOnSingleInstance={
                            itemPhotos.filter((e) => e !== undefined).length <=
                            1
                          }
                        />
                        <ItemImageBox
                          image={itemPhotos[2]}
                          adaptive={adaptive}
                          onPress={() => {
                            uploadPhoto(2, true);
                          }}
                          onPressDelete={() => {
                            deletePhoto(2, true);
                          }}
                          hideOnSingleInstance={
                            itemPhotos.filter((e) => e !== undefined).length <=
                            1
                          }
                        />
                      </View>
                      {inputErrors[0][0] && (
                        <Text className={`text-red-600 mx-5 mb-3 text-base`}>
                          * Upload at least 1 photo{" "}
                        </Text>
                      )}
                      {restState !== "" && (
                        <View
                          className={`flex flex-row items-center justify-center my-3`}
                        >
                          <ActivityIndicator size={30} />
                          <Text className={`${adaptive.nativeWindText} ml-5`}>
                            {restState}...
                          </Text>
                        </View>
                      )}
                      <View className={`mx-5`}>
                        <Text
                          className={`${
                            inputErrors[1][0]
                              ? "text-red-600"
                              : adaptive.nativeWindText
                          } mb-2 ml-2 text-base`}
                        >
                          Name*
                        </Text>
                        <TextInput
                          className={`${
                            inputErrors[1][0] &&
                            "text-red-600 border-2 border-red-600"
                          } bg-darkPalette-1 rounded-full mb-3 p-2`}
                          placeholder="Add the name of your item"
                          maxLength={30}
                          onChangeText={setName}
                          value={name}
                          onEndEditing={validate}
                        />

                        <Text
                          className={`${
                            inputErrors[2][0]
                              ? "text-red-600"
                              : adaptive.nativeWindText
                          } mb-2 ml-2 text-base`}
                        >
                          Description*
                        </Text>
                        <TextInput
                          className={`${
                            inputErrors[2][0] &&
                            "text-red-600 border-2 border-red-600"
                          } bg-darkPalette-1 rounded-full mb-3 p-2`}
                          placeholder="Add the description of your item"
                          maxLength={999}
                          onChangeText={setDescription}
                          value={description}
                          onEndEditing={validate}
                        />

                        <Text
                          className={`${
                            inputErrors[3][0]
                              ? "text-red-600"
                              : adaptive.nativeWindText
                          } mb-2 ml-2 text-base`}
                        >
                          Price*
                        </Text>
                        <TextInput
                          className={`${
                            inputErrors[3][0] &&
                            "text-red-600 border-2 border-red-600"
                          } bg-darkPalette-1 rounded-full mb-3 p-2`}
                          keyboardType="numeric"
                          placeholder="Price your item"
                          onChangeText={setPrice}
                          value={price}
                          onEndEditing={validate}
                        />
                        {keywords.split(" ").filter((e) => e !== "").length !==
                          0 && (
                          <KeywordBuilder
                            keywords={keywords
                              .split(" ")
                              .filter((e) => e !== "")}
                          />
                        )}
                        <Text
                          className={`${
                            inputErrors[4][0]
                              ? "text-red-600"
                              : adaptive.nativeWindText
                          } mb-2 ml-2 text-base`}
                        >
                          Keywords*
                        </Text>
                        <TextInput
                          className={`${
                            inputErrors[4][0] &&
                            "text-red-600 border-2 border-red-600"
                          } bg-darkPalette-1 rounded-full mb-3 p-2`}
                          placeholder="Separate keywords with a space"
                          onChangeText={setKeywords}
                          value={keywords}
                          onEndEditing={validate}
                        />
                        {isSubmitting && (
                          <View
                            className={`flex flex-row items-center justify-center my-3`}
                          >
                            <ActivityIndicator size={30} />
                            <Text className={`${adaptive.nativeWindText} ml-5`}>
                              Please wait...
                            </Text>
                          </View>
                        )}
                        <TouchableRipple
                          className={`bg-purple-500 mx-3 rounded-sm mt-4`}
                          onPress={changeItem}
                        >
                          <Text
                            className={`text-white font-bold text-center text-base py-3`}
                          >
                            Update Item
                          </Text>
                        </TouchableRipple>
                        <TouchableRipple
                          className={`bg-red-500 mx-3 rounded-sm mt-4`}
                          onPress={removeItem}
                        >
                          <Text
                            className={`text-white font-bold text-center text-base py-3`}
                          >
                            Delete Item
                          </Text>
                        </TouchableRipple>
                      </View>
                      {itemPhotos.filter((e) => e !== undefined).length !==
                        0 && (
                        <>
                          <Text
                            className={`text-palette-orange2 text-xl font-bold mx-3 my-5`}
                          >
                            Images Preview:
                          </Text>
                          <CarouselItemBuilder
                            items={itemPhotos.filter((e) => e !== undefined)}
                          />
                        </>
                      )}
                    </View>
                  )}
                </View>
              ) : (
                <Text
                  className={`${adaptive.nativeWindText} text-center text-base m-5`}
                >
                  You are not selling anything yet.. click on "Add an Item" to
                  add an item.
                </Text>
              ))}
          </View>
        )}

        {/* item components with delete and update */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModifyItemScreen;

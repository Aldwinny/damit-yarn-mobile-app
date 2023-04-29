import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

import AdaptiveScheme from "../../shared/Adaptive";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import { testDB, uploadFile } from "../../services/api/Database";

import { logOut, updateUserData } from "../../shared/redux/userSlice";
import { deleteUser } from "../../services/api/userAPI";
import { PermissionsAndroid } from "react-native";

import mime from "mime";
import * as ImagePicker from "expo-image-picker";

const CartOverlay = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);
  const adaptive = AdaptiveScheme(theme.theme);

  const dispatch = useDispatch();

  // const changeUser = (data) => {
  //   dispatch(updateUserData(data));
  // };

  const [times, setTimes] = useState(0);

  return (
    <View
      className={`${adaptive.nativeWindBackground} flex-1 justify-center items-center`}
    >
      <Text className="text-lg text-red-400 text-center mx-5 mb-2">
        This is the cart screen
      </Text>
      <Button
        icon="account-cowboy-hat"
        mode="contained"
        onPress={async () => {
          console.log(user);
          setTimes(times + 1);

          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });

          if (!result.canceled) {
            const newImageUri =
              `file:///` + result.assets[0].uri.split("file:/").join("");
            let formData = new FormData();
            formData.append("image", {
              uri: newImageUri,
              name: newImageUri.split("/").pop(),
              type: mime.getType(newImageUri),
            });

            console.log(formData);

            uploadFile(formData)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
      >
        {`You've pressed me ${times} times! Yeehaw!`}
      </Button>
    </View>
  );
};

export default CartOverlay;

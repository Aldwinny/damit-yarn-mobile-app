import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

import AdaptiveScheme from "../../shared/Adaptive";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import { testDB } from "../../services/api/Database";

import { logOut, updateUserData } from "../../shared/redux/userSlice";
import { deleteUser } from "../../services/api/UserAPI";

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
        onPress={() => {
          console.log(user);
          setTimes(times + 1);
          // deleteUser(user)
          //   .then((res) => {
          //     console.log("res success");
          //     console.log(res.data);
          //     dispatch(logOut());
          //   })
          //   .catch((err) => {
          //     console.log(`res failed with status code ${err.response.status}`);
          //   });
        }}
      >
        {`You've pressed me ${times} times! Yeehaw!`}
      </Button>
    </View>
  );
};

export default CartOverlay;

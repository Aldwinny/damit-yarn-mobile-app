import { View, Text, ScrollView, TextInput, Image } from "react-native";
import React from "react";
import {
  ActivityIndicator,
  Button as PaperButton,
  TouchableRipple,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";

import YarnImage from "../../../assets/logo/DamitYarn.png";
import { useState } from "react";
import { useEffect } from "react";
import { registerUser } from "../../services/api/UserAPI";
import { updateUserData } from "../../shared/redux/userSlice";

const CreateAccountScreen = ({ route, navigation }) => {
  const theme = useSelector((state) => state.theme);

  const adaptive = AdaptiveScheme(theme.theme);

  const userData = route.params;

  const [response, setResponse] = useState();
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const changeUser = (data) => {
    dispatch(updateUserData(data));
  };

  useEffect(() => {
    if (response === undefined) {
      const fetchData = async () => {
        return await registerUser(userData);
      };

      fetchData()
        .then((res) => {
          setResponse(res);
          changeUser({ ...res.data.user, token: res.data.token ?? "" });
        })
        .catch((err) => console.log("An error may have occurred"));
    }
  }, [userData, response]);

  let responseBody;

  switch (response?.status) {
    case undefined:
      responseBody = (
        <ActivityIndicator
          size={"large"}
          className="justify-self-center self-center"
        />
      );
      break;
    case 201:
      responseBody = (
        <>
          <Image
            className={`h-36 w-36 mt-40 self-center`}
            source={YarnImage}
            resizeMode="contain"
          />
          <Text
            className={`${adaptive.nativeWindText} text-lg text-center mx-10`}
          >
            Account created successfully!
          </Text>
          <Text
            className={`${adaptive.nativeWindText} text-base text-center mt-5 mx-3`}
          >
            You are now ready to purchase handmade products through Damit Yarn!
          </Text>
          <TouchableRipple
            onPress={() => navigation.popToTop()}
            className="bg-palette-orange2 p-4 m-4 mt-24 px-14 rounded-full flex flex-row"
          >
            <Text className={`${adaptive.nativeWindText} font-bold text-xl`}>
              Continue
            </Text>
          </TouchableRipple>
        </>
      );
      break;
    case 409:
      responseBody = (
        <>
          <Image
            className={`h-36 w-36 mt-40 self-center`}
            source={YarnImage}
            resizeMode="contain"
          />
          <Text
            className={`${adaptive.nativeWindText} text-lg text-center mx-10`}
          >
            Username / Email already in use
          </Text>
          {global.debug && (
            <Text
              className={`${adaptive.nativeWindText} text-lg text-center mx-10`}
            >
              {response?.status ?? "NO_STATUS"}
            </Text>
          )}
          <Text
            className={`${adaptive.nativeWindText} text-base text-center mt-5`}
          >
            Please try a different username / email.
          </Text>
          <TouchableRipple
            onPress={() => navigation.pop()}
            className="bg-darkPalette-3 p-4 m-4 mt-24 px-14 rounded-full flex flex-row"
          >
            <Text className={`${adaptive.nativeWindText} font-bold text-xl`}>
              Continue
            </Text>
          </TouchableRipple>
        </>
      );
      break;
    default:
      responseBody = (
        <>
          <Image
            className={`h-36 w-36 mt-40 self-center`}
            source={YarnImage}
            resizeMode="contain"
          />
          <Text
            className={`${adaptive.nativeWindText} text-lg text-center mx-10`}
          >
            An unknown error has occurred. Sorry about that!
          </Text>
          {global.debug && (
            <Text
              className={`${adaptive.nativeWindText} text-lg text-center mx-10`}
            >
              {response?.status ?? "NO_STATUS"}
            </Text>
          )}
          <Text
            className={`${adaptive.nativeWindText} text-base text-center mt-5`}
          >
            Please try again later..
          </Text>
          <TouchableRipple
            onPress={() => navigation.pop()}
            className="bg-darkPalette-3 p-4 m-4 mt-24 px-14 rounded-full flex flex-row"
          >
            <Text className={`${adaptive.nativeWindText} font-bold text-xl`}>
              Continue
            </Text>
          </TouchableRipple>
        </>
      );
      break;
  }

  return (
    <SafeAreaView
      className={`${adaptive.nativeWindNavbar} flex-1 items-center`}
    >
      {responseBody}
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

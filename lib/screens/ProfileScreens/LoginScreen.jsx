import { View, Text, ScrollView, TextInput, Image } from "react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button as PaperButton,
  TouchableRipple,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import validator from "../../utils/validate";

import YarnImage from "../../../assets/logo/DamitYarn.png";
import { useEffect } from "react";
import { loginUser } from "../../services/api/userAPI";
import { updateUserData } from "../../shared/redux/userSlice";

const LoginScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);

  const adaptive = AdaptiveScheme(theme.theme);

  // Redux stuff
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Input stuff
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // API stuff
  const [response, setResponse] = useState();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (isLoggingIn) {
      console.log("summon the api call");

      const logIn = async () => {
        return await loginUser({ email: email, password: password });
      };

      logIn()
        .then((res) => {
          setResponse(res);
          console.log(res);

          if (response !== undefined) {
            dispatch(
              updateUserData({
                ...res.data.user,
                token: res.data.token ?? "",
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
          setResponse(err.response);
          console.log("An error has cocurred");
        })
        .finally(() => {
          if (response !== undefined) {
            setIsLoggingIn(false);
            if (response.status === 200) {
              if (navigation.canGoBack()) {
                navigation.pop();
              }
            }
          } else {
            console.log("unable to set logging in");
          }
        });
    }
  }, [
    setResponse,
    response,
    dispatch,
    setIsLoggingIn,
    isLoggingIn,
    navigation,
  ]);

  const [inputErrors, setInputErrors] = useState([
    [false, ""],
    [false, ""],
  ]);

  const validate = () => {
    const arrayValidation = [
      validator.validate(email, validator.INFO.EMAIL)[0],
      validator.validate(password, validator.INFO.PASSWORD)[0],
    ];

    setInputErrors(arrayValidation.map((val) => [!val, ""]));

    if (arrayValidation.some((e) => !e)) {
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Login"
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <Image source={YarnImage} className={`h-36 w-36 mt-5 self-center`} />
        <Text
          className={`text-palette-orange2 mx-4 mt-6 mb-2 font-bold text-lg text-center`}
        >
          Welcome back, yarn!
        </Text>
        {isLoggingIn && (
          <View className={`flex flex-row items-center justify-center my-3`}>
            <ActivityIndicator size={30} />
            <Text className={`${adaptive.nativeWindText} ml-5`}>
              Logging you in..
            </Text>
          </View>
        )}
        <View className={`m-4 flex-1`}>
          <Text
            className={`${
              inputErrors[0][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 text-base font-bold`}
          >
            Email*
          </Text>
          <TextInput
            placeholder="Enter your email address"
            maxLength={320}
            className={`${
              inputErrors[0][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-darkPalette-1 p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={setEmail}
            value={email}
            autoComplete="email"
            onEndEditing={validate}
          />
          <Text
            className={`${
              inputErrors[1][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Password*
          </Text>

          <TextInput
            placeholder="Enter your password"
            maxLength={100}
            className={`${
              inputErrors[1][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-darkPalette-1 p-2 px-3 rounded-full`}
            selectionColor={"red"}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={setPassword}
            value={password}
            autoComplete="password"
            onEndEditing={validate}
            secureTextEntry
          />
          {response?.status === 401 || response?.status === 404 ? (
            <Text className={`text-red-600 mt-2`}>
              * Email or Password incorrect!
            </Text>
          ) : response?.status === 500 ? (
            <Text className={`text-red-600 mt-2`}>
              * An unknown error has occurred.
            </Text>
          ) : (
            ""
          )}
          <TouchableRipple
            onPress={() => {
              const isValid = validate();

              if (isValid) {
                setIsLoggingIn(true);
              }
            }}
            className={`${adaptive.nativeWindNavbar} mt-7 rounded-full`}
            rippleColor={adaptive.paletteColorLightOrange}
            borderless
          >
            <View className={``}>
              <Text
                className={`text-white text-base py-4 p-2 text-center font-bold`}
              >
                Login
              </Text>
            </View>
          </TouchableRipple>

          <Text className={`${adaptive.nativeWindText} text-base mt-2 ml-3`}>
            If you want to sign up,{" "}
            <Text
              className={`text-palette-orange2 font-bold`}
              onPress={() => {
                navigation.replace("register");
              }}
            >
              Click here!
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

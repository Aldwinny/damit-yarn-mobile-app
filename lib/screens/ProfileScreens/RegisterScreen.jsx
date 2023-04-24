import {
  View,
  Text,
  ScrollView,
  Button,
  Image,
  TextInput,
  Animated,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { Checkbox, TouchableRipple } from "react-native-paper";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import YarnImage from "../../../assets/logo/DamitYarn.png";
import { CountryPicker } from "react-native-country-codes-picker";

import validator from "../../utils/validate";

const RegisterScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const adaptive = AdaptiveScheme(theme.theme);

  // const animation = StyleSheet.create({
  //   iconContainer: {
  //     transform: [{translateX: 10}]
  //   }
  // })

  const [registerIndex, setRegisterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState("");

  const personalInfo = useRef();
  const contactInfo = useRef();
  const shopInfo = useRef();

  const transformValue = new Animated.Value(
    isTransitioning === "left" ? 30 : isTransitioning === "right" ? -30 : 1
  );
  const opacityValue = new Animated.Value(isTransitioning !== "" ? 0 : 1);
  const transitionAnimation = () => {
    Animated.spring(transformValue, {
      toValue: -30,
      useNativeDriver: true,
    }).start();
    Animated.spring(opacityValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setRegisterIndex(registerIndex + 1);
      setIsTransitioning("left");
    }, 150);
  };

  const transitionBackAnimation = () => {
    Animated.spring(transformValue, {
      toValue: 30,
      useNativeDriver: true,
    }).start();
    Animated.spring(opacityValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setRegisterIndex(registerIndex - 1);
      setIsTransitioning("right");
    }, 150);
  };

  useEffect(() => {
    if (isTransitioning !== "") {
      Animated.spring(opacityValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      Animated.spring(transformValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setIsTransitioning("");
      }, 150);
    }
  }, [transformValue, opacityValue, isTransitioning]);

  const animatedTransitionStyle = {
    transform: [{ translateX: transformValue }],
    opacity: opacityValue,
  };

  const RegisterOverlay3 = ({
    adaptive,
    animatedTransitionStyle,
    transitionAnimation,
    transitionBackAnimation,
    navigation,
    infoCallback,
    infoRef,
  }) => {
    // Shop Information
    const [hasShop, setHasShop] = useState(
      infoRef !== undefined ? infoRef.hasShop : false
    );
    const [shopName, setShopName] = useState(
      infoRef !== undefined ? infoRef.shopName : ""
    );
    const [shopDescription, setShopDescription] = useState(
      infoRef !== undefined ? infoRef.shopDescription : ""
    );
    const [shopHint, setShopHint] = useState(
      infoRef !== undefined ? infoRef.shopHint : ""
    );

    const [inputErrors, setInputErrors] = useState([
      [false, ""],
      [false, ""],
      [false, ""],
    ]);

    const validate = () => {
      if (!hasShop) return true;

      const arrayValidation = [
        validator.validate(shopName, validator.INFO.ALL_L50_ONLY)[0],
        validator.validate(shopDescription, validator.INFO.ALL_L256_ONLY)[0],
        validator.validate(shopHint, validator.INFO.OPTIONAL_ALL_L20_ONLY)[0],
      ];

      setInputErrors(arrayValidation.map((val) => [!val, ""]));

      if (arrayValidation.some((e) => !e)) {
        return false;
      }

      return true;
    };

    const validateThenSubmit = () => {
      const isValid = validate();

      if (hasShop && isValid) {
        infoCallback({
          hasShop: hasShop,
          shopName: shopName,
          shopDescription: shopDescription,
          shopHint: shopHint,
        });
        return true;
      } else if (!hasShop && isValid) {
        infoCallback({
          hasShop: hasShop,
          shopName: "",
          shopDescription: "",
          shopHint: "",
        });
        return true;
      }
      return false;
    };

    return (
      <Animated.ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
        style={animatedTransitionStyle}
      >
        <Image source={YarnImage} className={`h-36 w-36 mt-5 self-center`} />
        <Text
          className={`${adaptive.nativeWindActiveNavText} mx-4 mt-6 mb-2 font-bold text-lg text-center`}
        >
          Would you like to create your own shop?
        </Text>
        <View className={`m-4 flex-1`}>
          <View className={`flex flex-row items-center`}>
            <Checkbox
              status={hasShop ? "checked" : "unchecked"}
              color="orange"
              onPress={() => {
                setHasShop(!hasShop);
                validate();
              }}
            />
            <Text
              className={`${adaptive.nativeWindText}  mb-1 ml-1 text-base font-bold`}
            >
              I'd like to create a shop
            </Text>
          </View>

          {/* Something */}
          <Text
            className={`${adaptive.nativeWindIconColor} mb-2 ml-2 text-sm font-bold`}
          >
            *By creating a shop, you agree to the terms of the Damit Yarn
            Business and its subsidiaries.
          </Text>

          <Text
            className={`${
              hasShop && inputErrors[0][0]
                ? "text-red-600"
                : adaptive.nativeWindText
            }  mb-1 ml-1 text-base font-bold`}
          >
            Shop name{hasShop ? "*" : ""}
          </Text>
          <TextInput
            placeholder="Enter your shop name"
            maxLength={320}
            className={`${hasShop ? "bg-white" : "bg-darkPalette-2"} ${
              hasShop && inputErrors[0][0]
                ? "text-red-600 border-2 border-red-600"
                : ""
            } p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            editable={hasShop}
            onChangeText={setShopName}
            value={shopName}
            onEndEditing={validate}
          />
          <Text
            className={`${
              hasShop && inputErrors[1][0]
                ? "text-red-600"
                : adaptive.nativeWindText
            }  mb-1 ml-1 mt-4 text-base font-bold`}
          >
            Shop Description{hasShop ? "*" : ""}
          </Text>
          <TextInput
            placeholder="Enter your shop description"
            maxLength={320}
            className={`${hasShop ? "bg-white" : "bg-darkPalette-2"} ${
              hasShop && inputErrors[1][0]
                ? "text-red-600 border-2 border-red-600"
                : ""
            } p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            editable={hasShop}
            onChangeText={setShopDescription}
            value={shopDescription}
            onEndEditing={validate}
          />
          <Text
            className={`${
              hasShop && inputErrors[2][0]
                ? "text-red-600"
                : adaptive.nativeWindText
            }  mb-1 ml-1 mt-4 text-base font-bold`}
          >
            Shop Hint{hasShop ? " (optional)" : ""}
          </Text>
          <TextInput
            placeholder="Describe your shop in less than 10 words"
            maxLength={320}
            className={`${hasShop ? "bg-white" : "bg-darkPalette-2"} ${
              hasShop && inputErrors[2][0]
                ? "text-red-600 border-2 border-red-600"
                : ""
            } p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            editable={hasShop}
            onChangeText={setShopHint}
            value={shopHint}
            onEndEditing={validate}
          />
          <Text
            className={`${adaptive.nativeWindIconColor} mt-2 ml-2 text-sm font-bold`}
          >
            *By clicking submit, you agree to the terms and conditions, and
            privacy policy provided by Damit Yarn.
          </Text>
          <View className="flex flex-row mb-10">
            <TouchableRipple
              onPress={() => {
                validateThenSubmit();
                transitionBackAnimation();
              }}
              className={`${adaptive.nativeWindNavbar} flex-1 mt-7 mr-2 rounded-full`}
              rippleColor={adaptive.paletteColorLightOrange}
              borderless
            >
              <View className={`flex flex-row items-center justify-center`}>
                <FontAwesome5Icon
                  name="arrow-left"
                  size={15}
                  className={`mr-5`}
                  color={adaptive.textColor}
                />
                <Text
                  className={`${adaptive.nativeWindText} text-base py-4 p-2 text-center font-bold`}
                >
                  Back
                </Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                const isValid = validateThenSubmit();

                if (isValid) {
                  navigation.navigate("createaccount", {
                    ...personalInfo.current,
                    ...contactInfo.current,
                    ...shopInfo.current,
                  });
                }
              }}
              className={`${adaptive.nativeWindNavbar} flex-1 mt-7 mr-2 rounded-full`}
              rippleColor={adaptive.paletteColorLightOrange}
              borderless
            >
              <View
                className={`bg-palette-orange2 flex flex-row items-center justify-center`}
              >
                <Text
                  className={`${adaptive.nativeWindText} text-base py-4 p-2 text-center font-bold`}
                >
                  Submit
                </Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </Animated.ScrollView>
    );
  };

  const RegisterOverlay2 = ({
    adaptive,
    animatedTransitionStyle,
    transitionAnimation,
    transitionBackAnimation,
    navigation,
    infoCallback,
    infoRef,
  }) => {
    // State for showing the country picker
    const [showCountries, setShowCountries] = useState(false);

    // Contact Information
    const [countryCode, setCountryCode] = useState(
      infoRef !== undefined ? infoRef.code : "+63"
    );
    const [contactNum, setContactNum] = useState(
      infoRef !== undefined ? infoRef.contact : ""
    );
    const [zip, setZip] = useState(infoRef !== undefined ? infoRef.zip : "");
    const [street, setStreet] = useState(
      infoRef !== undefined ? infoRef.street : ""
    );
    const [city, setCity] = useState(infoRef !== undefined ? infoRef.city : "");
    const [country, setCountry] = useState(
      infoRef !== undefined ? infoRef.country : ""
    );

    const [inputErrors, setInputErrors] = useState([
      [false, ""],
      [false, ""],
      [false, ""],
      [false, ""],
      [false, ""],
    ]);

    const validate = () => {
      const arrayValidation = [
        validator.validate(countryCode + contactNum, validator.INFO.CONTACT)[0],
        validator.validate(zip, validator.INFO.TEXT_NUMERIC_ONLY)[0],
        validator.validate(street, validator.INFO.TEXT_L50_ONLY)[0],
        validator.validate(city, validator.INFO.TEXT_L50_ONLY)[0],
        validator.validate(country, validator.INFO.TEXT_L50_ONLY)[0],
      ];

      setInputErrors(arrayValidation.map((val) => [!val, ""]));

      // Check if at least one is error
      if (arrayValidation.some((e) => !e)) {
        return false;
      }

      return true;
    };

    const validateThenSubmit = () => {
      const isValid = validate();

      if (isValid) {
        infoCallback({
          code: countryCode,
          contact: contactNum,
          zip: zip,
          street: street,
          city: city,
          country: country,
        });
        return true;
      }
      return false;
    };

    return (
      <Animated.ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
        style={animatedTransitionStyle}
      >
        <Image source={YarnImage} className={`h-36 w-36 mt-5 self-center`} />
        <Text
          className={`${adaptive.nativeWindActiveNavText} mx-4 mt-6 mb-2 font-bold text-lg text-center`}
        >
          Contact Information
        </Text>
        <View className={`m-4 flex-1`}>
          <Text
            className={`${
              inputErrors[0][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 text-base font-bold`}
          >
            Contact Number*
          </Text>
          <View className={`flex flex-row border-2`}>
            <TouchableRipple
              onPress={() => setShowCountries(true)}
              rippleColor="rgba(0,0,0,0.5)"
              className={`${
                inputErrors[0][0] ? "text-red-600 border-2 border-red-600" : ""
              } bg-white rounded-l-full mr-2 h-11 w-28 p-2 px-3`}
              borderless
            >
              <View className={`flex flex-row items-center`}>
                <Text
                  className={`${
                    inputErrors[0][0] ? "text-red-600" : "text-black"
                  } flex-1`}
                >
                  {countryCode}
                </Text>
                <MaterialIcon name="keyboard-arrow-down" size={25} />
              </View>
            </TouchableRipple>
            <TextInput
              placeholder="Enter your contact number"
              maxLength={320}
              className={`${
                inputErrors[0][0] ? "text-red-600 border-2 border-red-600" : ""
              } bg-white p-2 px-3 rounded-r-full flex-1`}
              cursorColor={adaptive.paletteColorOrange}
              keyboardType="numeric"
              onChangeText={setContactNum}
              value={contactNum}
              autoComplete="cc-number"
              onEndEditing={validate}
            />
          </View>

          {/* Zip */}
          <Text
            className={`${
              inputErrors[1][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            ZIP / Postal Code*
          </Text>
          <TextInput
            placeholder="Enter your ZIP / Postal Code"
            maxLength={320}
            className={`${
              inputErrors[1][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-white p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={setZip}
            value={zip}
            autoComplete="postal-code"
            onEndEditing={validate}
          />

          {/* Street */}
          <Text
            className={`${
              inputErrors[2][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Street*
          </Text>
          <TextInput
            placeholder="Enter your Street name"
            maxLength={25}
            className={`${
              inputErrors[2][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-white p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={setStreet}
            value={street}
            onEndEditing={validate}
          />

          {/* City */}
          <Text
            className={`${
              inputErrors[3][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            City*
          </Text>
          <TextInput
            placeholder="Enter the name of your city"
            maxLength={25}
            className={`${
              inputErrors[3][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-white p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={setCity}
            value={city}
            onEndEditing={validate}
          />

          {/* Country */}
          <Text
            className={`${
              inputErrors[4][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Country*
          </Text>
          <TextInput
            placeholder="Enter the name of your country"
            maxLength={25}
            className={`${
              inputErrors[4][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-white p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={setCountry}
            value={country}
            onEndEditing={validate}
          />

          <View className="flex flex-row mb-12">
            <TouchableRipple
              onPress={() => {
                validateThenSubmit();
                transitionBackAnimation();
              }}
              className={`${adaptive.nativeWindNavbar} flex-1 mt-7 mr-2 rounded-full`}
              rippleColor={adaptive.paletteColorLightOrange}
              borderless
            >
              <View className={`flex flex-row items-center justify-center`}>
                <FontAwesome5Icon
                  name="arrow-left"
                  size={15}
                  className={`mr-5`}
                  color={adaptive.textColor}
                />
                <Text
                  className={`${adaptive.nativeWindText} text-base py-4 p-2 text-center font-bold`}
                >
                  Back
                </Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                const isValid = validateThenSubmit();

                if (isValid) {
                  transitionAnimation();
                }
              }}
              className={`${adaptive.nativeWindNavbar} flex-1 mt-7 rounded-full`}
              rippleColor={adaptive.paletteColorLightOrange}
              borderless
            >
              <View className={`flex flex-row items-center justify-center`}>
                <Text
                  className={`${adaptive.nativeWindText} text-base py-4 p-2 text-center font-bold`}
                >
                  Continue
                </Text>
                <FontAwesome5Icon
                  name="arrow-right"
                  size={15}
                  className={`ml-5`}
                  color={adaptive.textColor}
                />
              </View>
            </TouchableRipple>
          </View>
        </View>
        <CountryPicker
          show={showCountries}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setShowCountries(false);
          }}
          onRequestClose={() => setShowCountries(false)}
          onBackdropPress={() => setShowCountries(false)}
          style={{
            modal: {
              height: 400,
            },
          }}
        />
      </Animated.ScrollView>
    );
  };

  const RegisterOverlay1 = ({
    adaptive,
    animatedTransitionStyle,
    transitionAnimation,
    navigation,
    infoCallback,
    infoRef,
  }) => {
    // Personal Information
    const [email, setEmail] = useState(
      infoRef !== undefined ? infoRef.email : ""
    );
    const [firstName, setFirstName] = useState(
      infoRef !== undefined ? infoRef.firstname : ""
    );
    const [middleName, setMiddleName] = useState(
      infoRef !== undefined ? infoRef.middlename : ""
    );
    const [lastName, setLastName] = useState(
      infoRef !== undefined ? infoRef.lastname : ""
    );
    const [username, setUsername] = useState(
      infoRef !== undefined ? infoRef.username : ""
    );
    const [password, setPassword] = useState(
      infoRef !== undefined ? infoRef.password : ""
    );
    const [confirmPass, setConfirmPass] = useState(
      infoRef !== undefined ? infoRef.password : ""
    );

    const [inputErrors, setInputErrors] = useState([
      [false, ""],
      [false, ""],
      [false, ""],
      [false, ""],
      [false, ""],
      [false, ""],
      [false, ""],
    ]);

    const validate = () => {
      const arrayValidation = [
        validator.validate(email, validator.INFO.EMAIL)[0],
        validator.validate(firstName, validator.INFO.NAME)[0],
        validator.validate(middleName, validator.INFO.OPTIONAL_NAME)[0],
        validator.validate(lastName, validator.INFO.NAME)[0],
        validator.validate(username, validator.INFO.USERNAME)[0],
        validator.validate(password, validator.INFO.PASSWORD)[0],
        validator.validate(confirmPass, validator.INFO.PASSWORD)[0],
      ];

      // If confirm pass is not same as password
      if (password != confirmPass) {
        arrayValidation[6] = false;
      }

      setInputErrors(arrayValidation.map((val) => [!val, ""]));

      // Check if at least one is error
      if (arrayValidation.some((e) => !e)) {
        return false;
      }

      return true;
    };

    const validateThenSubmit = () => {
      const isValid = validate();

      if (isValid) {
        infoCallback({
          email: email,
          firstname: firstName,
          middlename: middleName,
          lastname: lastName,
          username: username,
          password: password,
        });
        return true;
      }
      return false;
    };

    return (
      <Animated.ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
        style={animatedTransitionStyle}
      >
        <Image source={YarnImage} className={`h-36 w-36 mt-5 self-center`} />
        <Text
          className={`${adaptive.nativeWindActiveNavText} mx-4 mt-6 mb-2 font-bold text-lg text-center`}
        >
          Personal Information
        </Text>
        <Text className={`${adaptive.nativeWindText} text-base my-2 ml-5`}>
          If you want to sign in,{" "}
          <Text
            className={`${adaptive.nativeWindButtonText}`}
            onPress={() => {
              navigation.replace("login");
            }}
          >
            click here!
          </Text>
        </Text>
        <View className={`m-4 flex-1`}>
          {/* Email Address */}
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
            } bg-white p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={(_) => setEmail(_)}
            value={email}
            autoComplete="email"
            onEndEditing={validate}
          />
          {inputErrors[0][0] && inputErrors[0][1] !== "" ? (
            <Text className={`text-red-600 mt-1`}>* {inputErrors[0][1]}</Text>
          ) : (
            ""
          )}

          {/* First name */}
          <Text
            className={`${
              inputErrors[1][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            First name*
          </Text>
          <TextInput
            placeholder="Enter your first name"
            maxLength={320}
            className={`${
              inputErrors[1][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-white p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={(_) => setFirstName(_)}
            value={firstName}
            autoComplete="name-given"
            onEndEditing={validate}
          />
          {inputErrors[1][0] && inputErrors[1][1] !== "" ? (
            <Text className={`text-red-600 mt-1`}>* {inputErrors[0][1]}</Text>
          ) : (
            ""
          )}

          {/* Middle name */}
          <Text
            className={`${
              inputErrors[2][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Middle name (optional)
          </Text>
          <TextInput
            placeholder="Enter your middle name"
            maxLength={320}
            className={`${
              inputErrors[2][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-white p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={(_) => setMiddleName(_)}
            value={middleName}
            autoComplete="name-middle"
            onEndEditing={validate}
          />
          {inputErrors[2][0] && inputErrors[2][1] !== "" ? (
            <Text className={`text-red-600 mt-1`}>* {inputErrors[0][1]}</Text>
          ) : (
            ""
          )}

          {/* Last name */}
          <Text
            className={`${
              inputErrors[3][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Last name*
          </Text>
          <TextInput
            placeholder="Enter your last name"
            maxLength={320}
            className={`${
              inputErrors[3][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-white p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={(_) => setLastName(_)}
            value={lastName}
            autoComplete="name-family"
            onEndEditing={validate}
          />
          {inputErrors[3][0] && inputErrors[3][1] !== "" ? (
            <Text className={`text-red-600 mt-1`}>* {inputErrors[0][1]}</Text>
          ) : (
            ""
          )}

          {/* Username */}
          <Text
            className={`${
              inputErrors[4][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Username*
          </Text>
          <TextInput
            placeholder="Enter your username"
            maxLength={25}
            className={`${
              inputErrors[4][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-white p-2 px-3 rounded-full`}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={(_) => setUsername(_)}
            value={username}
            autoComplete="username"
            onEndEditing={validate}
          />
          {inputErrors[4][0] && inputErrors[4][1] !== "" ? (
            <Text className={`text-red-600 mt-1`}>* {inputErrors[0][1]}</Text>
          ) : (
            ""
          )}

          {/* Password */}
          <Text
            className={`${
              inputErrors[5][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Password*
          </Text>
          <TextInput
            placeholder="Enter your password"
            maxLength={100}
            className={`${
              inputErrors[5][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-white p-2 px-3 rounded-full`}
            selectionColor={"red"}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={(_) => setPassword(_)}
            value={password}
            secureTextEntry
            autoComplete="password"
            onEndEditing={validate}
          />
          <Text className={`text-darkPalette-2 mt-1`}>
            * Password must contain 8 or more characters with at least 1 small
            letter, 1 capital letter, 1 number, and 1 special symbol.
          </Text>
          {inputErrors[5][0] && inputErrors[5][1] !== "" ? (
            <Text className={`text-red-600 mt-1`}>* {inputErrors[0][1]}</Text>
          ) : (
            ""
          )}

          {/* Confirm Password */}
          <Text
            className={`${
              inputErrors[6][0] ? "text-red-600" : adaptive.nativeWindText
            } mb-2 ml-2 mt-4 text-base font-bold`}
          >
            Confirm Password*
          </Text>
          <TextInput
            placeholder="Confirm your password"
            maxLength={100}
            className={`${
              inputErrors[6][0] ? "text-red-600 border-2 border-red-600" : ""
            } bg-white p-2 px-3 rounded-full`}
            selectionColor={"red"}
            cursorColor={adaptive.paletteColorOrange}
            onChangeText={setConfirmPass}
            value={confirmPass}
            secureTextEntry
            autoComplete="password"
            onEndEditing={validate}
          />
          {inputErrors[6][0] && inputErrors[6][1] !== "" ? (
            <Text className={`text-red-600 mt-1`}>* {inputErrors[0][1]}</Text>
          ) : (
            ""
          )}

          <TouchableRipple
            onPress={() => {
              const isValid = validateThenSubmit();

              if (isValid) {
                transitionAnimation();
              }
            }}
            className={`${adaptive.nativeWindNavbar} mt-7 rounded-full mb-12`}
            rippleColor={adaptive.paletteColorLightOrange}
            borderless
          >
            <View className={`flex flex-row items-center justify-center`}>
              <Text
                className={`${adaptive.nativeWindText} text-base py-4 p-2 text-center font-bold`}
              >
                Continue
              </Text>
              <FontAwesome5Icon
                name="arrow-right"
                size={15}
                className={`ml-5`}
                color={adaptive.textColor}
              />
            </View>
          </TouchableRipple>
        </View>
      </Animated.ScrollView>
    );
  };

  const overlays = [
    <RegisterOverlay1
      adaptive={adaptive}
      animatedTransitionStyle={animatedTransitionStyle}
      transitionAnimation={transitionAnimation}
      navigation={navigation}
      infoCallback={(values) => (personalInfo.current = values)}
      infoRef={personalInfo.current}
    />,
    <RegisterOverlay2
      adaptive={adaptive}
      animatedTransitionStyle={animatedTransitionStyle}
      transitionAnimation={transitionAnimation}
      transitionBackAnimation={transitionBackAnimation}
      navigation={navigation}
      infoCallback={(values) => (contactInfo.current = values)}
      infoRef={contactInfo.current}
    />,
    <RegisterOverlay3
      adaptive={adaptive}
      animatedTransitionStyle={animatedTransitionStyle}
      transitionAnimation={transitionAnimation}
      transitionBackAnimation={transitionBackAnimation}
      navigation={navigation}
      infoCallback={(values) => (shopInfo.current = values)}
      infoRef={shopInfo.current}
    />,
  ];

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Register"
      />
      <View className={`${adaptive.nativeWindBackground}`}>
        {registerIndex === 0
          ? overlays[0]
          : registerIndex === 1
          ? overlays[1]
          : overlays[2]}
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { ScrollView } from "react-native";
import { useEffect } from "react";

import YarnImage from "../../../assets/logo/DamitYarn.png";
import validator from "../../utils/validate";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Image } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import { TextInput } from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import {
  checkMatchPassword,
  updateUser,
  uploadUserPhoto,
} from "../../services/api/userAPI";
import { updateUserData } from "../../shared/redux/userSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

import mime from "mime";
import * as ImagePicker from "expo-image-picker";

const UpdateMyAccountScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  const adaptive = AdaptiveScheme(theme.theme);

  const dispatch = useDispatch();

  const [response, setResponse] = useState();
  const [isRequesting, setIsRequesting] = useState(false);

  // State for showing the country picker
  const [showCountries, setShowCountries] = useState(false);

  // Personal information
  const [firstName, setFirstName] = useState(user.firstname ?? "");
  const [middleName, setMiddleName] = useState(user.middlename ?? "");
  const [lastName, setLastName] = useState(user.lastname ?? "");

  // Contact Information
  const [countryCode, setCountryCode] = useState(user.code ?? "+63");
  const [contactNum, setContactNum] = useState(user.contact ?? "");
  const [zip, setZip] = useState(user.zip ?? "");
  const [street, setStreet] = useState(user.street ?? "");
  const [city, setCity] = useState(user.city ?? "");
  const [country, setCountry] = useState(user.country ?? "");

  // For verification purposes
  const [password, setPassword] = useState("");

  const performRequest = () => {
    const checkMatch = async () => {
      return await checkMatchPassword({
        token: user.token,
        id: user.id,
        password: password,
      });
    };

    const proceedUpdate = async () => {
      return await updateUser({
        firstname: firstName,
        lastname: lastName,
        middlename: middleName,
        code: countryCode,
        contact: contactNum,
        zip: zip,
        street: street,
        city: city,
        country: country,
        password: password,
        token: user.token,
        id: user.id,
      });
    };

    checkMatch()
      .then((res) => {
        setResponse(res.data);

        if (res.data.info) {
          proceedUpdate()
            .then((res) => {
              setResponse(res.data);

              const newUserData = { ...res.data };

              delete newUserData.kaocode;
              delete newUserData.info;
              delete newUserData.message;

              dispatch(updateUserData(newUserData));
            })
            .catch((err) => {
              console.log(err.response);
            });
        }
      })
      .catch((err) => {
        console.log("an error may have occurred");
        console.log(err.response);
      })
      .finally(() => {
        setIsRequesting(false);
      });
  };

  const [inputErrors, setInputErrors] = useState([
    [false, ""],
    [false, ""],
    [false, ""],
    [false, ""],
    [false, ""],
    [false, ""],
    [false, ""],
    [false, ""],
  ]);

  const [isUploading, setIsUploading] = useState(false);

  const uploadPhoto = async () => {
    setIsUploading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
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

      uploadUserPhoto(formData, user)
        .then((res) => {
          if (res.status === 201) {
            dispatch(updateUserData({ image: res.data.image }));
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsUploading(false);
        });
    } else {
      setIsUploading(false);
    }
  };

  const validate = () => {
    const arrayValidation = [
      validator.validate(firstName, validator.INFO.NAME)[0],
      validator.validate(middleName, validator.INFO.OPTIONAL_NAME)[0],
      validator.validate(lastName, validator.INFO.NAME)[0],
      validator.validate(countryCode + contactNum, validator.INFO.CONTACT)[0],
      validator.validate(zip, validator.INFO.TEXT_NUMERIC_ONLY)[0],
      validator.validate(street, validator.INFO.TEXT_L50_ONLY)[0],
      validator.validate(city, validator.INFO.TEXT_L50_ONLY)[0],
      validator.validate(country, validator.INFO.TEXT_L50_ONLY)[0],
    ];

    setInputErrors(arrayValidation.map((val) => [!val, ""]));

    // Check if at least one is error
    return !arrayValidation.some((e) => !e);
  };

  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Update"
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <View className={`${adaptive.nativeWindBackground} flex`}>
          <Image
            source={user.image ? { uri: user.image } : YarnImage}
            className={`h-36 w-36 mt-5 self-center rounded-full`}
          />

          <Text
            className={`text-palette-orange2 mx-4 mt-6 mb-2 font-bold text-lg text-center`}
          >
            User Information
          </Text>

          <View className={`m-3 flex-1`}>
            {isUploading && (
              <View
                className={`flex flex-row items-center justify-center my-3`}
              >
                <ActivityIndicator size={30} />
                <Text className={`${adaptive.nativeWindText} ml-5`}>
                  Uploading...
                </Text>
              </View>
            )}
            <TouchableRipple
              className={`bg-purple-500 rounded-full p-2 mb-2`}
              onPress={() => {
                uploadPhoto();
              }}
            >
              <Text className={`text-white text-center font-bold`}>
                Upload a profile photo
              </Text>
            </TouchableRipple>

            {/* First name */}
            <Text
              className={`${
                inputErrors[0][0] ? "text-red-600" : adaptive.nativeWindText
              } mb-2 ml-2 text-base font-bold`}
            >
              First name*
            </Text>
            <TextInput
              placeholder="Enter your first name"
              maxLength={320}
              className={`${
                inputErrors[0][0] ? "text-red-600 border-2 border-red-600" : ""
              } bg-darkPalette-1 p-2 px-3 rounded-full`}
              cursorColor={adaptive.paletteColorOrange}
              onChangeText={(_) => setFirstName(_)}
              value={firstName}
              autoComplete="name-given"
              onEndEditing={validate}
            />
            {inputErrors[0][0] && inputErrors[0][1] !== "" ? (
              <Text className={`text-red-600 mt-1`}>* {inputErrors[0][1]}</Text>
            ) : (
              ""
            )}

            {/* Middle name */}
            <Text
              className={`${
                inputErrors[1][0] ? "text-red-600" : adaptive.nativeWindText
              } mb-2 ml-2 mt-4 text-base font-bold`}
            >
              Middle name (optional)
            </Text>
            <TextInput
              placeholder="Enter your middle name"
              maxLength={320}
              className={`${
                inputErrors[1][0] ? "text-red-600 border-2 border-red-600" : ""
              } bg-darkPalette-1 p-2 px-3 rounded-full`}
              cursorColor={adaptive.paletteColorOrange}
              onChangeText={(_) => setMiddleName(_)}
              value={middleName}
              autoComplete="name-middle"
              onEndEditing={validate}
            />
            {inputErrors[1][0] && inputErrors[1][1] !== "" ? (
              <Text className={`text-red-600 mt-1`}>* {inputErrors[1][1]}</Text>
            ) : (
              ""
            )}

            {/* Last name */}
            <Text
              className={`${
                inputErrors[2][0] ? "text-red-600" : adaptive.nativeWindText
              } mb-2 ml-2 mt-4 text-base font-bold`}
            >
              Last name*
            </Text>
            <TextInput
              placeholder="Enter your last name"
              maxLength={320}
              className={`${
                inputErrors[2][0] ? "text-red-600 border-2 border-red-600" : ""
              } bg-darkPalette-1 p-2 px-3 rounded-full`}
              cursorColor={adaptive.paletteColorOrange}
              onChangeText={(_) => setLastName(_)}
              value={lastName}
              autoComplete="name-family"
              onEndEditing={validate}
            />
            {inputErrors[2][0] && inputErrors[2][1] !== "" ? (
              <Text className={`text-red-600 mt-1`}>* {inputErrors[2][1]}</Text>
            ) : (
              ""
            )}
            <Text
              className={`${
                inputErrors[3][0] ? "text-red-600" : adaptive.nativeWindText
              } mb-2 ml-2 mt-4 text-base font-bold`}
            >
              Contact Number*
            </Text>
            <View className={`flex flex-row`}>
              <TouchableRipple
                onPress={() => setShowCountries(true)}
                rippleColor="rgba(0,0,0,0.5)"
                className={`${
                  inputErrors[3][0]
                    ? "text-red-600 border-2 border-red-600"
                    : ""
                } bg-darkPalette-1 rounded-l-full mr-2 h-11 w-28 p-2 px-3`}
                borderless
              >
                <View className={`flex flex-row items-center`}>
                  <Text
                    className={`${
                      inputErrors[3][0] ? "text-red-600" : "text-black"
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
                  inputErrors[3][0]
                    ? "text-red-600 border-2 border-red-600"
                    : ""
                } bg-darkPalette-1 p-2 px-3 rounded-r-full flex-1`}
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
                inputErrors[4][0] ? "text-red-600" : adaptive.nativeWindText
              } mb-2 ml-2 mt-4 text-base font-bold`}
            >
              ZIP / Postal Code*
            </Text>
            <TextInput
              placeholder="Enter your ZIP / Postal Code"
              maxLength={320}
              className={`${
                inputErrors[4][0] ? "text-red-600 border-2 border-red-600" : ""
              } bg-darkPalette-1 p-2 px-3 rounded-full`}
              cursorColor={adaptive.paletteColorOrange}
              onChangeText={setZip}
              value={zip}
              autoComplete="postal-code"
              onEndEditing={validate}
            />

            {/* Street */}
            <Text
              className={`${
                inputErrors[5][0] ? "text-red-600" : adaptive.nativeWindText
              } mb-2 ml-2 mt-4 text-base font-bold`}
            >
              Street*
            </Text>
            <TextInput
              placeholder="Enter your Street name"
              maxLength={25}
              className={`${
                inputErrors[5][0] ? "text-red-600 border-2 border-red-600" : ""
              } bg-darkPalette-1 p-2 px-3 rounded-full`}
              cursorColor={adaptive.paletteColorOrange}
              onChangeText={setStreet}
              value={street}
              onEndEditing={validate}
            />

            {/* City */}
            <Text
              className={`${
                inputErrors[6][0] ? "text-red-600" : adaptive.nativeWindText
              } mb-2 ml-2 mt-4 text-base font-bold`}
            >
              City*
            </Text>
            <TextInput
              placeholder="Enter the name of your city"
              maxLength={25}
              className={`${
                inputErrors[6][0] ? "text-red-600 border-2 border-red-600" : ""
              } bg-darkPalette-1 p-2 px-3 rounded-full`}
              cursorColor={adaptive.paletteColorOrange}
              onChangeText={setCity}
              value={city}
              onEndEditing={validate}
            />

            {/* Country */}
            <Text
              className={`${
                inputErrors[7][0] ? "text-red-600" : adaptive.nativeWindText
              } mb-2 ml-2 mt-4 text-base font-bold`}
            >
              Country*
            </Text>
            <TextInput
              placeholder="Enter the name of your country"
              maxLength={25}
              className={`${
                inputErrors[7][0] ? "text-red-600 border-2 border-red-600" : ""
              } bg-darkPalette-1 p-2 px-3 rounded-full`}
              cursorColor={adaptive.paletteColorOrange}
              onChangeText={setCountry}
              value={country}
              onEndEditing={validate}
            />
            {inputErrors[7][0] && inputErrors[7][1] !== "" ? (
              <Text className={`text-red-600 mt-1`}>* {inputErrors[7][1]}</Text>
            ) : (
              ""
            )}
            {/* Password */}
            <Text
              className={`${adaptive.nativeWindText} mb-2 ml-2 mt-4 text-base font-bold`}
            >
              Enter your password to confirm update
            </Text>
            <TextInput
              placeholder="Enter your password"
              maxLength={100}
              className={`bg-darkPalette-1 p-2 px-3 rounded-full`}
              selectionColor={"red"}
              cursorColor={adaptive.paletteColorOrange}
              onChangeText={(_) => setPassword(_)}
              value={password}
              secureTextEntry
            />
            {response !== undefined && !response?.info && (
              <Text className={`text-red-600 font-bold text-base mt-5 mx-3`}>
                * Wrong password
              </Text>
            )}
            {response !== undefined &&
              (typeof response?.info === "string" ||
                response?.info instanceof String) && (
                <Text
                  className={`text-green-600 font-bold text-base mt-5 mx-3`}
                >
                  * {response.info}
                </Text>
              )}
            {isRequesting && (
              <View
                className={`flex flex-row items-center justify-center my-3`}
              >
                <ActivityIndicator size={30} />
                <Text className={`${adaptive.nativeWindText} ml-5`}>
                  Checking...
                </Text>
              </View>
            )}
            <TouchableRipple
              disabled={isUploading}
              onPress={() => {
                const isValid = validate();

                if (isValid) {
                  setIsRequesting(true);
                  performRequest();
                }
              }}
              className={`${
                isUploading ? "bg-gray-700" : "bg-purple-500"
              } mt-7 mb-5 mx-4 py-2 rounded-lg`}
            >
              <Text className={`text-center font-bold text-white text-lg`}>
                Update my account details
              </Text>
            </TouchableRipple>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateMyAccountScreen;

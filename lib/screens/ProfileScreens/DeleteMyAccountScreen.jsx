import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdaptiveScheme from "../../shared/Adaptive";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/Navbar";
import { ScrollView } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import { checkMatchPassword, deleteUser } from "../../services/api/UserAPI";
import { logOut } from "../../shared/redux/userSlice";

const DeleteMyAccountScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  const adaptive = AdaptiveScheme(theme.theme);

  const dispatch = useDispatch();

  const [response, setResponse] = useState();
  const [isRequesting, setIsRequesting] = useState(false);

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isRequesting) {
      const checkMatch = async () => {
        return await checkMatchPassword({
          token: user.token,
          id: user.id,
          password: password,
        });
      };

      const proceedDeletion = async () => {
        return await deleteUser({
          token: user.token,
          id: user.id,
        });
      };

      checkMatch()
        .then((res) => {
          setResponse(res.data);

          if (res.data.info) {
            proceedDeletion()
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  dispatch(logOut());
                  if (navigation.canGoBack()) {
                    navigation.popToTop();
                  }
                }
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
    }
  }, [password, setResponse, isRequesting, user, navigation]);
  console.log(response);
  return (
    <SafeAreaView className={`${adaptive.nativeWindNavbar} flex-1`}>
      <Navbar
        action={() => {
          navigation.pop();
        }}
        title="Account Settings"
      />
      <ScrollView
        className={`${adaptive.nativeWindBackground} flex`}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        <Text
          className={`${adaptive.nativeWindText} text-center font-bold text-base mt-5 mx-3`}
        >
          Please type again your password to proceed with account deletion.
        </Text>
        <TextInput
          placeholder="Enter your password"
          maxLength={100}
          className={`bg-white p-2 px-3 mx-4 mt-5 rounded-full`}
          cursorColor={adaptive.paletteColorOrange}
          selectionColor={"red"}
          onChangeText={(_) => setPassword(_)}
          value={password}
          secureTextEntry
        />
        {response !== undefined && !response?.info && (
          <Text className={`text-red-600 font-bold text-base mt-5 mx-3`}>
            * Wrong password
          </Text>
        )}
        {isRequesting && (
          <View className={`flex flex-row items-center justify-center my-3`}>
            <ActivityIndicator size={30} />
            <Text className={`${adaptive.nativeWindText} ml-5`}>
              Please wait..
            </Text>
          </View>
        )}
        <TouchableRipple
          onPress={() => setIsRequesting(true)}
          className={`bg-red-500 mt-5 mx-4 py-2 rounded-lg`}
        >
          <Text className={`text-center font-bold text-white text-lg`}>
            Delete my account
          </Text>
        </TouchableRipple>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeleteMyAccountScreen;

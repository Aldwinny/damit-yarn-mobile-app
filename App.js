import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GettingStartedScreen from "./lib/screens/GettingStartedScreen";
import HomeScreen from "./lib/screens/HomeScreen";
import SplashScreen from "./lib/screens/SplashScreen";
import NotificationScreen from "./lib/screens/HomeScreens/NotificationScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AboutScreen from "./lib/screens/ProfileScreens/AboutScreen";
import ChatListScreen from "./lib/screens/HomeScreens/ChatListScreen";
import ChatScreen from "./lib/screens/HomeScreens/ChatScreen";
import FAQScreen from "./lib/screens/ProfileScreens/FAQScreen";
import SettingsScreen from "./lib/screens/ProfileScreens/SettingsScreen";
import CategorizedViewerScreen from "./lib/screens/ProfileScreens/CategorizedViewerScreen";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { persistor, store } from "./lib/shared/redux/store";
import LoginScreen from "./lib/screens/ProfileScreens/LoginScreen";
import RegisterScreen from "./lib/screens/ProfileScreens/RegisterScreen";
import ItemScreen from "./lib/screens/ItemScreen";
import ReviewsScreen from "./lib/screens/ReviewsScreen";
import ShopScreen from "./lib/screens/ShopScreen";
import DeliveryDetailsScreen from "./lib/screens/ProfileScreens/DeliveryDetailsScreen";
import CreateAccountScreen from "./lib/screens/ProfileScreens/CreateAccountScreen";
import DeleteMyAccountScreen from "./lib/screens/ProfileScreens/DeleteMyAccountScreen";
import UpdateMyAccountScreen from "./lib/screens/ProfileScreens/UpdateMyAccountScreen";
import ModifyItemScreen from "./lib/screens/ProfileScreens/ModifyItemScreen";
import { PersistGate } from "redux-persist/integration/react";
import CheckoutScreen from "./lib/screens/CartScreens/CheckoutScreen";
import CompleteTransactionScreen from "./lib/screens/CartScreens/CompleteTransactionScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  global.debug = false;
  global.debugCurrentScreen = "home"; // Set this to change which first screen to be landed on
  global.debugOverlayScreen = "HomeOverlay";
  global.scheme = "dark";

  return (
    <GestureHandlerRootView className="flex-1">
      <StoreProvider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName={
                    global.debug ? global.debugCurrentScreen : "splash"
                  }
                  screenOptions={{
                    headerShown: false,
                    animation: "fade",
                  }}
                >
                  <Stack.Screen
                    name="splash"
                    component={SplashScreen}
                    options={{ animation: "fade" }}
                  />
                  <Stack.Screen
                    name="getting-started"
                    component={GettingStartedScreen}
                    options={{ animation: "fade" }}
                  />
                  <Stack.Screen name="home" component={HomeScreen} />
                  <Stack.Screen
                    name="notifications"
                    component={NotificationScreen}
                    options={{
                      animation: "fade_from_bottom",
                    }}
                  />
                  <Stack.Screen
                    name="about"
                    component={AboutScreen}
                    options={{ animation: "slide_from_right" }}
                  />
                  <Stack.Screen
                    name="faq"
                    component={FAQScreen}
                    options={{ animation: "slide_from_right" }}
                  />
                  <Stack.Screen
                    name="createaccount"
                    component={CreateAccountScreen}
                    options={{ animation: "slide_from_bottom" }}
                  />
                  <Stack.Screen
                    name="updateaccount"
                    component={UpdateMyAccountScreen}
                    options={{ animation: "slide_from_bottom" }}
                  />
                  <Stack.Screen
                    name="deleteaccount"
                    component={DeleteMyAccountScreen}
                    options={{ animation: "slide_from_bottom" }}
                  />
                  <Stack.Screen
                    name="modifyitem"
                    component={ModifyItemScreen}
                    options={{ animation: "slide_from_bottom" }}
                  />
                  <Stack.Screen
                    name="login"
                    component={LoginScreen}
                    options={{ animation: "fade_from_bottom" }}
                  />
                  <Stack.Screen
                    name="register"
                    component={RegisterScreen}
                    options={{ animation: "fade_from_bottom" }}
                  />
                  <Stack.Screen name="settings" component={SettingsScreen} />
                  <Stack.Screen
                    name="categorized"
                    component={CategorizedViewerScreen}
                    options={{ animation: "simple_push" }}
                  />
                  <Stack.Screen name="chatlist" component={ChatListScreen} />
                  <Stack.Screen
                    name="chat"
                    component={ChatScreen}
                    options={{
                      animation: "fade_from_bottom",
                    }}
                  />
                  <Stack.Screen name="item" component={ItemScreen} />
                  <Stack.Screen name="reviews" component={ReviewsScreen} />
                  <Stack.Screen name="shop" component={ShopScreen} />
                  <Stack.Screen
                    name="details"
                    component={DeliveryDetailsScreen}
                    options={{
                      animation: "slide_from_bottom",
                    }}
                  />
                  <Stack.Screen
                    name="checkout"
                    component={CheckoutScreen}
                    options={{
                      animation: "fade_from_bottom",
                    }}
                  />
                  <Stack.Screen
                    name="transact"
                    component={CompleteTransactionScreen}
                    options={{
                      animation: "fade_from_bottom",
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaProvider>
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

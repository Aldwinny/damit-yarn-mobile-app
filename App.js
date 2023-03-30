import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import useGlobalScheme from "./lib/hooks/UseGlobalScheme";

import GettingStartedScreen from "./lib/screens/GettingStartedScreen";
import HomeScreen from "./lib/screens/HomeScreen";
import SplashScreen from "./lib/screens/SplashScreen";
import NotificationScreen from "./lib/screens/HomeScreens/NotificationScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AboutScreen from "./lib/screens/ProfileScreens/AboutScreen";
import FAQScreen from "./lib/screens/ProfileScreens/FAQScreen";
import SettingsScreen from "./lib/screens/ProfileScreens/SettingsScreen";
import CategorizedViewerScreen from "./lib/screens/ProfileScreens/CategorizedViewerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  global.debug = true;
  global.debugCurrentScreen = "home"; // Set this to change which first screen to be landed on
  global.debugOverlayScreen = "ProfileOverlay";
  global.scheme = "dark";

  const [colorScheme] = useGlobalScheme();

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={
              global.debug ? global.debugCurrentScreen : "splash"
            }
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen
              name="getting-started"
              component={GettingStartedScreen}
            />
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="notifications" component={NotificationScreen} />
            <Stack.Screen name="about" component={AboutScreen} />
            <Stack.Screen name="faq" component={FAQScreen} />
            <Stack.Screen name="settings" component={SettingsScreen} />
            <Stack.Screen
              name="categorized"
              component={CategorizedViewerScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

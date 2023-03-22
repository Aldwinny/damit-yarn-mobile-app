import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import GettingStartedScreen from "./screens/GettingStartedScreen";
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import NotificationScreen from "./screens/TabScreens/NotificationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  // TODO: research a better way to declare configurations. Maybe use custom hooks?
  global.debug = true;
  global.debugCurrentScreen = "home"; // Set this to change which first screen to be landed on
  global.scheme = "light";
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={global.debug ? global.debugCurrentScreen : "splash"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="getting-started" component={GettingStartedScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="notifications" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

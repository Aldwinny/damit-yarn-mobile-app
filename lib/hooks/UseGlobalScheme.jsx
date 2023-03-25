import { useState } from "react";
import { useColorScheme } from "react-native";

const useGlobalScheme = (darkModeScheme, lightModeScheme) => {
  const userColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useState(userColorScheme);

  if (global.scheme != undefined && colorScheme != global.scheme) {
    setColorScheme(global.scheme);
  } else {
    if (colorScheme == null) {
      setColorScheme("light");
    }
    global.scheme = colorScheme;
  }

  if (colorScheme === "light") {
    return lightModeScheme ?? colorScheme;
  }
  return darkModeScheme ?? colorScheme;
};

export default useGlobalScheme;

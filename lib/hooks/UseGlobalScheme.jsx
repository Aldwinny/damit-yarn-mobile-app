import { useState } from "react";
import { useColorScheme } from "react-native";

const useGlobalScheme = () => {
  let userColorScheme = useColorScheme();

  if (global.scheme != undefined && userColorScheme != global.scheme) {
    userColorScheme = global.scheme;
  }

  const [colorScheme, setColorScheme] = useState(userColorScheme);

  const setGlobalScheme = (newGlobalScheme) => {
    global.scheme = newGlobalScheme;
    setColorScheme(newGlobalScheme);
  };

  return [colorScheme, setGlobalScheme];
};

export default useGlobalScheme;

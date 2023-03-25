const AdaptiveScheme = (globalScheme) => {
  const from = (darkMode, lightMode) =>
    globalScheme === "dark" ? darkMode : lightMode;

  return {
    from: (darkMode, lightMode) => from(darkMode, lightMode),
    iconColor: from("#C0C0C0", "#000"),
    nativeWindText: from("text-white", "text-black"),
    nativeWindNavbar: from("bg-darkPalette-4", "bg-white"),
    nativeWindBackground: from("bg-darkPalette-5", "bg-white"),
  };
};

export default AdaptiveScheme;

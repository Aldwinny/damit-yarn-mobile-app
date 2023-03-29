const AdaptiveScheme = (globalScheme) => {
  const from = (darkMode, lightMode) =>
    globalScheme === "dark" ? darkMode : lightMode;

  return {
    from: (darkMode, lightMode) => from(darkMode, lightMode),
    iconColor: from("#C0C0C0", "#fff"),
    activeIconColor: from("#E5855B", "#fff"),
    paletteColorYellow: "#EAD72C",
    paletteColorPink: "#E82BAF",
    paletteColorOrange: "#E8632B",
    paletteColorLightOrange: "#E5855B",
    paletteColorPeach: "#FFAD62",
    nativeWindActiveNavText: from(
      "text-palette-orange1 font-bold",
      "text-white font-bold"
    ),
    nativeWindButtonText: from("text-palette-orange2", "text-white"),
    nativeWindNavText: from("text-darkPalette-2", "text-white"),
    nativeWindText: from("text-white", "text-black"),
    nativeWindNavbar: from("bg-darkPalette-4", "bg-palette-orange2"),
    nativeWindBackground: from("bg-darkPalette-5", "bg-white"),
  };
};

export default AdaptiveScheme;

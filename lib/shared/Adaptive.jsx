/**
 * The AdaptiveScheme class sllows the easy change of components' attributes based on the global scheme.
 *
 * @param {*} globalScheme can be "light" or "dark"
 * @returns An object that provides access to an adaptive pallete for light mode and dark mode
 */
const AdaptiveScheme = (globalScheme) => {
  const from = (darkMode, lightMode) =>
    globalScheme === "dark" ? darkMode : lightMode;

  return {
    from: (darkMode, lightMode) => from(darkMode, lightMode),
    // Statusbar
    statusbarColor: from("#141414", "#E5855B"),
    statusbarStartColor: from("#141414", "#F4F4F4"),
    statusbarHomeColor: from("#212121", "#E5855B"),

    // Text color
    textColor: from("#fff", "#000"),

    // Icon color
    iconColor: from("#C0C0C0", "#fff"),
    iconSoftColor: from("#C0C0C0", "#000"),
    palettedIconColor: from("#E5855B", "#000"),
    activeIconColor: from("#E5855B", "#fff"),

    // Other palettes
    paletteColorYellow: "#EAD72C",
    APaletteColorYellow: from("#EAD72C", "#000"),
    paletteColorPink: "#E82BAF",
    paletteColorOrange: "#E8632B",
    APaletteColorOrange: from("#E8632B", "#F4F4F4"),
    paletteColorLightOrange: "#E5855B",
    paletteColorPeach: "#FFAD62",

    // Nativewind Text
    nativeWindActiveNavText: from(
      "text-palette-orange1 font-bold",
      "text-white font-bold"
    ),
    nativeWindCarouselTitle: from(
      "text-palette-orange1 font-bold",
      "text-darkPalette-1 font-bold"
    ),
    nativeWindCarouselSubtitle: from(
      "text-darkPalette-2",
      "text-darkPalette-1"
    ),
    nativeWindButtonText: from("text-palette-orange2", "text-white"),
    nativeWindPalettedText: from("text-palette-orange2", "text-black"),
    nativeWindText: from("text-white", "text-black"),
    nativeWindNavText: from("text-darkPalette-2", "text-white"),
    nativeWindSoftText: from("text-darkPalette-2", "text-black"),

    // Icons
    nativeWindIconColor: from("text-darkPalette-2", "text-black"),

    // Components
    nativeWindNavbar: from("bg-darkPalette-4", "bg-palette-orange2"),

    // Backgrounds
    nativeWindBackground: from("bg-darkPalette-5", "bg-white"),
    nativeWindSoftBackground: from("bg-darkPalette-5", "bg-darkPalette-1"),
    nativeWindColoredBackground: from("bg-darkPalette-5", "bg-palette-orange2"),
  };
};

export default AdaptiveScheme;

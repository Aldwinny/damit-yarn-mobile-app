import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
  },
});

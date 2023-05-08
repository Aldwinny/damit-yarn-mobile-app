import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstOpen: true,
};

export const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleFirstOpen: (state) => {
      state.firstOpen = false;
    },
    resetFirstOpen: (state) => {
      state.firstOpen = true;
    },
  },
});

export const { toggleFirstOpen, resetFirstOpen } = settingSlice.actions;

export default settingSlice.reducer;

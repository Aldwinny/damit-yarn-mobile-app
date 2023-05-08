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
  },
});

export const { toggleFirstOpen } = settingSlice.actions;

export default settingSlice.reducer;

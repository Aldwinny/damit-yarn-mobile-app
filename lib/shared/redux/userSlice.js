import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
  firstname: "",
  middlename: "",
  lastname: "",
  hasShop: false,
  shopid: 0,
  contact: "",
  email: "",
  street: "",
  zip: "",
  city: "",
  country: "",
  token: "",
  likes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      return { ...state, ...action.payload };
    },

    toggleLike: (state, action) => {
      if (state.likes.indexOf(action.payload) > -1) {
        state.likes.splice(state.likes.indexOf(action.payload), 1);
      } else {
        state.likes.push(action.payload);
      }
    },
    logOut: () => {
      return initialState;
    },
  },
});

export const { updateUserData, logOut, toggleLike } = userSlice.actions;

export default userSlice.reducer;

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
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    logOut: () => {
      return initialState;
    },
  },
});

export const { updateUserData, logOut } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
  firstname: "",
  middlename: "Yarn",
  lastname: "Ball",
  hasShop: false,
  shopId: 0,
  contact: "",
  email: "",
  street: "",
  zip: "",
  city: "",
  country: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

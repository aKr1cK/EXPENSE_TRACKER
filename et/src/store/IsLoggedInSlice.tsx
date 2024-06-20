import { createSlice } from "@reduxjs/toolkit";

const isLoggedInSlice = createSlice({
  name: "isLoggedInSlice",
  initialState: false,
  reducers: {
    loginUser: (state) => {
      state = true;
      return state;
    },
    logoutUser: (state) => {
      state = false;
      return state;
    },
    isUserLoggedIn: (state) => {
      return state;
    },
  },
});

export const { loginUser, logoutUser, isUserLoggedIn } =
  isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
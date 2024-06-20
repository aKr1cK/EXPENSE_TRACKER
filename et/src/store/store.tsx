import { configureStore } from "@reduxjs/toolkit";
import isLoggedInSlice from "./IsLoggedInSlice";

export const store = configureStore({
  reducer: {
    isLoggedIn: isLoggedInSlice,
  },
});

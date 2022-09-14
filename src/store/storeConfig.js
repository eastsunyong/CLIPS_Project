import { configureStore } from "@reduxjs/toolkit";
import { LOGIN, SIGNUP } from "./modules";

const store = configureStore({
  reducer: { LOGIN, SIGNUP },
  devTools: false,
});

export default store;
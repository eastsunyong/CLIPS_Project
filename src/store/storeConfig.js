import { configureStore } from "@reduxjs/toolkit";
import { LOGIN, SIGNUP, home } from "./modules";

const store = configureStore({
  reducer: { LOGIN, SIGNUP, home },
  devTools: false,
});

export default store;

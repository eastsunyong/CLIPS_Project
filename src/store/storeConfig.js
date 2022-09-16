import { configureStore } from "@reduxjs/toolkit";
import { LOGIN, SIGNUP, promise } from "./modules";

const store = configureStore({
  reducer: { LOGIN, SIGNUP, promise },
  devTools: false,
});

export default store;

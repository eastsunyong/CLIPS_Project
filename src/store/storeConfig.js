import { configureStore } from "@reduxjs/toolkit";
import { login, promise } from "./modules";

const store = configureStore({
  reducer: { login, promise},
  devTools: false,
});

export default store;

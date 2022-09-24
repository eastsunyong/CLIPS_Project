import { configureStore } from "@reduxjs/toolkit";
import { login, main, promise } from "./modules";

const store = configureStore({
  reducer: { login, main, promise },
  devTools: false,
});

export default store;

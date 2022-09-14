import { configureStore } from "@reduxjs/toolkit";
import { LOGIN, SIGNUP, home, map } from "./modules";

const store = configureStore({
  reducer: { LOGIN, SIGNUP, home, map },
  devTools: false,
});

export default store;

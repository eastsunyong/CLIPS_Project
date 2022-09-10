import { configureStore } from "@reduxjs/toolkit";
import { LOGIN } from "./modules";

const store = configureStore({
  reducer: { LOGIN },
  devTools: false,
});

export default store;
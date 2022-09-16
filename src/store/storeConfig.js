import { configureStore } from "@reduxjs/toolkit";
import { LOGIN, promise } from "./modules";

const store = configureStore({
  reducer: { LOGIN, promise },
  devTools: false,
});

export default store;

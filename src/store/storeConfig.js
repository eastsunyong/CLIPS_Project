import { configureStore } from "@reduxjs/toolkit";
import { home, map } from "./modules";

const store = configureStore({
  reducer: { home, map },
  devTools: false,
});

export default store;

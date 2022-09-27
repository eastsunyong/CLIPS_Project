import { configureStore } from "@reduxjs/toolkit";
import { login, main, promise, review } from "./modules";

const store = configureStore({
  reducer: { login, main, promise, review },
  devTools: false,
});

export default store;

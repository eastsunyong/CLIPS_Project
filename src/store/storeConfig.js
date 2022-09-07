import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { home, map } from "./modules";

const store = configureStore({
  reducer: { home, map },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: false,
});

export default store;

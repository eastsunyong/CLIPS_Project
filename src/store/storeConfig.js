import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { LOGIN, promise } from "./modules";

const store = configureStore({
  reducer: { LOGIN, promise },
=======
import { LOGIN, SIGNUP, home } from "./modules";

const store = configureStore({
  reducer: { LOGIN, SIGNUP, home },
>>>>>>> 8d3e2b4d47a3322814312123280d3887a4375aa2
  devTools: false,
});

export default store;

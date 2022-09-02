import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Login } from "pages";
import SignUp from "pages/SignUp";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Router;

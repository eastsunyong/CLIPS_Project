import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home_v2, Login, SignUp } from "pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home_v2 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default Router;

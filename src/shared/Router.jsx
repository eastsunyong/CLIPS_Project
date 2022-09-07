import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Logins, Promised } from "pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Logins />} />
      <Route path="/Promised" element={<Promised />} />
    </Routes>
  );
};

export default Router;

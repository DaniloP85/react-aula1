import React from "react";
import HomeController from "../Screens/Home/Home";
import DetailController from "../Screens/Detail/Detail";
import { Routes, Route } from "react-router-dom";

const RoutesManager = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeController />} />
      <Route path="detail">
        <Route path=":infoID" element={<DetailController />} />
        <Route path="add" element={<DetailController />} />
      </Route>
    </Routes>
  );
};

export default RoutesManager;
import React from "react";
import HomeController from "../Screens/Home/Home";
import DetailController from "../Screens/Detail/Detail";
import { Routes, Route } from "react-router-dom";
import AddController from "../Screens/Add/Add";

const RoutesManager = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeController />} />
      <Route path="detail">
        <Route path=":infoID" element={<DetailController />} />
      </Route>
      <Route path="add" element={<AddController />} />
      
    </Routes>
  );
};

export default RoutesManager;

import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import MenuPage from "./pages/Menu";
import Chapter0 from "./pages/Chapter0";
import Chapter1 from "./pages/Chapter1";
import Chapter2 from "./pages/Chapter2";
import Chapter3 from "./pages/Chapter3";
import Chapter4 from "./pages/Chapter4";

import StageMenu from "./pages/StageMenu";
import Island1Menu from "./pages/Island1Menu";
import Island2Menu from "./pages/Island2Menu";
import Island3Menu from "./pages/Island3Menu";
import Island4Menu from "./pages/Island4Menu";

import Level_1_1 from "./pages/level/Level_1_1";
import Level_1_2 from "./pages/level/Level_1_2";
import Level_1_3 from "./pages/level/Level_1_3";
import Level_1_4 from "./pages/level/Level_1_4";
import Level_1_5 from "./pages/level/Level_1_5";
import Level_1_6 from "./pages/level/Level_1_6";
import Level_1_7 from "./pages/level/Level_1_7";
import Level_1_8 from "./pages/level/Level_1_8";
import Level_1_9 from "./pages/level/Level_1_9";
import Level_1_10 from "./pages/level/Level_1_10";
import Level_2_1 from "./pages/level/Level_2_1";
import Level_2_2 from "./pages/level/Level_2_2";
import Level_2_3 from "./pages/level/Level_2_3";
import Level_2_4 from "./pages/level/Level_2_4";
import Level_2_5 from "./pages/level/Level_2_5";
import Level_2_6 from "./pages/level/Level_2_6";
import Level_2_7 from "./pages/level/Level_2_7";
import Level_2_8 from "./pages/level/Level_2_8";
import Level_2_9 from "./pages/level/Level_2_9";
import Level_2_10 from "./pages/level/Level_2_10";
import Level_3_1 from "./pages/level/Level_3_1";
import Level_3_2 from "./pages/level/Level_3_2";
import Level_3_3 from "./pages/level/Level_3_3";
import Level_3_4 from "./pages/level/Level_3_4";
import Level_3_5 from "./pages/level/Level_3_5";
import Level_3_6 from "./pages/level/Level_3_6";
import Level_3_7 from "./pages/level/Level_3_7";
import Level_3_8 from "./pages/level/Level_3_8";
import Level_3_9 from "./pages/level/Level_3_9";
import Level_3_10 from "./pages/level/Level_3_10";
import Level_4_1 from "./pages/level/Level_4_1";
import Level_4_2 from "./pages/level/Level_4_2";
import Level_4_3 from "./pages/level/Level_4_3";
import Level_4_4 from "./pages/level/Level_4_4";
import Level_4_5 from "./pages/level/Level_4_5";

const AppRoute = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/menu" element={<MenuPage />} />

      <Route path="/chapter0" element={<Chapter0 />} />
      <Route path="/chapter1" element={<Chapter1 />} />
      <Route path="/chapter2" element={<Chapter2 />} />
      <Route path="/chapter3" element={<Chapter3 />} />
      <Route path="/chapter4" element={<Chapter4 />} />

      <Route path="/stagemenu" element={<StageMenu />} />
      <Route path="/island1menu" element={<Island1Menu />} />
      <Route path="/island2menu" element={<Island2Menu />} />
      <Route path="/island3menu" element={<Island3Menu />} />
      <Route path="/island4menu" element={<Island4Menu />} />

      <Route path="/level_1_1" element={<Level_1_1 />} />
      <Route path="/level_1_2" element={<Level_1_2 />} />
      <Route path="/level_1_3" element={<Level_1_3 />} />
      <Route path="/level_1_4" element={<Level_1_4 />} />
      <Route path="/level_1_5" element={<Level_1_5 />} />
      <Route path="/level_1_6" element={<Level_1_6 />} />
      <Route path="/level_1_7" element={<Level_1_7 />} />
      <Route path="/level_1_8" element={<Level_1_8 />} />
      <Route path="/level_1_9" element={<Level_1_9 />} />
      <Route path="/level_1_10" element={<Level_1_10 />} />
      <Route path="/level_2_1" element={<Level_2_1 />} />
      <Route path="/level_2_2" element={<Level_2_2 />} />
      <Route path="/level_2_3" element={<Level_2_3 />} />
      <Route path="/level_2_4" element={<Level_2_4 />} />
      <Route path="/level_2_5" element={<Level_2_5 />} />
      <Route path="/level_2_6" element={<Level_2_6 />} />
      <Route path="/level_2_7" element={<Level_2_7 />} />
      <Route path="/level_2_8" element={<Level_2_8 />} />
      <Route path="/level_2_9" element={<Level_2_9 />} />
      <Route path="/level_2_10" element={<Level_2_10 />} />
      <Route path="/level_3_1" element={<Level_3_1 />} />
      <Route path="/level_3_2" element={<Level_3_2 />} />
      <Route path="/level_3_3" element={<Level_3_3 />} />
      <Route path="/level_3_4" element={<Level_3_4 />} />
      <Route path="/level_3_5" element={<Level_3_5 />} />
      <Route path="/level_3_6" element={<Level_3_6 />} />
      <Route path="/level_3_7" element={<Level_3_7 />} />
      <Route path="/level_3_8" element={<Level_3_8 />} />
      <Route path="/level_3_9" element={<Level_3_9 />} />
      <Route path="/level_3_10" element={<Level_3_10 />} />
      <Route path="/level_4_1" element={<Level_4_1 />} />
      <Route path="/level_4_2" element={<Level_4_2 />} />
      <Route path="/level_4_3" element={<Level_4_3 />} />
      <Route path="/level_4_4" element={<Level_4_4 />} />
      <Route path="/level_4_5" element={<Level_4_5 />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoute;

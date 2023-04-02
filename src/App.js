import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React, { createContext } from "react";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";

import "./App.css";
import FilmDetail from "./components/FilmDetail.js";
import Admin from "./components/Admin.js";
import "bootstrap/dist/css/bootstrap.min.css";
export const UserContent = createContext();
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="filmdetail/id/:id/" element={<FilmDetail />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

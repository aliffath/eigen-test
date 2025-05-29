import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/detail" element={<Detail />} />
  </Routes>
);

export default App;

import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router";

const App = () => {
  return <div >
    <Navbar />
    <Routes>
      <Route path={"/"} element={<Homepage />} />
      <Route path={"/movie/:id"} element={<p>This is a movie page</p>} />
    </Routes>
  </div>;
};

export default App;

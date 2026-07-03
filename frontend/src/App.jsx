import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Moviepage from "./pages/Moviepage";
import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";

const App = () => {
  return( <div >
    <Toaster />
    <Navbar />
    <Routes>
      <Route path={"/"} element={<Homepage />} />
      <Route path={"/movie/:id"} element={<Moviepage/>} />
      <Route path={"/signin"} element={<SignIn/>}/>
      <Route path={"/signup"} element={<SignUp/>}/>
    </Routes>
  </div>);
};

export default App;

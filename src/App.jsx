import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import New from "./comp/New";
import Navbaar from "./comp/Navbaar";
import Home from "./comp/Home";
import Edit from "./comp/Edituser";

const App = () => {
  return (
    <>
      {" "}
      <div className="" style={{ height: "100vh" }}>
        <Router>
          <Navbaar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;

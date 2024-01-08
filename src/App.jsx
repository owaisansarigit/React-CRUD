import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import State from "./comp/Statecomp";
import Navbaar from "./comp/Navbaar";
import Home from "./comp/Home";
import Edit from './comp/Edituser'

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
            <Route path="/state" element={<State />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;

import React from "react";
import { Link } from "react-router-dom";

const Navbaar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <Link className="navbar-brand mx-4" to={"/home"}>
          Navbar
        </Link>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse px-2" id="navbarAltMarkup">
          <div className="navbar-nav ">
            <Link className="nav-item nav-link" to={"/home"}>
              Home
            </Link>
            <Link className="nav-item nav-link" to={"/state"}>
              Add New
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbaar;

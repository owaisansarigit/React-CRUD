import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const New = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [location, setLocation] = useState("");

  const formSubmit = async (event) => {
    try {
      event.preventDefault();

      if (!name || !uid || !location) {
        toast.error("Please fill in all fields.");
        return;
      }

      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, uid, location }),
      });
      toast.success("User added successfully!");
      setName("");
      setUid("");
      setLocation("");
      navigate("/home");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user. Please try again.");
    }
  };

  return (
    <>
      <form
        action=""
        method="post"
        className="form-control container"
        onSubmit={formSubmit}
      >
        <div className="offset-2">
          <div className="col-8">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-8">
            <label htmlFor="uid" className="form-label">
              UID:
            </label>
            <input
              type="text"
              id="uid"
              className="form-control"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
          </div>
          <div className="col-8">
            <label htmlFor="location" className="form-label">
              Location:
            </label>
            <input
              type="text"
              id="location"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-sm btn-outline-info mt-3">
            Add
          </button>
          <Link
            to={"/home"}
            className="btn btn-sm btn-outline-success mt-3 mx-4"
          >
            Go Back
          </Link>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default New;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const New = () => {
  // State variables for form inputs
  let Navigate = useNavigate();
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [location, setLocation] = useState("");

  // Event handler for form submission
  const formSubmit = async (event) => {
    try {
      event.preventDefault(); // Prevent the form from submitting by default

      if (!name || !uid || !location) {
        // Check if any of the fields is empty
        alert("Please fill in all fields.");
        return;
      } // event.preventDefault();
      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // corrected typo here
        },
        body: JSON.stringify({ name: name, uid: uid, location: location }), // corrected typo here
      });

      setName("");
      setUid("");
      setLocation("");
      Navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form
        action=""
        method="post"
        className="form-control container "
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
    </>
  );
};

export default New;

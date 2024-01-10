import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      let response = await fetch(`http://localhost:3001/users/${id}`);
      let data = await response.json();
      setName(data.name);
      setUid(data.uid);
      setLocation(data.location);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const edit = async () => {
    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, uid, location }),
      });
    } catch (e) {
      console.error("Error updating user data:", e);
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    await edit(); // Wait for the edit function to complete
    toast.success("User updated successfully!"); // Show success toast after editing
    navigate("/home");
  };

  return (
    <form className="form-control container" onSubmit={formSubmit}>
      {/* Your form fields */}
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
          Update
        </button>
        <Link to={"/home"} className="btn btn-sm btn-outline-success mt-3 mx-4">
          Go Back
        </Link>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Edit;

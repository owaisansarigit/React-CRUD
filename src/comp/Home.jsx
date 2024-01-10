import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("http://localhost:3001/users");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let userData = await response.json();
        setUsers(userData);
        console.log(userData.length);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setIsError(true);
        setErrorInfo(error.message);
        toast.error(`Error fetching data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error.message);
      toast.error(`Error deleting user: ${error.message}`);
    }
  };

  const editUser = (userId) => {
    Navigate(`/edit/${userId}`);
  };

  if (isLoading) {
    return <div className="text-center">Loading ...</div>;
  }

  if (isError) {
    return (
      <div className="text-center">
        <p>Error in fetching data: {errorInfo}</p>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3 px-4">
        <h1 className="text-start text-decoration-underline display-6">
          All Users
        </h1>
        <Link className="btn btn-primary " to="/new">
          Add New
        </Link>
      </div>
      {users.length >= 1 ? (
        <>
          <table className="table text-center border rounded-lg">
            <thead>
              <tr>
                <th className="col-2 text-dark fs-5">ID</th>
                <th className="col-2 text-dark fs-5">Name</th>
                <th className="col-3 text-dark fs-5">Uid</th>
                <th className="col-2 text-dark fs-5">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.uid}</td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-sm btn-outline-primary mx-2"
                      onClick={() => editUser(user.id)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-sm btn-outline-danger mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </>
      ) : (
        <p className="display-5 text-center">No users available.</p>
      )}
    </div>
  );
};

export default Home;

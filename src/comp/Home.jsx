import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let Navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await fetch("http://localhost:3001/users");
    let userData = await response.json();
    setUsers(userData);
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      alert("Error In Delete !");
      console.log(error);
    }
  };

  const editUser = (userId) => {
    Navigate(`/edit/${userId}`);
  };
  return (
    <div className="container mt-4">
      <h1 className="text-center text-decoration-underline ">AVENGERS</h1>
      <table className="table text-center border rounded-lg">
        <thead>
          <tr>
            <th className="col-2 text-info fs-5">ID</th>
            <th className="col-2 text-info fs-5">Name</th>
            <th className="col-3 text-info fs-5">Uid</th>
            <th className="col-2 text-info fs-5">Edit/Delete</th>
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
    </div>
  );
};

export default Home;

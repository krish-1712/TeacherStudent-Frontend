import React from "react";
import BaseApp from "../Core/Base";
import { toast } from "react-toastify";
import axios from "axios";
import './UserComponents.css'
import { url } from "../App";
import "react-toastify/dist/ReactToastify.css";




export default function UserComponents({ user, setUser }) {

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${url}/users/users/${id}`);
      toast.success("User deleted successfully");

      const updatedUserList = user.filter((person) => person.id !== id);
      setUser(updatedUserList);
    } catch (error) {
      toast.error("An error occurred while deleting user");
    }
  };

  return (
    <BaseApp title="User Details">
      <div className="user-content">
        {user.map((person) => (
          <div key={person.id} className="user-card">
            <h1>{person.name}</h1>
            <p>Age: {person.age}</p>
            <p>Email: {person.email}</p>
            <p>Course: {person.course}</p>
            <p>Hobbies: {person.hobbies}</p>

            <div className="btn-group">
              <button
                className="btn del-btn"
                onClick={() => deleteUser(person.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </BaseApp>
  );
}

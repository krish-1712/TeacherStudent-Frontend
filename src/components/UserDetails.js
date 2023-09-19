import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseApp from "../Core/Base";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../App";
import './UserDetails.css'

export function UserDetails() {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseAll = await axios.get(`${url}/users/getallusers`);
      setAllUsers(responseAll.data.teacher);
      toast.success("Student Data Fetched successfully");
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("An error occurred while fetching user details");
    }
  };




  const handleEdit = async (User) => {


    navigate(`/edit/${User._id}`, { state: { User } });


  };



  const handleDelete = async (user) => {
    try {
      await axios.delete(`${url}/users/users/${user._id}`);
      toast.success("User deleted successfully");

      const updatedUserList = allUsers.filter((u) => u._id !== user._id);
      setAllUsers(updatedUserList);
    } catch (error) {
      toast.error("An error occurred while deleting user");
    }
  };


  return (
    <BaseApp title={"User Details"}>
      <div className="user-details-content">
        <div className="all-users-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Course</th>
                <th>Hobbies</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.course}</td>
                  <td>{user.hobbies}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(user)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseApp>
  );
}

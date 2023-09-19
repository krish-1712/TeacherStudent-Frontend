import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BaseApp from "../Core/Base";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../App";
import "./UserDetails.css";

export function TeacherDetails() {
  const { id } = useParams();
  const [allTeachers, setAllTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    console.log("Fetching teacher details...");
    try {
      const responseAll = await axios.get(`${url}/users/getallteacher`);
      console.log(responseAll);
      setAllTeachers(responseAll.data.teacher);
      toast.success("Teacher Fetched successfully");
    } catch (error) {
      console.error("Error fetching teacher details:", error);
      toast.error("An error occurred while fetching teacher details");
    }
  };

  const handleEdit = async (Teacher) => {


    navigate(`/teacheredit/${Teacher._id}`, { state: { Teacher } });

  };



  const handleDelete = async (teacher) => {
    try {
      await axios.delete(`${url}/users/teacher/${teacher._id}`);
      toast.success("Teacher deleted successfully");

      const updatedUserList = allTeachers.filter((u) => u._id !== teacher._id);
      setAllTeachers(updatedUserList);
    } catch (error) {
      toast.error("An error occurred while deleting user");
    }
  };

  return (
    <BaseApp title={"Teacher Details"}>
      <div className="user-details-content">
        <div className="all-users-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Qualification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allTeachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.age}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.qualification}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(teacher)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(teacher)}>
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

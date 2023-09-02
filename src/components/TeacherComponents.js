import React from "react";
import { useNavigate } from "react-router-dom";
import BaseApp from "../Core/Base";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../App";
import './TeacherComponents.css'
import "react-toastify/dist/ReactToastify.css";

export default function TeacherComponents({ teacher, setTeacher }) {
  const navigate = useNavigate();

  const deleteUser = async (id) => {
    try {
      let res = await axios.post(`${url}/users/teacher/${id}`)
      console.log(res)

      toast.success("Teacher deleted successfully");
      const updatedTeacher = teacher.filter((per) => per.id !== id);
      setTeacher(updatedTeacher);
    } catch (error) {
      toast.error("An error occurred while deleting teacher");
    }
  };

  return (
    <BaseApp title="Teacher Details">
      <div className="teacher-content">
        {teacher &&
          teacher.map((person) => (
            <div key={person.id} className="teacher-card">
              <h1>{person.name}</h1>
              <p>Age         :   {person.age}</p>
              <p>Email      :   {person.email}</p>
              <p>Subject :   {person.subject}</p>
              <p>Qualification    :   {person.qualification}</p>

              <div className="btn-group">
                <button
                  className="btn edit-btn"
                  onClick={() => navigate(`/edit/${person.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn view-btn"
                  onClick={() => navigate(`/teacher/${person.id}`)}
                >
                  View
                </button>
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

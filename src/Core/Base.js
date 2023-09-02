import React from "react";
import { useNavigate } from "react-router-dom";
import "./Base.css";



export default function BaseApp({ title, styles, children }) {
  const navigate = useNavigate();

  const userRole = sessionStorage.getItem('role');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  }

  const handleAddTeacherClick = () => {
    if (userRole !== 'student') {
      navigate("/teacher/user");
    }
  }

  const handleTeacherDetailsClick = () => {
    if (userRole !== 'student') {
      navigate("/teacherdetails");
    }
  }

  return (
    <div className="base-app-container">
      <div className="navbar">
        <span onClick={() => navigate("/add/user")} className="nav-link">
          Add Student
        </span>
        <span onClick={() => navigate("/userdetails")} className="nav-link">
          Student Details
        </span>
        <span onClick={handleAddTeacherClick} className="nav-link">
          Add Teacher
        </span>
        <span onClick={handleTeacherDetailsClick} className="nav-link">
          Teacher Details
        </span>
        <span onClick={handleLogout} className="nav-link logout">
          Log Out
        </span>
      </div>
      <div className="title">{title}</div>
      <div className="children">{children}</div>
      <div className="footer">
        <div>Contact us</div>
        <div>Email: usermanagement@gmail.com</div>
        <div>Phone: 86*****743</div>
      </div>
    </div>
  );
}

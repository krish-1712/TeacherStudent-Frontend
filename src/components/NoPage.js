import React from "react";
import { useNavigate } from "react-router-dom";
import './NoPage.css';


export function Nopage() {

    const navigate = useNavigate();
    return (
        <div>
            <h1 style={{color:"floralwhite" ,marginLeft:"350px"}}>Hi you entered the Wrong Page 404 Error</h1>
            <button
                onClick={() => navigate("/userdetails")} className="btn4" style={{marginLeft:"480px"}}>
                Student Details
            </button>
            <button
                onClick={() => navigate("/teacherdetails")} className="btn5">
                Teacher Details
            </button>
        </div>
    )
}
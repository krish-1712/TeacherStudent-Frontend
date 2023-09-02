import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BaseApp from "../Core/Base";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";
import './EditUser.css';
import "react-toastify/dist/ReactToastify.css";



const userSchemaValidation = yup.object({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  course: yup.string().required("Course is required"),
  hobbies: yup.string().required("Hobbies are required"),
});

export const EditUser = ({ user, setUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { User } = location.state;

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue
  } = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      course: "",
      hobbies: "",
    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        let res = await axios.put(`${url}/users/users/${id}`, values);
        toast.success("User details updated successfully");
        console.log(res)

        navigate("/userdetails");
        console.log('naviagted');
      } catch (error) {
        toast.error("An error occurred while updating user details");
      }
    },
  });

  useEffect(() => {
    const TeacherUser = User;

    setFieldValue('name', TeacherUser?.name);
    setFieldValue('age', TeacherUser?.age);
    setFieldValue('email', TeacherUser?.email);
    setFieldValue('course', TeacherUser?.course);
    setFieldValue('hobbies', TeacherUser?.hobbies);
  }, [id, setFieldValue, User]);

  return (
    <BaseApp title={"Edit User Details"}>
      <div className="new">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ "margin-right": "530px" }}>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {touched.name && errors.name && <p style={{ color: "crimson" }}>{errors.name}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ "margin-right": "530px" }}>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the Age"
              name="age"
              value={values.age}
              onChange={handleChange}
            />
            {touched.age && errors.age && <p style={{ color: "crimson" }}>{errors.age}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ "margin-right": "530px" }}>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {touched.email && errors.email && <p style={{ color: "crimson" }}>{errors.email}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ "margin-right": "520px" }}>Course</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Course"
              name="course"
              value={values.course}
              onChange={handleChange}
            />
            {touched.course && errors.course && <p style={{ color: "crimson" }}>{errors.course}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ "margin-right": "500px" }}>Hobbies</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Hobbies"
              name="hobbies"
              value={values.hobbies}
              onChange={handleChange}
            />
            {touched.hobbies && errors.hobbies && <p style={{ color: "crimson" }}>{errors.hobbies}</p>}
          </Form.Group>
          <br></br>
          <Button type="submit" variant="primary" className="edit-button">
            Edit
          </Button>
        </Form>
      </div>
    </BaseApp>
  );
};

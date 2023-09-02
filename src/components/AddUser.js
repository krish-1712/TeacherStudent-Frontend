import React from "react";
import { useNavigate } from "react-router-dom";
import BaseApp from "../Core/Base";
import { Form, Button } from 'react-bootstrap';
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from "../App";
import './AddUser.css'
import "react-toastify/dist/ReactToastify.css";

const userSchemaValidation = yup.object({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  course: yup.string().required("Course is required"),
  hobbies: yup.string().required("Hobbies are required"),
});

export function AddUser() {
  const navigate = useNavigate();

  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
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
        let res = await axios.post(`${url}/users`, values)
        console.log(res)


        toast.success("User added successfully");


        navigate("/userdetails");

      } catch (error) {

        toast.error("An error occurred while adding user");
      }
    },



  });

  return (
    <BaseApp title={"Add a New User"}>
      <div className="new">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label >Name</Form.Label>
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
            <Form.Label >Age</Form.Label>
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
            <Form.Label >Email</Form.Label>
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
            <Form.Label >Course</Form.Label>
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
            <Form.Label >Hobbies</Form.Label>
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

          <Button
            type="submit"
            variant="primary"
            className="add-button"
          >
            Add
          </Button>
        </Form>
      </div>
    </BaseApp>
  );
}

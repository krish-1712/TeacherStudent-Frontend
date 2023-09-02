import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseApp from "../Core/Base";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";
import './EditTeacherUser.js'
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";



const teacherSchemaValidation = yup.object({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  qualification: yup.string().required("Qualification is required"),
});

export const EditTeacherUser = ({ teacher, setTeacher }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { Teacher } = location.state;
  console.log('uuuuuu : ', Teacher)

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
      subject: "",
      qualification: "",

    },
    validationSchema: teacherSchemaValidation,
    onSubmit: async (values) => {
      try {
        let res = await axios.put(`${url}/users/teacher/${id}`, values)
        console.log(res)

        toast.success("Teacher details updated successfully");

        navigate("/teacherdetails");
      } catch (error) {
        toast.error("An error occurred while updating teacher details");
      }
    },
  });
  useEffect(() => {


    const TeacherUser = Teacher;
    console.log("testestestest", Teacher)


    setFieldValue('name', TeacherUser?.name)
    setFieldValue('age', TeacherUser?.age)
    setFieldValue('email', TeacherUser?.email)
    setFieldValue('subject', TeacherUser?.subject)
    setFieldValue('Language', TeacherUser?.Language)
    setFieldValue('qualification', TeacherUser?.qualification)
  }, [id, setFieldValue, Teacher])

  return (
    <BaseApp title={"Edit Teacher Details"}>
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
            {touched.name && errors.name && (
              <p style={{ color: "crimson" }}>{errors.name}</p>
            )}
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label style={{ "margin-right": "540px" }}>Age</Form.Label>
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
            <Form.Label style={{ "margin-right": "520px" }}>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Subject"
              name="subject"
              value={values.subject}
              onChange={handleChange}
            />
            {touched.subject && errors.subject && <p style={{ color: "crimson" }}>{errors.subject}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ "margin-right": "480px" }}>Qualification</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Qualification"
              name="qualification"
              value={values.qualification}
              onChange={handleChange}
            />
            {touched.qualification && errors.qualification && <p style={{ color: "crimson" }}>{errors.qualification}</p>}
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


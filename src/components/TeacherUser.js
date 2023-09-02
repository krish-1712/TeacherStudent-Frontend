import React from "react";
import { useNavigate } from "react-router-dom";
import BaseApp from "../Core/Base";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";
import "./TeacherUser.css";
import "react-toastify/dist/ReactToastify.css";

const teacherSchemaValidation = yup.object({
    name: yup.string().required("Name is required"),
    age: yup.number().required("Age is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    subject: yup.string().required("Subject is required"),
    qualification: yup.string().required("Qualification is required"),
});

export default function TeacherUser({ teacher, setTeacher }) {
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const responseAll = await axios.get(`${url}/users/getallteacher`);
            console.log(responseAll)
        } catch (error) {
            console.error("Error fetching teacher details:", error);
            toast.error("An error occurred while fetching teacher details");
        }
    };

    const {
        handleSubmit,
        handleChange,
        errors,
        touched,
        values,
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
                const res = await axios.post(`${url}/users/teacher`, values);
                console.log(res)

                toast.success("Teacher details added successfully");


                fetchData();


                navigate("/teacherdetails");
            } catch (error) {

                toast.error("An error occurred while adding teacher details");
            }
        },

    });

    return (
        <BaseApp title={"Add a New Teacher Details"} >
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
                        {touched.name && errors.name && (
                            <p style={{ color: "crimson" }}>{errors.name}</p>
                        )}
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
                        {touched.age && errors.age && (
                            <p style={{ color: "crimson" }}>{errors.age}</p>
                        )}
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
                        {touched.email && errors.email && (
                            <p style={{ color: "crimson" }}>{errors.email}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label >Subject</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Subject"
                            name="subject"
                            value={values.subject}
                            onChange={handleChange}
                        />
                        {touched.subject && errors.subject && (
                            <p style={{ color: "crimson" }}>{errors.subject}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label >
                            Qualification
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Qualification"
                            name="qualification"
                            value={values.qualification}
                            onChange={handleChange}
                        />
                        {touched.qualification && errors.qualification && (
                            <p style={{ color: "crimson" }}>{errors.qualification}</p>
                        )}
                    </Form.Group>
                    <br></br>
                    {/* <Button
                        type="submit"
                        variant="primary"
                        style={{ backgroundColor: "#007bff", color: "white" }}
                    >
                        Add
                    </Button> */}

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

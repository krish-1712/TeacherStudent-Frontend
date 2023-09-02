import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { url } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from "formik";
import jwt_decode from 'jwt-decode';
import './Login.css';

const userSchemaValidation = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(8)
})



function Login() {
  let navigate = useNavigate()


  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        let res = await axios.post(`${url}/users/login`, values);
        console.log(res);
        toast.success(res.data.message);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('role', res.data.role);


        if (res.data.role === 'student') {
          navigate('/add/user');
        } else if (res.data.role === 'teacher') {
          navigate('/teacher/user');
        }

      } catch (error) {
        toast.error(error.response.data.message);
      }

    }
  })


  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      var token = sessionStorage.getItem('token');
      try {
        const decodedToken = jwt_decode(token);
        const expirationTimestamp = decodedToken.exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (expirationTimestamp < currentTimestamp) {
          console.log('Token has expired');
          sessionStorage.removeItem('token');
          navigate('/');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [navigate]);


  return (
    <div className='login-wrapper'>
      <h1 style={{ "textAlign": "center" }}>Login Here!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email address" className="email" name="email" value={values.email}
            onChange={handleChange} />
          {touched.email && errors.email ? <p style={{ color: "crimson" }}>{errors.email}</p> : ""}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter the Password" className="password" name="password" value={values.password}
            onChange={handleChange} />
          {touched.password && errors.password ? <p style={{ color: "crimson" }}>{errors.password}</p> : ""}
        </Form.Group>
        <br></br>
        <Button className="submit-button" variant="primary" type="submit">
          Submit
        </Button>
        <br />
        <br></br>
        <Button className="link-button" onClick={() => navigate('/forgot')}>
          Forgot Password
        </Button>
        <Button className="link-button" onClick={() => navigate('/register')} style={{ marginLeft: '30px' }}>
          Create Account
        </Button>
      </Form>

    </div>

  );
}

export default Login;
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddUser } from './components/AddUser';
import { EditUser } from './components/EditUser';
import { EditTeacherUser } from './components/EditTeacherUser';
import { Nopage } from './components/NoPage';
import UserComponents from './components/UserComponents';
import TeacherComponents from './components/TeacherComponents';
import TeacherUser from './components/TeacherUser';
import { UserDetails } from './components/UserDetails';
import { TeacherDetails } from './components/TeacherDetails';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Password from './components/Password';

// export const url = "http://localhost:8000"

export const url = "https://teacherstudentsmanagement.onrender.com"

function App() {



  return (
    <div className="App">
      <Routes>


        <Route exact path="/" element={<Login />}>

        </Route>
        <Route exact path="/register" element={<Register />}>

        </Route>
        <Route exact path="/forgot" element={<Forgot />}>

        </Route>

        <Route exact path="/password" element={<Password />}>

        </Route>



        <Route exact path="/user" element={<UserComponents />}>

        </Route>
        <Route exact path="/teacher" element={<TeacherComponents />}>

        </Route>

        <Route exact path="/add/user" element={<AddUser />}>

        </Route>

        <Route exact path="/teacher/user" element={<TeacherUser />}>
        </Route>

        <Route exact path="/edit/:id" element={<EditUser />}>
        </Route>

        <Route exact path="/teacheredit/:id" element={<EditTeacherUser />}>
        </Route>

        <Route exact path="/user" element={<Navigate exact path='/' />}>

        </Route>

        <Route exact path="/teacher" element={<Navigate exact path='/teacher' />}>
        </Route>

        <Route exact path="*" element={<Nopage />}>

        </Route>

        <Route exact path="/teacherdetails" element={<TeacherDetails />}> </Route>
        <Route exact path="/userdetails" element={<UserDetails />}> </Route>



      </Routes>

    </div>
  );
}

export default App;

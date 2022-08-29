import './App.css';
import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import Courses from './components/Courses';
import CourseModule from './components/CourseModule';

import { apiLogin, apiRegister, apiGetCurrentUser, apiGetCourses } from './api';

function App() {
  //state variables
  const [loginPopupOpened, setloginPopupOpened] = useState(false);
  const [registerPopupOpened, setregisterPopupOpened] = useState(false);
  const [user, setuser] = useState({});
  const [courses, setCourses] = useState([]);
  // const [courseModule, setCourseModule] = useState({});

  //useNavigate
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    
    if(userToken) {
      const fetchedUser = apiGetCurrentUser(userToken)
      .then((userFetched) => {
        return userFetched;
      });

      const fetchedCourses = apiGetCourses(userToken)
      .then((coursesFetched) => {
        return coursesFetched;
      });

      Promise.all([fetchedUser, fetchedCourses]).then((values) => {
        const [userFetched, coursesFetched] = values;
        //setuser
        // const userToSet = {...user, userFetched};
        // console.log(userToSet);
        const userToSet = Object.assign({}, userFetched);
        setuser(userToSet);

        //set courses
        const coursesToSet = [...courses, ...coursesFetched];
        setCourses(coursesToSet);

        //redirect to courses component
        // navigate('/courses');

      });
    };

  }, []);



  //functions
  function openLoginPopup() {
    setloginPopupOpened(true);
  };

  function openRegisterPopup() {
    setregisterPopupOpened(true);
  };

  function closePopups() {
    setloginPopupOpened(false);
    setregisterPopupOpened(false);
  };

  function navigationLoginFormSubmit(evt, formData) {
    evt.preventDefault();
    apiLogin(formData)
    .then(({token}) => {
      if(!token) {
        return //process error
      }
      localStorage.setItem('token', token);
      //get current user
      return apiGetCurrentUser(token)
      .then((userDoc) => {
        setuser(userDoc);
        // navigate('/courses')
      })
    })
   
  };

  function navigationRegisterFormSubmit(evt, formData) {
    evt.preventDefault();

  }

  // function selectModule(data) {
  //   const newModule = Object.assign({}, data);
  //   setCourseModule(newModule);
  // }

  return (
    <div className="App">
      <Routes>
        <Route path='courses/:courseID/modules/:moduleID' element={<CourseModule></CourseModule>}></Route>
        <Route path='courses' element={<Courses user={user} courses={courses}></Courses>}></Route>
        <Route path='/' element={<Main openLoginPopup={openLoginPopup} openRegisterPopup={openRegisterPopup}></Main>}></Route>
      </Routes>
      <Login formSubmit={navigationLoginFormSubmit} isOpened={loginPopupOpened} closePopup={closePopups}></Login>
      <Register formSubmit={navigationRegisterFormSubmit} isOpened={registerPopupOpened} closePopup={closePopups}></Register>
    </div>
  );
}

export default App;

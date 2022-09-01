import './App.css';
import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import Courses from './components/Courses';
import CourseModule from './components/CourseModule';

import { apiLogin, apiRegister, apiGetCurrentUser, apiGetCourses } from './api';

import io from 'socket.io-client';


function App() {
  //state variables
  const [loginPopupOpened, setloginPopupOpened] = useState(false);
  const [registerPopupOpened, setregisterPopupOpened] = useState(false);
  const [user, setuser] = useState({});
  const [courses, setCourses] = useState([]);
  const [socketUsers, setSocketUsers] = useState([]);

  // const [courseModule, setCourseModule] = useState({});

  //useNavigate
  // const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    //socket.io
    const socket = io('http://localhost:3000');

    //localstorage manipulations
    const userToken = localStorage.getItem('token');
    const localsessionID = localStorage.getItem('sessionID');



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

        //set user
        const userToSet = Object.assign({}, userFetched);
        setuser(userToSet);
        //emit user socket io
        socket.emit('userConnected', userToSet);
        //set courses
        const coursesToSet = [...coursesFetched];
        
        setCourses(coursesToSet);

        //redirect to courses component
        // navigate('/courses');


      });
      


      // socket.on('users', ({users}) => {
      //   console.log(users);
      // })
    };

    //send sessionid to socket if any
    if(localsessionID) {
      socket.auth = {localsessionID};
      socket.connect();
      // socket.sessionID = localsessionID;
    }

    socket.on('session', ({ sessionID, userID}) => {
      localStorage.setItem('sessionID', sessionID);
      // socket.sessionID = sessionID;
      socket.userID = userID;
      // console.log()
    // console.log(sessionID, userID);
    // socket.auth = { sessionID };
    // localStorage.setItem('sessionID', sessionID);
    // socket.userID = userID;
    });

    socket.on('users', ((users) => {
      // const connectedUsers = users;
      setSocketUsers([...socketUsers, ...users]);
      // console.log(([...users]));
    }))
    

    return () => {
      socket.off('userConnected');
      socket.off('session');
      socket.off('users');
      socket.disconnect();
    }
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

  function submitChatForm(evt, formData) {
    evt.preventDefault();
    //send message to APi
    return formData;
  }
  // function selectModule(data) {
  //   const newModule = Object.assign({}, data);
  //   setCourseModule(newModule);
  // }

  return (
    <div className="App">
      <Routes>
        <Route path='courses/:courseID/modules/:moduleID' element={<CourseModule socketUsers={socketUsers.length > 0 && socketUsers} submitForm={submitChatForm}></CourseModule>}></Route>
        <Route path='courses' element={<Courses user={user} courses={courses}></Courses>}></Route>
        <Route path='/' element={<Main openLoginPopup={openLoginPopup} openRegisterPopup={openRegisterPopup}></Main>}></Route>
      </Routes>
      <Login formSubmit={navigationLoginFormSubmit} isOpened={loginPopupOpened} closePopup={closePopups}></Login>
      <Register formSubmit={navigationRegisterFormSubmit} isOpened={registerPopupOpened} closePopup={closePopups}></Register>
    </div>
  );
}

export default App;

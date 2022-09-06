import './App.css';
import React, {useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import Courses from './components/Courses';
import CourseModule from './components/CourseModule';

import { apiLogin, apiRegister, apiGetCurrentUser, apiGetCourses } from './api';

import { UserContext } from './context/userContext';

function App() {
  //state variables
  const [loginPopupOpened, setloginPopupOpened] = useState(false);
  const [registerPopupOpened, setregisterPopupOpened] = useState(false);
  const [user, setuser] = useState({});
  const [courses, setCourses] = useState([]);
  const [socketUsers, setSocketUsers] = useState([]);
  const [socket, setSocket] = useState({});
  // const [courseModule, setCourseModule] = useState({});

  //useNavigate
  // const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    // //socket.io
    // const newSocket = io('http://localhost:3000');
    // setSocket(newSocket);
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
        // newSocket.emit('userConnected', userToSet);
        //set courses
        const coursesToSet = [...coursesFetched];
        
        setCourses(coursesToSet);

        //redirect to courses component
        // navigate('/courses');


      });
      
    };

    //send sessionid to socket if any
    // if(localsessionID) {
    //   newSocket.auth = {localsessionID};
    //   newSocket.connect();
    //   // socket.sessionID = localsessionID;
    // }

    // newSocket.on('session', ({ sessionID, userID}) => {
    //   localStorage.setItem('sessionID', sessionID);
    //   socket.userID = userID;
    // });

    // newSocket.on('users', ((users) => {
    //   // const connectedUsers = users;
    //   setSocketUsers(users);
    //   // console.log(([...users]));
    // }))
    

    // return () => {
    //   newSocket.off('userConnected');
    //   newSocket.off('session');
    //   newSocket.off('users');
    //   newSocket.disconnect();
    // }
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

  function submitChatForm(evt) {
    evt.preventDefault();
    // console.log(evt.target);
    // console.log(name, value);
    //send message to APi
    // socket
  }
  // function selectModule(data) {
  //   const newModule = Object.assign({}, data);
  //   setCourseModule(newModule);
  // }

  return (
    <div className="App">
      <UserContext.Provider value={user}>
      <Routes>
        <Route path='courses/:courseID/modules/:moduleID' element={<CourseModule user={user} submitForm={submitChatForm}></CourseModule>}></Route>
        <Route path='courses' element={<Courses user={user} courses={courses}></Courses>}></Route>
        <Route path='/' element={<Main openLoginPopup={openLoginPopup} openRegisterPopup={openRegisterPopup}></Main>}></Route>
      </Routes>
      <Login formSubmit={navigationLoginFormSubmit} isOpened={loginPopupOpened} closePopup={closePopups}></Login>
      <Register formSubmit={navigationRegisterFormSubmit} isOpened={registerPopupOpened} closePopup={closePopups}></Register>
      </UserContext.Provider>
    </div>
  );
}

export default App;

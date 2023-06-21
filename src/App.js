import './App.css';
import React, {useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { socket } from './socketio/socketIO';
import Welcome from './components/Welcome';
import Main from './components/Main';
// import Login from './components/Login';
// import Register from './components/Register';
// import Courses from './components/Courses';
import CourseModule from './components/CourseModule';
import AddCourse from './components/AddCourse';
// import Chat from './components/Chat';
// import Course from './components/Course';
import Dashboard from './components/Dashboard';
import { apiLogin, apiRegister, apiGetCurrentUser, apiGetCourses } from './api';

import { UserContext } from './context/userContext';




function App() {
  //variables
  // const userRef = useRef({});

  //state variables
  
  // const [registerPopupOpened, setregisterPopupOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setuser] = useState({});
  // const [messages, setMessages] = useState([]);
  // const [courses, setCourses] = useState([]);

  //useNavigate
  // const navigate = useNavigate();
  
  //useEffect
  useEffect(() => {
    //localstorage manipulations
    const userToken = localStorage.getItem('token');
    const localsessionID = localStorage.getItem('sessionID');
    // console.log(userToken);
    if(userToken) {
      
      apiGetCurrentUser(userToken)
      .then((userFetched) => {
        if(!userFetched) {
          return;
        }
        // console.log(userFetched);
        setuser(userFetched);
        setLoggedIn(true);
   
        socket.connect();
        socket.emit('user connected', userFetched);
      });

      // socket.on('private message', (data) => {
      //   // console.log(data);
      //   onMessage(data);
      // });

      // const fetchedCourses = apiGetCourses(userToken)
      // .then((coursesFetched) => {
      //   return coursesFetched;
      // });

      // Promise.all([fetchedUser, fetchedCourses]).then((values) => {

      //   const [userFetched, coursesFetched] = values;

      //   //set user
      //   const userToSet = Object.assign({}, userFetched);
      //   setuser(userToSet);

      //   //set courses
      //   const coursesToSet = [...coursesFetched];
        
      //   setCourses(coursesToSet);

      // });
      
    };
    return () => {
      // socket.disconnect();
      socket.close();
      // socket.off('user connected', userFetched);
      // socket.off('private message', onMessage);
    };

  }, []);


  //functions

  // function closePopups() {
  //   setWelcomePopupOpened(false);
  //   // setregisterPopupOpened(false);
  // };

  function loginFormSubmit(formData) {
    
    // console.log(formData);
    apiLogin(formData)
    .then(({token}) => {
      // console.log(token);
      if(!token) {
        return //process error
      }
      
      // console.log(token);
      localStorage.setItem('token', token);
      // //get current user
      return apiGetCurrentUser(token)
      .then((userDoc) => {
        setuser(userDoc);
        setLoggedIn(true);
        // navigate('/courses')
      })
    })
   
  };

  function registerFormSubmit(formData) {
    apiRegister(formData)
    .then(({ token }) => {
      if(!token) {
        return;
      }
      console.log(token);
      // return apiGetCurrentUser(token)
      // .then((userDoc) => {
      //   localStorage.setItem('token', token);
      //   // console.log(userDoc);
      //   setuser(userDoc);
      //   setLoggedIn(true);
      //   // navigate('/courses')
      // })

    })

  }

  function submitChatForm(evt) {
    evt.preventDefault();
    // console.log(evt.target);
    // console.log(name, value);
    //send message to APi
    // socket
  };

  function handlePrntScrnButton(evt) {
    // console.log(evt.code);
    if(evt.code === 'PrintScreen') {
      window.print();
    };
  }

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  // //test
  // function switchToLoggedInComponent() {
  //   // setLoggedIn(true);
  // };

  return (
    <div className="App" onKeyUp={handlePrntScrnButton} tabIndex={0}>
      <UserContext.Provider value={user}>
      {/* <Routes>
        <Route path='courses/:courseID/modules/:moduleID' element={<CourseModule user={user} submitForm={submitChatForm}>
          <Chat></Chat>
        </CourseModule>}></Route>
        <Route path='courses' element={<Courses user={user} courses={courses}></Courses>}></Route>
        <Route path='/' element={<Main openLoginPopup={openLoginPopup} openRegisterPopup={openRegisterPopup}></Main>}></Route>
      </Routes> */}
      {/* <Login formSubmit={navigationLoginFormSubmit} isOpened={loginPopupOpened} closePopup={closePopups}></Login>
      <Register formSubmit={navigationRegisterFormSubmit} isOpened={registerPopupOpened} closePopup={closePopups}></Register> */}
        {/* <Dashboard></Dashboard> */}
        <Routes>
          <Route path='addCourse' element={<AddCourse />}></Route>
          <Route path='courses/:courseID/modules/:moduleID/lessons/:lessonID' element={<CourseModule socket={socket} />}></Route>
          <Route path='/' element={loggedIn ? <Main socket={socket} logout={logout} registerFormSubmit={registerFormSubmit}></Main> : <Welcome loginFormSubmit={loginFormSubmit} registerFormSubmit={registerFormSubmit}></Welcome>}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

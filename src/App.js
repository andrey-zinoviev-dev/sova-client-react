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
import AddUser from './components/AddUser';
import { apiLogin, apiRegister, apiGetCurrentUser, apiNewPassword } from './api';
import { UserContext } from './context/userContext';
import EditCourse from './components/EditCourse';
import EditModule from './components/EditModule';
import AddModule from './components/AddModule';
import Lesson from './components/Lesson';



function App() {
  //variables
  // const userRef = useRef({});

  //state variables
  
  // const [registerPopupOpened, setregisterPopupOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setuser] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const [messages, setMessages] = useState([]);
  // const [courses, setCourses] = useState([]);

  //useNavigate
  // const navigate = useNavigate();
  
  //useEffect
  useEffect(() => {
    //effect functions
    function showAllOnlineUsers(data) {
      console.log(data);
      setOnlineUsers(data.filter((socketUser) => {
        return socketUser.online === true;
      }));
      // console.log(data);
      // if(loggedInUser.admin) {
      //   const studentsOnline = data.filter((user) => {
      //     return user.admin === false && user.online === true;
      //   });
      //   // console.log(studentsOnline);
      //   setStudents((prevValue) => {
      //     return prevValue.map((prevStudent) => {
      //       const foundStudent = studentsOnline.find((student) => {
      //         return student.userId === prevStudent._id;
      //       });
      //       return foundStudent ? {...prevStudent, online: true} : prevStudent;
      //       // return studentsOnline.includes(prevStudent) ? {...prevStudent, online: true} : prevStudent;
      //     })
      //   })

      // } else {
      //   const adminsOnline = data.filter((user) => {
      //     return user.admin === true && user.online === true;
      //   });
      //   // console.log(adminsOnline);
      //   setCourseAuthor((prevValue) => {
      //     const foundAdmin = adminsOnline.find((admin) => {
      //       return admin.userId === prevValue._id;
      //     });
      //     if(foundAdmin) {
      //       return {...prevValue, online: true};
      //     }
      //   })
      // }
    }
    //localstorage manipulations
    const userToken = localStorage.getItem('token');
    // console.log(userToken);
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
        // console.log(userFetched, "yes");
        socket.connect();
        socket.emit('user connected', userFetched);
        socket.on('show all connected users', showAllOnlineUsers);
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
      
    } 
    return () => {
      // socket.disconnect();
      socket.close();
      socket.off('show all connected users', showAllOnlineUsers);
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
      // console.log(token);
      return apiGetCurrentUser(token)
      .then((userDoc) => {
        localStorage.setItem('token', token);
        // console.log(userDoc);
        setuser(userDoc);
        setLoggedIn(true);
        // navigate('/courses')
      })

    })

  }

  function submitForgetPasswordForm(formData) {
    console.log(formData);
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
          {/* <Route path='editCourse/:courseID' element={}></Route> */}
          {/* <Route path='/editLesson/courses/:courseID/modules/:moduleID/lessons/:lessonID' element={<Lesson></Lesson>} */}
          <Route path='/addModule/courses/:courseID' element={<AddModule></AddModule>} />
          <Route path='/editModule/courses/:courseID/modules/:moduleID' element={<EditModule></EditModule>} />
          <Route path='/editCourse/:courseID' element={loggedIn ? <EditCourse></EditCourse> : <Welcome loginFormSubmit={loginFormSubmit} registerFormSubmit={registerFormSubmit} submitForgetPasswordForm={submitForgetPasswordForm}></Welcome>}></Route>
          <Route path='addUser' element={<AddUser />}></Route>
          <Route path='addCourse' element={<AddCourse />}></Route>
          <Route path='courses/:courseID/modules/:moduleID/lessons/:lessonID' element={loggedIn ? <CourseModule socket={socket} onlineUsers={onlineUsers} logout={logout} /> : <Welcome loginFormSubmit={loginFormSubmit} registerFormSubmit={registerFormSubmit} submitForgetPasswordForm={submitForgetPasswordForm}></Welcome>}></Route>
          <Route path='/' element={loggedIn ? <Main socket={socket} loggedIn={loggedIn} logout={logout} registerFormSubmit={registerFormSubmit}></Main> : <Welcome loginFormSubmit={loginFormSubmit} registerFormSubmit={registerFormSubmit} submitForgetPasswordForm={submitForgetPasswordForm}></Welcome>}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

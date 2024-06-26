import './App.css';
import React, {useState, useEffect, useRef } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { socket } from './socketio/socketIO';
import { apiLogin, apiRegister, apiGetCurrentUser, apiNewPassword } from './api';
import { UserContext } from './context/userContext';
import EditCourse from './components/EditCourse';
const Welcome = React.lazy(() => import ('./components/Welcome'));
// import Welcome from './components/Welcome';
const Main = React.lazy(() => import ('./components/Main'));
// import Main from './components/Main';
// import Login from './components/Login';
// import Register from './components/Register';
// import Courses from './components/Courses';
// import CourseModule from './components/CourseModule';
const AddCourse = React.lazy(() => import('./components/AddCourse'));
// import AddCourse from './components/AddCourse';
// import Chat from './components/Chat';
// import Course from './components/Course';
// import Dashboard from './components/Dashboard';
// import AddUser from './components/AddUser';

// import EditCourse from './components/EditCourse';
// import EditModule from './components/EditModule';
// import AddModule from './components/AddModule';
// import Lesson from './components/Lesson';
// import Test from "./components/Test";
const Course = React.lazy(() => import ('./components/Course'));
const Courses = React.lazy(() => import ('./components/Courses'));
const Module = React.lazy(() => import ('./components/Module')) ;
const CourseLesson = React.lazy(() => 
  import ('./components/CourseLesson')
);
const EditModule = React.lazy(() => import("./components/EditModule"));
const EditLesson = React.lazy(() => import("./components/EditLesson"));
const SendEmail = React.lazy(() => import ("./components/SendEmail"));
const AddNewToCourse = React.lazy(() => import ("./components/AddNewToCourse"));
const AddLessonToExModule = React.lazy(() => import ('./components/AddLessonToExModule'));
// import Courses from './components/Courses';
// import CourseLesson from './components/CourseLesson';

function App() {
  //variables
  // const location = useLocation();
  // const userRef = useRef({});

  //state variables
  
  // const [registerPopupOpened, setregisterPopupOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setuser] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [courses, setCourses] = useState([]);

  //useNavigate
  // const navigate = useNavigate();
  // 
  //useEffect
  useEffect(() => {
    //effect functions
    function showAllOnlineUsers(data) {
      console.log(data);
      setOnlineUsers(data.filter((socketUser) => {
        return socketUser.online === true;
      }));
    };

    function showConnectedUser(data) {
      // console.log(data);
      setOnlineUsers((prevValue) => {
        return [...prevValue, data];
      })
    }
    //localstorage manipulations
    const userToken = localStorage.getItem('token');
    // console.log(userToken);
    // console.log(userToken);
    const localsessionID = localStorage.getItem('sessionID');
    // console.log(userToken);
    if(userToken) {
      // socket.on('show all connected users', showAllOnlineUsers);
      apiGetCurrentUser(userToken)
      .then((userFetched) => {
        if(!userFetched) {
          return;
        }
        // console.log(userFetched);
        setuser(userFetched);
        setLoggedIn(true);
        // console.log(userFetched, "yes");

        // socket.connect();
        // socket.emit('user connected', userFetched);
        // socket.on('show all connected users', showAllOnlineUsers);
        // socket.on('show connected user', showConnectedUser);
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
      // socket.close();
      // socket.off('show all connected users', showAllOnlineUsers);
      // socket.off('show connected user', showConnectedUser);

      // socket.off('user connected', userFetched);
      // socket.off('private message', onMessage);
    };

  }, []);

  // React.useEffect(() => {
  //   console.log(onlineUsers);
  // }, [onlineUsers])

  //functions

  // function closePopups() {
  //   setWelcomePopupOpened(false);
  //   // setregisterPopupOpened(false);
  // };

  function loginFormSubmit(formData) {
    
    // console.log(formData);
    apiLogin(formData)
    .then((data) => {
      // console.log(data);
      if(data.message) {
        throw new Error(data.message);
        // throw new Error(data.message.includes("Пользователь") ? "")
      } else if(data.token) {
        // console.log(data.token);
        // console.log(token);
        localStorage.setItem('token', data.token);
        // //get current user
        return apiGetCurrentUser(data.token)
        .then((userDoc) => {
          setuser(userDoc);
          setLoggedIn(true);
          // socket.connect();
          // socket.emit('user connected', userDoc);
          // socket.on('show all connected users', showAllOnlineUsers);
          // socket.on('show connected user', showConnectedUser);
          // navigate('/courses')
        })
      }
    })
    // .then(({token}) => {
    //   // console.log(token);
    //   if(!token) {
    //     return //process error
    //   }
      
    //   // console.log(token);
    //   localStorage.setItem('token', token);
    //   // //get current user
    //   return apiGetCurrentUser(token)
    //   .then((userDoc) => {
    //     setuser(userDoc);
    //     setLoggedIn(true);
    //     // socket.connect();
    //     // socket.emit('user connected', userDoc);
    //     // socket.on('show all connected users', showAllOnlineUsers);
    //     // socket.on('show connected user', showConnectedUser);
    //     // navigate('/courses')
    //   })
    // })
    .catch((err) => {
      setErrorMessage(err.message);
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
  };

  // function showLocation() {
  //   console.log(location);
  // }

  React.useEffect(() => {
    // console.log(loggedIn);
    // console.log(user);
    function showAllOnlineUsers(data) {
      // console.log(data);
      setOnlineUsers(data.filter((socketUser) => {
        return socketUser.online === true;
      }));
    };

    function showConnectedUser(data) {
      // console.log(data);
      setOnlineUsers((prevValue) => {
        return [...prevValue, data];
      })
    }

    if(loggedIn) {
      
      // console.log(user);
      socket.connect();
      socket.emit('user connected', user);
      socket.on('show all connected users', showAllOnlineUsers);
      socket.on('show connected user', showConnectedUser);
      // console.log(socket);
    }

    return () => {
      // socket.disconnect();
      socket.close();
      socket.off('show all connected users', showAllOnlineUsers);
      socket.off('show connected user', showConnectedUser);

      // socket.off('user connected', userFetched);
      // socket.off('private message', onMessage);
    };

  }, [loggedIn]);

  // React.useEffect(() => {
  //   console.log(location)
  // }, [location])
  // //test
  // function switchToLoggedInComponent() {
  //   // setLoggedIn(true);
  // };

  // React.useEffect(() => {
  //   window.addEventListener("popstate", showLocation)
  //   return () => {
  //     window.removeEventListener("popstate", showLocation);
  //   }
  // }, [location])

  const router = createBrowserRouter([
    {
      element: loggedIn ? <React.Suspense>
        <Main logout={logout}></Main>
      </React.Suspense> : 
      <React.Suspense>
        <Welcome loginFormSubmit={loginFormSubmit} errorMessage={errorMessage}></Welcome>
      </React.Suspense>,
      path: "/",
      children: loggedIn ? [
        {
          path: "/",
          element: <React.Suspense>
            <Courses></Courses>
          </React.Suspense>
        },
        {
          path: "courses/:courseID",
          element: <React.Suspense>
            <Course></Course> 
          </React.Suspense>
        },
        {
          path: "courses/edit/:courseID",
          element: <React.Suspense>
            {<EditCourse></EditCourse>}
            {/* <Course></Course>  */}
          </React.Suspense>,
        },
        {
          path: 'courses/edit/:courseID/modules/:moduleID',
          element: <React.Suspense>
            <EditModule></EditModule>
          </React.Suspense>
        },
        {
          path: 'courses/edit/:courseID/modules/:moduleID/lessons/:lessonID',
          element: <React.Suspense>
            <EditLesson></EditLesson>
          </React.Suspense>
        },
        {
          path: 'courses/edit/:courseID/add',
          element: <React.Suspense>
            <AddNewToCourse></AddNewToCourse>
          </React.Suspense>,
        },
        {
          path: 'courses/edit/:courseID/modules/:moduleID/add',
          element: <React.Suspense>
            <AddLessonToExModule></AddLessonToExModule> 
          </React.Suspense>,
        },
        // {
        //   path: 'courses/edit/:courseID/modules/:moduleID/add',
        //   element: <React.Suspense>
        //     <AddToCourse></AddToCourse>
        //   </React.Suspense>,
        // },
        // {
        //   path: "sendEmail/:courseID",
        //   element: <React.Suspense>
        //     <SendEmail></SendEmail>
        //   </React.Suspense>
        // },
        // {
        //   path: "courses/:courseID/modules/:moduleID",
        //   element: <React.Suspense>
        //     <Module></Module>
        //   </React.Suspense>
        // },
        {
          path: "addCourse",
          element: <React.Suspense>
            <AddCourse></AddCourse>
          </React.Suspense>
        },
      ]
      :
      []
    },
    {
      path: "courses/:courseID/modules/:moduleID/lessons/:lessonID",
      element: <React.Suspense>
        <CourseLesson socket={socket}/>
      </React.Suspense>
    },
  ])

  return (
    <UserContext.Provider value={user}>
      <RouterProvider router={router}></RouterProvider>
    </UserContext.Provider>
    // <div className="App" onKeyUp={handlePrntScrnButton} tabIndex={0}>
    // <div className='App'>
      
    //   <UserContext.Provider value={user}>
    //     <Dashboard></Dashboard>
    //   <Routes>
    //     <Route path='courses/:courseID/modules/:moduleID' element={<CourseModule user={user} submitForm={submitChatForm}>
    //       <Chat></Chat>
    //     </CourseModule>}></Route>
    //     <Route path='courses' element={<Courses user={user} courses={courses}></Courses>}></Route>
    //     <Route path='/' element={<Main openLoginPopup={openLoginPopup} openRegisterPopup={openRegisterPopup}></Main>}></Route>
    //   </Routes>
    //   <Login formSubmit={navigationLoginFormSubmit} isOpened={loginPopupOpened} closePopup={closePopups}></Login>
    //   <Register formSubmit={navigationRegisterFormSubmit} isOpened={registerPopupOpened} closePopup={closePopups}></Register>
    //     <Dashboard></Dashboard>
    //     <Routes>
    //       <Route path='editCourse/:courseID' element={<EditCourse></EditCourse>}></Route>
    //       <Route path='/editLesson/courses/:courseID/modules/:moduleID/lessons/:lessonID' element={<Lesson></Lesson>}></Route>
    //       <Route path='/testFiles' element={<Test></Test>} />
    //       <Route path='/addModule/courses/:courseID' element={<AddModule></AddModule>} />
    //       <Route path='/editModule/courses/:courseID/modules/:moduleID' element={<EditModule></EditModule>} />
    //       <Route path='/editCourse/:courseID' element={loggedIn ? <EditCourse></EditCourse> : <Welcome loginFormSubmit={loginFormSubmit} registerFormSubmit={registerFormSubmit} submitForgetPasswordForm={submitForgetPasswordForm}></Welcome>}></Route>
    //       <Route path='addUser' element={<AddUser />}></Route>
    //       <Route path='addCourse' element={<AddCourse />}></Route>
    //       <Route path='courses/:courseID' element={<Course></Course>}></Route>
    //       <Route path='courses/:courseID/modules/:moduleID/lessons/:lessonID' element={loggedIn ? <CourseModule socket={socket} onlineUsers={onlineUsers} logout={logout} /> : <Welcome loginFormSubmit={loginFormSubmit} registerFormSubmit={registerFormSubmit} submitForgetPasswordForm={submitForgetPasswordForm}></Welcome>}></Route>
    //       <Route path='/' element={loggedIn ? <Main socket={socket} loggedIn={loggedIn} logout={logout} registerFormSubmit={registerFormSubmit}></Main> : <Welcome errorMessage={errorMessage} loginFormSubmit={loginFormSubmit} registerFormSubmit={registerFormSubmit} submitForgetPasswordForm={submitForgetPasswordForm}></Welcome>}></Route>
    //     </Routes>
    //   </UserContext.Provider>
    // </div>
    // </div>
  );
}

export default App;

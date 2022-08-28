import './App.css';
import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import Courses from './components/Courses';
import { apiLogin, apiRegister, apiGetCurrentUser } from './api';

function App() {
  //state variables
  const [loginPopupOpened, setloginPopupOpened] = useState(false);
  const [registerPopupOpened, setregisterPopupOpened] = useState(false);
  const [user, setuser] = useState(null);
  
  //useNavigate
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    
    if(userToken) {
      apiGetCurrentUser(userToken)
      .then((userDoc) => {
        setuser(userDoc);
        navigate('/courses');
      })
    } else {
      console.log('no user loggedin previously');
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
        navigate('/courses')
      })
    })
   
  };

  function navigationRegisterFormSubmit(evt, formData) {
    evt.preventDefault();

  }

  return (
    <div className="App">
      <Routes>
        <Route path='/courses' element={<Courses user={user}></Courses>}></Route>
        <Route path='/' element={<Main openLoginPopup={openLoginPopup} openRegisterPopup={openRegisterPopup}></Main>}></Route>
      </Routes>
      <Login formSubmit={navigationLoginFormSubmit} isOpened={loginPopupOpened} closePopup={closePopups}></Login>
      <Register formSubmit={navigationRegisterFormSubmit} isOpened={registerPopupOpened} closePopup={closePopups}></Register>
    </div>
  );
}

export default App;

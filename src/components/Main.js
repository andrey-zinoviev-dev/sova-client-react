import React from "react";
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import './Main.css';
// import Welcome from './Welcome';
// import Navigation from './Navigation';
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import EditCourse from "./EditCourse";
// import Course from "./Course";
import { UserContext } from '../context/userContext';

export default function Main({socket, logout, loggedIn, registerFormSubmit}) {

  const userFromContext = React.useContext(UserContext);

  // React.useEffect(() => {
  //   console.log(userFromContext);
  // }, [userFromContext])


  return (
    <>
      <Dashboard></Dashboard>
      <main className="main">
        {/* <Navigation openLoginPopup={props.openLoginPopup} openRegisterPopup={props.openRegisterPopup}></Navigation>
        <Welcome></Welcome> */}
        <Outlet></Outlet>
        {/* <Courses socket={socket} loggedIn={loggedIn} logout={logout} registerFormSubmit={registerFormSubmit}></Courses> */}
      </main>
    </>

  )
}
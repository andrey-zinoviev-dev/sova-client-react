import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "./Dashboard";
import CourseModulesPopup from "./CourseModulesPopup";
import './Courses.css';
import {  
  apiGetCourses
} from '../api';

export default function Courses(props) {
  // //variables
  // const naviagte = useNavigate();
  // //functions
  // // function openCourse(id) {
  // //   naviagte(`/courses/${id}`);
  // // }
  // function showSelectedModule(module) {
  //   props.selectModule(module);
  // }

  //state variables
  const [courses, setCourses] = React.useState([]);
  const [courseIndex, setCourseIndex] = React.useState(0);
  const [modulesPopupOpened, setModulesPopupOpened] = React.useState(false);

  //variants
  const spanMotion = {
    rest: {color: "rgb(255, 255, 255)", transition: { ease: "easeInOut", duration: 0.25 }},
    hover: {color: "rgb(211, 124, 82)", transition: { ease: "easeInOut", duration: 0.25 }},
  };

  const liMotion = {
    rest: {border: '2px solid rgba(211, 124, 82, 0)', transition: { ease: "easeInOut", duration: 0.25 }},
    hover: {border: '2px solid rgba(211, 124, 82, 1)', transition: { ease: "easeInOut", duration: 0.25 }},
  }

  //variables
  // let courseIndex = 0;

  //refs
  const buttonsRef = React.useRef();

  //functions
  function showCourse(index) {
    console.log(index);
    setCourseIndex(index);
    // courseIndex = courseIndex + 1;
    // courseIndex = index;
    // courseSectionRef.current.style.backgroundImage=`url(${courses[courseIndex].cover})`;
  };

  function previousCourse() {
    setCourseIndex((prevValue) => {
      return prevValue = prevValue - 1;
    })
    // courseIndex = courseIndex - 1;
    // console.log(courseIndex);
  }

  function nextCourse() {
    // courseIndex = courseIndex + 1;
    // console.log(courseIndex);
    setCourseIndex((prevValue) => {
      return prevValue = prevValue + 1;
    })
  };

  function showCoursePopup(course) {
    setModulesPopupOpened(true);
  //  const courseModules = course.modules;
  //  console.log(courseModules);
  }

  function closeCoursePopup() {
    setModulesPopupOpened(false);
  };

  React.useEffect(() => {
    const userToken = localStorage.getItem('token');

    if(userToken) {
      apiGetCourses(userToken)
      .then((data) => {
        // console.log(data);
        if(!data) {
          return;
        }
        return setCourses(data);
      })
    }
  }, []);

  return (
    <>
      <section style={{backgroundImage: `url(${courses.length > 0 && courses[courseIndex].cover}`}} className="main__courses">
        {/* <Dashboard></Dashboard> */}
        <motion.div className="main_courses-wrapper">
          <h3 className="main__courses-headline">{courses.length > 0 && courses[courseIndex].name}</h3>
          <p className="main__courses-para">{courses.length > 0 && courses[courseIndex].description}</p>
          {/* <Link to={`/courses/${courses.length > 0 && courses[courseIndex]._id}`}>
            <motion.button whileHover={{backgroundColor: "#d37c52", color: "rgb(255, 255, 255)", transition: {duration: 0.2, ease: "easeInOut"}}} className="main_courses-btn">Открыть</motion.button>
          </Link> */}
          <motion.button whileHover={{backgroundColor: "#d37c52", color: "rgb(255, 255, 255)", transition: {duration: 0.2, ease: "easeInOut"}}} onClick={() => {
            showCoursePopup(courses[courseIndex]);
          }} className="main_courses-btn">Открыть</motion.button>
        </motion.div>
        <span className="main__courses-span">Sova inc</span>
        {/* <p>{courses[courseIndex].description}</p> */}
        <div className="main__courses-navigation-wrapper">
          <div className="main__courses-navigation-text">
            <span>Курс</span>
            <span>{courseIndex + 1}</span>/<span>{courses.length > 0 && courses.length}</span>
          </div>
          <div className="main__courses-navigation-arrows">
            <button disabled={courseIndex === 0 ? true : false } className="main__courses-navigation-button" onClick={previousCourse}><FontAwesomeIcon icon={faChevronLeft}/></button>
            <ul ref={buttonsRef} className="main__courses-list main__courses-list_buttons">
              {courses.length > 0 && courses.map((course, index) => {
                return <li key={index} className="main__courses-list-li" onClick={() => {showCourse(index)}}>
                  <button style={{backgroundColor: `${index === courseIndex ? "rgb(255, 255, 255, 1)" : "rgb(255, 255, 255, 0.5)"}`}} className="main__courses-list-li-button" ></button>
                </li>
              })}
            </ul>
            <button disabled={courses.length > 0 && courseIndex === courses.length - 1 ? true : false} className="main__courses-navigation-button" onClick={nextCourse}><FontAwesomeIcon icon={faChevronRight} /></button>
          </div>
        </div>


        <div className="main__courses-overlay"></div>

        {/* <h2>Эй, ты, <p className="headline">{props.user && props.user.name}</p>, это твоя панель... управления</h2>
        
        <p>Здесь можно открыть курс, пройти задания, не пройти задания (шучу), посмотреть свой профиль и так далее</p>
        <ul>
          {props.courses.length > 0 && props.courses.map((course) => {
            return <li key={course._id}>
              <h3>{course.name}</h3>
              <p>`Курс из {course.length} этапов`</p>
              <p>Модули:</p>
              <ul>
                {course.modules.map((courseModule) => {
                  return <li key={courseModule._id}>
                    <Link onClick={() => {
                      // showSelectedModule(courseModule);
                    }} to={`/courses/${course._id}/modules/${courseModule._id}`}>{courseModule.name}</Link>
                  </li>
                })}
              </ul>
            </li>
          })}
        </ul> */}
      </section>
      <CourseModulesPopup modulesPopupOpened={modulesPopupOpened}>
        <div className="popup__modules">
          <div className="popup__modules-course-div">
            <span className="popup__modules-course-span">0{courses.length > 0 && courseIndex + 1} Курс</span>
          </div>
          <h3 className="popup__modules-headline">{courses.length > 0 && courses[courseIndex].name}</h3>
          <span className="popup__modules-topics">Темы курса</span>
          <button className="popup__close popup__close_modules" onClick={closeCoursePopup}>X</button>
          <ul className="popup__modules-list">
            {courses.length > 0 ? courses[courseIndex].modules.map((module, index) => {
              return <motion.li whileHover="hover" initial="rest" variants={liMotion} className="popup__modules-list-element" key={module._id}>
                <Link className="popup__modules-list-element-link" to={`courses/${courses[courseIndex]._id}/modules/${module._id}`}>
                  <div className="popup__modules-list-element-order">
                    <span>{`0${index + 1}`}</span><span>{module.name}</span>
                  </div>
                  <div>
                    <span></span>
                    <motion.span variants={spanMotion}>&gt;</motion.span>
                  </div>
                </Link>
              </motion.li>
            }) : <li>У курса пока нет модулей, но это скоро изменится</li> }
          </ul>
        </div>
        <div className="popup__overlay"></div>
      </CourseModulesPopup>
    </>

  )
}
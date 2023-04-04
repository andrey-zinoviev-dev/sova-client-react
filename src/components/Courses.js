import React from "react";
import Slider from 'react-touch-drag-slider'
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faArrowLeft, faArrowRight, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/userContext";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import CourseModulesPopup from "./CourseModulesPopup";
// import AddCourse from "./AddCourse";
import './Courses.css';
import {  
  apiGetCourses
} from '../api';
import EditCourse from "./EditCourse";

export default function Courses({ setCourseInEdit }) {
  //contexts
  const loggedInUser = React.useContext(UserContext);

  //state variables
  const [courses, setCourses] = React.useState([]);
  const [selectedCourse, setSelectedCourse] = React.useState({});
  const [modulesPopupOpened, setModulesPopupOpened] = React.useState(false);
  const [isEditCourse, setIsEditCourse] = React.useState(false);
  const [courseCover, setCourseCover] = React.useState("");
  const [courseIndex, setCourseIndex] = React.useState(0);

  //variants
  const spanMotion = {
    rest: {color: "rgb(255, 255, 255)", transition: { ease: "easeInOut", duration: 0.25 }},
    hover: {color: "rgb(211, 124, 82)", transition: { ease: "easeInOut", duration: 0.25 }},
  };

  const liMotion = {
    rest: {border: '2px solid rgba(211, 124, 82, 0)', transition: { ease: "easeInOut", duration: 0.25 }},
    hover: {border: '2px solid rgba(211, 124, 82, 1)', transition: { ease: "easeInOut", duration: 0.25 }},
  }

  const addCourseVariants = {
    hidden: {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    shown: {
      backgroundColor: "rgba(0, 0, 0, 0.35)",
    },
  }

  const addCourseButton = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      }
    },
    shown: {
      opacity: 1,
      scale: 1.1,
      display: "inline-block",
      transition: {
        duration: 0.5,
      },
    },
  }

  //animations
  const pulseButton = {
    boxShadow: ["0 0 0px rgb(255 255 255 / 70%)", "0 0 7.5px rgb(255 255 255 / 35%)", "0 0 0px rgb(255 255 255 / 0%)"],
    // scale: [0.95, 1.2, 0.95],
  }

  //refs
  const buttonsRef = React.useRef();
  const ulRef = React.useRef();
  const courseNameRef = React.useRef();
  const courseDescRef = React.useRef();
  const courseCoverRef = React.useRef();

  //functions
  function previousCourse() {
    // console.log('prev course');
    setCourseIndex((prevValue) => {
      return prevValue -= 1;
    })
    // console.log(ulRef.current.clientWidth);
    ulRef.current.scrollLeft += -ulRef.current.clientWidth;
    //uncomment if necessary
    // setCourseIndex((prevValue) => {
    //   return prevValue = prevValue - 1;
    // })


    // courseIndex = courseIndex - 1;
    // console.log(courseIndex);
  }

  function nextCourse() {
    // console.log('next course');
    setCourseIndex((prevValue) => {
      return prevValue += 1;
    })
    // console.log(ulRef.current.clientWidth);
    ulRef.current.scrollLeft += ulRef.current.clientWidth;
    // courseIndex = courseIndex + 1;
    // console.log(courseIndex);

    //uncomment if necessary
    // setCourseIndex((prevValue) => {
    //   return prevValue = prevValue + 1;
    // })
  };

  function scrollToCourse(evt) {
    const buttonValue = parseInt(evt.target.textContent) - 1;
    setCourseIndex((prevValue) => {
      if(prevValue > buttonValue) {
        console.log('scroll courses left');
        console.log(ulRef.current.children[buttonValue]);
        ulRef.current.scrollTo({top: 0, left: ulRef.current.children[buttonValue].offsetLeft, behavior: "smooth"});
        // ulRef.current.scrollLeft -= ulRef.current.clientWidth * parseInt(evt.target.textContent);
      } else {
        console.log('scroll courses right');
        console.log(ulRef.current.children[buttonValue]);
        ulRef.current.scrollTo({top: 0, left: ulRef.current.children[buttonValue].offsetLeft, behavior: "smooth"});
      }
      return buttonValue;
    });
    // ulRef.current.scrollLeft += ulRef.current.clientWidth * parseInt(evt.target.textContent);
  }

  function showCoursePopup(course) {
    // console.log(course);
    setSelectedCourse(course);
    setModulesPopupOpened(true);
  //  const courseModules = course.modules;
  //  console.log(courseModules);
  }

  function closeCoursePopup() {
    setModulesPopupOpened(false);
  };

  function handleCoverEdit() {
    const relativePath = window.URL.createObjectURL(courseCoverRef.current.files[0]);
    setCourseCover(relativePath);
    // setCourseCover(courseCoverRef.current.files[0]);
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

  React.useEffect(() => {
    console.log(courseIndex);
  }, [courseIndex]);

  return (
    <>
      {/* <Dashboard /> */}
      <section className="main__courses">
        <Menu user={loggedInUser} />
        {/* <Slider activeIndex={0} threshHold={100}>
        <ul ref={ulRef} className="main__courses-list">
          {courses.map((course, index) => {
            return <li className="main__courses-list-element" key={course._id} style={{flex: "1 0 100%", width: "100%", height: "100vh", backgroundImage: `url(${course.cover})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative"}}>
        
              <div className="main__courses-list-element-content">
                <div className="main_courses-wrapper">
                  <motion.button onClick={() => {
                    setSelectedCourse(course);
                    setIsEditCourse(true);
                  }} whileHover={{color: "#d37c52", border: "2px solid #d37c52"}} style={{position: "absolute", top: "5%", right: "-10%", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: "51%", backgroundColor: "transparent", border: "2px solid rgb(255, 255, 255)", color: "rgb(255, 255, 255)", fontSize: 12, zIndex: 6}}>
                    <FontAwesomeIcon icon={faPen}/>
                  </motion.button>
                  <h3 className="main__courses-headline">{course.name}</h3>
                  <p className="main__courses-para">{course.description}</p>
                  <span>{index === courses.length - 1 && "последний курс"}</span>
                  <motion.button whileHover={{backgroundColor: "#d37c52", color: "rgb(255, 255, 255)", transition: {duration: 0.2, ease: "easeInOut"}}} onClick={() => {
                    showCoursePopup(course);
                  }} className="main_courses-btn">Открыть</motion.button>
                  <span style={{color: "rgb(255 255 255/ 45%)", fontSize: 60}}>{`00${index + 1}`}</span>
                </div>
                {index === courses.length - 1 && 
                  <motion.div whileHover="shown" initial="hidden" animate="hidden" variants={addCourseVariants} className="main__courses-list-element-content-add" style={{position: "absolute", top: 0, right: 0, width: 210, height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Link to={`../addCourse`}>
                      <motion.button variants={addCourseButton} onClick={() => {
                        console.log('add course button pressed');
                        }} style={{padding: 0, minWidth: 45, minHeight: 45, borderRadius: "51%", backgroundColor: "transparent", border: "2px solid white", color: "white"}}>
                        +
                      </motion.button>
                    </Link>
                  </motion.div>
                  
                }
              </div>
            
            </li>
          })}
        </ul>
        </Slider> */}
        <ul ref={ulRef} className="main__courses-list">
          {courses.map((course, index) => {
            return <li className="main__courses-list-element" key={course._id} style={{flex: "1 0 100%", width: "100%", height: "100vh", backgroundImage: `url(${course.cover})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative"}}>
        
              <div className="main__courses-list-element-content">
                <div className="main_courses-wrapper">
                  <motion.button onClick={() => {
                    setSelectedCourse(course);
                    setIsEditCourse(true);
                  }} whileHover={{color: "#d37c52", border: "2px solid #d37c52"}} style={{position: "absolute", top: "5%", right: "-10%", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: "51%", backgroundColor: "transparent", border: "2px solid rgb(255, 255, 255)", color: "rgb(255, 255, 255)", fontSize: 12, zIndex: 6}}>
                    <FontAwesomeIcon icon={faPen}/>
                  </motion.button>
                  <h3 className="main__courses-headline">{course.name}</h3>
                  <p className="main__courses-para">{course.description}</p>
                  <span>{index === courses.length - 1 && "последний курс"}</span>
                  <motion.button whileHover={{backgroundColor: "#d37c52", color: "rgb(255, 255, 255)", transition: {duration: 0.2, ease: "easeInOut"}}} onClick={() => {
                    showCoursePopup(course);
                  }} className="main_courses-btn">Открыть</motion.button>
                  <span style={{color: "rgb(255 255 255/ 45%)", fontSize: 60}}>{`00${index + 1}`}</span>
                </div>
                {index === courses.length - 1 && 
                  <motion.div whileHover="shown" initial="hidden" animate="hidden" variants={addCourseVariants} className="main__courses-list-element-content-add" style={{position: "absolute", top: 0, right: 0, width: 210, height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Link to={`../addCourse`}>
                      <motion.button variants={addCourseButton} onClick={() => {
                        console.log('add course button pressed');
                        }} style={{padding: 0, minWidth: 45, minHeight: 45, borderRadius: "51%", backgroundColor: "transparent", border: "2px solid white", color: "white"}}>
                        +
                      </motion.button>
                    </Link>
                  </motion.div>
                  
                }
              </div>
            
            </li>
          })}
        </ul>
        <span className="main__courses-span">Sova inc</span>
        <div style={{position: "absolute", top: "50%", left: 0, padding: "0 5%", boxSizing: "border-box", width: "100%", zIndex: 7, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <motion.button onClick={previousCourse} style={{visibility: courseIndex <= 0 ? "hidden" : "visible", padding: 0, width: 30, height: 30, borderRadius: "51%", backgroundColor: "transparent", color: "white", border: "2px solid white"}}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </motion.button>
          <motion.button animate={pulseButton} transition={{duration: 2, repeat: "Infinity", type:"keyframes"}} onClick={nextCourse} style={{visibility: courseIndex >= courses.length - 1 ? "hidden" : "visible", padding: 0, width: 30, height: 30, borderRadius: "51%", backgroundColor: "transparent", color: "white", border: "2px solid white"}}>
            <FontAwesomeIcon icon={faArrowRight} />
          </motion.button>
        </div>
        <ul style={{position: "absolute", bottom: "15%", right: 0, borderTop: "2px solid white", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 20, zIndex: 7, listStyle: "none", padding: "10px 0", margin: 0}}>
          {courses.map((course, index) => {
            return <li key={index} style={{transform: `scale(${index === courseIndex ? 2 : 1})`}}>
              <button onClick={scrollToCourse} style={{backgroundColor: "transparent", border: "none", color: "white"}}>{index + 1}</button>
            </li>
          })}
        </ul>
        {/* <div className="main__courses-navigation-wrapper">
            <div className="main__courses-navigation-text">
              <span>Курс</span>
              
            </div>
            <div className="main__courses-navigation-arrows">
              <button style={{color:  "rgba(255, 255, 255, 1)"}} className="main__courses-navigation-button" onClick={previousCourse}><FontAwesomeIcon icon={faChevronLeft} /></button>
              <ul className="main__courses-list main__courses-list_buttons">
                {courses.map((course, index) => {
                  return <li key={index} className="main__courses-list-li">
                    <button className="main__courses-list-li-button"></button>
                  </li>
                })}
              </ul>
              <button style={{color: "rgba(255, 255, 255, 1)"}} className="main__courses-navigation-button" onClick={nextCourse}><FontAwesomeIcon icon={faChevronRight} /></button>            </div>
          </div> */}

        {/* <div className="main__courses-content">
          <div className="main_courses-wrapper">
            <h3 className="main__courses-headline">{courses.length > 0 && courses[courseIndex].name}</h3>
            <p className="main__courses-para">{courses.length > 0 && courses[courseIndex].description}</p>

            <motion.button whileHover={{backgroundColor: "#d37c52", color: "rgb(255, 255, 255)", transition: {duration: 0.2, ease: "easeInOut"}}} onClick={() => {
              showCoursePopup(courses[courseIndex]);
            }} className="main_courses-btn">Открыть</motion.button>
          </div>
          <span className="main__courses-span">Sova inc</span>
        
          <div className="main__courses-navigation-wrapper">
            <div className="main__courses-navigation-text">
              <span>Курс</span>
              <span>{courseIndex + 1}</span>/<span>{courses.length > 0 && courses.length}</span>
            </div>
            <div className="main__courses-navigation-arrows">
              <button disabled={courseIndex === 0 ? true : false } style={{color: courseIndex === 0 ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 1)"}} className="main__courses-navigation-button" onClick={previousCourse}><FontAwesomeIcon icon={faChevronLeft} /></button>
              <ul ref={buttonsRef} className="main__courses-list main__courses-list_buttons">
                {courses.length > 0 && courses.map((course, index) => {
                  return <li key={index} className="main__courses-list-li" onClick={() => {showCourse(index)}}>
                    <button style={{backgroundColor: `${index === courseIndex ? "#d37c52" : "rgb(255, 255, 255, 0.5)"}`}} className="main__courses-list-li-button" ></button>
                  </li>
                })}
              </ul>
              <button disabled={courses.length > 0 && courseIndex === courses.length - 1 ? true : false} style={{color: courseIndex === courses.length - 1 ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 1)"}} className="main__courses-navigation-button" onClick={nextCourse}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
          </div>
          <div className="main__courses-overlay"></div>
        </div> */}

        {/* <div className="main__courses-overlay"></div> */}
      </section>

      <CourseModulesPopup modulesPopupOpened={modulesPopupOpened}>
        <div className="popup__modules">
          <div className="popup__modules-course-div">
            <span className="popup__modules-course-span">{/*`0 ${courses.length > 0 && courseIndex + 1} Курс`*/}</span>
          </div>
          <h3 className="popup__modules-headline">{/*courses.length > 0 && courses[courseIndex].name*/}{selectedCourse.name}</h3>
          <span className="popup__modules-topics">Темы курса</span>
          <button className="popup__close popup__close_modules" onClick={closeCoursePopup}>X</button>
          <ul className="popup__modules-list">
            {selectedCourse._id && selectedCourse.modules.map((module, index) => {
              return <motion.li className="popup__modules-list-element" whileHover="hover" initial="rest" variants={liMotion} key={module._id}>
                
                <Link className="popup__modules-list-element-link" to={`courses/${selectedCourse._id}/modules/${module._id}`}>
                  <span>{`0${index + 1} ${module.name}`}</span>
                </Link>
              </motion.li>
            })}
            {/* {courses.length > 0 ? courses[courseIndex].modules.map((module, index) => {
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
            }) : <li>У курса пока нет модулей, но это скоро изменится</li> } */}
          </ul>
        </div>
        <div className="popup__overlay"></div>
      </CourseModulesPopup>
      {isEditCourse && <EditCourse>
        <div style={{textAlign: "left", position: "relative"}}>
          <button onClick={() => {
            setIsEditCourse(false)
            }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 style={{fontSize: 36}}>Редактировать курс</h2>
          <form style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", textAlign: "left", minHeight: 500}}>
            <div style={{margin: '0 0 30px 0'}}>
              <label style={{display: "block", margin: "0 0 25px 0"}} htmlFor="course-name">Название</label>
              <input ref={courseNameRef} style={{width: "100%", boxSizing: "border-box", borderRadius: 12, padding: "10px 20px", border: "none", fontSize: 16}} id="course-name" value={selectedCourse.name} onChange={() => {}}></input>
            </div>
            <div>
              <label style={{display: "block", margin: "0 0 25px 0"}} htmlFor="course-desc">Описание</label>
              
              <textarea ref={courseDescRef} style={{width: "100%", height: 350, boxSizing: "border-box", padding: "10px 20px", borderRadius: 12, fontSize: 16}} value={selectedCourse.description} onChange={(evt) => {
                console.log(evt.target.value);
              }}></textarea>
            </div>
            <div style={{textAlign: "left", margin: "30px 0 0 0"}}>
              <span style={{display: "block"}}>Текущая обложка курса</span>
              <img style={{height: 250, objectFit: "cover", width: 500, boxSizing: "border-box", borderRadius: 9, border: "2px solid white", margin: "30px 0"}} src={courseCover.length > 0 ? courseCover : selectedCourse.cover} alt="Обложка курса"></img>
              <button type="button" style={{display: "block", boxSizing: "border-box", padding: "10px 20px", border: "2px solid white", color: "white", borderRadius: 12, backgroundColor: "transparent", fontSize: 18}}>
                <label style={{cursor: "pointer"}} htmlFor="course-cover">Изменить обложку</label>
              </button>
              <input ref={courseCoverRef} onChange={handleCoverEdit} id="course-cover" type="file" style={{display: "none"}}></input> 
            </div>
          </form>
        </div>
      </EditCourse>}
    </>

  )
}
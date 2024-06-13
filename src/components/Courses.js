import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SovaLogo from '../images/sova-logo-white.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faLock, faEnvelope, faTrash, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../context/userContext";
// import Menu from "./Menu";
// import Dashboard from "./Dashboard";
// import CourseModulesPopup from "./CourseModulesPopup";
// import ModulesList from "./ModulesList";
// import PopupWithForm from "./PopupWithForm";
// import AddModulePopup from "./AddModulePopup";
// import AddLessonPopup from "./AddLessonPopup";
// import AddUser from "./AddUser";
import NoCourses from '../images/Group_20.png'
// import AddCourse from "./AddCourse";
import './Courses.css';
import {  
  apiGetCourses,
  apiGetAllStudents,
  // apiAddStudentsToCourse,
  // apiEditCourse,
  // apiDeleteModule,
  // apiDeleteLesson,
  // apiEditModuleCover,
  // apiEditLessonCover,
  // apiAddLessonToCourse,
  // apiRegister
} from '../api';
import SendEmail from "./SendEmail";
import axiosClient from '../axios';
import DeleteCourse from "./DeleteCourse";
import EditCourseRender from "./EditCourseRender";
// import EditCourse from "./EditCourse";
// import EditModule from "./EditModule";
// import EditLesson from "./EditLesson";
// import Student from "./Student"
// import TipTapEditor from "./TipTapEditor";
// import EditLessonContent from "./EditLessonContent";

export default function Courses({ socket, setCourseInEdit, logout, loggedIn, registerFormSubmit }) {
  //naviagte
  const navigate = useNavigate();
  //location
  // const location = useLocation();
  //contexts
  const loggedInUser = React.useContext(UserContext);

  //token
  const token = localStorage.getItem('token');

  //state variables
  const [coursesData, setCoursesData] = React.useState({
    courses: [],
    allStudents: [],
  });
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);
  const [deleteCourse, setDeleteCourse] = React.useState(false);
  const [emailCourse, setEmailCourse] = React.useState(false);
  const [renderCourse, setRenderCourse] = React.useState(false);
  const [coursesLoading, setCoursesLoading] = React.useState(false);

  //derived state
  const selectedCourse = coursesData.courses.find((course) => {
    return course._id === selectedCourseId;
  });
  
  //variants
  const liGradient = {
    rest: {
      border: "2px solid rgb(52, 52, 60)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    },
    hover: {
      border: "2px solid #5DB0C7",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    }
  };

  const liGradientDisabled = {
    rest: {
      border: "2px solid rgb(52, 52, 60)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    },
    hover: {
      border: "2px solid rgb(249, 249, 249)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    }
  };

  const liContent = {
    rest: {
      border: "2px solid rgb(93, 176, 199)",
      color: "rgb(93, 176, 199)",
    },
    hover: {
      border: "2px solid rgba(255, 255, 255, 1)",
      color: "rgba(255, 255, 255, 1)"
    }
  };

  const dotColor = {
    rest: {
      // border: "2px solid rgb(93, 176, 199)",
      backgroundColor: "rgb(93, 176, 199)",
    },
    hover: {
      // border: "2px solid rgba(255, 255, 255, 1)",
      backgroundColor: "rgba(255, 255, 255, 1)"
    }
  };

  const authorColor = {
    rest: {
      color: "rgb(64, 64, 64)"
    },
    hover: {
      color: "rgba(252, 249, 249, 0.65)",
    }
  }

  //refs
  // const buttonsRef = React.useRef();
  const ulRef = React.useRef();
  // const courseNameRef = React.useRef();
  // const courseDescRef = React.useRef();
  const courseCoverRef = React.useRef();

  // const addModuleNameRef = React.useRef();
  const addMoudleImg = React.useRef();
  // const addModuleImgInput = React.useRef();
  const addLessonImgRef = React.useRef();
  // const addLessonImgInput = React.useRef();
  // const editModuleNameRef = React.useRef();
  const editModuleImgRef = React.useRef();
  // const editModuleImgInput = React.useRef();
  // const lessonNameRef = React.useRef();
  const editLessonImgRef = React.useRef();
  // const editLessonImgInput = React.useRef();

  React.useEffect(() => {
    const userToken = localStorage.getItem('token');

    if(userToken) {
      setCoursesLoading(true);
      const coursesFromApi = apiGetCourses(userToken)

      const allStudentsFromApi = apiGetAllStudents(userToken)

      Promise.all([coursesFromApi, allStudentsFromApi])
      .then(([coursesReceived, studentsReceived]) => {
        console.log(coursesReceived);
        // console.log(coursesIds);
        const coursesToRender =  loggedInUser.admin ? coursesReceived
        : 
        // coursesReceived
        coursesReceived.map((courseReceived) => {
         
          return courseReceived.students.find((student) => {
            return student._id === loggedInUser._id;
          }) ? courseReceived : {...courseReceived, available: false};
          // return loggedInUser.courses.find((userCourse) => {
          //   return userCourse.id === courseReceived._id;
          // }) ? {...courseReceived, available: true} : {...courseReceived, available: false};
        });

        console.log(coursesReceived.filter((course) => {
          return !course.hidden;
        }))

        setCoursesData({courses: coursesToRender, allStudents: studentsReceived});
        setCoursesLoading(false);
      })
    }
  }, []);

  // React.useEffect(() => {
  //   console.log(loggedInUser);
  // }, [loggedInUser]);

  // React.useEffect(() => {
  //   console.log(selectedFiles);
  // }, [selectedFiles])

  // React.useEffect(() => {
  //   console.log(coursesLoading);
  // }, [coursesLoading])

  // React.useEffect(() => {
  //   console.log(coursesData);
  // }, [coursesData])

  return (
    <>
      <section className="main__courses">
        <div style={{display: "flex", alignItems: "stretch", justifyContent: "space-between", width: "100%"}}>
          <h2 className="main__courses-headline" style={{textAlign: "left", fontWeight: 400}}>
          Добро пожаловать в Школу Экстремального вокала<span style={{color: "rgb(93, 176, 199)"}}> Саши Совы</span><span style={{color: "rgb(93, 176, 199)"}}>.</span></h2>
        </div>
        {coursesLoading ? <div className="main__courses-loader">
          <img className="main__courses-loader-svg" src={SovaLogo} alt="sova-logo"></img>
          <p className="main__courses-loader-p">Загрузка курсов</p>
        </div>
        :
          coursesLoading ? <p style={{color: "white"}}>Загрузка курсов...</p> : coursesData.courses.length > 0 ?  <ul ref={ulRef} className="main__courses-list">
          {coursesData.courses.map((course, index) => {
            return <motion.li variants={course.available ? liGradient : liGradientDisabled} initial="rest" whileHover="hover" animate="rest" className="main__courses-list-element" key={course._id} style={{overflow:"hidden", width: "100%", boxShadow: "rgba(0, 0, 0, 0.75) 5px 5px 10px", position: "relative", borderRadius: 5, border: "2px solid #34343C", boxSizing: "border-box"}}>
              <motion.div style={{zIndex: 16, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgb(0, 0, 0, 0.35)"}}></motion.div>
              <img style={{position: "absolute", top: 0, left: 0, zIndex: 15, width: "100%", height: "100%", objectFit: "cover"}} src={course.cover.path} alt="обложка курса" />
              <button onClick={() => {
                navigate(`courses/${course._id}`, {
                  state: course
                })
              }} style={{pointerEvents: !course.available && "none", position: "relative", zIndex: 20, width: "100%", height: "100%", backgroundColor: "transparent", borderRadius: 5, border: "none", boxSizing: "border-box", padding: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignContent: "flex-start"}}>
                
                <div style={{position: "relative", zIndex: 20, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 35, fontSize: 28, color: "white"}}>
                  <p style={{margin: 0}}>0{index + 1}</p>
                  {/* <motion.div variants={dotColor} style={{backgroundColor: "#5DB0C7", width: 5, height: 5, borderRadius: "51%", margin: "0 0 6px 0"}}></motion.div> */}
                  {loggedInUser._id && loggedInUser.admin &&
                    <div className="main__courses-ul-li-buttons">
                      <button onClick={(evt) => {
                        evt.stopPropagation();
                        setSelectedCourseId(course._id);
                        setRenderCourse(true);
                        // navigate(`../sendEmail/${course._id}`, {
                        //   state: course,
                        // })
                      }}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button onClick={(evt) => {
                        evt.stopPropagation();
                        setSelectedCourseId(course._id);
                        setEmailCourse(true);
                        // navigate(`../sendEmail/${course._id}`, {
                        //   state: course,
                        // })
                      }}>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </button>
                      <button  onClick={(evt) => {
                        evt.stopPropagation();
                        navigate(`courses/edit/${course._id}`)
                        // console.log("edit course btn clicked");
                      }} 
                      // style={{position: "absolute", top: "6.5%", right: 35, zIndex:25, display: window.innerWidth <= 767 ? "none" : 'flex', justifyContent: "center", alignItems: "center", width: 27, height: 27, borderRadius: "51%", backgroundColor: "transparent", border: "2px solid #5DB0C7", color: "#5DB0C7", fontSize: 10}}
                      >
                        <FontAwesomeIcon icon={faPen}/>
                      </button>
                      <button onClick={(evt) => {
                        evt.stopPropagation();
                        setSelectedCourseId(course._id);
                        setDeleteCourse(true);
                        // console.log(course);
                      }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  }
                </div>
                <motion.div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "space-between", textAlign: "left", order: 2, width: "100%"}}>
                  <h3 style={{margin: 0, letterSpacing: 2, width: "100%", height: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "white", fontSize: 24}}>{course.name}</h3>
                  <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", margin: "10px 0 0 0"}}>
                    <motion.p style={{margin: 0, color: "rgb(249, 249, 249)", fontSize: 20}}>{course.author.name}</motion.p>
                    {course.hidden && <FontAwesomeIcon style={{color: "#C7C7C9", width: "100%", height: "100%", maxWidth: 20 }} icon={faEyeSlash} />}
                    {!course.available && <FontAwesomeIcon style={{color: "#C7C7C9", width: "100%", height: "100%", maxWidth: 20 }} icon={faLock} />}
                  </div>

                </motion.div>
              </button>
             
            
            </motion.li>
          })

        }
        </ul>
        :
        <div className="main__no-courses">
          <img src={NoCourses} alt="нет курсов"/>
          <p>Курсов нет</p>
        </div>
      }
      </section>
      {renderCourse && <EditCourseRender course={selectedCourse} setRenderCourse={setRenderCourse} setSelectedCourseId={setSelectedCourseId}/>}
      {emailCourse && <SendEmail setEmailCourse={setEmailCourse} setSelectedCourseId={setSelectedCourseId} selectedCourse={selectedCourse} token={token}/>}
      {deleteCourse && <DeleteCourse course={selectedCourse} setSelectedCourseId={setSelectedCourseId} setDeleteCourse={setDeleteCourse} setCoursesData={setCoursesData}></DeleteCourse>}
    </>

  )
}
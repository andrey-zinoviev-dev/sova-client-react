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
  // const [selectedCourseId, setSelectedCourseId] = React.useState("");
  // const [selectedModuleId, setSelectedModuleId] = React.useState("");
  // const [selectedLessonId, setSelectedLessonId] = React.useState("");
  // const [modulesPopupOpened, setModulesPopupOpened] = React.useState(false);
  // const [isEditCourse, setIsEditCourse] = React.useState(false);
  // const [isEditModule, setIsEditModule] = React.useState(false);
  // const [isEditLesson, setIsEditLesson] = React.useState(false);
  // const [courseCover, setCourseCover] = React.useState("");
  // const [addUserOpened, setAddUserOpened] = React.useState(false);
  // const [popupOpened, setPopupOpened] = React.useState(false);
  // const [studentsToAddToCourse, setStudentsToAddToCourse] = React.useState([]);
  // const [addModulePopupOpened, setAddModulePopupOpened] = React.useState(false);
  // const [addLessonPopupOpened, setAddLessonPopupOpened] = React.useState(false);
  // const [selectedFiles, setSelectedFiles] = React.useState([]);
  // const [lessonContent, setLessonContent] = React.useState({title: "", cover: "", content: {"type": "doc", "content": [
  //   // …
  // ]}});
  const [coursesLoading, setCoursesLoading] = React.useState(false);

  //derived state
  const selectedCourse = coursesData.courses.find((course) => {
    return course._id === selectedCourseId;
  });
  // console.log(selectedCourse);
  // const [lessonUploadProgress, setLessonUploadProgress] = React.useState(0);
  // const [successfullyAddedUser, setSuccessfullyAddedUser] = React.useState(false);
  // const [uploadFormSubmitted, setUploadFormSubmitted] = React.useState(false);
  // const [uploadSuccessful, setUploadSuccessful] = React.useState(false);

  //derived states
  // let foundCourse = coursesData.courses.find((course) => {
  //   return course._id === selectedCourseId;
  // }) ? coursesData.courses.find((course) => {
  //   return course._id === selectedCourseId;
  // }) : {name: "", description: "", author: "", modules: [], cover: "", students: []};

  // const foundModule = foundCourse.modules.find((module) => {
  //   return module._id === selectedModuleId;
  // }) ? foundCourse.modules.find((module) => {
  //   return module._id === selectedModuleId;
  // }) : {title: "", author: {}, lessons: []};

  // const foundLesson = foundModule.lessons.find((lesson) => {
  //   return lesson._id === selectedLessonId;
  // }) ? foundModule.lessons.find((lesson) => {
  //   return lesson._id === selectedLessonId;
  // }) : {title: "", cover: "", content: {"type": "doc", "content": [
  //   // …
  // ]}};

  //variants
  const liGradient = {
    rest: {
      // translate: "0 -100%",
      // backgroundColor: "rgba(0, 0, 0, 1)",
      // backDropFilter: "blur(7px)",
      border: "2px solid rgb(52, 52, 60)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    },
    hover: {
      // translate: "0 0%",
      // backgroundColor: "rgba(0, 0, 0, 0.5)",
      // backDropFilter: "blur(0px)",
      border: "2px solid #5DB0C7",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    }
  };

  const liGradientDisabled = {
    rest: {
      // translate: "0 -100%",
      // backgroundColor: "rgba(0, 0, 0, 1)",
      // backDropFilter: "blur(7px)",
      border: "2px solid rgb(52, 52, 60)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    },
    hover: {
      // translate: "0 0%",
      // backgroundColor: "rgba(0, 0, 0, 0.5)",
      // backDropFilter: "blur(0px)",
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

  // //functions
  // function showCoursePopup(courseId) {
  //   setSelectedCourseId(courseId);
  //   setModulesPopupOpened(true);
  // }

  // function closeCoursePopup() {
  //   setModulesPopupOpened(false);
  //   setSelectedCourseId("");
  // };

  // function handleCoverEdit() {
  //   const relativePath = window.URL.createObjectURL(courseCoverRef.current.files[0]);
  //   setCourseCover(relativePath);
  //   // setCourseCover(courseCoverRef.current.files[0]);
  // };

  // function handleModuleCoverUpload(evt) {
  //   const newCover = evt.target.files[0];
  //   const relativePath = window.URL.createObjectURL(newCover);
  //   addMoudleImg.current.src = relativePath;
  //   newCover.clientPath = relativePath;
  //   newCover.title = newCover.name;
  //   // console.log(newCover);
  //   setSelectedFiles((prevValue) => {
  //     return [...prevValue, newCover];
  //   })
  // };

  // function handleLessonCoverUpload(evt) {
  //   const newCover = evt.target.files[0];
  //   addLessonImgRef.current.src = window.URL.createObjectURL(newCover);
  //   newCover.title = newCover.name;
  //   setLessonContent((prevValue) => {
  //     return {...prevValue, cover: {title: newCover.title}}
  //   });
  //   setSelectedFiles((prevValue) => {
  //     return [...prevValue, newCover];
  //   });
  // }

  // function handleModuleEditCoverUpload(evt) {
  //   const newCover = evt.target.files[0];
  //   const relativePath = window.URL.createObjectURL(newCover);
  //   editModuleImgRef.current.src = relativePath;
  //   newCover.clientPath = relativePath;
  //   newCover.title = newCover.name;

  //   return newCover;
  // };

  // function handleLessonEditCoverUpload(evt) {
  //   const newCover = evt.target.files[0];
  //   const relativePath = window.URL.createObjectURL(newCover);
  //   editLessonImgRef.current.src = relativePath;
  //   newCover.clientPath = relativePath;
  //   newCover.title = newCover.name;
  //   return newCover;
  // };

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
                        console.log("show course");
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
      {emailCourse && <SendEmail setEmailCourse={setEmailCourse} setSelectedCourseId={setSelectedCourseId} selectedCourse={selectedCourse} token={token}/>}
      {deleteCourse && <DeleteCourse course={selectedCourse} setSelectedCourseId={setSelectedCourseId} setDeleteCourse={setDeleteCourse} setCoursesData={setCoursesData}></DeleteCourse>}
      {/* {} */}
      {/* {modulesPopupOpened && <CourseModulesPopup modulesPopupOpened={modulesPopupOpened}>
        <div className="popup__modules">
          <button className="popup__close popup__close_modules" onClick={closeCoursePopup}>
              <FontAwesomeIcon icon={faXmark} />
          </button>
          <img className="popup__modules-cover" alt={foundCourse.cover} src={foundCourse.cover}></img>
          <div className="popup__modules-content-wrapper">
            <h3 style={{margin: "0 0 30px 0"}} className="popup__modules-headline">{foundCourse.name}</h3>
            <div className="popup__modules-navigation">
              <button className="popup__modules-navigation-btn" onClick={() => {
                setSelectedModuleId("");
              }} style={{lineHeight: 1.5, backgroundColor: "transparent", border: "none", color: "rgb(255, 255, 255)", fontWeight: 700, padding: 0}}>Модули курса</button>
              {foundModule._id && <FontAwesomeIcon className="popup__modules-arrow-svg" icon={faArrowRight}/>}
              {foundModule._id && <span className="popup__modules-arrow-span">{foundModule.title}</span>}

            </div>
            
            {foundModule.lessons.length > 0 ? <ul className="popup__modules-ul">
                {foundModule.lessons.map((lesson) => {
                  return <li key={lesson._id} onClick={() => {
                    navigate(`../courses/${foundCourse._id}/modules/${foundModule._id}/lessons/${lesson._id}`)
                  }} className="popup__modules-ul-li">
                    <img className="popup__modules-ul-li-lesson-img" alt="обложка урока" src={lesson.cover}></img>
                    <p className="popup__modules-ul-li-lesson-p">{lesson.title}</p>
                  </li>
                })}
            </ul> : <ul className="popup__modules-ul">
              {foundCourse.modules.map((module, index) => {
                return <li key={module._id} onClick={() => {
                  setSelectedModuleId(module._id);
                }} className="popup__modules-ul-li">
                  <img className="popup__modules-ul-li-lesson-img" alt="обложка модуля" src={module.cover}></img>
                  <span className="popup__modules-ul-li-span">{`0${index + 1} ${module.title}`}</span>
                </li>
              })}  
            </ul>}
          </div>
          <div className="popup__modules-module-overlay"></div>
        </div>
        <div className="popup__overlay"></div>
      </CourseModulesPopup>} */}

      {/* {isEditCourse && <EditCourse>
        <div style={{position: "relative", width: "100%", maxWidth: 920}}>
          <button onClick={() => {
            setIsEditCourse(false);
            
            }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 style={{fontSize: 36}}>Редактировать курс</h2>
          <form className="course-edit__form" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", textAlign: "left", margin: '0 0 30px 0'}}>
            <label style={{display: "block", margin: "0 0 10px 0"}} htmlFor="course-name">Название</label>
            <input className="course-edit__form-input" ref={courseNameRef} id="course-name" value={foundCourse.name} onChange={() => {}}></input>
          </form>
          <form className="course-edit__form" style={{display: "flex", maxWidth: "100%", justifyContent: "space-between", alignItems: "stretch", gap: 50}}>
            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
              <label style={{display: "block", margin: "0 0 20px 0"}} htmlFor="course-desc">Описание</label> 
              <textarea className="course-edit__form-textarea" ref={courseDescRef} value={foundCourse.description} onChange={(evt) => {
                console.log(evt.target.value);
              }}></textarea>
            </div>
            <div style={{textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", width: "100%"}}>
              <span style={{display: "block", margin: "0 0 20px 0"}}>Текущая обложка курса</span>
              <div style={{position: "relative", display: "flex"}}>
                <img style={{objectFit: "cover", width: "100%", aspectRatio: "16/10", height: "100%", boxSizing: "border-box", borderRadius: 9, border: "2px solid white"}} src={courseCover.length > 0 ? courseCover : foundCourse.cover} alt="Обложка курса"></img>
                <motion.button whileHover={{opacity: 1}} type="button" onClick={(() => {
                  courseCoverRef.current.click();
                })} style={{position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", fontSize: 20, bottom: 0, right: 0, opacity: 0, width: "100%", height: "100%", padding: 0, border: "none", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <p>Изменить обложку</p>
                  
                </motion.button>
                <input ref={courseCoverRef} onChange={handleCoverEdit} id="course-cover" type="file" style={{display: "none"}}></input> 
              </div>

            </div>
          </form>
          <div className="course-edit__modules-wrapper">
            <p style={{margin: "0 0 25px 0"}}>Модули</p>
            <ul className="course-edit__modules-ul">
              {foundCourse.modules.map((module) => {
                return <motion.li whileHover={{ border: "2px solid rgb(93, 176, 199)"}} className="course-edit__modules-ul-li" key={module._id}>
                  <button className="course-edit__modules-ul-li-edit" onClick={() => {
                    setIsEditModule(true);
                    setSelectedModuleId(module._id);
                  }} type="button">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button type="button" className="course-edit__modules-ul-li-delete" onClick={(evt) => {
                    evt.stopPropagation();

                    apiDeleteModule(foundCourse._id, module._id, token)
                    .then((data) => {
                      setCoursesData((prevValue) => {
                        const updatedCourses = prevValue.courses.map((course) => {
                          return course._id === data._id ? {...course, modules: data.modules} : course;
                        });
                        return {...prevValue, courses: updatedCourses};
                      });

                    });
                  }} style={{position: "absolute", border: "none", backgroundColor: "transparent", color: "white", fontSize: 18}}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <h3 className="course-edit__modules-ul-li-headline">{module.title}</h3>
                  
                  <img className="course-edit__modules-ul-li-img" src={module.cover} alt="обложка модуля"></img>
                  
                  <p className="course-edit__modules-ul-li-p">{module.lessons.length > 0 ? `Уроки ${module.lessons.length}` : `Уроков пока нет`}</p>
                </motion.li>
              })}
              <motion.li whileHover={{ border: "2px solid rgb(93, 176, 199)"}} className="course-edit__modules-ul-li" key="new-module">
                <h3 className="course-edit__modules-ul-li-headline">Добавить модуль</h3>
                <button onClick={() => {
                  setAddModulePopupOpened(true);
                }} type="button" className="course-edit__modules-ul-li-addButton">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </motion.li>
            </ul>
          </div>
          <div className="course-edit__students-wrapper">
            <p>Ученики</p>
            <div className="course-edit__students-wrapper-group course-edit__students-wrapper-group_allStudents">

              <p>Кого можно добавить</p>

              <ul className="course-edit__students-wrapper-ul">
                {coursesData.allStudents.filter((student) => {
                  return !foundCourse.students.find((courseStudent) => {
                    return courseStudent.email === student.email;
                  });
                }).map((courseStudent) => {
                  return <motion.li whileHover={{border: "2px solid #5DB0C7"}} className="course-edit__students-wrapper-ul-li" key={courseStudent._id}>
                    <button onClick={() => {
                      studentsToAddToCourse.find((studentToAdd) => {
                        return studentToAdd.studentId === courseStudent._id;
                      }) ? setStudentsToAddToCourse((prevValue) => {
                        return prevValue.filter((prevStudentToAdd) => {
                          return prevStudentToAdd.studentId !== courseStudent._id;
                        })
                      }) :
                      setStudentsToAddToCourse((prevValue) => {
                        return [...prevValue, {studentId: courseStudent._id, grade: "Rising Star"}];
                      })
                    }} className="course-edit__students-wrapper-ul-li-btn">
                      <p style={{margin: "0 0 20px 0"}}>{courseStudent.email}</p>
                      <div className="add-user__form-select-wrapper">
                      <label>Тариф</label>  
                      <select className="add-user__form-select" defaultValue="Rising Star" onClick={(evt) => {
                        evt.stopPropagation();

                        return;
                      }} onChange={(evt) => {
                       
                        setStudentsToAddToCourse((prevValue) => {
                          return prevValue.map((prevStudent) => {
                            return prevStudent.studentId === courseStudent._id ? {...prevStudent, grade: evt.target.value} : prevStudent;
                          })
                        })
                      }}>
                        <option className="add-user__form-select-option" value="Rising Star">Rising Star</option>
                        <option className="add-user__form-select-option" value="Headliner">Headliner</option>
                        <option className="add-user__form-select-option" value="Legend">Legend</option>
                      </select>
                      </div>
                    </button>
                    {studentsToAddToCourse.find((studentToAdd) => {
                        return studentToAdd.studentId === courseStudent._id;
                      }) && <div className="course-edit__students-wrapper-ul-li-selection-div">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>}
                  </motion.li>
                })}
              </ul>

              <button onClick={() => {
                
                apiAddStudentsToCourse(foundCourse._id, token, studentsToAddToCourse)
                .then((data) => {
                  console.log(data);
                  setCoursesData((prevData) => {
                    const updatedCourses = prevData.courses.map((course) => {
                      return course._id === data.course._id ? {...course, students: data.course.students} : course;
                    });
                    return {...prevData, courses: updatedCourses, allStudents: data.users};
                  })
                });
              }} className="course-edit__students-wrapper-btn" type="button">Добавить учеников</button>

            </div>
            <div className="course-edit__students-wrapper-group course-edit__students-wrapper-group_courseStudents">
              <p>Кто уже добавлен</p>
              <ul className="course-edit__students-wrapper-ul">
                {foundCourse.students.map((courseStudent) => {
                  return <li whileHover={{border: "2px solid #5DB0C7"}} className="course-edit__students-wrapper-ul-li" key={courseStudent._id}>
                    <p className="course-edit__students-wrapper-ul-li-p">{courseStudent.email}</p>
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>

      </EditCourse>} */}

      {/* {addModulePopupOpened && <AddModulePopup>
        <div className="course__edit-addModule-wrapper" style={{position: "relative"}}>
          <button onClick={() => {
              setAddModulePopupOpened(false);
              }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
              <FontAwesomeIcon icon={faXmark} />
          </button>
            <h3>Добавить модуль</h3>
            <form onSubmit={(evt) => {
              evt.preventDefault();
              const form = new FormData();
              const foundImg = selectedFiles.find((file) => {
                return file.clientPath === addMoudleImg.current.src;
              });
              form.append("moduleData", JSON.stringify({title: addModuleNameRef.current.value, lessons: [], cover: foundImg ? foundImg : addMoudleImg.current.src}));
              form.append('moduleCover', foundImg);
              axiosClient.put(`/courses/${foundCourse._id}`, form, {
                headers: {
                  'Authorization': token
                },
                onUploadProgress: (evt) => {
                  console.log(evt.loaded);
                }
              })
              .then((data) => {
                console.log(data);
              })
            }} className="course__edit-addModule-wrapper-form">
              <div className="course__edit-addModule-wrapper-form-data">
                <div className="course__edit-addModule-wrapper-form-data-inputs">
                  <input ref={addModuleNameRef} className="course__edit-addModule-wrapper-form-input" type="text" placeholder="Название модуля"></input>
                  <input onChange={(evt) => {
                    addMoudleImg.current.src = evt.target.value;
                  }} className="course__edit-addModule-wrapper-form-input" type="text" placeholder="Ссылка на картинку"></input>
                </div>
                <div style={{position: "relative", display: "flex", alignItems: "flex-end"}}>
                  <img alt="обложка модуля" ref={addMoudleImg} style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={"https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}/>
                  <input ref={addModuleImgInput} onChange={(evt) => {
                    handleModuleCoverUpload(evt);

                  }}  style={{display: "none"}} type="file"></input>
                  <button type="button" onClick={(() => {
                    addModuleImgInput.current.click();
                  })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                </div>
              </div>

              <button type="submit" className="course__edit-addModule-wrapper-form-btn">Добавить модуль</button>
            </form>
        </div>
        
      </AddModulePopup>} */}

      {/* {addLessonPopupOpened && <AddLessonPopup>
        <div className="module-edit__addLesson-wrapper" style={{position: "relative"}}>
          <button onClick={() => {
              setAddLessonPopupOpened(false);
              
              }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
              <FontAwesomeIcon icon={faXmark} />
          </button>
          <h3>Добавить урок</h3>
          {!uploadFormSubmitted ? <form onSubmit={(evt) => {
            evt.preventDefault();
            setUploadFormSubmitted(true);

              const form = new FormData();
              
              form.append("moduleData", JSON.stringify(lessonContent));
             
              selectedFiles.forEach((file) => {
                form.append("files", file);
              });

              axiosClient.put(`/courses/${foundCourse._id}/modules/${foundModule._id}`, form, {
                headers: {
                  'Authorization': token,
                },
                onUploadProgress: (evt) => {
                  setLessonUploadProgress(evt.progress);
                }
              })
              .then((data) => {
                
                setUploadSuccessful(true);
                setLessonContent({title: "", cover: "", content: {"type": "doc", "content": [
                  // …
                ]}});
                setSelectedFiles([]);
                setCoursesData((prevValue) => {
                  return {...prevValue, courses: prevValue.courses.map((course) => {
                    console.log(course._id, data);
                    return course._id === data.data._id ? {...course, modules: data.data.modules} : course;
                  })};
                });
                
              })
          }} className="course__edit-addLesson-wrapper-form">
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 0 25px 0"}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between", gap: 15, width: "100%", maxWidth: 320}}>
                <input className="course__edit-addLesson-wrapper-form-input" onChange={(evt) => {
                  setLessonContent((prevValue) => {
                    return {...prevValue, title: evt.target.value};
                  })
                }} type="text" placeholder="Название урока"></input>
                <input className="course__edit-addLesson-wrapper-form-input" type="text" placeholder="Ссылка на картинку"></input>
              </div>
              <div style={{position: "relative", display: "flex", alignItems: "flex-end"}}>
                <img ref={addLessonImgRef} alt="обложка урока" style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={"https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}/>
                <input ref={addLessonImgInput} onChange={(evt) => {
                  handleLessonCoverUpload(evt);

                }} style={{display: "none"}} type="file"></input>
                <button type="button" onClick={(() => {
                  addLessonImgInput.current.click();
                })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>
            </div>

            <TipTapEditor selectedFiles={selectedFiles} lessonContent={lessonContent} setLessonContent={setLessonContent} setSelectedFiles={setSelectedFiles}>
            </TipTapEditor>
            <button type="submit" className="course__edit-addLesson-wrapper-form-btn">Добавить урок</button>
          </form>
          :
          <div style={{margin: "auto 0"}}>
            <p style={{color: "white"}}>Загрузка контента урока</p>
            <div style={{backgroundColor: "white", display: "flex", height: 4, borderRadius:9, alignItems: "stretch", justifyContent: "flex-start"}}>
              <div style={{backgroundColor: "rgb(93, 176, 199)", borderRadius: 9, width: `${lessonUploadProgress * 100}%`}}></div>
            </div>
            {uploadSuccessful && <button style={{
              width: 210,
              height: 40,
              backgroundColor: "transparent",
              border: "2px solid rgb(93, 176, 199)",
              borderRadius: 9,
              color: "white",
              margin: "20px 0 0 0",
            }} type="button" onClick={() => {
                setUploadFormSubmitted(false);

                setAddLessonPopupOpened(false);
                setLessonUploadProgress(0);
            }}>Вернуться к урокам модуля</button>}
          </div>
          }

        </div>
      </AddLessonPopup>} */}
      
      {/* {isEditModule && <EditModule>
        <div className="module-edit__wrapper">
          <button className="module-edit__close-btn" onClick={() => {
            setIsEditModule(false);
            }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h3 className="module-edit__headline">Редактировать модуль</h3>
          <form className="module-edit__form">
            <div className="module-edit__form-inputs-wrapper">
              <div className="module-edit__form-inputs-wrapper-title">
                <p className="module-edit__form-inputs-wrapper-title-p">Название</p>
                <input ref={editModuleNameRef} className="module-edit__form-inputs-wrapper-title-input" type="text" placeholder="Название модуля" value={foundModule.title}></input>

              </div>
              <div className="module-edit__form-inputs-wrapper-cover">
                <div className="module-edit__form-inputs-wrapper-cover-link">
                  <p className="module-edit__form-inputs-wrapper-cover-link-p">Обложка</p>
                  <input className="module-edit__form-inputs-wrapper-title-input" onChange={(evt) => {
                      const form = new FormData();
                      form.append("coverFile", JSON.stringify({link: evt.target.value}));

                  }} style={{maxWidth: 360}} type="text" placeholder="Ссылка на картинку">
                  </input>
                </div>
                <div style={{position: "relative", display: "flex", alignItems: "flex-end"}}>
                  <img alt="обложка модуля" ref={editModuleImgRef} style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={foundModule.cover ? foundModule.cover : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}/>
                  <input ref={editModuleImgInput} onChange={(evt) => {
                    const coverToSend = handleModuleEditCoverUpload(evt);
                    const form = new FormData();
                    form.append("coverFile", JSON.stringify({title: coverToSend.title, clientPath: coverToSend.clientPath}));
                    form.append('file', coverToSend);


                  }} style={{display: "none"}} type="file"></input>
                  <button type="button" onClick={(() => {
                    editModuleImgInput.current.click();
                  })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                </div>
              </div>

            </div>
          </form>
          <div>
            <p>Уроки</p>
            <ul className="module-edit__lessons-ul">
              {foundModule.lessons.map((lesson) => {
                return <motion.li whileHover={{border: "2px solid #ffffff"}} className="module-edit__lessons-ul-li" key={lesson._id}>
                  <img className="module-edit__lessons-ul-li-img" src={lesson.cover} alt="обложка урока"></img>
                  <h3 className="module-edit__lessons-ul-li-headline">{lesson.title}</h3>
                  <div className="module-edit__lessons-ul-li-buttons">
                    <button onClick={() => {
                      apiDeleteLesson(foundCourse._id, foundModule._id, lesson._id, token)
                      .then((data) => {
                        setCoursesData((prevValue) => {
                          return {...prevValue, courses: prevValue.courses.map((course) => {
                            return course._id === data._id ? {...course, modules: data.modules} : course;
                          })};
                        });
                      })
                    }} className="module-edit__lessons-ul-li-buttons-btn">
                      <motion.svg whileHover={{fill: "#ffffff"}} fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></motion.svg>
                    </button>
                    <button onClick={() => {
                     
                      setSelectedLessonId(lesson._id);
                      setIsEditLesson(true);
                    }} className="module-edit__lessons-ul-li-buttons-btn">
                      <motion.svg whileHover={{fill: "#ffffff"}}  fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></motion.svg>
                    </button>
                  </div>
                </motion.li>
                // <motion.li></motion.li>
              })}
              <motion.li className="module-edit__lessons-ul-li" key="new-lesson" style={{justifyContent: "center"}}>
                <button onClick={() => {
                  setAddLessonPopupOpened(true);
                }} type="button" className="module-edit__lessons-ul-li-addButton">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </motion.li>
            </ul>
          </div>

        </div>

      </EditModule>} */}

      {/* {isEditLesson && <EditLesson>
        <div className="lesson-edit__wrapper">
          <button className="lesson-edit__close-btn" onClick={() => {
            setIsEditLesson(false);
            }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h3 className="lesson-edit__headline">Редактировать урок</h3>
          <form className="lesson-edit__form">
            <div className="lesson-edit__form-inputs-wrapper-title">
              <p className="lesson-edit__form-inputs-wrapper-title-p">Название</p>
              <input ref={lessonNameRef} value={foundLesson.title} className="lesson-edit__form-inputs-wrapper-title-input" type="text" placeholder="Название урока"></input>
            </div>
            <div className="lesson-edit__form-inputs-wrapper-cover">
              <div className="lesson-edit__form-inputs-wrapper-cover-link">
                <p className="lesson-edit__form-inputs-wrapper-cover-link-p">Обложка</p>
                <input className="lesson-edit__form-inputs-wrapper-title-input" onChange={(evt) => {
                      const form = new FormData();
                      form.append("coverFile", JSON.stringify({link: evt.target.value}));

                      apiEditLessonCover(foundCourse._id, foundModule._id, foundLesson._id, token, form)
                      .then((data) => {
                        setCoursesData((prevValue) => {
                          return {...prevValue, courses: prevValue.courses.map((course) => {
                            return course._id === data._id ? {...course, modules: data.modules} : course;
                          })};
                        })
                      });
                  }} style={{maxWidth: 360}} type="text" placeholder="Ссылка на картинку">
                </input>
              </div>
              <div style={{position: "relative", display: "flex", alignItems: "flex-end"}}>
                <img alt="обложка урока" ref={editLessonImgRef} style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={foundLesson.cover ? foundLesson.cover : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}/>
                <input ref={editLessonImgInput} onChange={(evt) => {
                  const coverToSend = handleLessonEditCoverUpload(evt);
                 
                  const form = new FormData();
                  form.append("coverFile", JSON.stringify({title: coverToSend.title, clientPath: coverToSend.clientPath}));
                  form.append('file', coverToSend);
                  apiEditLessonCover(foundCourse._id, foundModule._id, foundLesson._id, token, form)
                  .then((data) => {
                    setCoursesData((prevValue) => {
                      return {...prevValue, courses: prevValue.courses.map((course) => {
                        return course._id === data._id ? {...course, modules: data.modules} : course;
                      })};
                    })
                  });
                }} style={{display: "none"}} type="file"></input>
                <button type="button" onClick={(() => {
                  editLessonImgInput.current.click();
                })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>
            </div>
            
          </form>
        </div>  
      </EditLesson>} */}

      {/* {addUserOpened && <AddUser coursesData={coursesData} setCoursesData={setCoursesData} setAddUserOpened={setAddUserOpened} setSuccessfullyAddedUser={setSuccessfullyAddedUser} successfullyAddedUser={successfullyAddedUser}></AddUser>} */}
    </>

  )
}
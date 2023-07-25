import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPen, faXmark, faLock, faAnglesDown, faCamera } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/userContext";
import Menu from "./Menu";
import Dashboard from "./Dashboard";
import CourseModulesPopup from "./CourseModulesPopup";
import ModulesList from "./ModulesList";
import PopupWithForm from "./PopupWithForm";
// import AddCourse from "./AddCourse";
import './Courses.css';
import {  
  apiGetCourses,
  apiGetAllStudents,
  addStudentsToCourse
} from '../api';
import EditCourse from "./EditCourse";
import Student from "./Student"

export default function Courses({ socket, setCourseInEdit, logout, registerFormSubmit }) {
  //contexts
  const loggedInUser = React.useContext(UserContext);

  //token
  const token = localStorage.getItem('token');

  //state variables
  const [coursesData, setCoursesData] = React.useState({
    courses: [],
    allStudents: [],
  });
  const [selectedCourseTitle, setSelectedCourseTitle] = React.useState("");
  const [modulesPopupOpened, setModulesPopupOpened] = React.useState(false);
  const [isEditCourse, setIsEditCourse] = React.useState(false);
  const [courseCover, setCourseCover] = React.useState("");
  // const [courseIndex, setCourseIndex] = React.useState(0);
  const [selectedModule, setSelectedModule] = React.useState({});
  const [addStudentOpened, setAddStudentOpened] = React.useState(false);
  const [popupOpened, setPopupOpened] = React.useState(false);
  const [studentsToAddToCourse, setStudentsToAddToCourse] = React.useState(new Set([]));

  //derived states
  let foundCourse = coursesData.courses.find((course) => {
    return course.name === selectedCourseTitle;
  }) ? coursesData.courses.find((course) => {
    return course.name === selectedCourseTitle;
  }) : {name: "", description: "", author: "", modules: [], cover: ""};

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
  };
  //#f1926a(peach color)
  const liGradient = {
    rest: {
      translate: "0 -100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    },
    hover: {
      translate: "0 0%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    }
  };

  const liBackground = {
    rest: {
      // backgroundColor: "rgb(54, 58, 59)",
      // boxShadow: "rgba(0, 0, 0, 0.75) 5px 5px 10px",
      // backgroundColor: "rgb(54, 58, 59)",
      // boxShadow: "0 0 0px #c4d8f7",
      backgroundColor: "#0D0D0D",
      scale: 1
    },
    hover: {
      // backgroundColor: "#c4d8f7",
      // backgroundColor: "rgb(211, 124, 82)",
      // boxShadow: "7px 7px 5px #c4d8f7",
      backgroundColor: "rgb(93, 176, 199)",
      scale: 1.005
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

  //animations
  const pulseButton = {
    // boxShadow: ["0 0 0px rgb(255 255 255 / 70%)", "0 0 7.5px rgb(255 255 255 / 35%)", "0 0 0px rgb(255 255 255 / 0%)"],
    // scale: [0.95, 1.2, 0.95],
  }

  //refs
  const buttonsRef = React.useRef();
  const ulRef = React.useRef();
  const courseNameRef = React.useRef();
  const courseDescRef = React.useRef();
  const courseCoverRef = React.useRef();
  const studentEmailRef = React.useRef();
  const studentNameRef = React.useRef();
  const studentPasswordRef = React.useRef();

  //functions

  function showCoursePopup(courseTitle, index) {
    // console.log(course);
    setSelectedCourseTitle(courseTitle);
    // setCourseIndex(index);

    // setModulesPopupOpened(true);

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
      const coursesFromApi = apiGetCourses(userToken)
      // .then((data) => {
      //   // console.log(data);
      //   if(!data) {
      //     return;
      //   }
      //   return setCourses(data);
      // });

      const allStudentsFromApi = apiGetAllStudents(userToken)
      // .then((data) => {
      //   console.log(data);
      // })
      Promise.all([coursesFromApi, allStudentsFromApi])
      .then(([coursesReceived, studentsReceived]) => {
        setCoursesData({courses: coursesReceived, allStudents: studentsReceived});
      })
    }
  }, []);

  // React.useEffect(() => {
  //   function showOnlineUsers (data) {
  //     console.log(data.filter((user) => {
  //       return user.admin !== true;
  //     }));
  //   }
  //   socket.on('online users', showOnlineUsers);

  //   return () => {
  //     socket.off('online users', showOnlineUsers);
  //   }
  // }, []);

  React.useEffect(() => {
    console.log(foundCourse);
  }, [selectedCourseTitle]);

  return (
    <>
      <section className="main__courses">
        <Dashboard />
        {/* <Menu user={loggedInUser} logout={logout} setPopupOpened={setPopupOpened}/> */}
        {/* <div style={{color: "white"}}> */}
          
          {/* <p style={{margin: 0}}>Например, стать профессионалом в одном из следующих направлений или во всех сразу. Да- все, везде и сразу</p> */}
        {/* </div> */}
        <div style={{display: "flex", alignItems: "stretch", justifyContent: "space-between", width: "100%"}}>
          <h2 className="main__courses-headline" style={{textAlign: "left", fontWeight: 400, color: "#747374", margin: 0}}>Изучай музыку и становись профессионалом вместе с экспертами <span style={{color: "rgb(93, 176, 199)"}}>Sova Studio</span><span style={{color: "rgb(93, 176, 199)"}}>.</span></h2>
          {/* <div style={{width: 270, backgroundColor: "#5DB0C7", color: "white", boxSizing: "border-box", borderRadius: 5, fontSize: 18, margin: "0 0 50px 0"}}>
            
          </div> */}
          {/* <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}> */}
            {/* <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 390}}>
              <button style={{padding: 0, width: 75, height: 75, border: "none", backgroundColor: "rgb(93, 176, 199)", boxSizing: "border-box", fontSize: 20, color: "white"}}>
                <FontAwesomeIcon icon={faAnglesDown} />
              </button>
              <p style={{margin: 0, color: "white", backgroundColor: "rgb(93, 176, 199)", borderRadius: 2}}>выбрать из списка снизу</p>
            </div> */}
          {/* </div> */}
          
        </div>
        <ul ref={ulRef} className="main__courses-list">
          {coursesData && coursesData.courses.map((course, index) => {
            return <motion.li initial="rest" whileHover="hover" animate="rest" /*variants={liBackground}*/ className="main__courses-list-element" key={course._id} style={{/*flex: "1 1 300px",*/overflow:"hidden", width: "100%", boxShadow: "rgba(0, 0, 0, 0.75) 5px 5px 10px", position: "relative", borderRadius: 5, border: "2px solid #34343C", boxSizing: "border-box"}}>
              <motion.div variants={liGradient} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: "linear-gradient(180deg, rgb(93, 176, 199) 5%, transparent 75%)"}}></motion.div>
              <button onClick={() => {
                showCoursePopup(course.name, index);
              }} style={{position: "relative", width: "100%", height: "100%", backgroundColor: "transparent", borderRadius: 5, border: "none", boxSizing: "border-box", padding: "20px 35px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignContent: "flex-start"}}>
                
                <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", minWidth: 35, fontSize: 28, color: "white"}}>
                  <p style={{margin: 0}}>0{index + 1}</p>
                  <motion.div variants={dotColor} style={{backgroundColor: "#5DB0C7", width: 5, height: 5, borderRadius: "51%", margin: "0 0 6px 0"}}></motion.div>
                </div>
                  {/* <img style={{width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: 12, order: 3}} alt={course.title} src={course.cover}></img> */}
                <motion.div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "space-between", textAlign: "left", order: 2, width: "100%"}}>
                  <h3 style={{margin: 0, letterSpacing: 2, width: "100%", height: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "white", fontSize: 24}}>{course.name}</h3>
                  <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", margin: "10px 0 0 0"}}>
                    <motion.p variants={authorColor} style={{margin: 0, color: "#404040", color: "#404040", fontSize: 20}}>{course.author.name}</motion.p>
                    <button style={{backgroundColor: "transparent", border: "none", padding: 0, width: 25, height: 25}}>
                      <FontAwesomeIcon style={{color: "#404040", width: "100%", height: "100%" }} icon={faLock} />
                    </button>
                  </div>

                </motion.div>
                {/* <motion.div variants={liContent} style={{height: "100%", color: "white", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}> */}

                  {/* <motion.div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: "column", width: "100%", minHeight: 60, margin: "0 0 20px 0"}} variants={liContentIndex}>
                    <div style={{width: 35, height: 3, backgroundColor: "rgb(93, 176, 199)", order: 2, margin: "0 0 0 3px"}}></div>
                    <p style={{margin: 0, fontSize: 36, fontWeight: 500, fontFamily: "Manrope, sans-serif", order: 1, letterSpacing: 2}}>0{index + 1}</p>
                  </motion.div> */}

                {/* </motion.div> */}
              </button>
              
              {loggedInUser._id && loggedInUser.admin &&
                <motion.button variants={liContent} onClick={() => {
                  setSelectedCourseTitle(course.name);
                  setIsEditCourse(true);
                }} style={{position: "absolute", top: "6.5%", right: 35, display: 'flex', justifyContent: "center", alignItems: "center", width: 27, height: 27, borderRadius: "51%", backgroundColor: "transparent", border: "2px solid #5DB0C7", color: "#5DB0C7", fontSize: 10, zIndex: 6}}>
                  <FontAwesomeIcon icon={faPen}/>
                </motion.button>
              }
             
            
            </motion.li>
          })}
        </ul>
      </section>

      <CourseModulesPopup modulesPopupOpened={modulesPopupOpened}>
        <div className="popup__modules">
          {/* <img style={{width: "50%", height: "100%", objectFit: "cover", borderRadius: 12}} alt={selectedCourse.cover} src={selectedCourse.cover}></img>
          <div style={{width: "50%", boxSizing: "border-box", padding: "0 45px", position: "relative"}}>
            <h3 style={{margin: "0 0 30px 0"}} className="popup__modules-headline">{selectedCourse.name}</h3>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <button onClick={() => {
                setSelectedModule(() => {
                  return {};
                });
              }} style={{lineHeight: 1.5, backgroundColor: "transparent", border: "none", fontSize: 18, color: selectedModule._id ? "rgb(211, 124, 82)" : "rgb(255, 255, 255)", fontWeight: 700, padding: 0}}>Темы курса</button>
              {selectedModule._id && <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 90}}>
                <FontAwesomeIcon icon={faArrowRight} style={{color: "white", fontSize: 18}}/>
                <span style={{color: "white", fontSize: 18}}>Модуль</span>
              </div>}
              
              <div style={{width: "65%", height: 2, backgroundColor: "rgb(211, 124, 82)"}}></div>
            </div>
            
            <button className="popup__close popup__close_modules" onClick={closeCoursePopup}>X</button>
            {!selectedModule._id ? <ul className="popup__modules-list">
              {selectedCourse._id && selectedCourse.modules.map((module, index) => {
                return <motion.li onClick={() => {
                  setSelectedModule({...module, course: selectedCourse._id});
                }} className="popup__modules-list-element" whileHover="hover" initial="rest" variants={liMotion} key={module._id}>
                  
          
                  <span>{`0${index + 1} ${module.title}`}</span>
                </motion.li>
              })}
            </ul> : <ModulesList selectedModule={selectedModule} selectedCourse={selectedCourse}/>}
            <p>{selectedCourse.description}</p>
          </div> */}

        </div>
        <div className="popup__overlay"></div>
      </CourseModulesPopup>

      {isEditCourse && <EditCourse>
        <div style={{position: "relative", width: "100%", maxWidth: 920}}>
          <button onClick={() => {
            setIsEditCourse(false);
            // setSelectedCourse({});
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
                              
                })} style={{position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", fontSize: 20, bottom: 0, right: 0, opacity: 0, width: "100%", height: "100%", padding: 0, border: "none", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <p>Изменить обложку</p>
                  
                </motion.button>
                <input ref={courseCoverRef} onChange={handleCoverEdit} id="course-cover" type="file" style={{display: "none"}}></input> 
              </div>

            </div>
          </form>

          <ul>
            {foundCourse.modules.map((module) => {
              return <li key={module._id}>
                <h3>{module.title}</h3>
                <img src={module.cover} alt="обложка модуля"></img>
              </li>
            })}
          </ul>


         
          {/* <form onSubmit={(evt) => {
            evt.preventDefault();
            addStudentsToCourse(token, {courseId: selectedCourse._id, students: Array.from(studentsToAddToCourse)})
            .then((data) => {
              const {updatedCourse} = data;
              setCoursesData((prevValue) => {
                const { courses } = prevValue;
                const updatedCourses = courses.map((course) => {
                  return course._id === updatedCourse._id ? {...course, students: updatedCourse.students} : course;
                });
                return {...prevValue, courses: updatedCourses}
              });
              setSelectedCourse((prevValue) => {
                return {...prevValue, students: updatedCourse.students};
              });
            })
          }}>
            <h3>Добавить ученика к курсу</h3>
            <ul style={{margin: 0, maxWidth: 480, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", boxSizing: "border-box", padding: 0, listStyle: "none", textAlign: "left", lineHeight: 1.5, gap: 20}}>
              {coursesData.allStudents.filter((student) => {
                return !selectedCourse.students.find((courseStudent) => {
                  return courseStudent._id === student._id; 
              });
              }).map((student, index) => {
                return <Student key={student._id} student={student} setStudentsToAddToCourse={setStudentsToAddToCourse}/>
              })}
            </ul>
            <motion.button whileHover={{backgroundColor: "rgb(93, 176, 199)"}} type="submit" style={{margin: "25px 0 0 0", height: 40, boxSizing: "border-box", padding: 10, border: "2px solid rgb(93, 176, 199)", borderRadius: 9, backgroundColor: "rgba(211, 124, 82, 0)", color: "rgb(255, 255, 255)", fontWeight: 700}}>Добавить учеников к курсу</motion.button>
          </form> */}
        </div>
      </EditCourse>}

      <PopupWithForm popupOpened={popupOpened}>
        <div>
          <h3>Добавить ученика к платформе</h3>
          <form onSubmit={(evt) => {
            evt.preventDefault();
            const studentData={
              email: studentEmailRef.current.value,
              fullname: studentNameRef.current.value,
              password: studentPasswordRef.current.value,
            };
            // console.log(studentData);
            registerFormSubmit(studentData)
          }}>
            <button type="button" className="popup__close">закрыть</button>
            <input ref={studentEmailRef} type="email"></input>
            <input ref={studentNameRef} type="text"></input>
            <input ref={studentPasswordRef} type="password"></input>
            <button type="submit">Отправить</button>
          </form>
        </div>
      </PopupWithForm>
    </>

  )
}
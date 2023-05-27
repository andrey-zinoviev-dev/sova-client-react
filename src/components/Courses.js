import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPen, faXmark} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/userContext";
import Menu from "./Menu";
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
import Student from "./Student";

export default function Courses({ setCourseInEdit, logout, registerFormSubmit }) {
  //contexts
  const loggedInUser = React.useContext(UserContext);

  //token
  const token = localStorage.getItem('token');

  //state variables
  const [coursesData, setCoursesData] = React.useState({
    courses: [],
    allStudents: [],
  });
  const [selectedCourse, setSelectedCourse] = React.useState({});
  const [modulesPopupOpened, setModulesPopupOpened] = React.useState(false);
  const [isEditCourse, setIsEditCourse] = React.useState(false);
  const [courseCover, setCourseCover] = React.useState("");
  const [courseIndex, setCourseIndex] = React.useState(0);
  const [selectedModule, setSelectedModule] = React.useState({});
  const [addStudentOpened, setAddStudentOpened] = React.useState(false);
  const [popupOpened, setPopupOpened] = React.useState(false);
  const [studentsToAddToCourse, setStudentsToAddToCourse] = React.useState(new Set([]));

  //derived states
  let courseSelectTest = {};

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
  const liBackground = {
    rest: {
      // backgroundColor: "rgb(54, 58, 59)",
      boxShadow: "rgba(0, 0, 0, 0.75) 5px 5px 10px",
      backgroundColor: "rgb(54, 58, 59)",
      // boxShadow: "0 0 0px #c4d8f7",
      scale: 1
    },
    hover: {
      // backgroundColor: "#c4d8f7",
      backgroundColor: "rgb(211, 124, 82)",
      // boxShadow: "7px 7px 5px #c4d8f7",
      scale: 1.005
    }
  };

  const liContent = {
    rest: {
      color: "rgba(255, 255, 255, 1)"
    },
    hover: {
      color: "rgba(0, 0, 0, 1)"
    }
  }

  const liContentIndex = {
    rest: {
      color: "rgba(255, 255, 255, 0.75)"
    },
    hover: {
      color: "rgba(0, 0, 0, 1)"
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

  function showCoursePopup(course, index) {
    // console.log(course);
    setSelectedCourse(course);
    setCourseIndex(index);
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
        // console.log(studentsReceived);
        setCoursesData({courses: coursesReceived, allStudents: studentsReceived});
      })
    }
  }, []);

  React.useEffect(() => {
    console.log(coursesData);
  }, [coursesData]);

  return (
    <>
      {/* <Dashboard /> */}
      <section className="main__courses">
        <Menu user={loggedInUser} logout={logout} setPopupOpened={setPopupOpened}/>
        <div style={{color: "white", margin: "50px 0"}}>
          <h2 style={{margin: "0 0 25px 0"}}>Чем можно позаниматься</h2>
          <p style={{margin: 0}}>Например, стать профессионалом в одном из следующих направлений или во всех сразу. Да- все, везде и сразу</p>
        </div>

        <ul ref={ulRef} className="main__courses-list">
          {coursesData && coursesData.courses.map((course, index) => {
            return <motion.li initial="rest" whileHover="hover" animate="rest" variants={liBackground}  className="main__courses-list-element" key={course._id} style={{/*flex: "1 1 300px",*/overflow:"hidden", width: "100%", height: 380, maxWidth: 250, backgroundColor: "#393d3e", boxShadow: "rgba(0, 0, 0, 0.75) 5px 5px 10px", position: "relative", borderRadius: 12}}>
              <button onClick={() => {
                showCoursePopup(course, index);
              }} style={{position: "relative", height: "100%", backgroundColor: "transparent", borderRadius: 12, border: "none", boxSizing: "border-box", padding: "20px 35px"}}>
                <motion.div variants={liContent} style={{height: "100%", color: "white", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>
                  <motion.div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: "column", width: "100%", minHeight: 60, margin: "0 0 20px 0"}} variants={liContentIndex}>
                    <div style={{width: 35, height: 3, backgroundColor: "rgb(211, 124, 82)", order: 2, margin: "0 0 0 3px"}}></div>
                    <p style={{margin: 0, fontSize: 36, fontWeight: 500, fontFamily: "Manrope, sans-serif", order: 1, letterSpacing: 2}}>0{index + 1}</p>
                  </motion.div>
                  <img style={{width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: 12, order: 3}} alt={course.title} src={course.cover}></img>
                  <motion.div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "space-between", margin: "0 0 20px 0", textAlign: "left", order: 2, width: "100%", height: 25}}>
                    <h3 style={{margin: 0, width: "100%", height: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{course.name}</h3>
                  </motion.div>
                </motion.div>
              </button>
              {loggedInUser._id && loggedInUser.admin && <button onClick={() => {
                setIsEditCourse(true);
                setSelectedCourse(course);
              }} style={{position: "absolute", top: "5%", right: "5%", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: "51%", backgroundColor: "transparent", border: "2px solid rgb(255, 255, 255)", color: "rgb(255, 255, 255)", fontSize: 12, zIndex: 6}}>
                <FontAwesomeIcon icon={faPen}/>
              </button>}
             
            
            </motion.li>
          })}
        </ul>
      </section>

      <CourseModulesPopup modulesPopupOpened={modulesPopupOpened}>
        <div className="popup__modules">
          {/* <div className="popup__modules-course-div">
            <span className="popup__modules-course-span">{}</span>
          </div> */}
          <img style={{width: "50%", height: "100%", objectFit: "cover", borderRadius: 12}} alt={selectedCourse.cover} src={selectedCourse.cover}></img>
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
                  
                  {/* <Link className="popup__modules-list-element-link" to={`courses/${selectedCourse._id}/modules/${module._id}`}>
                    <span>{`0${index + 1} ${module.name}`}</span>
                  </Link> */}
                  <span>{`0${index + 1} ${module.title}`}</span>
                </motion.li>
              })}
            </ul> : <ModulesList selectedModule={selectedModule} selectedCourse={selectedCourse}/>}
            <p>{selectedCourse.description}</p>
          </div>

        </div>
        <div className="popup__overlay"></div>
      </CourseModulesPopup>

      {isEditCourse && <EditCourse>
        <div style={{textAlign: "left", position: "relative", width: "50%"}}>
          <button onClick={() => {
            setIsEditCourse(false);
            setSelectedCourse({});
            }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 style={{fontSize: 36}}>Редактировать курс</h2>
          <form style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", textAlign: "left", margin: '0 0 30px 0'}}>
            <label style={{display: "block", margin: "0 0 25px 0"}} htmlFor="course-name">Название</label>
            <input ref={courseNameRef} style={{width: "100%", boxSizing: "border-box", borderRadius: 12, padding: "10px 20px", border: "none", fontSize: 16}} id="course-name" value={selectedCourse.name} onChange={() => {}}></input>
          </form>
          <form style={{display: "flex", justifyContent: "space-between", alignItems: "stretch", gap: 50}}>
            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
              <label style={{display: "block", margin: "0 0 25px 0"}} htmlFor="course-desc">Описание</label> 
              <textarea ref={courseDescRef} style={{resize: "none", width: "100%", height: "100%", boxSizing: "border-box", padding: "10px 20px", borderRadius: 12, fontSize: 16}} value={selectedCourse.description} onChange={(evt) => {
                console.log(evt.target.value);
              }}></textarea>
            </div>
            <div style={{textAlign: "left", width: "100%"}}>
              <span style={{display: "block"}}>Текущая обложка курса</span>
              <img style={{objectFit: "cover", width: "100%", aspectRatio: "16/10", boxSizing: "border-box", borderRadius: 9, border: "2px solid white", margin: "30px 0"}} src={courseCover.length > 0 ? courseCover : selectedCourse.cover} alt="Обложка курса"></img>
              <button type="button" style={{display: "block", boxSizing: "border-box", padding: "10px 20px", border: "2px solid white", color: "white", borderRadius: 12, backgroundColor: "transparent", fontSize: 18}}>
                <label style={{cursor: "pointer"}} htmlFor="course-cover">Изменить обложку</label>
              </button>
              <input ref={courseCoverRef} onChange={handleCoverEdit} id="course-cover" type="file" style={{display: "none"}}></input> 
            </div>
          </form>
          <form onSubmit={(evt) => {
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
                return !selectedCourse.students.includes(student._id)
              }).map((student, index) => {
                return <Student key={student._id} student={student} setStudentsToAddToCourse={setStudentsToAddToCourse}/>
              })}
            </ul>
            <motion.button whileHover={{backgroundColor: "rgba(211, 124, 82, 1)"}} type="submit" style={{margin: "25px 0 0 0", height: 40, boxSizing: "border-box", padding: 10, border: "2px solid rgb(211, 124, 82)", borderRadius: 9, backgroundColor: "rgba(211, 124, 82, 0)", color: "rgb(255, 255, 255)", fontWeight: 700}}>Добавить учеников к курсу</motion.button>
          </form>
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
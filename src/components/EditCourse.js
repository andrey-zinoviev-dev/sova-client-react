import React from "react";
import './EditCourse.css';
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { apiGetCourse, apiDeleteModule, apiAddStudentsToCourse } from "../api";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import './EditCourse.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function EditCourse() {
  const cyrillicToTranslit = new CyrillicToTranslit();
  //useParams
  const { courseID } = useParams();
  //token
  const token = localStorage.getItem('token');
  //location
  const navigate = useNavigate();
  // const { state } = location;
  // console.log(state);
  //refs
  const studentsInputRef = React.useRef();
  const courseNameRef = React.useRef();
  const courseDescRef = React.useRef();
  const courseCoverRef = React.useRef();

  //states
  const [courseData, setCourseData] = React.useState({
    name: "",
    description: "",
    students: [],
    modules: [],
    cover: "",
    author: "",
    available: false,
  });
  const [successfulMessage, setSuccessfullMessage] = React.useState(null);
  const [usersFile, setUsersFile] = React.useState({});

  //variants
    const backBtnVariant = {
      hover: {
        border: "2px solid rgb(255, 255, 255)",
        fill: 'rgb(255, 255, 255)',
      },
      rest: {
        border: "2px solid rgb(93, 176, 199)",
        fill: 'rgb(93, 176, 199)',
      }
    }

  const studentsSuccess = {
    rest: {
      opacity: 0,
      // visibility: "hidden",
      // transition: {duration: 0.25, ease: "easeInOut", delay: 0},
    },
    success: {
      opacity: 1,
      // visibility: "visible",
      // transition: {duration: 0.25, ease: "easeInOut", delay: 0},
    }
  };

  // const [courseCover, setCourseCover] = React.useState("");

  // //refs
  // const courseNameRef = React.useRef();
  // const courseDescRef = React.useRef();
  // const courseCoverRef = React.useRef();

  // //functions
  function handleCoverEdit() {
    console.log('yes');
  //   const relativePath = window.URL.createObjectURL(courseCoverRef.current.files[0]);
  //   setCourseCover(relativePath);
  //   // setCourseCover(courseCoverRef.current.files[0]);
  };

  function uploadStudentsFile() {
    const form = new FormData();
    form.append('usersFile', usersFile);

    apiAddStudentsToCourse(courseID, token, form)
    .then((data) => {
      if(!data) {
        return;
      }
      setCourseData((prevValue) => {
        return {...prevValue, students: data.students};
      })
      setSuccessfullMessage('Ученики успешно добавлены!')
    })
  };

  React.useState(() => {
    // console.log(courseID);
    apiGetCourse(courseID, token)
    .then((courseData) => {
      setCourseData(courseData);
    })
    // setCourseData(state);
  }, [])

  // React.useEffect(() => {
  //   console.log(courseData);
  // }, [courseData])

  React.useEffect(() => {
    // console.log(successfulMessage);
    setTimeout(() => {
      setSuccessfullMessage(null);
    }, 3000);
    // console.log(successfulMessage);
  }, [successfulMessage])

  return (
    <section className="course-edit">
      <div className="course-edit__wrapper">
        <div className="course-edit__wrapper-back-div">
          <motion.button onClick={() => {
            navigate(-1);
          }} whileHover="hover" variants={backBtnVariant} initial="rest" className="course-edit__wrapper-back">
            <motion.svg variants={backBtnVariant} fill="rgb(93, 176, 199)" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></motion.svg>
          </motion.button>
          <h3 className="course-edit__headline">Редактировать курс</h3>
        </div>
        <form className="course-edit__form" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", textAlign: "left", margin: '0 0 30px 0'}}>
            <label style={{display: "block", margin: "0 0 10px 0"}} htmlFor="course-name">Название</label>
            <input className="course-edit__form-input" ref={courseNameRef} id="course-name" value={courseData.name} onChange={(evt) => {
              setCourseData((prevValue) => {
                return {...prevValue, name: evt.target.value};
              });
            }}></input>
        </form>
        <form className="course-edit__form" style={{display: "flex", maxWidth: "100%", justifyContent: "space-between", alignItems: "stretch", gap: 50}}>
            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
              <label style={{display: "block", margin: "0 0 20px 0"}} htmlFor="course-desc">Описание</label> 
              <textarea className="course-edit__form-textarea" ref={courseDescRef} value={courseData.description} onChange={(evt) => {
                setCourseData((prevValue) => {
                  return {...prevValue, description: evt.target.value};
                });
              }}></textarea>
            </div>
            <div style={{textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", width: "100%"}}>
              <span style={{display: "block", margin: "0 0 20px 0"}}>Текущая обложка курса</span>
              <div style={{position: "relative", display: "flex"}}>
                <img style={{objectFit: "cover", width: "100%", aspectRatio: "16/10", height: "100%", boxSizing: "border-box", borderRadius: 9, border: "2px solid white"}} src={courseData.cover} alt="Обложка курса"></img>
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
              {courseData._id && courseData.modules.map((module) => {
                return <motion.li whileHover={{ border: "2px solid rgb(93, 176, 199)"}} className="course-edit__modules-ul-li" key={module._id}>
                  <button className="course-edit__modules-ul-li-edit" onClick={() => {
                    navigate(`../editModule/courses/${courseID}/modules/${module._id}`)
                    // setIsEditModule(true);
                    // setSelectedModuleId(module._id);
                  }} type="button">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button type="button" className="course-edit__modules-ul-li-delete" onClick={(evt) => {
                    evt.stopPropagation();
                    // console.log(module);
                    // apiDeleteModule(state._id, module._id, token)
                    // .then((data) => {
                      
                    //   setCourseData((prevValue) => {

                    //     return {...prevValue, modules: data.modules};
                    //   });

                    // });
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
                  navigate(`/addModule/courses/${courseID}`)
                  // setAddModulePopupOpened(true);
                }} type="button" className="course-edit__modules-ul-li-addButton">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </motion.li>
            </ul>
          </div>
          <motion.div className="course-edit__students-wrapper">
            <p>Ученики</p>
            <div className="course-edit__students-wrapper-btn-wrapper">
              <p className="course-edit__students-wrapper-btn-wrapper-p">Сейчас на курсе <span className="course-edit__students-wrapper-btn-wrapper-span">{courseData._id && courseData.students.length}</span> студентов</p>
              <button className="course-edit__students-wrapper-btn-wrapper-btn" onClick={() => {
                !usersFile.name ?  studentsInputRef.current.click() : uploadStudentsFile()
              }}>{!usersFile.name ? 'Добавить учеников к курсу через CSV' : 'Отправить CSV файл'}</button>
              <input ref={studentsInputRef} onChange={(evt => {
                const uploadedCsv = evt.target.files[0];
                // console.log(uploadedCsv);
                if(/[А-Я]/.test(uploadedCsv.name)) {
                  const updatedName = cyrillicToTranslit.transform(uploadedCsv.name, "_");
                  
                  Object.defineProperty(uploadedCsv, 'name', {
                    writable: true,
                    value: updatedName
                  });
                }
                // console.log(uploadedCsv);
                setUsersFile(uploadedCsv);
              })} type="file" style={{display: "none"}} accept=".csv"></input>
            </div>
          </motion.div>
          <motion.div initial="rest" variants={studentsSuccess} animate={successfulMessage && successfulMessage.length > 0 ? "success" : "rest"} className="course-edit__students-wrapper-success">
              {/* <button></button> */}
              <div className="course-edit__students-wrapper-success-div">
                <FontAwesomeIcon className="course-edit__students-wrapper-success-div-tick" icon={faCheck} />
              </div>
              <p className="course-edit__students-wrapper-success-p">{successfulMessage}</p>
          </motion.div>
      </div>
    </section>
  )
};

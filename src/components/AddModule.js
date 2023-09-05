import React from "react";
import './AddModule.css';
import { useParams, useNavigate } from "react-router-dom";
import { apiAddModule } from "../api";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/userContext";
import Lesson from "./Lesson";

export default function AddModule() {
  //navigate
  const navigate = useNavigate();
  //logged in user
  const loggedInUser = React.useContext(UserContext);
  //token
  const token = localStorage.getItem('token');
  //states
  const [moduleFormOpened, setModuleFormOpened] = React.useState(false);
  const [modulesAdded, setModulesAdded] = React.useState([]);
  const [selectedLessonTitle, setSelectedLessonTitle] = React.useState("");
  const [addLessonPressed, setAddLessonPressed] = React.useState(false);
  const [editLessonPressed, setEditLessonPressed] = React.useState(false);
  const [moduleData, setModuleData] = React.useState({title: "", cover: {}, author: {}, lessons: []})
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  //derived state
  const lessonToUpdate = moduleData.lessons.find((lesson) => {
    return lesson.title === selectedLessonTitle;
  });
  //params
  const { courseID } = useParams();
  //refs
  const addModuleSectionRef = React.useRef();
  const fileInputRef = React.useRef();
  const coverImgRef = React.useRef();

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
  };

  const addBtnVariants = {
    rest: {
      border: "2px solid #5DB0C7",
      fill: "#5DB0C7",
    },
    hover: {
      border: "2px solid rgb(255, 255, 255)",
      fill: "rgb(255, 255, 255)"
    }
  };

  React.useEffect(() => {
    addModuleSectionRef.current.scrollTo(0, 0);
  } ,[addLessonPressed, editLessonPressed]);

  // React.useEffect(() => {
  //   setModuleData((prevValue) => {
  //     return {...prevValue, cover: selectedFile};
  //   });
  // } ,[selectedFiles.length]);

  return (
    <section ref={addModuleSectionRef} className="module-add">
      {(!addLessonPressed && !editLessonPressed) && <div className="module-add__wrapper">
        <div className="course-edit__wrapper-back-div">
          <motion.button onClick={() => {
              navigate(-1);
          }} whileHover="hover" variants={backBtnVariant} initial="rest" className="course-edit__wrapper-back">
              <motion.svg variants={backBtnVariant} fill="rgb(93, 176, 199)" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></motion.svg>
          </motion.button>
          <h3 className="module-add__headline">Добавить модуль</h3>
        </div>
        
        <div>
          <form>
            <div className="module-add__form-div">
              <label className="module-add__form-div-label">Название</label>
              <input onChange={(evt) => {
                setModuleData((prevValue) => {
                  return {...prevValue, title: evt.target.value};
                })
              }} value={moduleData.title} className="module-add__form-input" type="text" placeholder="Название модуля"></input>
            </div>
            <div className="module-add__form-div">
              <label className="module-add__form-div-label">Обложка</label>
              <div className="module-add__form-div-cover-div">
                <img ref={coverImgRef} className="module-add__form-div-cover-div-img" alt="обложка модуля" src={moduleData.cover.clientPath ? moduleData.cover.clientPath : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}></img>
                <input onChange={(evt) => {
                  const uploadedFile = evt.target.files[0];
                  uploadedFile.clientPath = window.URL.createObjectURL(uploadedFile);
                  uploadedFile.title = uploadedFile.name;
                  // coverImgRef.current.src = uploadedFile.clientPath;
                  setModuleData((prevValue) => {
                    return {...prevValue, cover: uploadedFile};
                  });
                  setSelectedFiles((prevValue) => {
                    return [...prevValue, uploadedFile];
                  });
                }} style={{display: "none"}} ref={fileInputRef} type="file"></input>
                <button onClick={() => {
                  fileInputRef.current.click();
                }} className="module-add__form-div-cover-div-btn" type="button">
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>
            </div>
          </form>
          <div className="module-add__form-div">
            <label className="module-add__form-div-label">Уроки</label>
            <ul className="module-add__lessons-ul">
              {moduleData.lessons.map((lesson, index, array) => {
                return <li className="module-add__lessons-ul-li" key={lesson.title}>
                  <img className="module-edit__lessons-ul-li-img" src={lesson.cover.clientPath}></img>
                  <h3 className="module-edit__lessons-ul-li-h">{lesson.title}</h3>
                  <div className="module-edit__lessons-ul-li-buttons">
                    <button onClick={() => {
                      // console.log('delete lesson');
                      const upadtedLessonsArray = lesson.delete ? array.map((lessonToUpdate) => {
                        return lessonToUpdate._id === lesson._id ? {...lessonToUpdate, delete: false} : lessonToUpdate
                      }) :
                      array.map((lessonToUpdate) => {
                        return lessonToUpdate._id === lesson._id ? {...lessonToUpdate, delete: true} : lessonToUpdate
                      });
                      // console.log(upadtedLessonsArray);
                      setModuleData((prevValue) => {
                        return {...prevValue, lessons: upadtedLessonsArray};
                      })
                      // // apiDeleteLesson(foundCourse._id, foundModule._id, lesson._id, token)
                      // // .then((data) => {
                      // //   setCoursesData((prevValue) => {
                      // //     return {...prevValue, courses: prevValue.courses.map((course) => {
                      // //       return course._id === data._id ? {...course, modules: data.modules} : course;
                      // //     })};
                      // //   });
                      // // })
                      // // setCoursesData((prevValue) => {
                      // //   return {...prevValue, courses: prevValue.courses.}
                      // // })
                      // // setSelectedLessonId(lesson._id);
                    }} className="module-edit__lessons-ul-li-buttons-btn">
                      {lesson.delete ? 
                        <motion.svg whileHover={{fill: "#ffffff"}} fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></motion.svg> 
                      :
                        <motion.svg whileHover={{fill: "#ffffff"}} fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></motion.svg>
                      }
                    </button>
                    <button onClick={() => {
                      // console.log('edit lesson');
                      setSelectedLessonTitle(lesson.title);
                      setEditLessonPressed(true);
                      // setSelectedLessonId(lesson._id);
                      // setIsEditLesson(true);
                    }} className="module-edit__lessons-ul-li-buttons-btn">
                      <motion.svg whileHover={{fill: "#ffffff"}}  fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></motion.svg>
                    </button>
                  </div>
                </li>
              })}
              <li className="module-add__lessons-ul-li module-add_lessons-ul-li-special">
                <motion.button onClick={() => {
                  setAddLessonPressed(true);
                  // addModuleSectionRef.current.scrollIntroView({behavior: "smooth", block: "start"})
                  // window.location.reload();
                }} className="module-add__ul-li-btn-add" whileHover="hover" variants={addBtnVariants} initial="rest" type="button">
                  <motion.svg  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></motion.svg>
                </motion.button>
              </li>
            </ul>
          </div>
          <button onClick={() => {
            // console.log(loggedInUser);
            // console.log(moduleData);
            const form = new FormData();
            form.append("moduleData", JSON.stringify({...moduleData, author: loggedInUser}));
            selectedFiles.forEach((file) => {
              form.append("moduleCover", file);
            });
            
            apiAddModule(courseID, token, form)
            .then((data) => {
              setSelectedFiles([]);
              console.log(data);
            })
          }} className="module-add__update-btn">Добавить модуль</button>
        </div> 
      </div>}
      
      {addLessonPressed && <Lesson token={token} setAddLessonPressed={setAddLessonPressed} setModuleData={setModuleData}/>}
      {editLessonPressed && <Lesson token={token} setAddLessonPressed={setAddLessonPressed} setEditLessonPressed={setEditLessonPressed} setModuleData={setModuleData} lessonToUpdate={lessonToUpdate}/>}
    </section>
  )
}
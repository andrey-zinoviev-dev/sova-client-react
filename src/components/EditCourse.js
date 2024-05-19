import React from "react";
import './EditCourse.css';
import CyrillicToTranslit from "cyrillic-to-translit-js";
import { NavLink, useLocation, useParams, useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, faPlus, faCheck, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { apiGetCourse, apiDeleteModule, apiAddStudentsToCourse, apiUpdateCourseCover, apiUpdateCourseTitle, apiUpdateCourseDescription, apiGetModule } from "../api";

import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";

import axiosClient from '../axios';

export default function EditCourse() {
  const cyrillicToTranslit = new CyrillicToTranslit();
  //useParams
  const { courseID } = useParams();
  //token
  const token = localStorage.getItem('token');
  //location
  const navigate = useNavigate();
  const location = useLocation();

  //search params
  // const [searchParams] = useSearchParams();
  // const moduleId = searchParams.get("moduleId");
  // const lessonId = searchParams.get("lessonId");



  //refs
  const studentsInputRef = React.useRef();
  const courseNameRef = React.useRef();
  const courseDescRef = React.useRef();
  const courseCoverRef = React.useRef();
  const courseCoverImgRef = React.useRef();
  const studentsFileRef = React.useRef();

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
  const [inputTimeout, setInputTimeout] = React.useState(null);
  const [moduleToUpdate, setModuleToUpdate] = React.useState(null);
  const [lessonToUpdate, setLessonToUpdate] = React.useState(null);
  const [coverFile, setCoverFile] = React.useState(null);
  const [upload, setUpload] = React.useState(null);

  //derived state
  let selectedModule;
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

  //functions
  function updateCourseTitle (evt) {
    // console.log(evt.target.value);
    clearTimeout(inputTimeout);

    setInputTimeout(setTimeout(() => {
      apiUpdateCourseTitle(token, courseID, {name: evt.target.value})
      .then((data) => {
        setCourseData((prevValue) => {
          return {...prevValue, name: data.name};
        });
        setSuccessfullMessage(data.message);
      })    
    }, 1500))
    
  };

  function updateCourseDescription(evt) {
    clearTimeout(inputTimeout);

    setInputTimeout(setTimeout(() => {
      apiUpdateCourseDescription(token, courseID, {desc: evt.target.value})
      .then((data) => {
        setCourseData((prevValue) => {
          return {...prevValue, description: data.description};
        });
        setSuccessfullMessage(data.message);
      })
    }, 1500))
  };

  function handleCoverEdit() {
    // console.log('yes');
    const uploadedCoverFile = courseCoverRef.current.files[0];
    uploadedCoverFile.clientPath = window.URL.createObjectURL(uploadedCoverFile);
    courseCoverImgRef.current.src = uploadedCoverFile.clientPath;
    console.log(uploadedCoverFile);
    setCoverFile(uploadedCoverFile);



    // if(/[А-Я ]/.test(uploadedCoverFile.name)) {
    //   // console.log('space in name');
    //   const updatedName = cyrillicToTranslit.transform(uploadedCoverFile.name, "_");
                  
    //   Object.defineProperty(uploadedCoverFile, 'name', {
    //     writable: true,
    //     value: updatedName
    //   });
    // }
    // // console.log(uploadedCoverFile);
    // const form = new FormData();
    // form.append("courseCover", uploadedCoverFile);

    // apiUpdateCourseCover(token, courseID, form)
    // .then((data) => {
    //   if(!data.coverPath) {
    //     return;
    //   }
    //   setCourseData((prevValue) => {
    //     return {...prevValue, cover: data.coverPath};
    //   });
    //   setSuccessfullMessage(data.message);
    // })
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

  function readCSV(evt) {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const csvData = e.target.result;
        const addedStudents = convertCSVtoJSON(csvData);
        apiAddStudentsToCourse(courseID, token, addedStudents)
        .then((data) => {
          console.log(data);
        })
        // console.log(addedStudents);
        // setFormData((prevValue) => {
        //     return {...prevValue, students: addedStudents};
        // });
        // console.log(csvData.split("\n"));
    }
    reader.readAsText(file)
};

function convertCSVtoJSON(file) {
    // console.log(file);
    const finalJSON = [];
    const lines = file.split("\n");
    
    const headers = lines[0].split(lines[0].includes(";") ? (";") : ",");
    // console.log(headers);

    let lineIndex = 1;
    while(lineIndex < lines.length) {
        const userString = lines[lineIndex].split(lines[lineIndex].includes(";") ? (";") : ",");
        const obj = {};
        headers.forEach((header, index) => {
            // console.log(header.replace(" ",""))
            obj[header.replace("\r","")] = userString[index].replace("\r","");
        });
        finalJSON.push(obj);
        lineIndex += 1;
    };
    return finalJSON;
}

  React.useEffect(() => {
    // console.log(courseID);
    apiGetCourse(courseID, token)
    .then((courseData) => {
      courseNameRef.current.value = courseData.name;
      courseDescRef.current.value = courseData.description;
      setCourseData(courseData);
      // courseNameRef.current.value = courseData.name;
      // courseDescRef.current.value = courseData.description;
    })
    // setCourseData(state);
  }, []);

  React.useEffect(() => {
    // console.log(successfulMessage);
    setTimeout(() => {
      setSuccessfullMessage(null);
    }, 3000);
    // console.log(successfulMessage);
  }, [successfulMessage]);

  return (
    <section className="course-edit">
      <div className="course-edit__wrapper">
          <div className="course-edit__wrapper-back">
              <button onClick={() => {
                navigate({
                  pathname: "/"
                });
              }}>
                  <FontAwesomeIcon className="course__info-back-btn-svg" icon={faArrowLeft} />
                  <p>Назад к курсам</p>
              </button>   
              <h3>Редактировать курс {courseData.name}</h3>
            </div>
            <form className="course-edit__form">
              <div style={{width: "100%", display: "flex", flexDirection: "column", gap: 25, justifyContent: "flex-start", alignItems: "flex-start"}}>
                  <label style={{display: "block"}} htmlFor="course-desc">Название</label>
                  <input className="course-edit__form-input" autoComplete="off" ref={courseNameRef}></input>
                  <button type="button" className="course-edit__form-btn" onClick={() => {
                    // console.log(courseNameRef.current.value);
                    apiUpdateCourseTitle(token, courseID, {name: courseNameRef.current.value})
                    .then((data) => {
                      setSuccessfullMessage("Название обновлено");
                    });
                  }}>
                    <span>Обновить название</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
              </div>
              <div style={{width: "100%", display: "flex", flexDirection: "column", gap: 25, justifyContent: "flex-start", alignItems: "flex-start"}}>
                <label style={{display: "block"}} htmlFor="course-desc">Описание</label> 
                <textarea className="course-edit__form-textarea" ref={courseDescRef}></textarea>
                <button type="button" className="course-edit__form-btn" onClick={() => {
                  apiUpdateCourseDescription(token, courseID, {desc: courseDescRef.current.value})
                  .then((data) => {
                    setSuccessfullMessage("Описание обновлено");
                  })
                }}>
                  <span>Обновить описание</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
              <div style={{textAlign: "left", display: "flex", flexDirection: "column", gap: 25, justifyContent: "flex-start", alignItems: "flex-start", width: "100%"}}>
                <span style={{display: "block"}}>Обложка курса</span>
                <div style={{position: "relative", display: "flex"}}>
                  <img src={courseData.cover.path} style={{objectFit: "cover", width: "100%", aspectRatio: "16/10", height: "100%", boxSizing: "border-box", borderRadius: 9, border: "2px solid white"}} ref={courseCoverImgRef} alt="Обложка курса"></img>
                  <motion.button whileHover={{opacity: 1}} type="button" onClick={(() => {
                    courseCoverRef.current.click();
                  })} style={{position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", fontSize: 20, bottom: 0, right: 0, opacity: 0, width: "100%", height: "100%", padding: 0, border: "none", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <p>Изменить обложку</p>
                    
                  </motion.button>
                  <input ref={courseCoverRef} onChange={handleCoverEdit} id="course-cover" type="file" style={{display: "none"}}></input> 
                </div>
                <button type="button" className="course-edit__form-btn" onClick={() => {
                  setUpload({start: true});
                  // console.log(coverFile);
                  const uploadS3 = new Upload({
                    client: new S3({region: process.env.REACT_APP_REGION, credentials: {
                      secretAccessKey: process.env.REACT_APP_SECRET,
                      accessKeyId: process.env.REACT_APP_ACCESS
                    }, endpoint: "https://storage.yandexcloud.net"}),
                    params: {Bucket: process.env.REACT_APP_NAME, Key: coverFile.name, Body: coverFile},
                    queueSize: 4,
                    partSize: 10 * 1024 * 1024,
                  });
                  
                  uploadS3.on("httpUploadProgress", (progress) => {
                    setUpload((prevValue) => {
                      return {...prevValue, name: progress.Key, progress: progress.loaded/progress.total * 100}
                    });
                  })
                  
                  return uploadS3.done()
                  .then((result) => {
                    apiUpdateCourseCover(token, courseID, {title: coverFile.name, type: coverFile.type})
                    .then((data) => {
                      setUpload(null);
                      setSuccessfullMessage("Обложка обновлена");   
                    })
                    // setUpload(null);
                    // setSuccessfullMessage("Обложка обновлена");
                  })
                }}>
                  <span>Обновить обложку</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </form>
            <ul className="course-edit__ul">
              {courseData.modules.map((module) => {
                return <li key={module._id}>
                  <button className="course-edit__ul-li-delete" onClick={() => {
                    // console.log(module);
                    apiDeleteModule(courseID, module._id, token)
                    .then((data) => {
                      setCourseData((prevValue) => {
                        return {...prevValue, modules: prevValue.modules.filter((prevModule) => {
                          return prevModule._id !== data.moduleID;
                        })}
                      })
                    })
                  }}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <span>{module.title}</span>
                  <img src={module.cover.path} alt={module.name}></img>
                  <span>Уроки: {module.lessons.length}</span>
                  <button className="course-edit__ul-btn" onClick={() => {
                    navigate({
                      pathname: `${location.pathname}/modules/${module._id}`,
                    })
                  }}>
                    <span>Изменить</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </li>
              })}
              <li key="add-new-lesson">
                <button className="course-edit__ul-btn" onClick={(() => {
                  
                  navigate({
                    pathname: `${location.pathname}/add`,
                  }, {
                    state: courseData,
                  })
                })}>
                  <FontAwesomeIcon icon={faPlus} />
                  <span>
                    Добавить модуль
                  </span>
                </button>
              </li>
            </ul>
          <div>
            <span>Ученики: {courseData.students.length}</span>
            {/* <span>{courseData.students.length}</span> */}
            <button onClick={() => {
              studentsFileRef.current.click();
              // apiAddStudentsToCourse(courseID, token)
            }}>
              <FontAwesomeIcon icon={faPlus} />
              <span>Добавить учеников</span>
            </button>
            <input type="file" style={{display: "none"}} ref={studentsFileRef} onInput={(evt) => {
              readCSV(evt);
            }}></input>
          </div>
          <motion.div initial="rest" variants={studentsSuccess} animate={successfulMessage && successfulMessage.length > 0 ? "success" : "rest"} className="course-edit__students-wrapper-success">
              <div className="course-edit__students-wrapper-success-div">
                <FontAwesomeIcon className="course-edit__students-wrapper-success-div-tick" icon={faCheck} />
              </div>
              <p className="course-edit__students-wrapper-success-p">{successfulMessage}</p>
          </motion.div>
      </div>
    </section>
  )
};

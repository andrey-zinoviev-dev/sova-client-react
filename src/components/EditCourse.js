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
              {/* <li key="add-new_module" id="new-module">
                <button className="course-edit__ul-btn" onClick={(() => {
                  
                  navigate({
                    pathname: `${location.pathname}/add`,
                  }, {
                    state: courseData,
                  })
                })}>
                  <FontAwesomeIcon icon={faPlus} />
                  <span>
                    Добавить урок
                  </span>
                </button>

              </li> */}
            </ul>
          {/* </>
          :
          <>
            <ul className="course-edit__ul">
              {courseData.modules.length > 0 && courseData.modules.find((module) => {
                return module._id === moduleId;
              }).lessons.map((lesson) => {
                return <li key={lesson._id}>
                  <button className="course-edit__ul-li-delete" onClick={() => {
                    console.log(lesson);
                  }}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <span>{lesson.title}</span>
                  <img src={lesson.cover.path} alt={lesson.name}></img>
                  <button className="course-edit__ul-btn" onClick={() => {
                    navigate({
                      pathname: location.pathname,
                      search: `?${createSearchParams({
                        moduleId: moduleId,
                        lessonId: lesson._id
                      })}`
                    })
                  }}>
                    <span>Изменить</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </li>
              })}
              <li id="new-lesson" key="add-new-lesson">
                <button>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </li>
            </ul>
          </>
          } */}
          {/* <div className="course-edit__modules-wrapper">
            <p style={{margin: "0 0 25px 0"}}>Модули</p>
            <ul className="course-edit__modules-ul">
              {courseData._id && courseData.modules.map((module) => {
                return <motion.li whileHover={{ border: "2px solid rgb(93, 176, 199)"}} className="course-edit__modules-ul-li" key={module._id}>
                  <button className="course-edit__modules-ul-li-edit" onClick={() => {
                    navigate(`../editModule/courses/${courseID}/modules/${module._id}`)

                  }} type="button">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button type="button" className="course-edit__modules-ul-li-delete" onClick={(evt) => {
                    evt.stopPropagation();
                    // console.log(module);
                    apiDeleteModule(courseID, module._id, token)
                    .then((data) => {
                      
                      setCourseData((prevValue) => {

                        return {...prevValue, modules: data.modules};
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
                  navigate(`/addModule/courses/${courseID}`)
                }} type="button" className="course-edit__modules-ul-li-addButton">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </motion.li>
            </ul>
          </div> */}
          {/* <div className="course-edit__students-wrapper">
            <p>Ученики</p>
            <div className="course-edit__students-wrapper-btn-wrapper">
              <p className="course-edit__students-wrapper-btn-wrapper-p">Сейчас на курсе <span className="course-edit__students-wrapper-btn-wrapper-span">{courseData._id && courseData.students.length}</span> студентов</p>
              <button className="course-edit__students-wrapper-btn-wrapper-btn" onClick={() => {
                !usersFile.name ?  studentsInputRef.current.click() : uploadStudentsFile()
              }}>{!usersFile.name ? 'Добавить учеников к курсу через CSV' : 'Отправить CSV файл'}</button>
              <input ref={studentsInputRef} onChange={(evt => {
                const uploadedCsv = evt.target.files[0];
                if(/[А-Я]/.test(uploadedCsv.name)) {
                  const updatedName = cyrillicToTranslit.transform(uploadedCsv.name, "_");
                  
                  Object.defineProperty(uploadedCsv, 'name', {
                    writable: true,
                    value: updatedName
                  });
                }
                setUsersFile(uploadedCsv);
              })} type="file" style={{display: "none"}} accept=".csv"></input>
            </div>
          </div> */}
          {/* <div>
            
          </div> */}
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

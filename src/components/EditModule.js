import React from "react";
import './EditModule.css';
import Lesson from "./Lesson";
import { useParams, useNavigate, useLocation, createSearchParams} from "react-router-dom";
import { apiEditModule, apiGetCourse, apiNewLessonEmail, apiUpdateModuleTitle, apiUpdateModuleCover, apiDeleteLesson } from '../api';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faTrash, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import SuccessAddCourse from "./SuccessAddCourse";

import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";

export default function EditModule() {
  //params
  const { courseID, moduleID } = useParams();

  //navigate
  const navigate = useNavigate();

  //location
  const location = useLocation();
  console.log(location);
  //token
  const token = localStorage.getItem('token');

  //states
  const [moduleData, setModuleData] = React.useState({});
  // const [selectedImageFile, setSelectedImageFile] = React.useState({});
  const [addLessonPressed, setAddLessonPressed] = React.useState(false);
  const [editLessonPressed, setEditLessonPressed] = React.useState(false);
  const [lessonIdSelected, setLessonIdSelected] = React.useState(null);
  const [coverSelected, setCoverSelected] = React.useState(null);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [emailSend, setEmailSend] = React.useState({});
  const [inputTimeout, setInputTimeout] = React.useState(null);
  const [successfullMessage, setSuccessfullMessage] = React.useState(false);
  const [coverFile, setCoverFile] = React.useState(null);
  const [upload, setUpload] = React.useState(null);
  
  //derived state
  // const lessonToUpdate = moduleData.lessons && moduleData.lessons.find((lesson) => {
  //   return lesson._id === lessonIdSelected;
  // })
  //refs
  const addModuleSectionRef = React.useRef();
  const titleInputRef = React.useRef();
  const coverInputRef = React.useRef();
  const coverImgRef = React.useRef();

  //variants
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

  //functions
  function updateModuleTite(evt) {
    clearTimeout(inputTimeout);
    titleInputRef.current.value = evt.target.value;
    setInputTimeout(setTimeout(() => {
      apiUpdateModuleTitle(token, courseID, moduleID, {title: evt.target.value})
      .then((data) => {
        if(!data.title) {
          return ;
        }
        setModuleData((prevValue) => {
          return {...prevValue, title: data.title};
        })
      })

    }, 1500))
  };

  function handleCoverEdit() {
    // console.log('yes');
    const uploadedCoverFile = coverInputRef.current.files[0];
    uploadedCoverFile.clientPath = window.URL.createObjectURL(uploadedCoverFile);
    coverImgRef.current.src = uploadedCoverFile.clientPath;
    console.log(uploadedCoverFile);
    setCoverFile(uploadedCoverFile);
  }

  React.useEffect(() => {

    apiGetCourse(courseID, token)
    .then((data) => {
      // console.log(data);
      const moduleToUpdate = data.modules.find((module) => {
        return module._id === moduleID;
      });
      titleInputRef.current.value = moduleToUpdate.title;
      setModuleData(moduleToUpdate);
      // const lessons = moduleToUpdate.lessons.map((lesson) => {
      //   return {...lesson, notificate: false};
      // });
      // setModuleData({...moduleToUpdate, lessons: mod, students: data.students, tarifs: data.tarifs});
      // titleInputRef.current.value = moduleToUpdate.title;
    })
  }, []);

  React.useEffect(() => {
    // console.log(successfulMessage);
    setTimeout(() => {
      setSuccessfullMessage(null);
    }, 3000);
    // console.log(successfulMessage);
  }, [successfullMessage]);

  // React.useEffect(() => {
  //   addModuleSectionRef.current.scrollTo(0, 0);
  // }, [addLessonPressed, editLessonPressed])

  // React.useEffect(() => {
  //   console.log(moduleData);
  // }, [moduleData]);

  // console.log(location);

  return (
    <section ref={addModuleSectionRef} className="module-edit">
      <div className="module-edit__wrapper">
        <div className="course-edit__wrapper-back">
          <button onClick={() => {
            navigate(-1)
          }}>
            <FontAwesomeIcon className="course__info-back-btn-svg" icon={faArrowLeft} />
            <span>
              Назад к курсу
            </span>
          </button>
          <h3>Редактировать модуль {moduleData.title}</h3>
        </div>
        <form className="course-edit__form">
          <div style={{width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 25, justifyContent: "flex-start", alignItems: "flex-start"}}>
                  <label style={{display: "block"}} htmlFor="course-desc">Название</label>
                  <input className="course-edit__form-input" autoComplete="off" ref={titleInputRef}></input>
                  <button type="button" className="course-edit__form-btn" onClick={() => {
                    // console.log(courseNameRef.current.value);
                    apiUpdateModuleTitle(token, courseID, moduleID, {title: titleInputRef.current.value})
                    .then((data) => {
                      setSuccessfullMessage("Название обновлено");
                    });
                    // });
                  }}>
                    <span>Обновить название</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
              </div>
          <div className="module-edit__form-div">
              <label className="module-edit__form-label">Текущая обложка курса</label>
              <div className="module-edit__cover-div">
                <img ref={coverImgRef} className="module-edit__cover-img" src={moduleData._id && moduleData.cover.path} alt="Обложка курса"></img>
                <motion.button className="module-edit__cover-btn" whileHover={{opacity: 1}} type="button" onClick={(() => {
                  coverInputRef.current.click();
                })}>
                  <p>Изменить обложку</p>
                </motion.button>
                
                <input ref={coverInputRef} onChange={handleCoverEdit} style={{display: "none"}} id="course-cover" type="file"></input> 
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
                    apiUpdateModuleCover(token, courseID, moduleID, {title: coverFile.name, type: coverFile.type})
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
        <div>
          <h3>Уроки модуля</h3>
          <ul className="course-edit__ul">
            {moduleData.lessons && moduleData.lessons.map((lesson) => {
              return <li key={lesson._id}>
                <button className="course-edit__ul-li-delete">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <span>{lesson.title}</span>
                <img src={lesson.cover.path} alt={lesson.title}></img>
                <button className="course-edit__ul-btn" onClick={() => {
                  navigate({
                    pathname: `${location.pathname}/lessons/${lesson._id}`,
                  }, {
                    preventScrollReset: false,
                  })
                }}>
                  <span>Изменить</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </li>
            })}
            <li key="add-new-lesson">
              <button className="course-edit__ul-btn" onClick={() => {
                  // console.log(moduleData);
                   navigate({
                    pathname: `${location.pathname}/add`,
                  }, {
                    state: moduleData
                  })
                }}>
                  <FontAwesomeIcon icon={faPlus} />
                  <span>
                    Добавить Урок
                  </span>
              </button>
            </li>
            {/* <li key="add-new_module" id="new-module">
                <button onClick={() => {
                  console.log(moduleData);
                   navigate({
                    pathname: `${location.pathname}/add`,
                    search: `?${createSearchParams({
                      lesson: true
                    })
                    }`
                  }, {
                    state: moduleData
                  })
                }}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>

            </li> */}
          </ul>
        </div>
      </div>
      <motion.div initial="rest" variants={studentsSuccess} animate={successfullMessage && successfullMessage.length > 0 ? "success" : "rest"} className="course-edit__students-wrapper-success">
              <div className="course-edit__students-wrapper-success-div">
                <FontAwesomeIcon className="course-edit__students-wrapper-success-div-tick" icon={faCheck} />
              </div>
              <p className="course-edit__students-wrapper-success-p">{successfullMessage}</p>
          </motion.div>
      {/* {(!addLessonPressed && !editLessonPressed) && <div className="module-edit__wrapper">
        <div className="module-edit__wrapper-back-div">
          <motion.button onClick={() => {
            navigate(-1);
          }} whileHover="hover" variants={backBtnVariant} initial="rest" className="module-edit__wrapper-back">
            <motion.svg variants={backBtnVariant} fill="rgb(93, 176, 199)" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></motion.svg>
          </motion.button>
          <h3 className="module-edit__headline">Редактировать модуль</h3>
        </div>
        <form className="module-edit__form">
          <div className="module-edit__form-div">
            <label className="module-edit__form-label">Название</label>
            <input className="module-edit__form-input" onKeyUp={(evt) => {
              updateModuleTite(evt);
            }} ref={titleInputRef}></input>
          </div>
          <div className="module-edit__form-div">
              <label className="module-edit__form-label">{ moduleData._id && moduleData.cover.title? "Новая обложка" : "Текущая обложка курса"}</label>
              <div className="module-edit__cover-div">
                <img ref={coverImgRef} className="module-edit__cover-img" src={moduleData._id && moduleData.cover} alt="Обложка курса"></img>
                <motion.button className="module-edit__cover-btn" whileHover={{opacity: 1}} type="button" onClick={(() => {
                  coverInputRef.current.click();
                })}>
                  <p>Изменить обложку</p>
                  
                </motion.button>
                <input ref={coverInputRef} onChange={(evt) => {
                  const uploadedFile = evt.target.files[0];
                  uploadedFile.clientPath = window.URL.createObjectURL(uploadedFile);
                  uploadedFile.title = uploadedFile.name;

                  const formData = new FormData();
                  formData.append('moduleCover', uploadedFile);
                  apiUpdateModuleCover(token, courseID, moduleID, formData)
                  .then((data) => {
                    console.log(data);
                    if(!data.cover) {
                      return ;
                    }
                    setModuleData((prevValue) => {
                      return {...prevValue, cover: data.cover};
                    })
                  })


                }} style={{display: "none"}} id="course-cover" type="file"></input> 
              </div>

            </div>
        </form>
        <div>
          <p>Уроки модуля</p>
          <ul className="module-edit__lessons-ul">
            {moduleData._id && moduleData.lessons.map((lesson, index, array) => {
              return <li className="module-edit__lessons-ul-li" key={lesson._id ? lesson._id : index}>
                <img className="module-edit__lessons-ul-li-img" src={lesson.cover.clientPath ? lesson.cover.clientPath : lesson.cover}></img>
                <h3 className="module-edit__lessons-ul-li-h">{lesson.title}</h3>
                <div className="module-edit__lessons-ul-li-buttons">
                    <button onClick={() => {

                      apiDeleteLesson(courseID, moduleID, lesson._id, token)
                      .then((data) => {
                        setModuleData((prevValue) => {
                          return {...prevValue, lessons: data.lessons};
                        })

                      })

                    }} className="module-edit__lessons-ul-li-buttons-btn">
                      {lesson.delete ? 
                        <motion.svg whileHover={{fill: "#ffffff"}} fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></motion.svg> 
                      :
                        <motion.svg whileHover={{fill: "#ffffff"}} fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></motion.svg>
                      }
                    </button>
                    <button onClick={() => {
                      setEditLessonPressed(true);
                      setLessonIdSelected(lesson._id);
                      const upadtedLessonsArray = array.map((lessonToEdit) => {
                        return lessonToEdit._id === lesson._id ? {...lessonToEdit, edit: true} : lessonToEdit;
                      });
                      setModuleData((prevValue) => {
                        return {...prevValue, lessons: upadtedLessonsArray};
                      });

                    }} className="module-edit__lessons-ul-li-buttons-btn">
                      <motion.svg whileHover={{fill: "#ffffff"}}  fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></motion.svg>
                    </button>
                    <button onClick={() => {
                      setModuleData((prevValue) => {
                        return {...prevValue, lessons: prevValue.lessons.map((lessonToUpdate) => {
                          return lessonToUpdate._id === lesson._id ? {...lessonToUpdate, notificate: true} : lessonToUpdate;
                        })}
                      })

                    }} className="module-edit__lessons-ul-li-buttons-btn">
                      <motion.svg whileHover={{fill: "#ffffff"}} fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></motion.svg>
                    </button>
                  </div>
                  {lesson.notificate && <div className="module-edit__lessons-ul-li-notification">
                    <h3>Рассылка нового урока</h3>
                    <p>Кому отправить письмо?</p>
                    <ul className="module-edit__lessons-ul-li-notification-ul">
                      {moduleData.tarifs.map((tarif) => {
                        return <li key={tarif} className="module-edit__lessons-ul-li-notification-ul-li">
                           <button onClick={() => {
                          const studentsToNotify = moduleData.students.filter((student) => {
                            return student.courses.find((course) => {
                              return course.id === courseID && course.tarif === tarif;
                            })
                          });

                          apiNewLessonEmail(token, {course: courseID, module: moduleID, lesson: lesson._id}, studentsToNotify)
                          .then((data) => {
                            if(!data) {
                              return;
                            }
                            setSuccessfullNotification(true);
                          })
                        }} className="module-edit__lessons-ul-li-notification-ul-li-btn">{tarif}</button>
                        </li>
                      })}
 
                    </ul>  
                  </div>}
              </li>
            })}
            <li className="module-edit__lessons-ul-li" key="add-lesson-edit-module">
              <button onClick={(() => {
                setAddLessonPressed(true);
              })} style={{borderRadius: "50%", border: "2px solid #5DB0C7", display: "flex", alignItems: "center", justifyContent: "space-between", aspectRatio: "1/1", margin: "0 auto"}} className="module-edit__lessons-ul-li-buttons-btn">
                <motion.svg whileHover={{fill: "#ffffff"}}  fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></motion.svg>
              </button>
            </li>
          </ul>
        </div>
      
      </div>}
      {addLessonPressed && <Lesson token={token} setAddLessonPressed={setAddLessonPressed} setModuleData={setModuleData}/>}
      {editLessonPressed && <Lesson token={token} setAddLessonPressed={setAddLessonPressed} setEditLessonPressed={setEditLessonPressed} setModuleData={setModuleData} lessonToUpdate={lessonToUpdate}/>}
      {successfulNotification && <SuccessAddCourse>
        <div className="addCourse__success-wrapper">
            <p style={{color: "white"}}>Уведомления успешно отправлены!</p>
            <button onClick={() => {
              setSuccessfullNotification(false);
            }} type="button" className="addCourse__success-wrapper-finish">Закрыть</button>
          </div>
      </SuccessAddCourse>} */}
    </section>
  )
}
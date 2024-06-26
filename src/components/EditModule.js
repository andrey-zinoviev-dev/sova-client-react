import React from "react";
import './EditModule.css';
import Lesson from "./Lesson";
import { useParams, useNavigate, useLocation, createSearchParams} from "react-router-dom";
import { apiEditModule, apiGetCourse, apiNewLessonEmail, apiUpdateModuleTitle, apiUpdateModuleCover, apiDeleteLesson } from '../api';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faTrash, faPlus, faCheck, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import SuccessAddCourse from "./SuccessAddCourse";
import EditCourseRender from "./EditCourseRender";
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
  const [editLessonAccess, setEditLessonAccess] = React.useState(false);
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
                <div className="course-edit__ul-li-div">
                      {/* <button className="course-edit__ul-li-delete" onClick={() => {
                        setModuleIdSelected(module._id);
                        setEditModuleAccess(true);
                      }}>
                        <FontAwesomeIcon icon={module.available ? faLock : faLockOpen} />
                      </button>
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
                      </button> */}
                  <button className="course-edit__ul-li-delete" onClick={() => {
                        // setModuleIdSelected(module._id);
                        // setEditModuleAccess(true);
                      }}>
                        <FontAwesomeIcon icon={lesson.available ? faLock : faLockOpen} />
                  </button>
                  <button className="course-edit__ul-li-delete" onClick={() => {
                    apiDeleteLesson(courseID, moduleID, lesson._id, token)
                    .then((data) => {
                      setModuleData((prevValue) => {
                        return {...prevValue, lessons: prevValue.lessons.filter((prevLesson) => {
                          return prevLesson._id !== data.lessonID; 
                        })}
                      })
                    })
                  }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>

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
          {/* {editLessonAccess && <EditCourseRender closeWindow={closeModueEditAvailable} module={selectedModule} buttonFunction={moduleEditAvilable} available={selectedModule.available}>
        <h2>Изменение статуса модуля</h2>  
        <p>Вы действительно хотите {!selectedModule.available ? "открыть" : "закрыть" } доступ к модулю {selectedModule.title}?</p>  
      </EditCourseRender>} */}
    </section>
  )
}
import React from "react";
import "./EditCourse.css";
import "./AddCourse.css";
import "./EditModule.css";

import { UserContext } from "../context/userContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams, useLocation, useNavigate, createSearchParams, useParams } from "react-router-dom";
import { faPlus, faArrowLeft, faArrowRight, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

import AddLessonToExModule from "./AddLessonToExModule";
import AddLessonToNewModule from "./AddLessonToNewModule";
import { motion } from "framer-motion";
import { apiAddModule } from "../api";

import SovaLogo from '../images/sova-logo-white.png';

import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";
import TipTapLesson from "./TipTapLesson";

export default function AddToCourse() {
  //token
  const token = localStorage.getItem("token");

  //params
  const { courseID, moduleID } = useParams();

  //search params
  const [searchParams, setSearchParams] = useSearchParams();

  //loggedInUser
  const loggedInUser = React.useContext(UserContext)

  //states
  const [lesson, setLesson] = React.useState(searchParams.get("lesson"));
  const [dataToCreate, setDataToCreate] = React.useState({author: loggedInUser});
  const [addLesson, setAddLesson] = React.useState(moduleID ? true : false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [loading, setLoading] = React.useState({initiated: false, uploaded: false, finished: false});
  const [uploadProgress, setUploadProgress] = React.useState(null);
  const [selectedLesson, setSelectedLesson] = React.useState(null);
  const [editLessonFiles, setEditLessonFiles] = React.useState([]);

  // const [editedLessonContent, setEditedLessonContent] = React.useState
  // const [module, setModule] = React.useState(null);

  //derived state
  // const selectedLesson = dataToCreate.lessons && dataToCreate.lessons.find((lesson) => {
  //   return lesson.title === selectedLessonTitle;
  // });


  //location state
  const { state } = useLocation();

  //refs
  const nameRef = React.useRef();
  const moduleImgRef = React.useRef();
  const moduleFileRef = React.useRef();
  const lessonTitleRef = React.useRef();
  const lessonCoverImgRef = React.useRef();
  const lessonCoverFileRef = React.useRef();

  //navigate
  const navigate = useNavigate();

  //functions
  function handleCoverEdit() {
    // console.log('yes');
    const uploadedCoverFile = moduleFileRef.current.files[0];
    uploadedCoverFile.clientPath = window.URL.createObjectURL(uploadedCoverFile);
    // moduleImgRef.current.src = uploadedCoverFile.clientPath;
    setDataToCreate((prevValue) => {
      return {...prevValue, cover: {title: uploadedCoverFile.name, clientPath: uploadedCoverFile.clientPath, type: uploadedCoverFile.type}};
    });
    setSelectedFiles((prevValue) => {
      return [...prevValue, uploadedCoverFile];
    });
    // setCoverFile(uploadedCoverFile);
  }

  function handleLessonCoverEdit() {
    const uploadedCoverFile = lessonCoverFileRef.current.files[0];
    uploadedCoverFile.clientPath = window.URL.createObjectURL(uploadedCoverFile);
    lessonCoverImgRef.current.src = uploadedCoverFile.clientPath;
    setSelectedFiles((prevValue) => {
      return [...prevValue, uploadedCoverFile];
    });
    setDataToCreate((prevValue) => {
      return {...prevValue, lessons: prevValue.lessons.map((lesson) => {
        return selectedLesson && lesson.title ===  selectedLesson.title ? {...lesson, cover: {title: uploadedCoverFile.name, clientPath: uploadedCoverFile.clientPath, type: uploadedCoverFile.type}} : lesson;
      })}
    })
    // setSelectedLesson((prevValue) => {
    //   return {...prevValue, cover: {title: uploadedCoverFile.name, clientPath: uploadedCoverFile.clientPath, type: uploadedCoverFile.type}};
    // })
  }

  React.useEffect(() => {
    if(lessonTitleRef.current) {
      lessonTitleRef.current.value = selectedLesson.title;
    }
  }, [selectedLesson])

  return (
    <section className="course-edit">
      <div className="course-edit__wrapper">
          {(!addLesson && !loading.initiated) && <div className="course-edit__wrapper-back">
            {!selectedLesson ? 
              <button onClick={() => {
                  navigate(-1, {
                    // state: dataToCreate,
                  });
                  // setLesson(false);
                  // nameRef.current.value = '';
              }}>
                <FontAwesomeIcon className="course__info-back-btn-svg" icon={faArrowLeft} />
                <p>{`Назад к ${!lesson ? "курсу" : "модулю"}` }</p>
              </button>
              :
              <button onClick={() => {
                setSelectedLesson(null);
              }}>
                <FontAwesomeIcon className="course__info-back-btn-svg" icon={faArrowLeft} />
                <span>Назад к новому модулю</span>
              </button>
            }   
            <h3>{!lesson ? `Добавить модуль к курсу ${state.name}` : `Добавить урок к модулю ${state.title}`}</h3>
          </div>}

             {!loading.initiated ? <>
              {(!addLesson && !selectedLesson) ? <>
                  <form className="course-edit__form">
                    <div style={{width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 25, justifyContent: "flex-start", alignItems: "flex-start"}}>
                      <label>{`Название ${!lesson ? "модуля" : "урока"}`}</label>
                      <input className="course-edit__form-input" value={dataToCreate.title && dataToCreate.title} placeholder="Название модуля..." autoComplete="off" onInput={(evt) => {
                        setDataToCreate((prevValue) => {
                          return {...prevValue, title: evt.target.value};
                        })
                      }} ref={nameRef}></input>
                    </div>
                    <div style={{textAlign: "left", display: "flex", flexDirection: "column", gap: 25, justifyContent: "flex-start", alignItems: "flex-start", width: "100%", maxWidth: 360}}>
                      <span style={{display: "block"}}>Обложка курса</span>
                      <div style={{position: "relative", display: "flex"}}>
                        <img src={dataToCreate.cover ? dataToCreate.cover.clientPath : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="} style={{objectFit: "cover", width: "100%", aspectRatio: "16/10", height: "100%", boxSizing: "border-box", borderRadius: 9, border: "2px solid white"}} ref={moduleImgRef} alt="Обложка курса"></img>
                        <motion.button whileHover={{opacity: 1}} type="button" onClick={(() => {
                          moduleFileRef.current.click();
                        })} style={{position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", fontSize: 20, bottom: 0, right: 0, opacity: 0, width: "100%", height: "100%", padding: 0, border: "none", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <p>Изменить обложку</p>
                        </motion.button>
                        <input ref={moduleFileRef} onChange={handleCoverEdit} id="course-cover" type="file" style={{display: "none"}}></input> 
                      </div>
                    </div>
                  </form>
                  <h3>Уроки модуля</h3>
                  <ul className="course-edit__ul">
                    {dataToCreate.lessons && dataToCreate.lessons.map((lesson) => {
                      return <li key={lesson.title}>
                        <button className="course-edit__ul-li-delete" onClick={() => {
                          setDataToCreate((prevValue) => {
                            return {...prevValue, lessons: prevValue.lessons.filter((prevLesson) => {
                              return prevLesson.title !== lesson.title;
                            })}
                          })
                        }}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <span>{lesson.title}</span>
                        <img src={lesson.cover.clientPath} alt={lesson.title}></img>
                        <button className="course-edit__ul-btn" onClick={() => {
                          setSelectedLesson(lesson);
                          // setModule(lesson)
                        }}>
                          <span>Изменить</span>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                      </li>
                    })}
                    <li key="add-new-lesson">
                      <button className="course-edit__ul-btn" onClick={() => {
                        setAddLesson(true);
                      }}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>
                          Добавить урок
                        </span>
                    </button>
                    </li>
                  </ul>
                  <button onClick={() => {
                    // console.log(dataToCreate);
                    setLoading((prevValue) => {
                      return {...prevValue, initiated: true, uploaded: true};
                    })

                    Promise.all(selectedFiles.map((file) => {
                      const uploadS3 = new Upload({
                        client: new S3({region: process.env.REACT_APP_REGION, credentials: {
                            secretAccessKey: process.env.REACT_APP_SECRET,
                            accessKeyId: process.env.REACT_APP_ACCESS
                        }, endpoint: "https://storage.yandexcloud.net"}),
                        params: {Bucket: process.env.REACT_APP_NAME, Key: file.name, Body: file},
                        queueSize: 4,
                        partSize: 10 * 1024 * 1024,
                      });
            
                      uploadS3.on("httpUploadProgress", (progress) => {
                        setUploadProgress(progress.loaded / progress.total * 100);
                          // setUploadingFiles(() => {
                          //     return Math.ceil(index/memoFiles.length * 100);
                          // })
                      })
            
                      return uploadS3.done();
                    }))
                    .then((result) => {
                      // console.log(result);
                      setLoading((prevValue) => {
                        return {...prevValue, uploaded: false};
                      });

                      apiAddModule(courseID, token, dataToCreate)
                      .then((data) => {
                        // console.log(data);
                        setLoading((prevValue) => {
                          return {...prevValue, finished: true};
                        });
                      })
                    })
                    // console.log(dataToCreate);
                    // console.log(selectedFiles);

                  }}>
                    <span>Добавить модуль</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </>

                :
                
                !selectedLesson ? <AddLessonToNewModule setAddLesson={setAddLesson} 
                    setDataToCreate={setDataToCreate} 
                    selectedFiles={selectedFiles} 
                    setSelectedFiles={setSelectedFiles}>
                  </AddLessonToNewModule>
                  :
                  <>
                    <form className="course-edit__form">
                      <div className="module-edit__form-div" style={{width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 25, justifyContent: "flex-start", alignItems: "flex-start"}}>
                        <label className="module-edit__form-label">Название</label>
                        <input className="course-edit__form-input" onInput={(evt) => {
                          setDataToCreate((prevValue) => {
                            // console.log(prevValue.lessons.map((lesson) => {
                            //     return (selectedLesson && lesson.title ===  selectedLesson.title) ? {...lesson, title: evt.target.value} : lesson;
                            //   }))
                            // return prevValue;
                            return {...prevValue, lessons: prevValue.lessons.map((lesson) => {
                              return  lesson.title ===  selectedLesson.title ? {...lesson, title: evt.target.value} : lesson;
                            })}
                          })
                          // setSelectedLesson((prevValue) => {
                          //   return {...prevValue, title: lessonTitleRef.current.value};
                          // })
                        }} ref={lessonTitleRef} autoComplete="off"></input>
                      </div>
                      <div className="module-edit__form-div">
                          <label className="module-edit__form-label">Текущая обложка курса</label>
                          <div className="module-edit__cover-div">
                            <img className="module-edit__cover-img" src={selectedLesson.cover.clientPath} ref={lessonCoverImgRef} alt="Обложка курса"></img>
                            <motion.button className="module-edit__cover-btn" whileHover={{opacity: 1}} type="button" onClick={(() => {
                              lessonCoverFileRef.current.click();
                            })}>
                              <p>Изменить обложку</p>
                              
                            </motion.button>
                            <input onChange={handleLessonCoverEdit} ref={lessonCoverFileRef} style={{display: "none"}} id="course-cover" type="file"></input> 
                          </div>
                        </div>
                    </form>
                    <h3>Контент урока</h3>
                    <TipTapLesson selectedLesson={selectedLesson} setLessonData={setSelectedLesson} setSelectedFiles={setEditLessonFiles}></TipTapLesson>
                    <button style={{margin: "50px 0 0 0"}} onClick={() => {
                      const filteredContentFiles = selectedLesson.content.content.filter((contentEl) => {
                        return contentEl.type === 'image' || contentEl.type === 'video' || contentEl.type === 'audio';
                      });
                      const finalFilesArray = editLessonFiles.filter((editFile) => {
                        return filteredContentFiles.find((contentFile) => {
                          return editFile.name === contentFile.attrs.title;
                        })
                      });
                      setDataToCreate((prevValue) => {
                        return {...prevValue, lessons: prevValue.lessons.map((lesson) => {
                          return selectedLesson && lesson.title ===  selectedLesson.title ? {...lesson, content: selectedLesson.content} : lesson;
                        })};
                      });
                      setSelectedFiles((prevValue) => {
                        return [...prevValue, ...finalFilesArray];
                      });
                      setSelectedLesson(null);
                    }}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                      <span>Обновить урок</span>
                    </button>
                  </>
                }
             </>

             :

             <div style={{margin: "auto auto", display: "flex", flexDirection: "column", alignItems: "center"}}>
              <h3>Загрузка модуля</h3>
              {!loading.finished ? 
                loading.uploaded ? <div style={{width: `${uploadProgress}%`, height: 3, backgroundColor: "#5DB0C7"}}>
                </div>
                :
                <div style={{display: "flex",
                  alignItems: "center",
                  gap: 15,
                  margin: "30px 0"
                }}>
                  <img className="main__courses-loader-svg" src={SovaLogo} alt="sova-logo"></img>
                  <span>Сохранение урока</span>
                </div>
                :
                <div style={{display: "flex",
                alignItems: "center",
                gap: 15,
                margin: "30px 0"}}>
                <FontAwesomeIcon style={{
                  aspectRatio: "1/1",
                  boxSizing: "content-box",
                  padding: 5,
                  border: "2px solid white",
                  borderRadius: "50%",
                }} icon={faCheck} />
                <span>Урок успешно добавлен!</span>  
                </div>}
                {loading.finished && <button className="course-edit__button-submit course-edit__ul-btn" onClick={() => {
                navigate(-1);
                }}>
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>
                  Вернуться к модулю  
                </span>
                </button>}
             </div>
             }
              
      </div>
    </section>
  )
}
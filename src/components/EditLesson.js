import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { apiGetCourse, apiEditLessonTitle, apiEditLessonCover} from "../api";
import { motion } from "framer-motion";
import TipTapEditor from "./TipTapEditor";
import TipTapLesson from "./TipTapLesson";
import "./EditModule.css";

import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";

export default function EditLesson({ children }) {
  //navigate
  const navigate = useNavigate();

  //params
  const {courseID, moduleID, lessonID} = useParams();

  //token
  const token = localStorage.getItem("token");

  //states
  const [lessonData, setLessonData] = React.useState(null);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [successfullMessage, setSuccessfullMessage] = React.useState(false);
  const [upload, setUpload] = React.useState(null);
  const [coverFile, setCoverFile] = React.useState(null);

  //refs
  const lessonTitleRef = React.useRef();
  const lessonCoverFileRef = React.useRef();
  const lessonImgRef = React.useRef();
  
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
  function handleCoverEdit() {
      // console.log('yes');
      const uploadedCoverFile = lessonCoverFileRef.current.files[0];
      uploadedCoverFile.clientPath = window.URL.createObjectURL(uploadedCoverFile);
      lessonImgRef.current.src = uploadedCoverFile.clientPath;
      // console.log(uploadedCoverFile);
      setCoverFile(uploadedCoverFile);
  }

  React.useEffect(() => {
    apiGetCourse(courseID, token)
    .then((data) => {
      const lessonToUpdate = data.modules.find((module) => {
        return module._id === moduleID;
      }).lessons.find((lesson) => {
        return lesson._id === lessonID;
      });
      lessonTitleRef.current.value = lessonToUpdate.title;
      setLessonData(lessonToUpdate);
    })
  }, []);

  React.useEffect(() => {
    console.log(upload);
  }, [upload])

  return (
    <section className="course-edit">
      <div className="course-edit__wrapper">
        <div className="course-edit__wrapper-back">
          <button onClick={() => {
            navigate(-1)
          }}>
            <FontAwesomeIcon className="course__info-back-btn-svg" icon={faArrowLeft} />
            <span>
              Назад к курсу
            </span>
          </button>
          <h3>Редактировать урок </h3>
        </div>
        <form className="course-edit__form">
          <div className="module-edit__form-div" style={{width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 25, justifyContent: "flex-start", alignItems: "flex-start"}}>
            <label className="module-edit__form-label">Название</label>
            <input className="course-edit__form-input" autoComplete="off" ref={lessonTitleRef}></input>
            <button type="button" className="course-edit__form-btn" onClick={() => {
                    // console.log(courseNameRef.current.value);
              apiEditLessonTitle(courseID, moduleID, lessonID, token, {title: lessonTitleRef.current.value})
              .then((data) => {
                setSuccessfullMessage("Название обновлено");
              });
                    // });
            }}>
              <span>Обновить название</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            {/* <input className="module-edit__form-input" onKeyUp={(evt) => {
              updateModuleTite(evt);
            }} ref={titleInputRef}></input> */}
          </div>
          <div className="module-edit__form-div">
              <label className="module-edit__form-label">Текущая обложка курса</label>
              <div className="module-edit__cover-div">
                <img className="module-edit__cover-img" ref={lessonImgRef} src={lessonData && lessonData.cover.path} alt="Обложка курса"></img>
                <motion.button className="module-edit__cover-btn" whileHover={{opacity: 1}} type="button" onClick={(() => {
                  lessonCoverFileRef.current.click();
                })}>
                  <p>Изменить обложку</p>
                  
                </motion.button>
                <input onChange={handleCoverEdit} ref={lessonCoverFileRef} style={{display: "none"}} id="course-cover" type="file"></input> 
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
                    apiEditLessonCover(courseID, moduleID, lessonID, token,  {title: coverFile.name, type: coverFile.type})
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
        <div className="course-edit__lesson-content">
          <h3>Контент урока {lessonData && lessonData.title}</h3>
          <TipTapLesson setLessonData={setLessonData} setSelectedFiles={setSelectedFiles} selectedLesson={lessonData}></TipTapLesson>
          <button onClick={() => {
            // console.log(lessonData);
            const filteredFiles = selectedFiles.filter((selFile) => {
              const filteredContent = lessonData.content.content.filter((contentEl) => {
                return contentEl.type === "image" || contentEl.type === "video" || contentEl.type === "audio";
              });
              // console.log(filteredContent);
              return filteredContent.find((file) => {
                return file.attrs.title === selFile.name;
              })
            });
            
          }}>
            <span>Обновить контент</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <motion.div initial="rest" variants={studentsSuccess} animate={successfullMessage && successfullMessage.length > 0 ? "success" : "rest"} className="course-edit__students-wrapper-success">
              <div className="course-edit__students-wrapper-success-div">
                <FontAwesomeIcon className="course-edit__students-wrapper-success-div-tick" icon={faCheck} />
              </div>
              <p className="course-edit__students-wrapper-success-p">{successfullMessage}</p>
          </motion.div>
    </section>
  )
};
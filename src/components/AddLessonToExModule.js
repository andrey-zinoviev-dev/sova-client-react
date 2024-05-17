import React from "react";
import "./EditCourse.css";
import "./AddCourse.css";
import TipTapEditor from "./TipTapEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SovaLogo from '../images/sova-logo-white.png';

import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";

import axiosClient from '../axios';
import { apiAddLessonToCourse } from "../api";

export default function AddLessonToExModule() {
  //token
  const token = localStorage.getItem("token");
  //location
  const location = useLocation();
  // console.log(location.state);
  //navigate
  const navigate = useNavigate();

  //params
  const { courseID, moduleID } = useParams();
  // console.log(courseID, moduleID);

  //states
  const [lessonData, setLessonData] = React.useState({});
  const [addFilesToContent, setAddFilesToContent] = React.useState([]);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [loading, setLoading] = React.useState({initiated: false, uploaded: false, finished: false});
  const [uploadProgress, setUploadProgress] = React.useState(null);

  //refs
  const lessonImgRef = React.useRef();
  const lessonFileRef = React.useRef();

  //functions
  function handleCoverEdit() {
      // console.log('yes');
    const uploadedCoverFile = lessonFileRef.current.files[0];
    uploadedCoverFile.clientPath = window.URL.createObjectURL(uploadedCoverFile);
    setLessonData((prevValue) => {
      return {...prevValue, cover: {title: uploadedCoverFile.name, clientPath: uploadedCoverFile.clientPath, type: uploadedCoverFile.type}};
    });
    setSelectedFiles((prevValue) => {
      return [...prevValue, uploadedCoverFile];
    })
    // lessonImgRef.current.src = uploadedCoverFile.clientPath;
    // console.log()
      // moduleImgRef.current.src = uploadedCoverFile.clientPath;
    // setDataToCreate((prevValue) => {
    //   return {...prevValue, cover: uploadedCoverFile};
    // })
      // setCoverFile(uploadedCoverFile);
  }

  // React.useEffect(() => {
  //   console.log(uploadProgress);
  // }, [uploadProgress]);

  return (
    <section className="course-edit">
    {!loading.initiated ?
    <div className="course-edit__wrapper">
      <div className="course-edit__wrapper-back">
        <button onClick={() => {
          navigate(-1);
          // setAddLesson(false);
        }}>
          <FontAwesomeIcon className="course__info-back-btn-svg" icon={faArrowLeft} />
          <span>
            Назад к модулю
          </span>
        </button>
        <h3>Тут будет добавление урока к модулю {location.state.title}</h3>
      </div>
      <form className="course-edit__form">
        <div style={{width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 25, justifyContent: "flex-start", alignItems: "flex-start"}}>
          <label>Название нового урока</label>
          <input className="course-edit__form-input" placeholder="Название урока..." autoComplete="off" onInput={(evt) => {
            setLessonData((prevValue) => {
              return {...prevValue, title: evt.target.value};
            })
            // setDataToCreate((prevValue) => {
            //   return {...prevValue, title: evt.target.value};
            // })
          }}></input>
        </div>
        <div style={{textAlign: "left", display: "flex", flexDirection: "column", gap: 25, justifyContent: "flex-start", alignItems: "flex-start", width: "100%", maxWidth: 360}}>
          <span style={{display: "block"}}>Обложка курса</span>
          <div style={{position: "relative", display: "flex"}}>
            <img ref={lessonImgRef} src={lessonData.cover ? lessonData.cover.clientPath : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="} style={{objectFit: "cover", width: "100%", aspectRatio: "16/10", height: "100%", boxSizing: "border-box", borderRadius: 9, border: "2px solid white"}} alt="Обложка курса"></img>
            <motion.button whileHover={{opacity: 1}} type="button" onClick={(() => {
              lessonFileRef.current.click();
            })} style={{position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", fontSize: 20, bottom: 0, right: 0, opacity: 0, width: "100%", height: "100%", padding: 0, border: "none", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <p>Изменить обложку</p>
            </motion.button>
            <input ref={lessonFileRef} onChange={handleCoverEdit} id="course-cover" type="file" style={{display: "none"}}></input> 
          </div>
        </div>
      </form>
      <h3>Контент нового урока</h3>
      <TipTapEditor setNewLesson={setLessonData} setSelectedFiles={setAddFilesToContent}>
        
      </TipTapEditor>
      <button style={{margin: "25px 0 0 0"}} onClick={() => {
        setLoading((prevValue) => {
          return {...prevValue, initiated: true};
        })
        const filteredContent = lessonData.content.content.filter((contentEl) => {
          return  contentEl.type === "image" || contentEl.type === "video" || contentEl.type === "audio";
        });

        const finalContentArray = addFilesToContent.filter((file) => {
          return filteredContent.find((contentFile) => {
            return contentFile.attrs.title === file.name;
          });
        });

        // console.log(finalContentArray);

        // setDataToCreate((prevValue) => {
        //   return {...prevValue, lessons: prevValue.lessons ? [...prevValue.lessons, lessonData] : [lessonData]};
        // });

        // setSelectedFiles((prevValue) => {
        //   return [...prevValue, ...finalContentArray];
        // });
        Promise.all([...selectedFiles, ...finalContentArray].map((file) => {
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
          setLoading((prevValue) => {
            return {...prevValue, uploaded: true};
          })
          apiAddLessonToCourse(courseID, moduleID, token, lessonData)
          .then((data) => {
            setLoading((prevValue) => {
              return {...prevValue, uploaded: false, finished: true};
            });
            // setLoading((prevValue) => {
            //   return {...prevValue, }
            // })
          })
        })
        // setFinished(true);
        // console.log(select)
        // navigate(-1, {
        //   state: "yes",
        //   replace: true
        // })
        // console.log(selectedFiles);
        // setAddLesson(false);
        // console.log([...selectedFiles, ...addFilesToContent]);
      }}>
        <span>Добавить урок</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
    :
    <div>
      <h3>Загрузка урока</h3>
      {!loading.finished ? 
        loading.upload ? <div style={{width: `${uploadProgress}%`, height: 3, backgroundColor: "#5DB0C7"}}>
        </div>
        :
        <div>
          <img className="main__courses-loader-svg" src={SovaLogo} alt="sova-logo"></img>
          <span>Сохранение урока</span>
        </div>
      :
      <div>
        <FontAwesomeIcon icon={faCheck} />
        <span>Урок успешно добавлен!</span>  
      </div>}
      {loading.finished && <button>Вернуться к модулю</button>}
    </div>}
    </section>
  )
}
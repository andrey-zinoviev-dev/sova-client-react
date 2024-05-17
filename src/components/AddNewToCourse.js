import React from "react";
import "./EditCourse.css";
import "./AddCourse.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams, useLocation, useNavigate, createSearchParams, useParams } from "react-router-dom";
import { faPlus, faArrowLeft, faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";

import AddLessonToExModule from "./AddLessonToExModule";
import AddLessonToNewModule from "./AddLessonToNewModule";
import { motion } from "framer-motion";

export default function AddToCourse() {
  //params
  const { moduleID } = useParams();
  // console.log(moduleID);
  //search params
  const [searchParams, setSearchParams] = useSearchParams();
  // const lesson = searchParams.get("lesson");

  //states
  const [lesson, setLesson] = React.useState(searchParams.get("lesson"));
  const [dataToCreate, setDataToCreate] = React.useState({});
  const [addLesson, setAddLesson] = React.useState(moduleID ? true : false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  // const [module, setModule] = React.useState(null);

  // const []
  //location state
  const { state } = useLocation();

  //refs
  const nameRef = React.useRef();
  const moduleImgRef = React.useRef();
  const moduleFileRef = React.useRef();

  //navigate
  const navigate = useNavigate();

  //functions
  function handleCoverEdit() {
    // console.log('yes');
    const uploadedCoverFile = moduleFileRef.current.files[0];
    uploadedCoverFile.clientPath = window.URL.createObjectURL(uploadedCoverFile);
    // moduleImgRef.current.src = uploadedCoverFile.clientPath;
    setDataToCreate((prevValue) => {
      return {...prevValue, cover: uploadedCoverFile};
    });
    setSelectedFiles((prevValue) => {
      return [...prevValue, uploadedCoverFile];
    });
    // setCoverFile(uploadedCoverFile);
  }

  return (
    <section className="course-edit">
      <div className="course-edit__wrapper">
          {!addLesson && <div className="course-edit__wrapper-back">
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
            <h3>{!lesson ? `Добавить модуль к курсу ${state.name}` : `Добавить урок к модулю ${state.title}`}</h3>
          </div>}

             
              {!addLesson ? <>
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
                      <button className="course-edit__ul-li-delete">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <span>{lesson.title}</span>
                      <img src={lesson.cover.clientPath} alt={lesson.title}></img>
                      <button className="course-edit__ul-btn" onClick={() => {
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
                  console.log(dataToCreate);
                  console.log(selectedFiles);
                }}>
                  <span>Добавить модуль</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </>

              :
              
              <AddLessonToNewModule setAddLesson={setAddLesson} setDataToCreate={setDataToCreate} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}></AddLessonToNewModule>}
           
          
          {/* {!lesson ? <button onClick={(() => {
            // console.log(dataToCreate);
            setLesson(true);
                  // console.log(location);
            navigate({
              pathname: `${location.pathname}`,
              search: `?${createSearchParams({
              lesson: true,
              })}`
            }, {
              state: dataToCreate,
            });
            setLesson(true);
            nameRef.current.value = '';
          })}>
            <span>Добавить урок</span>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          :
          <>
          <p>Тут надо обработать контент урока</p>
          <button onClick={() => {
            navigate(-1, {
              // state:
            });
            setLesson(false);
          }}>
            <span>Добавить урок</span>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          </>
          } */}

        {/* // </>
        // } */}
      </div>
    </section>
  )
}
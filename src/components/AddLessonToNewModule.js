import React from "react";
import TipTapEditor from "./TipTapEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
export default function AddLessonToNewModule({ setAddLesson, setDataToCreate, selectedFiles, setSelectedFiles }) {
  // console.log('yes');
  //states
  const [lessonData, setLessonData] = React.useState({});
  const [addFilesToContent, setAddFilesToContent] = React.useState([]);

  //refs
  const lessonImgRef = React.useRef();
  const lessonFileRef = React.useRef();
  
  //functions
  function handleCoverEdit() {
      // console.log('yes');
    const uploadedCoverFile = lessonFileRef.current.files[0];
    uploadedCoverFile.clientPath = window.URL.createObjectURL(uploadedCoverFile);
    setLessonData((prevValue) => {
      return {...prevValue, cover: uploadedCoverFile};
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

  return (
    <div>
      <div className="course-edit__wrapper-back">
        <button onClick={() => {
          setAddLesson(false);
        }}>
          <FontAwesomeIcon className="course__info-back-btn-svg" icon={faArrowLeft} />
          <span>
            Назад к модулю
          </span>
        </button>
        <h3>Добавление нового урока к модулю</h3>
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
        const filteredContent = lessonData.content.content.filter((contentEl) => {
          return  contentEl.type === "image" || contentEl.type === "video" || contentEl.type === "audio";
        });



        const finalContentArray = addFilesToContent.filter((file) => {
          return filteredContent.find((contentFile) => {
            return contentFile.attrs.title === file.name;
          });
        });
        setDataToCreate((prevValue) => {
          return {...prevValue, lessons: prevValue.lessons ? [...prevValue.lessons, lessonData] : [lessonData]};
        });
        setSelectedFiles((prevValue) => {
          return [...prevValue, ...finalContentArray];
        });
        setAddLesson(false);
        // console.log([...selectedFiles, ...addFilesToContent]);
      }}>
        <span>Добавить урок</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}

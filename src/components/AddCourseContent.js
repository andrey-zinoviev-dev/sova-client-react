import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TipTapEditor from "./TipTapEditor";
export default function AddCourseContent({setContentEditIsOpened, formData, setFormData, selectedModule, selectedLesson, setSelectedLesson, setSelectedFiles}) {
  // console.log(selectedModule);
  //states
 

  return (
    <div style={{height: "calc(100% - 125px)"}}>
      <div className="addCourse__form-stepwrapper-content-edit" style={{display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 250}}>
        <button type="button" style={{backgroundColor: "transparent", fontSize: 20, color: "white", border: "none"}} onClick={() => {
          setContentEditIsOpened(false)
        }}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <p style={{margin: 0, fontSize: 18}}>Модуль - <span style={{color: "rgb(226, 100, 59)", fontWeight: 700}}>{selectedModule.title}</span></p>
      </div>
      {/* <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", margin: "0 0 25px 0"}}>
        <button type="button" onClick={() => {
          setContentEditIsOpened(false);  
        }} style={{minWidth: 35, minHeight: 35, borderRadius: "51%", border: "2px solid white", color: "white", backgroundColor: "transparent"}}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <p style={{margin: "0 0 0 15px"}}>Добавляем контент к уроку</p>
      </div>

      <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", fontSize: 20, maxWidth: 160}}>
        <span>{selectedModule.title}</span>
        {Object.keys(selectedLesson).length > 0 && <FontAwesomeIcon icon={faArrowRight}/>}
        {Object.keys(selectedLesson).length > 0 && <span>{selectedLesson.title}</span>}
      </div>
      {Object.keys(selectedLesson).length === 0 && <ul style={{margin: 0, padding: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", gap: 20, maxHeight: 500, overflow: "hidden auto"}}>
        {selectedModule.lessons.map((moduleLesson, index) => {
          return <li key={moduleLesson.title} onClick={() => {
            setSelectedLesson(moduleLesson);
          }} style={{boxSizing: "border-box", boxShadow: "3px 3px 5px rgb(0 0 0/50%)", fontSize: 18, textAlign: "left", backgroundColor: "#242827", borderRadius: 12, border: "2px solid rgb(226, 100, 59 / 0%)", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 60, padding: "10px 45px", position: "relative"}}>
            {moduleLesson.title}
          </li>
        })}
      </ul>} */}
      <TipTapEditor formData={formData} setFormData={setFormData} selectedModule={selectedModule} selectedLesson={selectedLesson} setSelectedLesson={setSelectedLesson} setSelectedFiles={setSelectedFiles}></TipTapEditor>  
      {/* <div style={{margin: "25px 0 0 0", display: "flex", alignItems: "stretch", justifyContent: "space-between", minHeight: 40, width: "100%", boxSizing: "border-box"}}> */}
        {/* <button type="button" whileHover={{backgroundColor: "rgb(226 100 59 / 100%)", color: "rgb(255 255 255 / 100%)"}} style={{  fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color:  "rgb(255 255 255 / 100%)", border: "2px solid rgb(226, 100, 59)"}}>Назад</button>
        <button type="button" onClick={(() => {
          console.log(formData); */}
        {/* })} whileHover={{backgroundColor: "rgb(226 100 59 / 100%)", color: "rgb(255 255 255 / 100%)"}} style={{ fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(255 255 255 / 100%)", border: "2px solid rgb(226, 100, 59)"}}>Далее</button>
      </div> */}
    </div>
  )
}
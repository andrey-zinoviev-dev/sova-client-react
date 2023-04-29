import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TipTapEditor from "./TipTapEditor";
export default function AddCourseContent({setContentEditIsOpened, formData, selectedModule}) {
  // console.log(selectedModule);
  //states
  const [selectedLesson, setSelectedLesson] = React.useState({});

  return (
    <div style={{margin: "0 0 auto 0"}}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 250, margin: "0 auto 25px 0"}}>
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
      <TipTapEditor></TipTapEditor>  
    </div>
  )
}
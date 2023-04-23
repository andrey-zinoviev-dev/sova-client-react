import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TipTapEditor from "./TipTapEditor";
export default function AddCourseContent({setContentEditIsOpened, formData, selectedModule}) {
  console.log(selectedModule);
  //states
  const [selectedLesson, setSelectedLesson] = React.useState({});

  return (
    <div>
      <button type="button" onClick={() => {
        setContentEditIsOpened(false);  
      }} style={{minWidth: 35, minHeight: 35, borderRadius: "51%", border: "2px solid white", color: "white", backgroundColor: "transparent"}}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h3>Добавляем контент к уроку</h3>
      <ul>
        {selectedModule.lessons.map((moduleLesson, index) => {
          return <li key={moduleLesson.title} onClick={() => {
            setSelectedLesson(moduleLesson);
          }}>
            {moduleLesson.title}
          </li>
        })}
      </ul>
      {Object.keys(selectedLesson).length > 0 && <TipTapEditor></TipTapEditor>}  
    </div>
  )
}
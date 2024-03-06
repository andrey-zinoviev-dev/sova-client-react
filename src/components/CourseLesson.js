import React from "react";
import { useParams } from "react-router-dom";
import { apiGetLesson } from "../api";
import TiptapReader from "./TiptapReader";

export default function CourseLesson() {
  const {courseID, moduleID, lessonID} = useParams();

  const token = localStorage.getItem("token");

  //states
  const [lesson, setLesson] = React.useState(null);
  // console.log(lesson);
  React.useEffect(() => {
    apiGetLesson(courseID, moduleID, lessonID, token)
    .then((data) => {
      setLesson(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    lesson && <section>
      <div>
        <p>Модуль {lesson.module.title}</p>
        <ul>
          {lesson.module.lessons.map((moduleLesson) => {
            return <li key={moduleLesson.title}>
              <button>{moduleLesson.title}</button>
            </li>
          })}
        </ul>
      </div>
    
      <h3 style={{color: "white"}}>{lesson.lesson.title}</h3>
      <TiptapReader content={lesson.lesson.content}></TiptapReader>
    
    </section>
  )
};
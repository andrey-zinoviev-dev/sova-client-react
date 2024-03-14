import React from "react";
import { useParams } from "react-router-dom";
import { apiGetLesson } from "../api";

import "./CourseLesson.css";
import LessonMenu from "./LessonMenu";
import LessonContent from "./LessonContent";

export default function CourseLesson() {
  const {courseID, moduleID, lessonID} = useParams();

  const token = localStorage.getItem("token");

  //states
  const [lesson, setLesson] = React.useState(null);

  // console.log("page reloaded");


  React.useEffect(() => {
    // console.log('ues');
    apiGetLesson(courseID, moduleID, lessonID, token)
    .then((data) => {
      setLesson(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [lessonID]);

  return (
    lesson && <section className="main__lesson">
      <LessonMenu courseID={courseID} lesson={lesson.lesson} module={lesson.module}/>
      <LessonContent students={lesson.students} author={lesson.author} lesson={lesson.lesson} module={lesson.module} />
      {/* <div className="main__lesson-content">
        <div className="main__lesson-content-wrapper">
          <div>
            <p className="main__lesson-content-wrapper-stage">Модуль {lesson.module.title} <FontAwesomeIcon icon={faArrowRight} /> Урок {lesson.lesson.title}</p>
            <ul>
              <li>
                <button>Контент</button>
              </li>
              <li>
                <button>Чат</button>
              </li>
            </ul>
          </div>

          <h3 style={{color: "white"}}>{lesson.lesson.title}</h3>
          <TiptapReader content={lesson.lesson.content}></TiptapReader>
          <button>Следующий урок</button>
        </div>

      </div> */}

    
    </section>
  )
};
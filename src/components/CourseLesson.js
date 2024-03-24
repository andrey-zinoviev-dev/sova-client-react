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

  React.useEffect(() => {
    const abortController = new AbortController();
    // console.log(abortControllerRef.current);
    const signal = abortController.signal;

    apiGetLesson(courseID, moduleID, lessonID, token, {signal: signal})
    .then((data) => {
      setLesson(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    return () => {
      abortController.abort();
    }
  }, [lessonID]);

  return (
    lesson && <section className="main__lesson">
      <LessonMenu courseID={courseID} lesson={lesson.lesson} module={lesson.module}/>
      <LessonContent courseID={courseID} students={lesson.students} author={lesson.author} lesson={lesson.lesson} module={lesson.module} />
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
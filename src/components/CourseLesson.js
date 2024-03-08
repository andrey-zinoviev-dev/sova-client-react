import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetLesson } from "../api";
import TiptapReader from "./TiptapReader";
import "./CourseLesson.css";
import sovaLogo from "../images/sova-logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function CourseLesson() {
  //navigate
  const navigate = useNavigate();
  
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
    lesson && <section className="main__lesson">
      <div className="main__lesson-menu">
        <div>
          <img src={sovaLogo} alt="логотип"></img>
          <p>{lesson.module.title}</p>
        </div>
        <ul>
          {lesson.module.lessons.map((moduleLesson) => {
            return <li key={moduleLesson.title}>
              <button>{moduleLesson.title}</button>
            </li>
          })}
        </ul>
        <button onClick={() => {
          navigate({
            pathname: `../courses/${courseID}`
          })
        }}>
          Назад к курсу
        </button>
      </div>
      <div className="main__lesson-content">
        <div className="main__lesson-content-wrapper">
          <div>
            <p>Модуль {lesson.module.title} <FontAwesomeIcon icon={faArrowRight} /> Урок {lesson.lesson.title}</p>
          </div>
          <div>
            <button>Контент</button>
            <button>Чат</button>
          </div>
          <h3 style={{color: "white"}}>{lesson.lesson.title}</h3>
          <TiptapReader content={lesson.lesson.content}></TiptapReader>
          <button>Следующий урок</button>
        </div>

      </div>

    
    </section>
  )
};
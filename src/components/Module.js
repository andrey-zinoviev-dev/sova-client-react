import React from "react";
import { useParams } from "react-router-dom";
import { apiGetModule } from "../api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Module.css";

export default function Module() {
  const navigate = useNavigate();

  const { courseID, moduleID} = useParams();

  const token = localStorage.getItem("token");

  const [moduleData, setModuleData] = React.useState(null);

  React.useEffect(() => {
    apiGetModule(courseID, moduleID, token)
    .then((data) => {
      setModuleData(data);
    })
  }, [])

  return (
    <section className="module">
      
      {/* <div className="course__programm">
            <div className="course__programm-module">
              <button className="course__programm-module-btn" onClick={() => {

                navigate({
                  pathname: `../courses/${courseID}`
                })
              }}>
 
                <p>Назад к модулям</p>
              </button>
            </div>
            {moduleData && <ul className="course__ul-lessons">{moduleData.lessons.map((lesson) => {
              return <li className="course__ul-lessons-li" key={lesson.title}>
                <p className="course__ul-lessons-li-p">{lesson.title}</p>
                <img className="course__ul-lessons-li-img" src={lesson.cover.path} alt={lesson.title}></img>
                <button onClick={() => {
                  navigate({
                    pathname: `/courses/${courseID}/modules/${moduleID}/lessons/${lesson._id}`,
                  })
                }} className="course__ul-lessons-li-btn">
                  <p>Открыть</p>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </li>
            })}</ul>}
          </div> */}
    </section>
  )
};
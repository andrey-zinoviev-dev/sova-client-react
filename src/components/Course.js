import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { apiGetCourse } from "../api";
import "./Course.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function Course() {
  //navigate
  const navigate = useNavigate();
  // //abortController
  // const abortController = new AbortController();
  const loggedInUser = React.useContext(UserContext);
  const token = localStorage.getItem("token");
  const {courseID} = useParams();

  //states
  const [course, setCourse] = React.useState({});
  const [moduleId, setModuleId] = React.useState("");

  //derived state
  const selectedModule = course.modules && course.modules.find((module) => {
    return module._id === moduleId;
  });

  React.useEffect(() => {
    apiGetCourse(courseID, token)
    .then((courseFetched) => {
      setCourse(courseFetched);
    })
  }, []);

  return(
    <section className="course">
      <div className="course_container">
        {Object.keys(course).length > 0 && 
        <>
          <div className="course__info">
            <div className="course__info-namedesc">
              {/* <div className="course__info-back">
                
              </div> */}
              <button className="course__info-back-btn" onClick={() => {
                navigate({
                  pathname: "/"
                });
              }}>
                  <FontAwesomeIcon className="course__info-back-btn-svg" icon={faArrowLeft} />
                  <p>Назад к курсам</p>
              </button>
              <h3 className="course__info-headline">{course.name}</h3>
              <p className="course__info-desc">{course.description}</p>
            </div>
            <img className="course__info-img" alt={course.name} src={course.cover.path}></img>
          </div>

          <div className="course__programm">
            <p className="course__p">Программа курса</p>
            <ul className="course__ul">
              {course.modules.map((module) => {
                return <li className="course__ul-li" key={module.title}>
                  <h3 className="course__ul-li-headline">{module.title}</h3>
                  <img className="course__ul-li-img" src={module.cover.path} alt={module.title}></img>
                  <p>Уроки: {module.lessons.length}</p>
                  <button className="course__ul-li-btn" onClick={() => {
                    navigate({
                      pathname: `../courses/${courseID}/modules/${module._id}`
                    })
                    // setModuleId(module._id);
                    // console.log(selectedModule)
                  }}>
                    <p>Открыть</p>
                    <FontAwesomeIcon style={{fontSize: 18}} icon={faArrowRight} />
                  </button>
                </li>
              })}
            </ul>
          </div>

          {/* {!selectedModule ? 

          :

          <div className="course__programm">
            <div className="course__programm-module">
              <button className="course__programm-module-btn" onClick={() => {
                setModuleId("");
              }}>
                <FontAwesomeIcon icon={faArrowLeft} />
                <p>Назад к модулям</p>
              </button>
              <p className="course__programm-module-p">{selectedModule.title} / Уроки</p>
            </div>
            <ul className="course__ul-lessons">{selectedModule.lessons.map((lesson) => {
              return <li className="course__ul-lessons-li" key={lesson.title}>
                <p className="course__ul-lessons-li-p">{lesson.title}</p>
                <img className="course__ul-lessons-li-img" src={lesson.cover.path} alt={lesson.title}></img>
                <button onClick={() => {
                  navigate({
                    pathname: `/courses/${courseID}/modules/${moduleId}/lessons/${lesson._id}`,
                  })
                }} className="course__ul-lessons-li-btn">
                  <p>Открыть</p>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </li>
            })}</ul>
          </div>

          } */}
        </>}
      </div>

    </section>
    

  )
}
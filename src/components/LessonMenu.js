import React from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import sovaLogo from "../images/sova-logo-white.png";
import { UserContext } from "../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export default function LessonMenu({ courseID, lesson, module }) {

  //logged in user
  const loggedInUser = React.useContext(UserContext);

  const navigate = useNavigate();
  const [menuClicked, setMenuClicked] = React.useState(false);

  return (
    <div className="main__lesson-menu">
      <div className="main__lesson-menu-nav">
        <img src={sovaLogo} alt="логотип"></img>
        <button onClick={() => {
          setMenuClicked((prevValue) => {
            return !prevValue;
          });
        }} className="main__lesson-menu-user-btn">
          {!menuClicked ? 
          <p>Меню</p>
          :
          <FontAwesomeIcon icon={faXmark} />}
        </button>
        <button className="main__lesson-menu-user-btn main__lesson-menu-user-btn-profile">
          <p>{loggedInUser.name[0]}</p>
        </button>
      </div>
      {menuClicked && <div className="main__lesson-menu-context">
        <h3>{module.title}</h3>
        <ul className="main__lesson-menu-context-ul">
          {module.lessons.map((moduleLesson) => {
            return <li className={`main__lesson-menu-context-ul-li`} key={moduleLesson.title}>
              <button className={`main__lesson-menu-context-ul-li-btn ${moduleLesson._id === lesson._id && 'main__lesson-menu-context-ul-li-btn_active'}`} onClick={() => {
                navigate({
                  pathname: `../courses/${courseID}/modules/${module._id}/lessons/${moduleLesson._id}`,
                })
                window.location.reload(true);
              }}>{moduleLesson.title}</button>
            </li>
          })}
        </ul>
        <div className="main__lesson-menu-context-buttons">
          <button onClick={() => {
            navigate({
              pathname: `../courses/${courseID}`,
              search: `?${createSearchParams({
                module: module._id
            })}`
            })
          }}>
            Назад к модулю
          </button>
          <button onClick={() => {
            navigate({
              pathname: `../courses/${courseID}`
            })
          }}>
            Назад к курсу
          </button>
        </div>
      </div>}
      {/* <div>
        <img src={sovaLogo} alt="логотип"></img>
        <p>{module.title}</p>
      </div>
      <ul>
        {module.lessons.map((moduleLesson) => {
          return <li key={moduleLesson.title}>
            <button onClick={() => {
              navigate({
                pathname: `../courses/${courseID}/modules/${module._id}/lessons/${moduleLesson._id}`,
              })
              window.location.reload(true);
            }}>{moduleLesson.title}</button>
          </li>
        })}
      </ul>
      <button onClick={() => {
        navigate({
          pathname: `../courses/${courseID}/modules/${module._id}`
        })
      }}>
        Назад к модулю
      </button>
      <button onClick={() => {
        navigate({
          pathname: `../courses/${courseID}`
        })
      }}>
        Назад к курсу
      </button> */}
  </div>
  )
}
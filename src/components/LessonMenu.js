import { Link, useNavigate } from "react-router-dom";
import sovaLogo from "../images/sova-logo-white.png";
export default function LessonMenu({ courseID, lesson, module }) {

  const navigate = useNavigate();
  return (
    <div className="main__lesson-menu">
      <div>
        <img src={sovaLogo} alt="логотип"></img>
        <p>{module.title}</p>
      </div>
      <ul>
        {module.lessons.map((moduleLesson) => {
          return <li key={moduleLesson.title}>
            {/* <Link to={`../courses/${courseID}/modules/${module._id}/lessons/${moduleLesson._id}`}>{moduleLesson.title}</Link> */}

            <button onClick={() => {
              navigate({
                pathname: `../courses/${courseID}/modules/${module._id}/lessons/${moduleLesson._id}`,
              })
              window.location.reload(true);
            }}>{moduleLesson.title}</button>
            {/* <Link to={`../courses/${courseID}/modules/${module._id}/lessons/${moduleLesson._id}`}>{moduleLesson.title}</Link> */}
          </li>
        })}
      </ul>
      <button onClick={() => {
        navigate({
          pathname: `../courses/${courseID}/modules/${module._id}`
        })
        // window.location.reload(true);
      }}>
        Назад к модулю
      </button>
      <button onClick={() => {
        navigate({
          pathname: `../courses/${courseID}`
        })
        // window.location.reload(true);
      }}>
        Назад к курсу
      </button>
  </div>
  )
}
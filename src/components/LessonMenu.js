import { useNavigate } from "react-router-dom";
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
  )
}
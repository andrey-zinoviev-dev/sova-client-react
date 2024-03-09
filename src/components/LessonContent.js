import React from "react"
import TiptapReader from "./TiptapReader"
import Chat from "./Chat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function LessonContent({ lesson, module }) {
  const [chatIsOpened, setChatIsOpened] = React.useState(false);

  return (
    <div className="main__lesson-content">
        <div className="main__lesson-content-wrapper">
          
          <div>
            <p className="main__lesson-content-wrapper-stage">Модуль {module.title} <FontAwesomeIcon icon={faArrowRight} /> Урок {lesson.title}</p>
            <ul>
              <li>
                <button onClick={() => {
                  setChatIsOpened(false);
                }}>Контент</button>
              </li>
              <li onClick={() => {
                  setChatIsOpened(true);
                }}>
                <button>Чат</button>
              </li>
            </ul>
          </div>
          {!chatIsOpened ? <>
            <h3 style={{color: "white"}}>{lesson.title}</h3>
            <TiptapReader content={lesson.content}></TiptapReader>
            <button>Следующий урок</button>
          </> 
          : 
          <>
            <Chat />
          </>}

        </div>
    </div>
  )
}
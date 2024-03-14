import React from "react"
import TiptapReader from "./TiptapReader"
import Chat from "./Chat"
import Contact from "./Contact"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../context/userContext"

export default function LessonContent({ lesson, module, students, author }) {
  //state
  const [chatIsOpened, setChatIsOpened] = React.useState(false);
  //logged in user
  const loggedInUser = React.useContext(UserContext);
  //derived state
  const contacts = loggedInUser.admin ? students : [author];

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
            <Chat>
              <div className="lesson__div-chat-contacts-wrapper">
                <h3>Контакты</h3>
                <ul className="lesson__div-chat-contacts">
                  {contacts.map((contact) => {
                    return <li className="lesson__div-chat-contacts-li" key={contact.name}>
                      <Contact contact={contact}/>
                    </li>
                  })}
                </ul>
              </div>

              <div>

              </div>
            </Chat>
          </>}

        </div>
    </div>
  )
}
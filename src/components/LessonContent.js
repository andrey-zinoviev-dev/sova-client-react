import React from "react"
import TiptapReader from "./TiptapReader"
import Chat from "./Chat"
import Contact from "./Contact"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../context/userContext"
import { useSearchParams } from "react-router-dom";

export default function LessonContent({ lesson, module, students, author }) {
  //search params
  const [searchParams] = useSearchParams();
  //state
  const [chatIsOpened, setChatIsOpened] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  //logged in user
  const loggedInUser = React.useContext(UserContext);
  //derived state
  const contacts = loggedInUser.admin ? students : [author];

  //refs
  const fileInputRef = React.useRef();

  //props callback
  function getUserMsgs(userId) {
    setSelectedUser(userId);
  }

  React.useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser])

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
                      <Contact contact={contact} getUserMsgs={getUserMsgs}/>
                    </li>
                  })}
                </ul>
              </div>

              <div className={`lesson__div-chat-contacts-convo ${selectedUser && 'chat-user'}`}>
                  {!selectedUser ? <p>Выберите чат</p> :
                  <>
                    <h3>{selectedUser.name}</h3>
                    <ul>

                    </ul>
                    <form>
                      <input ref={fileInputRef} type="file" style={{display: "none"}}></input>
                      <input placeholder="Написать сообщение..."></input>
                      <button type="button" onClick={() => {
                        fileInputRef.current.click();
                      }}>
                        <FontAwesomeIcon icon={faPaperclip} />
                      </button>
                      <button type="button">
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </button>
                    </form>
                  </>}
              </div>
            </Chat>
          </>}

        </div>
    </div>
  )
}
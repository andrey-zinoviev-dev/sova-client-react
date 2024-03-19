import React from "react"
import TiptapReader from "./TiptapReader"
import Chat from "./Chat"
import Contact from "./Contact"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../context/userContext"
import { useSearchParams } from "react-router-dom";
import { apiGetConversation } from "../api"
import FilePopup from "./FilePopup"

export default function LessonContent({ courseID, lesson, module, students, author }) {
  //token
  const token = localStorage.getItem("token");
  //search params
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("contactId");
  //state
  const [chatIsOpened, setChatIsOpened] = React.useState(false);
  const [messages, setMessages] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [openFilePopup, setOpenFilePopup] = React.useState(false);
  //logged in user
  const loggedInUser = React.useContext(UserContext);
  //derived state
  const contacts = loggedInUser.admin ? students : [author];
  const selectedUser = students.find((student) => {
    return student._id === userId;
  })
  //refs
  const fileInputRef = React.useRef();

  //functions
  function sendMessage() {
    console.log('message sent');
  };

  function changeFileInput() {
    setOpenFilePopup(true);
  }

  React.useEffect(() => {
    userId && apiGetConversation(token, userId, {course: courseID, module: module._id, lesson: lesson._id})
    .then((data) => {
      if(data.message) {
        throw new Error(data.message);
      } else {
        setChatIsOpened(true);
        setMessages(data.messages);
        setErrorMsg("");
      }
    })
    .catch((err) => {
      setMessages(null);
      setErrorMsg(err.message);
    })
  }, [userId])

  return (
    <>
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
                        <Contact contact={contact} />
                      </li>
                    })}
                  </ul>
                </div>

                <div className={`lesson__div-chat-contacts-convo ${userId && 'chat-user'}`}>
                    {!userId ? <p>Выберите чат</p> :
                    <>
                      <h3>{selectedUser.name}</h3>
                      <ul>
                        {!messages ? 
                          <li key="no messages">
                            <p>{errorMsg}</p>
                          </li>
                        :
                          messages.map((message) => {
                            return <li key={message._id}>{message.text}</li>
                          })
                        }
                      </ul>
                      <form onSubmit={(evt) => {
                        evt.preventDefault();
                        sendMessage();
                      }}>
                        <input onChange={changeFileInput} ref={fileInputRef} type="file" style={{display: "none"}}></input>
                        <input placeholder="Написать сообщение..."></input>
                        <button type="button" onClick={() => {
                          fileInputRef.current.click();
                        }}>
                          <FontAwesomeIcon icon={faPaperclip} />
                        </button>
                        <button type="submit">
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                      </form>
                    </>}
                </div>
              </Chat>
            </>}

          </div>
      </div>
      {openFilePopup && <FilePopup></FilePopup>}
    </>
  )
}
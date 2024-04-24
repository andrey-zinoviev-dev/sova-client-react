import React from "react"
import TiptapReader from "./TiptapReader"
import Chat from "./Chat"
import Contact from "./Contact"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../context/userContext"
import { createSearchParams, useSearchParams } from "react-router-dom";
import { apiGetConversation, apiSendMessage, apiSendFileInMessage, apiReadFileInMessage } from "../api"
const FilePopup = React.lazy(() => {
  return import("./FilePopup")
});

// const AddCourse = React.lazy(() => import('./components/AddCourse'));


export default function LessonContent({ socket, courseID, lesson, module, students, author }) {
  // console.log(socket);
  //token
  const token = localStorage.getItem("token");
  //search params
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("contactId");
  //state
  const [chatIsOpened, setChatIsOpened] = React.useState(false);
  const [messages, setMessages] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  //logged in user
  const loggedInUser = React.useContext(UserContext);
  //derived state
  const contacts = loggedInUser.admin ? students : [author];
  const selectedUser = loggedInUser.admin ? students.find((student) => {
    return student._id === userId;
  }) : author;
  //refs
  const fileInputRef = React.useRef();
  const messageInputRef = React.useRef();
  const chatFormRef = React.useRef();

  //functions
  // function readMsg() {
  //   console.log('yes');
  // }

  function sendMessage() {
    // const formData = new FormData();
    // formData.append('messageData', JSON.stringify({text: messageInputRef.current.value, from: loggedInUser._id, to: selectedUser._id, location: {course: courseID, module: module._id, lesson: lesson._id}}));
    // selectedFile && formData.append("file", selectedFile);
    apiSendMessage(token, {text: messageInputRef.current.value, from: loggedInUser._id, to: selectedUser._id, location: {course: courseID, module: module._id, lesson: lesson._id}})
    .then((data) => {
      // console.log(socket);
      socket.emit("message", data);
      // console.log(data);
      setMessages((prevValue) => {
        return prevValue === null ? [data] : [...prevValue, data];
      });
      setSelectedFile(null);
      chatFormRef.current.reset();
    })
  };

  function sendFile(file) {
    const formData = new FormData();
    formData.append("messageData", JSON.stringify({from: loggedInUser._id, to: selectedUser._id, location: {course: courseID, module: module._id, lesson: lesson._id}}));
    formData.append("file", selectedFile);
    apiSendFileInMessage(token, formData)
    .then((data) => {
      console.log(data);
      if(data.message) {
        return;
      } else {
        apiReadFileInMessage(token, data._id, createSearchParams({from: loggedInUser._id, to: selectedUser._id, location: JSON.stringify({course: courseID, module: module._id, lesson: lesson._id})}))
        .then((fileMessage) => {
          setMessages((prevValue) => {
            return prevValue === null ? [fileMessage] : [...prevValue, fileMessage];
          });
          setSelectedFile(null);
          fileInputRef.current.reset();
        })
      }
    })
  }

  function changeFileInput(evt) {
    // setOpenFilePopup(true);
    setSelectedFile(evt.target.files[0]);
  };

  function cancelFile() {
    setSelectedFile(null);
  }

  React.useEffect(() => {
    userId && apiGetConversation(token, userId, {course: courseID, module: module._id, lesson: lesson._id})
    .then((data) => {
      setChatIsOpened(true);
      if(data.message) {
        throw new Error(data.message);
      } else {
        setMessages(data);
        setErrorMsg("");
      }
    })
    .catch((err) => {
      setMessages(null);
      setErrorMsg(err.message);
    })
  }, [userId]);

  React.useEffect(() => {
    //funtions
    function readMsg(value) {
      setMessages((prevValue) => {
        return [...prevValue, value];
      })
    };

    function sendHomework(value) {
      // console.log(value);
      apiSendMessage(token, {text: `${selectedUser.name} отправляет задание`, from: loggedInUser._id, to: selectedUser._id, location: {course: courseID, module: module._id, lesson: lesson._id}})
      .then((data) => {
        setMessages((prevValue) => {
          return [...prevValue, data]
        })
      })
      // value && setMessages((prevValue) => {
      //   return [...pre]
      // })
    };

    socket.on("private message", readMsg);
    socket.on("sent homework", sendHomework);

    return () => {
      socket.off("private message", readMsg);
      socket.off("sent homework", sendHomework);
    }
  }, [socket.id]);

  // console.log(lesson);

  return (
    <>
        <div className="main__lesson-content">
          <div className="main__lesson-content-wrapper">
            
            <div>
              <p className="main__lesson-content-wrapper-stage">Модуль {module.title} <FontAwesomeIcon icon={faArrowRight} /> Урок {lesson.title}</p>
              <ul className="">
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
                      return <li style={{backgroundColor: selectedUser && contact._id === selectedUser._id && "#5DB0C7"}} className="lesson__div-chat-contacts-li" key={contact.name}>
                        <Contact contact={contact} selectedUser={selectedUser}/>
                      </li>
                    })}
                  </ul>
                </div>

                <div className={`lesson__div-chat-contacts-convo ${userId && 'chat-user'}`}>
                    {!userId ? <p>Выберите чат</p> :
                    <>
                      <h3>{selectedUser.name}</h3>
                      <ul className="lesson__div-chat-contacts-convo-messages">
                        {!messages ? 
                          <li key="no messages">
                            <p>{errorMsg}</p>
                          </li>
                        :
                          messages.map((message) => {
                            return <li key={message._id} style={{alignSelf: message.user === loggedInUser._id && "flex-end"}} className={message.files.length === 0 && 'lesson__div-chat-contacts-convo-messages-li-text'}>
                              <p>{message.text}</p>

                              {message.files.length > 0 && message.files[0].type.includes("image") && <img src={message.files[0].path}></img>} 
                              {message.files.length > 0 && message.files[0].type.includes("video") && <video src={message.files[0].path} controls muted/>}
                            </li>
                          })
                        }
                      </ul>
                      <div className="lesson__div-chat-contacts-convo-div">
                        <div className="lesson__div-chat-contacts-convo-div-homework">
                          {
                            loggedInUser.admin ? 
                            <>
                              <button onClick={() => {
                                console.log("accept work")
                              }}>Принять задание</button>
                              <button onClick={() => {
                                console.log("reject work");
                              }}>Отклонить задание</button>
                            </> 
                            : 
                            <>
                              <button onClick={() => {
                                socket.emit("send homework", {to: author, sendHomework: true})
                              }}>Отправить задание</button>
                            </>
                          }

                        </div>
                        <form ref={chatFormRef} onSubmit={(evt) => {
                          evt.preventDefault();
                          sendMessage();
                        }}>
                          <input onChange={changeFileInput} ref={fileInputRef} type="file" style={{display: "none"}}></input>
                          <input ref={messageInputRef} name="message" placeholder="Написать сообщение..."></input>
                          <button type="button" onClick={() => {
                            fileInputRef.current.click();
                          }}>
                            <FontAwesomeIcon icon={faPaperclip} />
                          </button>
                          <button type="submit">
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </button>
                        </form>
                      </div>
                    </>}
                </div>
              </Chat>
            </>}

          </div>
      </div>
      {selectedFile && <React.Suspense fallback={<p>загрузка</p>}>
        <FilePopup selectedFile={selectedFile} cancelFile={cancelFile} sendFile={sendFile}></FilePopup>
      </React.Suspense>}
    </>
  )
}
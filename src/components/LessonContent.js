import React from "react"
import TiptapReader from "./TiptapReader"
import Chat from "./Chat"
import Contact from "./Contact"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight, faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../context/userContext"
import { createSearchParams, useSearchParams } from "react-router-dom";
import { apiGetConversation, apiSendMessage, apiSendFileInMessage, apiReadFileInMessage } from "../api"
import "./LessonContent.css";
import { useLocation, useNavigate } from "react-router-dom"
const FilePopup = React.lazy(() => {
  return import("./FilePopup")
});
// const AddCourse = React.lazy(() => import('./components/AddCourse'));


export default function LessonContent({ socket, courseID, lesson, setLesson, module, students, users, author }) {
  // console.log(socket);
  //location
  const location = useLocation();
  const navigate = useNavigate();
  //token
  const token = localStorage.getItem("token");
  //search params
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("contactId");
  //state
  const [chatIsOpened, setChatIsOpened] = React.useState(false);
  const [messages, setMessages] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  // const [contacts, setContacts] = React.useState([]);
  //logged in user
  const loggedInUser = React.useContext(UserContext);

  //derived state
  // console.log(users, students);

  const contacts = loggedInUser.admin ? 
    students.map((student) => {
      return student.courses.find(({id}) => {
          return id === courseID;
      }) && student.courses.find(({id}) => {
        return id === courseID;
    }).contacts.includes(author.email) && author.email === loggedInUser.email ? {...student, vip: true} : student;
    })
    : 
    students.filter((student) => {
      const arrayToSearch = loggedInUser.courses.find((course) => {
        return course.id === courseID;
      }).contacts;
      // console.log(arrayToSearch);
      return arrayToSearch.find((arrayEl) => {
        return arrayEl === student.email;
      });
    });
  // console.log(contacts);
  // const contacts = !loggedInUser.admin ? students.filter((student) => {
  //   const arrayToSearch = loggedInUser.courses.find((course) => {
  //     return course.id === courseID;
  //   }).contacts;
  //   // console.log(arrayToSearch);
  //   return arrayToSearch.find((arrayEl) => {
  //     return arrayEl === student.email;
  //   });
  // })

  // :
  // console.log(students);
  // students.map((student) => {
  //   return student.courses.find(({id}) => {
  //       return id === courseID;
  //   }).contacts.includes(author.email) && author.email === loggedInUser.email ? {...student, vip: true} : student;
  // });

  const selectedUser = loggedInUser.admin ? students.find((student) => {
    return student._id === userId;
  }) : contacts.find((contact) => {
    return contact._id === userId;
  });
  console.log(loggedInUser);
  console.log(contacts);
  //refs
  const fileInputRef = React.useRef();
  const messageInputRef = React.useRef();
  const chatFormRef = React.useRef();
  const messagesUlref = React.useRef();

  //functions
  // function readMsg() {
  //   console.log('yes');
  // }

  function sendMessage(messageText) {
    // const formData = new FormData();
    // formData.append('messageData', JSON.stringify({text: messageInputRef.current.value, from: loggedInUser._id, to: selectedUser._id, location: {course: courseID, module: module._id, lesson: lesson._id}}));
    // selectedFile && formData.append("file", selectedFile);

    // messageInputRef.current.value

    apiSendMessage(token, {text: messageText, from: loggedInUser._id, to: selectedUser._id, location: {course: courseID, module: module._id, lesson: lesson._id}})
    .then((data) => {
      // console.log(socket);
      socket.emit("message", data);
      // console.log(data);
      setMessages((prevValue) => {
        return prevValue === null ? [data] : [...prevValue, data];
      });
      // setSelectedFile(null);
      chatFormRef.current.reset();
    })
  };

  function sendFiles(files, caption) {
    const filesToSend = files.map((file) => {
      return {title: file.file.name, type: file.file.type};
    });
    // console.log(filesToSend);
    return apiSendFileInMessage(token, {filesToSend: filesToSend, from: loggedInUser._id, to: selectedUser._id, location: {course: courseID, module: module._id, lesson: lesson._id}})
    // console.log(filesToSend);
    // console.log(caption);
    // console.log(filesToSend);

    // const dataToSend = 

    // apiSendFileInMessage(token, {filesToSend: filesToSend, from: loggedInUser._id, to: selectedUser._id, location: {course: courseID, module: module._id, lesson: lesson._id}})
    
    // console.log(files);
    // const formData = new FormData();
    // formData.append("messageData", JSON.stringify({from: loggedInUser._id, to: selectedUser._id, location: {course: courseID, module: module._id, lesson: lesson._id}}));
    // formData.append("file", selectedFile);
    // apiSendFileInMessage(token, formData)
    // .then((data) => {
    //   // console.log(data);
    //   if(data.message) {
    //     return;
    //   } else {
    //     apiReadFileInMessage(token, data._id, createSearchParams({from: loggedInUser._id, to: selectedUser._id, location: JSON.stringify({course: courseID, module: module._id, lesson: lesson._id})}))
    //     .then((fileMessage) => {
    //       socket.emit("message", fileMessage);
    //       setMessages((prevValue) => {
    //         return prevValue === null ? [fileMessage] : [...prevValue, fileMessage];
    //       });
    //       setSelectedFile(null);
    //       fileInputRef.current.reset();
    //     })
    //   }
    // })
  }

  function changeFileInput(evt) {
    // console.log(evt.target.files);
    // setOpenFilePopup(true);
    // setSelectedFile(evt.target.files[0]);
    const files = Array.from(evt.target.files).map((file) => {
      const url = window.URL.createObjectURL(file);
      return {file: file, clientPath: url, title: file.name};
    })
    setSelectedFiles((prevValue) => {
      return [...prevValue, ...files];
    })
  };

  function cancelFile() {
    setSelectedFiles([]);
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
      setLesson((prevValue) => {
        const updatedStudents = prevValue.students.map((student) => {
          return (student._id === value.user && userId !== value.user) ? {...student, notif: student.notif + 1} : student;
        });
        return {...prevValue, students: updatedStudents};
      })
      value.user === userId && setMessages((prevValue) => {
        return [...prevValue, value];
      })
    };

    socket.on("private message", readMsg);

    return () => {
      socket.off("private message", readMsg);
    };

  }, [socket.id, userId]);

  React.useEffect(() => {
    if(messagesUlref.current) {
      // console.log(messagesUlref.current);
      messagesUlref.current.scrollTop = messagesUlref.current.scrollHeight
    }
  }, [messages])

  // console.log(lesson);

  return (
    <>
        <div className="main__lesson-content">
          <div className="main__lesson-content-wrapper">
            
            <div>
              <p className="main__lesson-content-wrapper-stage">Модуль {module.title} <FontAwesomeIcon icon={faArrowRight} /> Урок {lesson.title}</p>
              {contacts.length > 0 && <ul className="main__lesson-content-wrapper-navigation">
                <li>
                  <button className={`main__lesson-content-wrapper-navigation-btn ${!chatIsOpened && 'main__lesson-content-wrapper-navigation-btn_active-button'}`} onClick={() => {
                    setChatIsOpened(false);
                    // console.log(location);
                    navigate(location.pathname)
                  }}>Контент</button>
                </li>
                <li>
                  <button onClick={() => {
                    setChatIsOpened(true);
                  }} className={`main__lesson-content-wrapper-navigation-btn ${chatIsOpened && 'main__lesson-content-wrapper-navigation-btn_active-button'}` }>Чат</button>
                </li>
              </ul>}
            </div>

            {!chatIsOpened ? <>
              <h3 style={{color: "white"}}>{lesson.title}</h3>
              <TiptapReader content={lesson.content}></TiptapReader>
              {/* <button>Следующий урок</button> */}
            </> 
            : 
            <>
              <Chat>
                <div className={`lesson__div-chat-contacts-wrapper ${userId && 'lesson__div-chat-contacts-wrapper_hidden'}`}>
                  <h3>Контакты</h3>
                  <ul className="lesson__div-chat-contacts">
                    {contacts.map((contact) => {
                      return <li style={{backgroundColor: selectedUser && contact._id === selectedUser._id && "#5DB0C7"}} className="lesson__div-chat-contacts-li" key={contact.email}>
                        <Contact setLesson={setLesson} contact={contact} selectedUser={selectedUser}/>
                      </li>
                    })}
                  </ul>
                </div>

                <div className={`lesson__div-chat-contacts-convo ${userId && 'lesson__div-chat-contacts-convo_active chat-user'}`}>
                    {!userId ? <p>Выберите чат</p> :
                    <>
                      <div className="lesson__div-chat-contacts-convo-back">
                        <button onClick={() => {
                          navigate(location.pathname);
                        }}>
                          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                        </button>
                        <span className="lesson__div-chat-contacts-convo-contact">{selectedUser.name}</span>
                      </div>
                      <ul ref={messagesUlref} className="lesson__div-chat-contacts-convo-messages">
                        {!messages ? 
                          <li key="no messages">
                            <p>{errorMsg}</p>
                          </li>
                        :
                          <>
                            {/* <span></span> */}
                            {messages.map((message) => {
                              return <li key={message._id} style={{alignSelf: message.user === loggedInUser._id && "flex-end"}} className={message.files.length === 0 ? 'lesson__div-chat-contacts-convo-messages-li-text lesson__div-chat-contacts-convo-messages-li' : "lesson__div-chat-contacts-convo-messages-li"}>
                                <p>{message.text}</p>
                                {message.files.length > 0 && 
                                <ul className="lesson__div-chat-contacts-convo-messages-files">
                                  {message.files.map((file) => {
                                    // console.log(file);
                                    return <li key={file.title} style={{flexDirection: file.type.includes("audio") && "column"}}>
                                      {file.type.includes("image") && 
                                      <img alt={file.title} onLoad={() => {
                                        messagesUlref.current.scrollTop = messagesUlref.current.scrollHeight
                                      }} src={file.path}>
                                      </img>}
                                      {file.type.includes("video") && <video onLoad={() => {
                                        messagesUlref.current.scrollTop = messagesUlref.current.scrollHeight
                                      }} src={file.path} controls contextMenu="return false" controlslist="nodownload"/>}
                                      {
                                        file.type.includes("audio") && 
                                        <>
                                          <audio onLoad={() => {
                                            messagesUlref.current.scrollTop = messagesUlref.current.scrollHeight
                                          }} controls src={file.path} type={file.type}>
                                          </audio> 
                                          <span style={{boxSizing: "border-box", textAlign: "left", padding: "5px 10px"}}>{file.title}</span>
                                        </>

                                      }
                                    </li>
                                  })}
                                </ul>}
                                {/* {message.files.length > 0 && message.files[0].type.includes("image") && <img alt={message.files[0].name} onLoad={() => {
                                  messagesUlref.current.scrollTop = messagesUlref.current.scrollHeight
                                }} src={message.files[0].path}>
                                </img>} 
                                {message.files.length > 0 && message.files[0].type.includes("video") && <video onLoad={
                                  messagesUlref.current.scrollTop = messagesUlref.current.scrollHeight
                                } src={message.files[0].path} controls muted/>} */}
                              </li>
                            })}
                            <div></div>
                          </>

                        }
                      </ul>
                      <div className="lesson__div-chat-contacts-convo-div">
                        <div className="lesson__div-chat-contacts-convo-div-homework">
                          {
                            loggedInUser.admin ? 
                            <>
                              <button onClick={() => {
                                sendMessage(`${loggedInUser.name} принимает задание`)
                              }}>Принять задание</button>
                              <button onClick={() => {
                                sendMessage(`${loggedInUser.name} отклоняет задание`)
                              }}>Отклонить задание</button>
                            </> 
                            : 
                            <>
                              <button onClick={() => {
                                sendMessage(`${loggedInUser.name} отправляет задание`)
                                // socket.emit("send homework", {to: author, sendHomework: true})
                              }}>Отправить задание</button>
                            </>
                          }

                        </div>
                        <form ref={chatFormRef} onSubmit={(evt) => {
                          evt.preventDefault();
                          sendMessage(messageInputRef.current.value);
                        }}>
                          <input onChange={changeFileInput} multiple ref={fileInputRef} type="file" style={{display: "none"}}></input>
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
      {selectedFiles.length > 0 && <React.Suspense fallback={<p>загрузка</p>}>
        <FilePopup socket={socket} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} cancelFile={cancelFile} sendFiles={sendFiles} setMessages={setMessages}></FilePopup>
      </React.Suspense>}
    </>
  )
}
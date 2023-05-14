import './CourseModule.css';
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { apiGetLesson, apiGetUserMessages, apiSendMessage } from "../api";
import { UserContext } from '../context/userContext';
import Chat from './Chat';
// import { SocketContext } from "../socketio/socketIO";
import './CourseModule.css';
import io, { Socket } from 'socket.io-client';
import SovaLogo from '../images/sova_logo_icon.png';
import Contacts from './Contacts';
import MessageForm from './MessageForm';
import Messages from './Messages';
import ModuleSide from './ModuleSide';
import { NavLink, useLocation } from "react-router-dom";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
// import { generateHTML } from '@tiptap/react';
import { Node, mergeAttributes } from "@tiptap/react";
// import Messages from './Messages';

export default function CourseModule(props) {
  // const socket = React.useContext(SocketContext);
  const userToken = localStorage.getItem('token');
  const sessionStorage = localStorage.getItem('sessionID');

  const {courseID, moduleID, lessonID} = useParams();
  
  // const [courseAuthor, setCourseAuthor] = React.useState({});
  const [courseModule, setCourseModule] = React.useState({});
  const [moduleLesson, setModuleLesson] = React.useState({});
  const [messages, setMessages] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [menuOpened, setMenuOpened] = React.useState(false);
  const [chatIsOpened, setChatIsOpened] = React.useState(false);
  const [adminIsOnline, setAdminIsOnline] = React.useState(false);
  const [userId, setUserId] = React.useState("");

  const [editable, setEditable] = React.useState(false);

  //variables derived from courseModule state variable
  const admin = courseModule._id ? {...courseModule.course.author, online: adminIsOnline} : {};
  // const filteredMessages = messages.filter((message) => {
  //   return message.user._id === studentId;
  // });

  //crete Video extension
  const Video = Node.create({
    name: "video",
    group: "block",
    selectable: "true",
    atom: "true",
    parseHTML() {
      return [
        {
          tag: "video",
        },
      ]
    },
    addAttributes() {
      return {
        "src": {
          default: null,
        },
        "controls" : {
          default: true,
        },
        "controlsList": {
          default: "nodownload",
        },
        "oncontextmenu": {
          default: "return false"
        },
        "title": {
          default: null,
        }
      }
    },
    renderHTML({HTMLAttributes}) {
      return ['video', mergeAttributes(HTMLAttributes)];
    },
  });

  //editor
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "module-text"
      },
    },
    editable,
    extensions: [
      StarterKit,
      Image,
      Video,
      // Placeholder.configure({
      //   placeholder: "Здесь можно написать контент для курса",
      // })
    ],
    content: '',
    // onUpdate: ({ editor }) => {
    //   setFormData({...formData, module: {
    //     ...formData.module,  text: editor.getJSON()
    //   }});
    // }
  });

  const selectedStudent = students.find((student) => {
    return student._id === userId;
  })

  //history
  const location = useLocation();
  const { state } = location;
  const { selectedCourse } = state;
  
  //Context
  const loggedInUser = React.useContext(UserContext);

  //functions
  function showSideMenu() {
    setMenuOpened(!menuOpened);
  };

  function openChat() {
    setChatIsOpened(true);
  }

  function closeChat() {
    setChatIsOpened(false);
  };

  function filterChatToUser(userId) {
    // console.log(userId);
    // console.log(userId);
    setUserId(userId);
    // console.log(filteredMessages);
  };

  function resetContact() {
    setUserId("");
  }

  function sendMessage(obj, formRef) {
    
    apiSendMessage(userToken, obj)
    .then((message) => {
      console.log(message);
      setMessages((prevValue) => {
        return [...prevValue, message];
      });

      //uncomment futher!!!
      socket.current.emit('message', message);
      
      formRef.reset();
    });
  };

  //variants


  const menuVariantsMobile = {

  }

  const textVariants = {
    closed: { opacity: 0, transition: {duration: 0.45, ease: "easeInOut"}},
    opened: { opacity: 1, transition: {duration: 0.45, ease: "easeInOut"}}
  };

  const imgVariants = {
    closed: {opacity: 0, transition: {duration: 0.25, ease: "linear"}},
    opened: {opacity: 1, transition: {duration: 0.25, ease: "linear"}}
  };

  const sideContentVariants = {
    closed: {transition: {staggerChildren: 0.5, staggerDirection: -1}},
    opened: {transition: {staggerChildren: 0.5, staggerDirection: 1}},
  };

  const linkVariants = {
    closed: {opacity: 0, transition: {duration: 0.5}},
    opened: {opacity: 1, transition: {duration: 0.5}},
  };

  const contentVariants = {
    closed: {transition: {duration: 0.5, ease: "easeInOut"}},
    opened: {transition: {duration: 0.5, ease: "easeInOut"}},
  }

  //socket io ref
  const socket = React.useRef(null);
  
  //functions
  // function updateFormData(evt, user) {
  //   const { name, value } = evt.target;
    
  //   setMessageData({...messageData, [name]: value, from: props.user._id, to: user});
  // }

  // function sendMessage(evt) {
  //   props.submitForm(evt);
  //   socket.current.emit('message', messageData);
  //   console.log(messageData);
  //   // console.log(props.user._id);
  //   const newMessages = [...messages, messageData];
    
  //   //send messages to server
  //   apiSendMessage(moduleID, userToken, messageData)
  //   .then((data) => {
  //     console.log(data);
  //     setMessages(newMessages);
  //     evt.target.reset();
  //   });
  // }

  //useEffect
  // React.useEffect(() => {
    
  //   const userToken = localStorage.getItem('token');

  //     apiGetCourse(courseID, userToken)
  //     .then((course) => {
        
  //       const newCourseData = Object.assign({}, course);
  //       //set course author

  //       setCourseAuthor({...course.author, online: false});

  //       setCourseData(newCourseData);

  //       const moduleIndex = newCourseData.modules.findIndex((module) => {
  //         return module._id === moduleID;
  //       });
  //       const module = newCourseData.modules[moduleIndex];
  //       const newModule = Object.assign({}, module);
        
  //       //set students
  //       const offlineStudents = module.students.map((student) => {
  //         return {...student, online: false};
  //       });

  //       // studentsRef.current = offlineStudents;
  //       setStudents(offlineStudents);
  //       setModule(newModule);

  //       const newImages = [...module.images];
  //       setModuleImages(newImages);
  //     });


  //   }
  // }, []);

  //socket io use effect
  // React.useEffect(() => {
  //   if(props.user._id && courseAuthor._id && students.length > 0) {
  //     //get user messages
  //     apiGetUserMessages(moduleID, userToken)
  //     .then((data) => {
  //       // console.log(data);
  //       setMessages([ ...messages, ...data ]);
  //       // props.user._id 
  //     });


  //     //socket io
  //     socket.current = io('http://localhost:3000');
     
  //     if(sessionStorage) {
  //       socket.current.auth = { localsessionID: sessionStorage };
  //       socket.current.connect();
  //     };
      
  //     socket.current.emit('userConnected', props.user);
      
  //     socket.current.on('session', ({ sessionID, userID, users }) => {
        
  //       localStorage.setItem('sessionID', sessionID);
  //       socket.current.userID = userID;
  //       socket.current.username = props.user.name;
        
  //       // console.log(users);
        
  //       if(userID === courseAuthor._id) {
  //       //   console.log(authorRef.current);

  //         // console.log('show students which are online here');
  //         const onlineStudents = students.map((student) => {
  //           const foundOnlineUser = users.find((user) => {
  //             return student._id === user.userID;
  //           });
  //           if(foundOnlineUser) {
  //             return {...student, online: foundOnlineUser.online};
  //           }
  //           return student;
  //         });
          
  //       //   studentsRef.current = onlineStudents;
  //         setStudents(onlineStudents);

  //       } else {
  //         // console.log('show author which is online here');
  //         setCourseAuthor({...courseAuthor, online: true});
  //       }

  //     });
  //     socket.current.on('user is online', (({ userID, username, online, users }) => {
  //       if(userID === courseAuthor._id) {
  //         console.log('author is online');
  //         setCourseAuthor((prevValue) => {
  //           return {...prevValue, online: true};
  //         })
  //       //   authorRef.current = {...authorRef.current, online: true};
  //       //   setCourseAuthor(authorRef.current);
  //       } else {
  //         // console.log(`${userID} ${username} is ${online}`);
  //         const studentToUpdate = students.findIndex((student) => {
  //           return student._id === userID;
  //         });
  //         students[studentToUpdate] = {...students[studentToUpdate], online: true};
  //         setStudents(students);
  //       //   console.log(studentToUpdate);
  //       //   studentsRef.current[studentToUpdate] = {...studentsRef.current[studentToUpdate], online: true};
  //       //   console.log(studentsRef.current);
  //       //   setStudents(studentsRef.current);
          
  //       }
  //     }));

  //     socket.current.on('user is offline', ({ userID, username }) => {
        
  //       if(userID === courseAuthor._id) {
  //         setCourseAuthor((prevValue) => {
  //           return {...prevValue, online: false};
  //         });
  //       } else {
  //           // students[studentToLogOut] = {...students[studentToLogOut], online: false};
  //           const updatedStudents = students.map((student) => {
  //             if(student._id === userID) {
  //               return {...student, online: false};
  //             }
  //             return student;
  //           });
  //           setStudents(updatedStudents);
  //       }

  //     });
      
  //     // socket.current.on('private message', (data) => {
  //     //   // console.log(data);
  //     //   setMessages((prevValue) => {
  //     //     return [...prevValue, data];
  //     //   })
  //     // })

  //     return () => {
  //       socket.current.off('session');
  //       socket.current.off('user is online');
  //       // socket.current.off('private message');
  //       socket.current.close();
  //     };
  //   }
    
  // }, [props.user._id, courseAuthor._id]);
  // console.log(lessonID);
  React.useEffect(() => {
    // console.log(userToken);
    if(loggedInUser._id) {
      apiGetLesson(courseID, moduleID, lessonID, userToken)
      .then((doc) => {
        console.log(doc);
        editor.commands.setContent(doc.layout);
      })
    }
    // if(userToken && loggedInUser._id) {
    //   apiGetCourseModule(moduleID, userToken)
    //   .then((moduleData) => {
    //     // console.log(moduleData);
    //     setCourseModule(moduleData);
    //     setModuleLesson(moduleData.lessons.find((lesson) => {
    //       return lesson._id === lessonID;
    //     }))
    //     // editor.commands.setContent(moduleData.layout);
    //     // localStorage.setItem('')
    //     // setCourseAuthor(moduleData.course.author);
    //     setStudents(moduleData.students);
    //   });

      // apiGetUserMessages(moduleID, userToken)
      // .then((messagesData) => {
      //   setMessages(messagesData);
      // })
    // }

    

  }, [moduleID, loggedInUser._id, editor]);

  // React.useEffect(() => {
  //   console.log(moduleLesson);
  // }, [moduleLesson]);

  React.useEffect(() => {
    // socket.current = io('http://api.sova-courses.site');
    socket.current = io('http://localhost:3000');
    
    if(loggedInUser._id && admin._id && students.length > 0) { 
      // console.log('yes');
   
      if(sessionStorage) {
        socket.current.auth = { localsessionID: sessionStorage };
        socket.current.connect();
      };

      socket.current.emit('userConnected', loggedInUser);
  
      socket.current.on('session', ({ sessionID, userID, users }) => {
        // console.log(sessionID);
        localStorage.setItem('sessionID', sessionID);
        socket.current.userID = userID;
        socket.current.username = loggedInUser.name;
        if(loggedInUser.admin) {
          
          const onlineUsers = users.filter((user) => {
            return user.online && user.userID !== loggedInUser._id;
          });

          const onlineStudents = students.map((student) => {
            const onlineStudent = onlineUsers.find((onlineUser) => {
              return onlineUser.userID === student._id;
            });
            
            return onlineStudent && onlineStudent.userID === student._id ? {...student, online: true} : student; 
          });
          setStudents(onlineStudents);

        } else {
         
          const adminOnline = users.find((user) => {
            return user.userID === admin._id && user.online;
          });
          adminOnline && setAdminIsOnline(true);

        }
      });
  
      socket.current.on('user is online', (({ userID, username, online}) => {
        if(loggedInUser.admin) {


          const onlineStudents = students.map((student) => {
            return student._id === userID ? {...student, online: true} : student;
          });

          setStudents(onlineStudents);
      
        } else {
          setAdminIsOnline(true);

        }
        

      }));

      socket.current.on('private message', (data) => {
        setMessages((prevValue) => {
          return [...prevValue, data];
        });
      });
  
      //remove socket connection on component not rendered
      return () => {
        socket.current.off('session');
        socket.current.off('user is online');
        socket.current.off('private message');
        socket.current.close();
      }
    }

  }, [sessionStorage, loggedInUser._id, students.length, admin._id]);

  // React.useEffect(() => {
  //   console.log(editor, courseModule.layout);
  //   if(editor) {
  //     editor.commands.setContent(courseModule.layout);
  //   }
    
  // }, [editor, courseModule.layout])

  return (
    <motion.section className='module'>
      
      {/* <motion.div className='module__menu' initial="closed" animate={menuOpened ? "opened" : "closed"} variants={menuVariants}>
        <div style={{position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 0 20px 0", minHeight: 59}}>
          <motion.img initial="closed" animate={menuOpened ? "opened" : "closed"} variants={imgVariants} style={{maxWidth: '30px', margin: "0px 0px 0px 20px"}} src={SovaLogo} alt="Логотип"></motion.img>
          <motion.button whileHover={{backgroundColor: "rgba(255, 255, 255, 1)"}} onClick={showSideMenu} style={{backgroundColor: "rgba(255, 255, 255, 0)", border: "none"}}>
            <FontAwesomeIcon icon={faSquareCaretDown} style={{fontSize: '30px'}}/>
          </motion.button>
        </div>
        
        <motion.div  variants={sideContentVariants} style={{width: 360, display: "flex", opacity: menuOpened ? 1 : 0, flexDirection: "column", alignItems: "flex-start", boxSizing: "border-box", fontWeight: 700}}>
          <motion.p variants={linkVariants} style={{padding: '0 5%'}}>Курс</motion.p>
          <motion.h3 variants={linkVariants} style={{margin: '5% 0', padding: '0 5%', fontSize: '36px', letterSpacing: '2px', fontWeight: 700}}>{module._id && module.course.name}</motion.h3>
          <motion.span variants={linkVariants} style={{padding: '0 5%'}}>Модули</motion.span>
          <ul  className='module__navigation-list'>
            {module._id && module.course.modules.map((courseModule, index) => {
              return <motion.li key={index} className="module__navigation-list-li" style={{padding: '15px 20px', borderLeft: courseModule._id === module._id && "4px solid rgb(0, 0, 0)", fontSize: '18px'}}>{courseModule.description}</motion.li>
            })}
          </ul>
        </motion.div>
      </motion.div> */}
      <ModuleSide menuOpened={menuOpened}>
        <motion.div  style={{position: "relative", padding: "15px 0 0 0", textAlign: "left", boxSizing: "border-box"}}>
          <motion.button whileHover={{backgroundColor: "rgba(255, 255, 255, 1)"}} onClick={showSideMenu} style={{ width: 60, height: 60, border: "none", backgroundColor: "rgba(255, 255, 255, 0)", position: "absolute", top: 0, right: 0, zIndex: 15}}>
            <FontAwesomeIcon icon={faSquareCaretDown} style={{fontSize: '30px'}}/>
          </motion.button>
          <div style={{padding: "0 0 0 15px"}}>
            <motion.img initial="closed" animate={menuOpened ? "opened" : "closed"} variants={imgVariants} style={{maxWidth: '25px'}} src={SovaLogo} alt="Логотип"></motion.img>
          </div>
          <motion.div variants={textVariants}>
            <div style={{padding: "0 0 0 15px"}}>
              {/* <p>Курс</p> */}
              <h3>{selectedCourse.title}</h3>
              <p>Модули</p>
            </div>

            <ul style={{padding: 0, listStyle: "none", lineHeight: 2}}>
              {/* {courseModule._id && courseModule.course.modules.map((module) => {
                return <motion.li whileHover={{backgroundColor: "rgba(255, 255, 255, 1)"}} key={module._id} className="side__links-link" style={{fontWeight: 700, borderLeft: module._id === courseModule._id && "3px solid black"}}>
                  <NavLink to={`../courses/${courseID}/modules/${module._id}`} style={{textDecoration: "none", color: "black"}} >
                    {module.name}

                  </NavLink>
                </motion.li>
              })} */}
              {selectedCourse.modules.map((module) => {
                return <li key={module._id}>
                  <button onClick={() => {}}>
                    {module.title}
                  </button>
                </li>
              })}
            </ul>
          </motion.div>
        </motion.div>
      </ModuleSide>
      <motion.div style={{display: "flex", flexDirection: "column", alignItems: 'center'}} initial={"closed"} className='module__content'>
        <div>
          <ul style={{display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 260, margin: 0, padding: 0, listStyle: "none"}}>
            {window.innerWidth < 768 && <li>
              <button onClick={showSideMenu} style={{backgroundColor: "rgba(0, 0, 0, 0)", border: "none", minWidth: 24, minHeight: 24, color: "#d37c52"}}>
                <FontAwesomeIcon icon={faBars} />
              </button>  
            </li>}
            <li><motion.button whileHover={{color: "rgba(0, 0, 0, 1)"}} style={{minWidth: 90, minHeight: 40, backgroundColor: "transparent", color: chatIsOpened ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 1)", border: "2px solid transparent", borderBottom: chatIsOpened ? "none" : "2px solid black" }} onClick={closeChat}>Урок</motion.button></li>
            <li><motion.button whileHover={{color: "rgba(0, 0, 0, 1)"}} style={{minWidth: 90, minHeight: 40, backgroundColor: "transparent", color: chatIsOpened ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.5)", border: "2px solid transparent", borderBottom: chatIsOpened ? "2px solid black" : "none" }} onClick={openChat}>Чат</motion.button></li>
          </ul>
        </div>
        {!chatIsOpened ?
          <div style={{maxWidth: 768, width: '100%'}}>
            <h3 className='module__content-headline' style={{fontSize: 36, letterSpacing: 1.5, margin: "0 0 20px 0"}}>{moduleLesson._id && moduleLesson.title}</h3>
            <EditorContent editor={editor} style={{backgroundColor: "transparent", border: "none", boxShadow: "none"}}/>
            {/* <p>{courseModule._id && courseModule.name}</p>
            <p>{courseModule.description}</p>
            <p>Вот на этой картинке можно изучить строение гортани</p>
            <img style={{maxWidth: 768}} className='module__content-img' src={courseModule._id && courseModule.images[0]} alt="Гортань спереди"></img> */}
          </div>
          :
          <div style={{maxWidth: 768, width: '100%'}}>
            <h3>Чат здесь</h3>
            <Chat>
              <Contacts contacts={students} admin={admin} userId={userId} filterChatToUser={filterChatToUser}></Contacts>
              <div style={{width: window.innerWidth < 768 ? userId.length === 0  ? "0%" : "100%" : "100%", display: "flex", flexDirection: "column", justifyContent: userId.length > 0 ?  "space-between" : "center", alignItems: userId.length > 0 ?  "flex-start" : "center", minHeight: 300, /*maxWidth: "calc(100% - 201px)"*/ overflow: "hidden"}}>
                <Messages messages={messages} selectedStudent={selectedStudent} admin={admin} userId={userId} user={loggedInUser} moduleID={moduleID} resetContact={resetContact}></Messages>
                <MessageForm sendMessage={sendMessage} user={loggedInUser} moduleID={moduleID} userId={userId} userToken={userToken}></MessageForm>
              </div>
              
              {/* <ul style={{minHeight: 210, margin: 0, minWidth: 210, borderRight: '1px solid rgba(193,200,205, 0.7)', padding: 0}}>
                {loggedInUser.admin? 
                  students.length > 0 && students.map((student) => {
                    return <li key={student._id} style={{display: "flex", alignItems: "center", boxSizing: "border-box"}}>
                      <button onClick={() => {
                        filterChatToUser(student._id)
                      }} style={{cursor:"pointer", width: "100%", padding: "5px 15px", backgroundColor: "transparent", border: "none", borderBottom: "1px solid lightgrey", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box"}}>
                        <div style={{position: "relative"}}>
                          <img style={{maxWidth: 50, borderRadius: "51%"}} src='https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231709/thesomeday123170900021.jpg'></img>
                          <span style={{position: "absolute", bottom: 5, right: 5, minWidth: 10, minHeight: 10, borderRadius: 9, backgroundColor: student.online ? "yellowgreen": '#fe4a29'}}></span>
                        </div>
                        <p>{student.name}</p>
                      </button>
                    </li>
                  })
                  :
                  <li style={{display: "flex", alignItems: "center", boxSizing: "border-box"}}>
                    <button onClick={() => {
                      filterChatToUser(admin._id)
                    }} style={{cursor:"pointer", width: "100%", padding: "5px 15px", backgroundColor: "transparent", border: "none", borderBottom: "1px solid lightgrey", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box"}}>
                      <div style={{position: "relative"}}>
                        <img style={{maxWidth: 50, borderRadius: "51%"}} src='https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231709/thesomeday123170900021.jpg'></img>
                        <span style={{position: "absolute", bottom: 5, right: 5, minWidth: 10, minHeight: 10, borderRadius: 9, backgroundColor: admin.online ? "green" : '#fe4a29'}}></span>
                      </div>
                      <p>{admin.name}</p>
                    </button>
                  </li>
                }
              </ul>
              <div>
                {studentId.length > 0 ? <form><button>Отправить</button></form> : <p>Выберите чат, чтобы написать</p>}
              </div> */}
            </Chat>
          </div>
        }
      </motion.div>
      
      
      {/* <p>Модуль {module.name}</p>
      <p>{module.description}</p>
      <ul>
        {moduleImages && moduleImages.map((image, index) => {
          return <li key={index}>
            <img src={image}></img>
          </li>
        })}
      </ul>
      
      <div className="lesson__div">
          <Chat students={students} courseAuthor={courseAuthor} user={props.user} messages={messages} socket={socket} moduleID={moduleID} token={userToken}></Chat>
        </div> */}
    </motion.section>
  )
}
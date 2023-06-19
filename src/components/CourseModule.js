import './CourseModule.css';
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import MenuButton from '../images/square-caret-down-regular.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { apiGetLesson, apiGetConversation, apiSendMessage } from "../api";
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
import SelectedFiles from "./SelectedFiles";
import { NavLink, useLocation } from "react-router-dom";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
// import { generateHTML } from '@tiptap/react';
import { Node, mergeAttributes } from "@tiptap/react";
// import Messages from './Messages';

export default function CourseModule({ socket }) {
  // console.log(socket);
  //variables
  // let lessons;
  // const socket = React.useContext(SocketContext);
  const userToken = localStorage.getItem('token');
  const sessionStorage = localStorage.getItem('sessionID');

  const {courseID, moduleID, lessonID} = useParams();
  
  // const [courseAuthor, setCourseAuthor] = React.useState({});
  const [courseModule, setCourseModule] = React.useState({});
  const [moduleLesson, setModuleLesson] = React.useState({});
  const [messages, setMessages] = React.useState([]);
  // const [students, setStudents] = React.useState([]);
  const [menuOpened, setMenuOpened] = React.useState(false);
  const [chatIsOpened, setChatIsOpened] = React.useState(false);
  const [adminIsOnline, setAdminIsOnline] = React.useState(false);
  const [userId, setUserId] = React.useState({});
  
  // const [lessons, setLessons] = React.useState([]);

  const [editable, setEditable] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  //location
  const location = useLocation();
  const { state } = location;
  const { selectedCourse } = state;
  // console.log(selectedCourse);
 
  //variables derived from courseModule state variable
  const admin = courseModule._id ? {...courseModule.course.author, online: adminIsOnline} : {};
  const module = selectedCourse.modules.find((module) => {
    return module._id === moduleID;
  });
  const courseAuthor = selectedCourse.author;
  const lessons = module.lessons;
  const currentLesson = lessons.find((lesson) => {
    return lesson._id === lessonID;
  });
  // console.log(module);
  let conversation = undefined;
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

  //navigate
  const navigate = useNavigate();

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

  // const selectedStudent = students.find((student) => {
  //   return student._id === userId;
  // });

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

  function filterChatToUser(user) {
    setUserId(user);
  };

  function resetContact() {
    setUserId("");
  }

  function sendMessage(obj, formRef) {
    
    apiSendMessage(userToken, obj)
    .then((updatedConversation) => {
      const { lastMessage } = updatedConversation;
      setMessages((prevValue) => {
        return [...prevValue, lastMessage];
      });
      // console.log(addedMessage);
      // console.log(message);
      // setMessages(updatedConversation.messages);

      //uncomment futher!!!
      socket.emit('message', lastMessage);
      // socket.current.emit('message', lastMessage);
      
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

  const sideLogoVariants = {
    closed: {
      opacity: 0,
      transition: {duration: 0.5, ease: "easeInOut", delay: 0.05},
      transitionEnd: { display: "none"}
    },
    opened: {
      opacity: 1,
      display: "block",
      transition: {duration: 0.5, ease: "easeInOut", delay: 0.05},
    }
  }

  //socket io ref
  // const socket = React.useRef(null);
  
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
        const { module, lesson } = doc;
        // console.log(lessons);
        editor.commands.setContent(lesson.layout);
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

  // React.useEffect(() => {
  //   // socket.current = io('http://api.sova-courses.site');
  //   socket.current = io('http://localhost:3000');
    
  //   if(loggedInUser._id && admin._id && students.length > 0) { 
  //     // console.log('yes');
   
  //     if(sessionStorage) {
  //       socket.current.auth = { localsessionID: sessionStorage };
  //       socket.current.connect();
  //     };

  //     socket.current.emit('userConnected', loggedInUser);
  
  //     socket.current.on('session', ({ sessionID, userID, users }) => {
  //       // console.log(sessionID);
  //       localStorage.setItem('sessionID', sessionID);
  //       socket.current.userID = userID;
  //       socket.current.username = loggedInUser.name;
  //       if(loggedInUser.admin) {
          
  //         const onlineUsers = users.filter((user) => {
  //           return user.online && user.userID !== loggedInUser._id;
  //         });

  //         const onlineStudents = students.map((student) => {
  //           const onlineStudent = onlineUsers.find((onlineUser) => {
  //             return onlineUser.userID === student._id;
  //           });
            
  //           return onlineStudent && onlineStudent.userID === student._id ? {...student, online: true} : student; 
  //         });
  //         setStudents(onlineStudents);

  //       } else {
         
  //         const adminOnline = users.find((user) => {
  //           return user.userID === admin._id && user.online;
  //         });
  //         adminOnline && setAdminIsOnline(true);

  //       }
  //     });
  
  //     socket.current.on('user is online', (({ userID, username, online}) => {
  //       if(loggedInUser.admin) {


  //         const onlineStudents = students.map((student) => {
  //           return student._id === userID ? {...student, online: true} : student;
  //         });

  //         setStudents(onlineStudents);
      
  //       } else {
  //         setAdminIsOnline(true);

  //       }
        

  //     }));

  //     socket.current.on('private message', (data) => {
  //       setMessages((prevValue) => {
  //         return [...prevValue, data];
  //       });
  //     });
  
  //     //remove socket connection on component not rendered
  //     return () => {
  //       socket.current.off('session');
  //       socket.current.off('user is online');
  //       socket.current.off('private message');
  //       socket.current.close();
  //     }
  //   }

  // }, [sessionStorage, loggedInUser._id, students.length, admin._id]);

  // React.useEffect(() => {
  //   console.log(editor, courseModule.layout);
  //   if(editor) {
  //     editor.commands.setContent(courseModule.layout);
  //   }
    
  // }, [editor, courseModule.layout])

  React.useEffect(() => {
    //functions in effect
    function showMessage(data) {
      setMessages((prevValue) => {
        return [...prevValue, data];
      })
    };
      
    function showConnectedUser(data) {
      console.log(data);
      console.log(loggedInUser);
    };

    if(loggedInUser._id) {
      socket.on('private message', showMessage);
      socket.on('show connected user', showConnectedUser)
    }

    // socket.on('show connected user', showConnectedUser)

    return () => {
      socket.off('private message', showMessage);
      socket.off('show connected user', showConnectedUser);
    };

  }, [loggedInUser])

  React.useEffect(() => {
    // console.log(userId);

    userId._id && apiGetConversation(userToken, userId._id)
    .then((data) => {
      // console.log(data);
      if(data.message) {
        return setMessages([]);
        
      }
      return setMessages(data.messages);
    });

  }, [userId]);

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
        <div  style={{position: "relative", padding: "15px", textAlign: "left", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%", height: 90}}>
          {/* <div style={{padding: "0 0 0 15px"}}>
            

          </div> */}
          <motion.svg variants={sideLogoVariants} animate={menuOpened ? "opened" : "closed"} style={{margin: "0 auto 0 0"}} version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="35px" height="60px" viewBox="0 0 940.000000 1847.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,1847.000000) scale(0.100000,-0.100000)"
              fill="white" stroke="none">
              <path d="M4470 18464 c-843 -57 -1527 -265 -2197 -670 -85 -52 -160 -94 -165
              -94 -8 0 -2012 724 -2092 756 -18 7 -18 -4 -13 -367 5 -402 12 -484 57 -710
              81 -404 262 -797 529 -1148 l59 -78 -50 -89 c-262 -468 -442 -982 -532 -1524
              -60 -364 -59 -326 -63 -1907 l-4 -1452 38 -10 c21 -5 175 -44 343 -86 378 -95
              808 -218 1133 -325 l247 -81 0 -1107 c0 -639 4 -1156 10 -1222 50 -583 268
              -1133 632 -1592 101 -128 332 -360 458 -460 535 -424 1169 -648 1840 -648 671
              0 1305 224 1840 648 126 100 357 332 458 460 364 459 582 1009 632 1592 6 66
              10 583 10 1221 l0 1105 278 92 c414 137 699 219 1152 332 135 33 262 66 283
              71 l38 10 -4 1452 c-4 1581 -3 1543 -63 1907 -90 542 -270 1056 -532 1524
              l-50 89 59 78 c267 351 448 744 529 1148 45 226 52 308 57 710 5 363 5 374
              -13 367 -80 -32 -2084 -756 -2092 -756 -5 0 -80 42 -165 94 -603 364 -1245
              577 -1962 652 -136 14 -575 26 -685 18z m708 -758 c696 -95 1270 -320 1834
              -722 81 -57 153 -104 160 -104 7 0 323 113 702 250 379 138 692 248 694 245
              16 -15 -92 -281 -170 -420 -121 -215 -262 -397 -483 -624 -192 -197 -340 -329
              -816 -727 -717 -600 -980 -852 -1277 -1223 -112 -140 -279 -387 -358 -531 -71
              -128 -753 -1302 -764 -1313 -6 -7 -606 1011 -785 1333 -80 143 -234 371 -347
              511 -290 363 -571 633 -1223 1177 -503 420 -603 509 -820 726 -265 265 -401
              437 -533 671 -78 139 -186 405 -170 420 2 3 315 -107 694 -245 379 -137 695
              -250 702 -250 7 0 79 47 160 104 507 360 1044 588 1628 690 77 13 189 29 249
              35 61 6 124 13 140 15 77 10 676 -3 783 -18z m-3894 -2209 c57 -52 194 -169
              304 -262 l200 -169 -49 -55 c-159 -178 -282 -424 -335 -671 -27 -122 -27 -429
              0 -555 62 -296 209 -561 427 -770 207 -200 438 -322 719 -382 149 -32 385 -36
              530 -10 173 32 402 122 526 208 l43 29 63 -107 c35 -60 270 -462 523 -895 388
              -666 460 -785 470 -770 7 9 211 359 455 777 243 418 474 813 512 878 l69 117
              43 -29 c124 -86 353 -176 526 -208 145 -26 381 -22 530 10 281 60 512 182 719
              382 218 209 365 474 427 770 27 126 27 433 0 555 -53 247 -176 493 -335 671
              l-49 55 200 169 c110 93 247 211 305 263 57 52 106 92 108 90 11 -11 117 -245
              158 -348 124 -315 198 -604 254 -992 14 -98 17 -270 20 -1305 l4 -1192 -43
              -11 c-140 -36 -506 -142 -710 -206 -1157 -361 -2214 -868 -3084 -1479 l-82
              -57 -153 105 c-671 456 -1435 844 -2304 1169 -411 154 -1034 349 -1493 468
              l-43 11 4 1192 c4 1280 2 1224 57 1535 45 253 126 537 224 779 47 116 146 333
              153 333 2 0 51 -42 107 -93z m886 -1258 c15 -84 72 -188 136 -252 161 -160
              412 -182 604 -52 l49 33 74 -96 c77 -102 175 -244 221 -325 l28 -47 -23 -20
              c-38 -32 -199 -109 -264 -125 -85 -21 -235 -19 -329 5 -247 63 -450 259 -528
              510 -30 98 -32 272 -4 368 10 34 20 61 22 59 2 -2 8 -28 14 -58z m5104 -174
              c1 -99 -3 -133 -22 -195 -138 -445 -624 -659 -1022 -449 -41 22 -86 48 -99 59
              l-23 20 28 47 c46 81 144 223 221 325 l74 96 49 -33 c73 -49 154 -77 241 -83
              251 -16 457 153 505 413 l7 40 20 -60 c15 -46 20 -89 21 -180z m-4467 -3807
              c616 -281 1173 -612 1717 -1020 l209 -157 161 123 c546 417 1155 785 1769
              1070 l97 45 0 -684 0 -684 -582 -3 -583 -3 -67 -32 c-162 -76 -258 -224 -258
              -397 0 -192 111 -350 295 -418 59 -22 73 -23 597 -28 l536 -5 -39 -120 c-68
              -207 -184 -427 -320 -607 -80 -107 -280 -307 -387 -387 -296 -224 -645 -365
              -1012 -411 -109 -13 -371 -13 -480 0 -532 66 -1024 336 -1354 744 -160 198
              -291 435 -365 661 l-39 120 521 5 c508 6 524 6 582 28 121 45 215 132 266 247
              47 107 35 285 -27 391 -37 63 -126 141 -201 177 l-68 32 -567 3 -568 3 0 689
              c0 380 2 690 5 690 3 0 76 -32 162 -72z"/>
              <path d="M3495 16771 c-66 -26 -172 -74 -235 -106 -123 -61 -350 -195 -350
              -206 0 -3 60 -50 133 -103 291 -211 504 -393 796 -681 252 -249 396 -404 663
              -718 103 -120 189 -219 191 -220 3 -1 90 97 193 218 269 316 412 471 665 720
              292 288 505 470 797 681 72 53 132 100 132 103 0 12 -228 146 -355 209 -132
              65 -342 152 -369 152 -19 0 -193 -137 -385 -304 -69 -60 -250 -234 -401 -385
              l-275 -276 -275 276 c-151 151 -332 325 -401 385 -196 170 -366 304 -386 304
              -10 0 -72 -22 -138 -49z"/>
              <path d="M318 10101 c-122 -39 -215 -121 -271 -239 l-32 -67 -3 -700 c-3 -703
              1 -854 34 -1110 46 -365 151 -771 289 -1120 103 -262 296 -629 461 -878 332
              -498 803 -969 1301 -1301 253 -167 601 -351 863 -455 376 -149 810 -259 1193
              -302 l107 -13 0 -618 0 -618 -880 0 c-563 0 -916 -4 -978 -11 -368 -41 -707
              -181 -991 -409 -341 -275 -575 -660 -668 -1100 -24 -110 -27 -149 -27 -320 -1
              -206 4 -238 52 -355 51 -126 165 -268 273 -342 69 -48 161 -91 246 -115 l78
              -23 3335 0 3335 0 78 23 c288 83 498 306 562 596 25 114 16 375 -19 541 -171
              814 -831 1412 -1658 1504 -62 7 -415 11 -978 11 l-880 0 0 618 0 618 108 13
              c382 43 816 153 1192 302 262 104 610 288 863 455 498 332 969 803 1301 1301
              165 249 358 616 461 878 138 349 243 755 289 1120 33 256 37 407 34 1110 l-3
              700 -32 67 c-162 343 -634 343 -796 1 l-32 -68 -6 -725 c-7 -778 -12 -871 -65
              -1158 -36 -200 -69 -325 -134 -522 -454 -1374 -1658 -2379 -3091 -2579 -1039
              -145 -2086 142 -2909 798 -577 461 -1009 1081 -1240 1781 -65 197 -98 322
              -134 522 -53 287 -58 380 -65 1158 l-6 725 -32 68 c-95 201 -321 303 -525 238z
              m6663 -8316 c264 -46 509 -204 660 -427 82 -120 148 -290 164 -422 l7 -56
              -3112 0 -3112 0 7 56 c16 131 82 302 162 420 151 222 395 382 652 428 117 22
              4451 23 4572 1z"/>
            </g>
          </motion.svg>
          <button className='module__side-button' onClick={showSideMenu} style={{ width: 30, height: 30, border: "none", padding: 0}}>
            <svg className='module__side-button-svg' width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path className='module__side-button-svg-path' fill='#5DB0C7' d="M384 432c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0zm64-16c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/></svg>
          </button>
            {/* <motion.img initial="closed" animate={menuOpened ? "opened" : "closed"} variants={imgVariants} style={{maxWidth: '25px'}} src={SovaLogo} alt="Логотип"></motion.img> */}
          {/* </div> */}
          {/* <motion.div variants={textVariants}>
            <div style={{padding: "0 0 0 15px"}}>
             
              <h3>{selectedCourse.title}</h3>
              <p>Модули</p>
            </div>

            <ul style={{padding: 0, listStyle: "none", lineHeight: 2}}>

              {lessons.length > 0  && lessons.map((lesson) => {
                return <li key={module._id}>
                  <button onClick={() => {
                    navigate(`../courses/${selectedCourse._id}/modules/${module._id}/lessons/${lesson._id}`, {
                      state: {selectedCourse}
                    });
                    window.location.reload(true);
                  }}>
                    {lesson.title}
                  </button>
                </li>
              })}
            </ul>
          </motion.div> */}
        </div>
        <p style={{color: "white", fontWeight: 700, textTransform: "uppercase", rotate: "-90deg", letterSpacing: 5, margin: "auto 0"}}>меню</p>
      </ModuleSide>

      <motion.div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "flex-start"}} initial={"closed"} className='module__content'>
        <div>
          <ul style={{display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 260, margin: 0, padding: 0, listStyle: "none"}}>
            {window.innerWidth < 768 && <li>
              <button onClick={showSideMenu} style={{backgroundColor: "rgba(0, 0, 0, 0)", border: "none", minWidth: 24, minHeight: 24, color: "#d37c52"}}>
                <FontAwesomeIcon icon={faBars} />
              </button>  
            </li>}
            <li><motion.button whileHover={{color: "rgba(255, 255, 255, 1)"}} style={{minWidth: 90, minHeight: 40, backgroundColor: "transparent", color: chatIsOpened ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 1)", border: "2px solid transparent", borderBottom: chatIsOpened ? "none" : "2px solid white" }} onClick={closeChat}>Урок</motion.button></li>
            <li><motion.button whileHover={{color: "rgba(255, 255, 255, 1)"}} style={{minWidth: 90, minHeight: 40, backgroundColor: "transparent", color: chatIsOpened ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)", border: "2px solid transparent", borderBottom: chatIsOpened ? "2px solid white" : "none" }} onClick={openChat}>Чат</motion.button></li>
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
          <div style={{maxWidth: 1024, width: '100%', margin: "auto 0"}}>
            <Chat>
              <Contacts courseAuthor={courseAuthor} students={selectedCourse.students} admin={admin} userId={userId} filterChatToUser={filterChatToUser}></Contacts>
              <div className='lesson__div-chat-conversation' style={{/*width: window.innerWidth < 768 ? userId.length === 0  ? "0%" : "100%" : "100%",*/ width: "calc(100% - 230px)", /*maxHeight: 420,*/ display: "flex", flexDirection: "column", justifyContent: userId.length > 0 ?  "space-between" : "center", alignItems: userId.length > 0 ?  "flex-start" : "center", minHeight: 300, /*maxWidth: "calc(100% - 201px)"*/ overflow: "hidden", backgroundColor: "#1A191E", color: "white"}}>
                <Messages selectedFiles={selectedFiles} messages={messages} admin={admin} userId={userId} user={loggedInUser} moduleID={moduleID} resetContact={resetContact}></Messages>
                <MessageForm selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} sendMessage={sendMessage} user={loggedInUser} moduleID={moduleID} userId={userId} userToken={userToken}></MessageForm>
              </div>
              
            </Chat>
          </div>
        }
      </motion.div>
      
      <SelectedFiles selectedFiles={selectedFiles}/>
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
import './CourseModule.css';
import React from "react";
import { useParams } from "react-router-dom";
import { apiGetCourse, apiGetCourseModule, apiGetUserMessages, apiSendMessage } from "../api";
import Chat from './Chat';
// import { SocketContext } from "../socketio/socketIO";
import io, { Socket } from 'socket.io-client';


export default function CourseModule(props) {

  
  // const socket = React.useContext(SocketContext);
  const userToken = localStorage.getItem('token');
  const sessionStorage = localStorage.getItem('sessionID');

  const {courseID, moduleID} = useParams();
  
  const [courseData, setCourseData] = React.useState({});
  const [courseAuthor, setCourseAuthor] = React.useState({});
  const [module, setModule] = React.useState({});
  const [moduleImages, setModuleImages] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  // const [messageData, setMessageData] = React.useState({text: '', module:moduleID,  from: null, to: null});

  //students ref
  // const studentsRef = React.useRef(students);
  // studentsRef.current = students;

  //course author ref
  // const authorRef = React.useRef(courseAuthor);
  // authorRef.current = courseAuthor;
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
  React.useEffect(() => {
    
    const userToken = localStorage.getItem('token');
    if(userToken) {
      apiGetCourse(courseID, userToken)
      .then((course) => {
        
        const newCourseData = Object.assign({}, course);
        //set course author

        setCourseAuthor({...course.author, online: false});

        setCourseData(newCourseData);

        const moduleIndex = newCourseData.modules.findIndex((module) => {
          return module._id === moduleID;
        });
        const module = newCourseData.modules[moduleIndex];
        const newModule = Object.assign({}, module);
        
        //set students
        const offlineStudents = module.students.map((student) => {
          return {...student, online: false};
        });

        // studentsRef.current = offlineStudents;
        setStudents(offlineStudents);
        setModule(newModule);

        const newImages = [...module.images];
        setModuleImages(newImages);
      });


    }
  }, []);

  //socket io use effect
  React.useEffect(() => {
    if(props.user._id && courseAuthor._id && students.length > 0) {
      //get user messages
      apiGetUserMessages(moduleID, userToken)
      .then((data) => {
        // console.log(data);
        setMessages([ ...messages, ...data ]);
        // props.user._id 
      });


      //socket io
      socket.current = io('http://localhost:3000');
     
      if(sessionStorage) {
        socket.current.auth = { localsessionID: sessionStorage };
        socket.current.connect();
      };
      
      socket.current.emit('userConnected', props.user);
      
      socket.current.on('session', ({ sessionID, userID, users }) => {
        
        localStorage.setItem('sessionID', sessionID);
        socket.current.userID = userID;
        socket.current.username = props.user.name;
        
        // console.log(users);
        
        if(userID === courseAuthor._id) {
        //   console.log(authorRef.current);

          // console.log('show students which are online here');
          const onlineStudents = students.map((student) => {
            const foundOnlineUser = users.find((user) => {
              return student._id === user.userID;
            });
            if(foundOnlineUser) {
              return {...student, online: foundOnlineUser.online};
            }
            return student;
          });
          
        //   studentsRef.current = onlineStudents;
          setStudents(onlineStudents);

        } else {
          // console.log('show author which is online here');
          setCourseAuthor({...courseAuthor, online: true});
        }

      });
      socket.current.on('user is online', (({ userID, username, online, users }) => {
        if(userID === courseAuthor._id) {
          console.log('author is online');
          setCourseAuthor((prevValue) => {
            return {...prevValue, online: true};
          })
        //   authorRef.current = {...authorRef.current, online: true};
        //   setCourseAuthor(authorRef.current);
        } else {
          // console.log(`${userID} ${username} is ${online}`);
          const studentToUpdate = students.findIndex((student) => {
            return student._id === userID;
          });
          students[studentToUpdate] = {...students[studentToUpdate], online: true};
          setStudents(students);
        //   console.log(studentToUpdate);
        //   studentsRef.current[studentToUpdate] = {...studentsRef.current[studentToUpdate], online: true};
        //   console.log(studentsRef.current);
        //   setStudents(studentsRef.current);
          
        }
      }));

      socket.current.on('user is offline', ({ userID, username }) => {
        
        if(userID === courseAuthor._id) {
          setCourseAuthor((prevValue) => {
            return {...prevValue, online: false};
          });
        } else {
            // students[studentToLogOut] = {...students[studentToLogOut], online: false};
            const updatedStudents = students.map((student) => {
              if(student._id === userID) {
                return {...student, online: false};
              }
              return student;
            });
            setStudents(updatedStudents);
        }

      });
      
      // socket.current.on('private message', (data) => {
      //   // console.log(data);
      //   setMessages((prevValue) => {
      //     return [...prevValue, data];
      //   })
      // })

      return () => {
        socket.current.off('session');
        socket.current.off('user is online');
        // socket.current.off('private message');
        socket.current.close();
      };
    }
    
  }, [props.user._id, courseAuthor._id]);

  return (
    <section>
      <h3>Курс {courseData.name}</h3>
      
      <p>Модуль {module.name}</p>
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
        </div>
    </section>
  )
}
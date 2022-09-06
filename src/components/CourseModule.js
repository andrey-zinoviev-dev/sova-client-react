import React from "react";
import { useParams } from "react-router-dom";
import { apiGetCourse, apiGetCourseModule } from "../api";
import { SocketContext } from "../socketio/socketIO";
export default function CourseModule(props) {

  
  const socket = React.useContext(SocketContext);
  const userToken = localStorage.getItem('token');
  const sessionStorage = localStorage.getItem('sessionID');

  const {courseID, moduleID} = useParams();
  const [courseData, setCourseData] = React.useState({});
  const [courseAuthor, setCourseAuthor] = React.useState("");
  const [module, setModule] = React.useState({});
  const [moduleImages, setModuleImages] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [messageData, setMessageData] = React.useState({content: '', from: null, to: null});

  // const objToSend = {};
  
  //functions
  function updateFormData(evt, userID) {
    const { name, value } = evt.target;
    setMessageData({...messageData, [name]: value, from: props.user._id, to: userID});
    // objToSend[evt.target.name] = evt.target.value;
  }

  function sendMessage(evt) {
    props.submitForm(evt);
    socket.emit('message', messageData)
    // props.socket.emit('message', {
    //   to: userID, 
    //   content: objToSend,
    //   fromSelf: true,
    // });

    // const newMessages = [...messages, {
    //   to: userID, 
    //   content: objToSend,
    //   fromSelf: true,
    // }];
    const newMessages = [...messages, messageData];
    setMessages(newMessages);
    // setMessages((prevMessages) => {
    //   return [...prevMessages, messageData];
    // });
  }

  //useEffect
  React.useEffect(() => {
    const userToken = localStorage.getItem('token');
    if(userToken) {
      apiGetCourse(courseID, userToken)
      .then((course) => {
        const newCourseData = Object.assign({}, course);
        //set course author
        setCourseAuthor(course.author);
        setCourseData(newCourseData);

        const moduleIndex = newCourseData.modules.findIndex((module) => {
          return module._id === moduleID;
        });
        const module = newCourseData.modules[moduleIndex];
        const newModule = Object.assign({}, module);
        setModule(newModule);

        const newImages = [...module.images];
        setModuleImages(newImages);
      })
    }
  }, []);

  React.useEffect(() => {
    if(props.user._id === courseAuthor) {
      // console.log(props.user._id, courseAuthor);
      console.log('author is connected', props.user._id);
      apiGetCourseModule(moduleID, userToken)
      .then((result) => {
        setStudents((prevValues) => {
          return [...prevValues, ...result.students];
        });
      })
    };
  }, [courseAuthor]);

  //socket io use effect
  React.useEffect(() => {
  
    if(props.user._id) {
      if(sessionStorage) {
        socket.auth = { localsessionID: sessionStorage };
        socket.connect();
      }
      
      socket.emit('userConnected', props.user);

      //socket on 
      socket.on('session', ({sessionID, userID}) => {
        localStorage.setItem('sessionID', sessionID);
        socket.userID = userID;
        socket.username = props.user.name;
      });

      socket.on('private message', ({ content, from, to}) => {
        setMessages((prevMessages) => {
          return [...prevMessages, {content, from, to}];
        });
      })
    };

    return () => {
      socket.off('userConnected');
      socket.off('session');
      // socket.off('users');
      socket.close();
    }
  }, [props.user._id])
  
  //socket io on events
  React.useEffect(() => {
    
  });
  //socket io on received message
  // React.useEffect(() => {
  //   console.log(props.socket);
  //   if(props.socket.connected) {
  //     console.log('socket connected');

  //     props.socket.on('private message', ({content, from, to}) => {
  //       const newMessages = [...messages, {content, from, to}];
  //       setMessages(newMessages);
  //     })
  //   } 
  // }, [props.socket, messages]);

  // React.useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

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
      <div className="lesson__div lesson__div_chat">
        <p>Чат здесь</p>
          <ul>
            {messages && messages.map((message, index) => {
              return <li key={index} className={message.from && 'recepient-message'}>
                {message.content}, {message.from}</li>
            })}
          </ul>
        {/* {props.socket.connected && chats.length > 1 ? chats.map((chat, index) => {
          return <form onSubmit={(evt) => {sendMessage(evt, chat._id)}} key={index}>
          <input onInput={updateFormData} type="text" name="message" />
          <button type="submit">Отправить</button>
        </form> 
        }) : <form onSubmit={(evt) => {sendMessage(evt, courseAuthor)}}>
        <input onInput={updateFormData} type="text" name="message" />
        <button type="submit">Отправить</button>
      </form>} */}
        {/* <form onSubmit={sendMessage}>
          <input onInput={updateFormData} type="text" name="message" />
          <button type="submit">Отправить</button>
        </form> */}
        {/* <ul class="lesson__div-ul lesson__div-ul-chats">
                              
        </ul>
        <ul class="lesson__div-ul lesson__div-ul_chat">

        </ul>
                        
        <form class="lesson__div-form">
          <input class="lesson__div-form-input" type="text" name="message" />
          <button type="submit" class="lesson__div-form-button">Отправить</button>
        </form> */}
          {students.length > 1 ? 
            <ul>
              {students.map((student) => {
                return <li key={student._id}>
                  <form className="lesson__div-form" onSubmit={(evt) => {sendMessage(evt)}}>
                    <input className="lesson__div-form-input" type="text" name="content" onInput={(evt) => {updateFormData(evt, student._id)}} />
                    <button type="submit" className="lesson__div-form-button">Отправить</button>
                  </form> 
                </li>
              })}
            </ul>
          :  
            <form className="lesson__div-form" onSubmit={sendMessage}>
              <input className="lesson__div-form-input" type="text" name="content" onInput={(evt) => {updateFormData(evt, courseAuthor)}} />
              <button type="submit" className="lesson__div-form-button">Отправить</button>
            </form> 
          }

        </div>
    </section>
  )
}
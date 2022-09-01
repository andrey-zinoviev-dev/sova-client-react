import React from "react";
import { useParams } from "react-router-dom";
import { apiGetCourse } from "../api";

export default function CourseModule(props) {
  console.log(props.socketUsers);

  const {courseID, moduleID} = useParams();
  const [courseData, setCourseData] = React.useState({});
  const [module, setModule] = React.useState({});
  const [moduleImages, setModuleImages] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const objToSend = {};
  
  //functions
  function updateFormData(evt) {
    objToSend[evt.target.name] = evt.target.value;
  }
  function sendMessage(evt) {
    const message = props.submitForm(evt, objToSend);
    const newMessages = [...messages, message];
    setMessages(newMessages);
  }

  //useEffect
  React.useEffect(() => {
    const userToken = localStorage.getItem('token');
    if(userToken) {
      apiGetCourse(courseID, userToken)
      .then((course) => {
        const newCourseData = Object.assign({}, course);
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

  }, [courseData._id]);

  
  
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
        <div>
          <ul>
            {messages && messages.map((message, index) => {
              return <li key={index}>{message.message}</li>
            })}
          </ul>
        </div>
        <form onSubmit={sendMessage}>
          <input onInput={updateFormData} type="text" name="message" />
          <button type="submit">Отправить</button>
        </form>
        {/* <ul class="lesson__div-ul lesson__div-ul-chats">
                              
        </ul>
        <ul class="lesson__div-ul lesson__div-ul_chat">

        </ul>
                        
        <form class="lesson__div-form">
          <input class="lesson__div-form-input" type="text" name="message" />
          <button type="submit" class="lesson__div-form-button">Отправить</button>
        </form> */}
                   
        </div>
    </section>
  )
}
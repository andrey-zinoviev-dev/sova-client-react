import React from "react";
import { apiGetUserMessages } from "../api";
import { apiSendMessage } from "../api";
export default function Messages ({ messages, selectedStudent, admin, moduleID, userId, user }) {
  const userToken = localStorage.getItem('token');

  //refs
  const ulRef = React.useRef();
  //states
  // const [messages, setMessages] = React.useState([]);

  //variables
  const members = [user._id, userId];
  const contactMessages = messages.filter((message) => {
    return message.conversation.members.every((member) => {
      return members.includes(member);
    })
    // return message.user._id === selectedContact;
  });

  React.useEffect(() => {
    if(userId.length > 0){
      ulRef.current.scrollTo({top: 900, left:0, behavior: "smooth"});
    }
  }, [userId]);

  return (
    <>
      {userId.length > 0 && 
        <div style={{width: "100%", boxSizing: "border-box", padding: "15px 20px", borderBottom: "1px solid lightgrey"}}>
          <h3 style={{margin: 0}}>{user.admin ? selectedStudent && selectedStudent.name : admin && admin.name}</h3>
        </div>
      }
      {userId.length > 0 ?
          <ul ref={ulRef} style={{boxSizing: "border-box", padding: "15px 20px", margin: 0, listStyle: "none", display: "flex", flexDirection: "column", width: "100%", height: 410, gap: 20, overflowY: "auto"}}>
            {contactMessages.length > 0 ? contactMessages.map((message) => {
              return <li key={message._id} style={{backgroundColor: message.user === user._id ? "#d37c52" : "white", alignSelf: message.user === user._id ? "flex-end" : "flex-start",  minWidth: 140, minHeight: 35, borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px", boxSizing: "border-box"}}>{message.files.length > 0 ? 
                <ul>
                  {message.files.map((file, index) => {
                    return <li key={index}>
                      {file.mimetype.includes('image') ? <img src={`http://localhost:3000/${file.destination.replace('public/', '')}${file.filename}`}></img> : <p>грузить другой файл</p>}
                    </li>
                  })}
                </ul>
                : 
                message.text}</li>
            }) : <li key={0} style={{textAlign: "center"}}>Пока сообщений нет</li>}
          </ul>  
        :
        <p>Выберите чат</p>
      }

    </>
  )
};
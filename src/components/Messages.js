import React from "react";
import { apiGetUserMessages } from "../api";
// import { useParams } from "react-router-dom";
export default function Messages ({selectedStudent, admin, moduleID, userId, user }) {
  const userToken = localStorage.getItem('token');

  
  //states
  const [messages, setMessages] = React.useState([]);

  //variables
  const members = [user._id, userId];
  const contactMessages = messages.filter((message) => {
    return message.conversation.members.every((member) => {
      return members.includes(member);
    })
    // return message.user._id === selectedContact;
  });

  React.useEffect(() => {
    apiGetUserMessages(moduleID, userToken)
    .then((data) => {
      // console.log(data);
      setMessages(data);
    })
  }, [moduleID, userToken]);

  return (
    <>
      {userId.length > 0 && 
        <div style={{width: "100%", boxSizing: "border-box", padding: "15px 20px", borderBottom: "1px solid lightgrey"}}>
          <h3 style={{margin: 0}}>{user.admin ? selectedStudent && selectedStudent.name : admin && admin.name}</h3>
        </div>
      }
      {userId.length > 0 ?
          <ul style={{boxSizing: "border-box", padding: "15px 20px", margin: 0, listStyle: "none", display: "flex", flexDirection: "column", width: "100%", minHeight: 180, maxHeight: "calc(100% - 40px)", gap: 20, overflowY: "auto"}}>
            {contactMessages.length > 0 ? contactMessages.map((message) => {
              return <li key={message._id} style={{backgroundColor: message.user._id === user._id ? "#d37c52" : "white", alignSelf: message.user._id === user._id ? "flex-end" : "flex-start",  minWidth: 140, minHeight: 35, borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px", boxSizing: "border-box"}}>{message.text}</li>
            }) : <li key={0} style={{textAlign: "center"}}>Пока сообщений нет</li>}
          </ul>  
        :
        <p>Выберите чат</p>
      }

    </>
  )
};
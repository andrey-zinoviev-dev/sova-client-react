import React from "react";
import { apiGetUserMessages } from "../api";
// import { useParams } from "react-router-dom";
export default function Messages ({moduleID, selectedContact, user}) {
  const userToken = localStorage.getItem('token');

  
  //states
  const [messages, setMessages] = React.useState([]);

  //variables
  const contactMessages = messages.filter((message) => {
    return message.conversation.members.includes(selectedContact);
    // return message.user._id === selectedContact;
  });

  React.useEffect(() => {
    apiGetUserMessages(moduleID, userToken)
    .then((data) => {
      // console.log(data);
      setMessages(data);
    })
  }, [moduleID, userToken]);

  React.useEffect(() => {
    // console.log(user);
    // console.log(messages);
    // console.log(selectedContact);
    console.log(contactMessages);
  }, [selectedContact]);

  return (
    <>
      {/* <h3 style={{margin: 0}}>Сообщения</h3> */}
      {contactMessages.length > 0 ? 
        <ul style={{padding: 0, listStyle: "none", display: "flex", flexDirection: "column", width: "100%", minHeight: 180, maxHeight: 300, overflowY: "auto"}}>
          {contactMessages.map((message) => {
            return <li key={message._id} style={{backgroundColor: message.user._id === user._id ? "#d37c52" : "white", alignSelf: message.user._id === user._id ? "flex-end" : "flex-start",  minWidth: 140, minHeight: 35, borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center"}}>{message.text}</li>
          })}
        </ul> 
        :
        <p>Пока сообщений нет</p> 
      }
    </>
  )
};
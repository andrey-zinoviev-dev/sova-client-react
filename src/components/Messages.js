import React from "react";
import { apiGetUserMessages } from "../api";
// import { useParams } from "react-router-dom";
export default function Messages ({moduleID, selectedContact}) {
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
    console.log(contactMessages);
  }, [selectedContact])

  return (
    <>
      <h3>Сообщения</h3>
      <ul></ul>
    </>
  )
};
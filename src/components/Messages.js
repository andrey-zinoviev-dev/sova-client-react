import React from "react";
import { UserContext } from "../context/userContext";
import { apiGetConversation } from "../api";
// import { apiSendMessage } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
export default function Messages ({ selectedFiles, conversation, messages, selectedStudent, admin, moduleID, userId, user, resetContact }) {
  const loggedInUser = React.useContext(UserContext);

  //refs
  const ulRef = React.useRef();
  //states
 
  //local storage
  const userToken = localStorage.getItem('token');

  //variables
  // const members = [user._id, userId];
  // const contactMessages = messages.filter((message) => {
  //   return message.conversation.members.every((member) => {
  //     return members.includes(member);
  //   })
  //   // return message.user._id === selectedContact;
  // });
  
  //functions
  // function backToContacts() {
  //   console.log("back to contacts");
  // }

  // React.useEffect(() => {
  //   if(userId.length > 0){
  //     ulRef.current.scrollTo({top: 900, left:0, behavior: "smooth"});
  //   }
  // }, [userId]);
  // React.useEffect(() => {
  //   console.log(userId);
  // }, [userId])
  
  // React.useEffect(() => {
  //   console.log(messages);
  // }, [messages])

  return (
    <>
      {userId._id && 
        <div style={{width: "100%", boxSizing: "border-box", padding: "15px 20px", borderBottom: "1px solid lightgrey", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <button style={{backgroundColor: "transparent", border: "none", color: "rgb(93, 176, 199)", fontSize: 18, margin: "3px 10px 0 0"}} onClick={resetContact}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h3 style={{margin: 0}}>{userId._id && userId.email}</h3>
          {selectedFiles.length > 0 && <button style={{position: "relative", width: 35, height: 35, borderRadius: 12, border: "none", backgroundColor: "rgb(93, 176, 199)", color: "white", fontSize: 16, padding: 0, margin: "0 0 0 auto"}}>
            <FontAwesomeIcon icon={faFileLines} />
            {/* <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"/></svg> */}
            <p style={{width: 18, height: 18, margin: 0, position: "absolute", top: -5, right: -5, borderRadius: "51%", backgroundColor: "white", color: "black", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"}}>{selectedFiles.length}</p>
          </button>}
        </div>
      }
       {userId._id ?
        
          <ul ref={ulRef} style={{boxSizing: "border-box", padding: "15px 20px", margin: 0, listStyle: "none", display: "flex", flexDirection: "column", width: "100%", height: 410, gap: 20, overflowY: "auto"}}>
            {messages.length > 0 ? messages.map((message) => {
              // return message.files.length === 0 ?
              // <li key={message._id} style={{backgroundColor: message.user === user._id ? "#d37c52" : "white", alignSelf: message.user === user._id ? "flex-end" : "flex-start",  minWidth: 140, minHeight: 35, maxWidth: 270, borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px", boxSizing: "border-box"}}>
              //   {message.text}
              // </li>
              // :
              return <li key={message._id} style={{alignSelf: message.user === loggedInUser._id ? "flex-end" : "flex-start", width: 160, minHeight: 40, backgroundColor: message.user === loggedInUser._id ? "#5DB0C7" : "#2D2C32", border: "none", borderRadius: 15, boxSizing: "content-box", padding: "5px 0 5px 15px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}/*style={{alignSelf: message.user === user._id ? "flex-end" : "flex-start",  minWidth: 140, minHeight: 300, maxHeight:300, maxWidth: 270, borderRadius: "9px", display: "flex", alignItems: "flex-start", justifyContent: "center", boxSizing: "border-box", overflow: "hidden"}}*/>
                 {/* <ul style={{width: "100%", height: "100%", padding: 0}}>
                  {message.files.map((file, index) => {
                    return <li key={Date.parse(new Date())} style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
                      {file.mimetype.includes('image') ? <img style={{width: "100%", height: "100%", objectFit: "cover"}} src={`http://api.sova-courses.site/${file.destination.replace('public/', '')}${file.filename}`}></img> : <p>грузить другой файл</p>}
                    </li>
                  })}
                </ul> */}
                {message.text}
              </li>
            }) 
            : 
            <li key={0} style={{textAlign: "center"}}>Пока сообщений нет</li>}
          </ul>  
        :
        <p>Выберите чат</p>
      }

    </>
  )
};
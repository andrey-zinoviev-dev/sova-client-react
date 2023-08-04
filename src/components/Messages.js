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

  return (
    <>
      {userId._id && 
        <div style={{width: "100%", boxSizing: "border-box", padding: "15px 20px", borderBottom: "1px solid lightgrey", display: "flex", alignItems: "center", justifyContent: "flex-start", backgroundColor: "rgb(31, 31, 33)"}}>
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
         
        
          <ul className='lesson__div-chat-conversation-messages' ref={ulRef} style={{boxSizing: "border-box", padding: "15px 20px", margin: 0, listStyle: "none", display: "flex", flexDirection: "column", width: "100%", gap: 20, overflowY: "auto"}}>
            {messages.length > 0 ? messages.map((message) => {

              return <li key={message._id} style={{alignSelf: message.user === loggedInUser._id ? "flex-end" : "flex-start", maxWidth: 300, backgroundColor: message.user === loggedInUser._id ? "#5DB0C7" : "#2D2C32", border: "none", borderRadius: 15, boxSizing: "content-box", padding: "10px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-start", alignItems: "flex-start"}}>

                <p style={{margin: 0}}>{message.text}</p>
                {message.files.length > 0 && 
                  <ul style={{padding: 0, listStyle: "none", margin: "0 0 10px 0"}}>
                    {message.files.map((file) => {
                      return <li key={file.path} style={{display: "flex", alignSelf: "center", justifyContent: "center"}}>
                        {file.mimetype.includes('image') && <img style={{width: "100%", borderRadius: 9, maxWidth: 220}} src={file.path} alt={file.originalname} />}
                        {file.mimetype.includes('audio') && <audio controls src={file.path} style={{maxWidth: 300}}/>}
                        {file.mimetype.includes('video') && <video muted controls src={file.path} style={{width: "100%", borderRadius: 9}}/>}
                      </li>
                    })}
                  </ul>}
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
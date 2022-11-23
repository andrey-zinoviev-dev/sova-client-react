import React from "react";
import Messages from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { apiSendMessage } from "../api";
export default function MessageForm({ userId, userToken, moduleID, user }) {

  //refs
  const inputRef = React.useRef();

  //functions
  function sendMessage(evt) {
    const obj = {text: inputRef.current.value, user: user._id, to: userId, moduleID: moduleID};
    evt.preventDefault();
    apiSendMessage(userToken, obj)
    .then((data) => {
      console.log(data);
    })
  };

  return (
    <>
      {userId.length > 0 && <form style={{position: "relative", width: "100%", border: "1px solid lightgrey", boxSizing: "border-box"}} onSubmit={sendMessage}>
        <input ref={inputRef} style={{outline:"none", width: "100%", minHeight: 40, padding: "0 0 0 15px", border:"none"}} placeholder="Напишите что-нибудь хорошее..." name="text"></input>
        <button style={{position: "absolute", minWidth: 30, minHeight: 30, backgroundColor: "#d37c52", borderRadius: 5, padding: 0, border: "none", top: 5, right: 10}}>
          <FontAwesomeIcon style={{fontSize: 17, color: "white"}} icon={faPaperPlane} />
        </button>
      </form>}
    </> 
  )
}
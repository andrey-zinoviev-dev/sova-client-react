import React from "react";
// import Messages from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { apiSendMessage } from "../api";
export default function MessageForm({ sendMessage, userId, userToken, moduleID, user }) {
  //states
  const [selectedFile, setSelectedFile] = React.useState({});

  //refs
  const formRef = React.useRef();
  const inputRef = React.useRef();
  const inputFileRef = React.useRef();

  //functions
  // function sendMessage(evt) {
  //   const obj = {text: inputRef.current.value, user: user._id, to: userId, moduleID: moduleID};
  //   evt.preventDefault();
  //   // console.log(socket);
    
  //   // apiSendMessage(userToken, obj)
  //   // .then((data) => {
  //   //   console.log(data);
  //   // })
  // };

  function submitMessage(evt) {
    const obj = {text: inputRef.current.value, user: user._id, to: userId, moduleID: moduleID};
    sendMessage(evt, obj, formRef.current);
    console.log(inputFileRef.current.files);
  }

  function openFileUpload() {
    inputFileRef.current.click();
  }

  function handleFileChange(evt) {
    // return setSelectedFile(evt.target.files[0]);
  }

  return (
    <>
      {userId.length > 0 && <form ref={formRef} style={{position: "relative", width: "100%", border: "1px solid lightgrey", boxSizing: "border-box"}} onSubmit={submitMessage}>
        <button onClick={openFileUpload} type="button" style={{position: "absolute", top: 5, left: 10, minWidth: 30, minHeight: 30, border: "none", backgroundColor: "rgba(234, 162, 127, 0.3)", padding: 0, boxSizing: "border-box", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center"}}>
          <FontAwesomeIcon style={{fontSize: 20, color: "rgb(234, 162, 127)"}} icon={faPaperclip} />
        </button>
        <input style={{display: "none"}} onChange={handleFileChange} type="file" name="file" ref={inputFileRef} multiple="multiple"></input>
        <input ref={inputRef} style={{outline:"none", width: "100%", minHeight: 40, padding: "0 0 0 55px", border:"none", boxSizing: "border-box"}} placeholder="Напишите что-нибудь хорошее..." name="text"></input>
        <button type="submit" style={{position: "absolute", minWidth: 30, minHeight: 30, backgroundColor: "#d37c52", borderRadius: 5, padding: 0, border: "none", top: 5, right: 10}}>
          <FontAwesomeIcon style={{fontSize: 17, color: "white"}} icon={faPaperPlane} />
        </button>
      </form>}
    </> 
  )
}
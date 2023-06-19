import React from "react";
// import Messages from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function MessageForm({ selectedFiles, setSelectedFiles, sendMessage, userId, userToken, moduleID, user }) {
  //states
  // const [selectedFiles, setSelectedFiles] = React.useState([]);
  // const [emptyMessageInput, setEmptyMessageInput] = React.useState("");

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
    evt.preventDefault();
    const formData = new FormData();
    formData.append("moduleID", moduleID);
    formData.append("text", inputRef.current.value);
    formData.append("to", userId._id);
    formData.append("user", user._id);
 
    //uncomment futher!!!
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    // console.log('message shall be sent here');
    // const obj = {text: inputRef.current.value, user: user._id, to: userId, moduleID: moduleID, file: selectedFile};
    
    //uncomment futher!!!
    sendMessage(formData, formRef.current);

  }

  function openFileUpload() {
    inputFileRef.current.click();
  }

  function handleFileChange(evt) {
    return setSelectedFiles((prevValue) => {
      return [...prevValue, ...evt.target.files];
    });
  }

  function deleteAttachedFile(file) {
    // const filesArrayUpdated = selectedFiles.filter((selectedFile) => {
    //   return selectedFile.name !== file.name;
    // });
    // setSelectedFiles(filesArrayUpdated);
  }

  function showAttachButton() {
    // setEmptyMessageInput(inputRef.current.value);
  }
  

  // React.useEffect(() => {
  //   console.log(selectedFiles);
  // }, [selectedFiles]);

  return (
    <>
      {/* <motion.div style={{width: "100%"}}>
        {selectedFiles.length > 0 && 
        <ul style={{boxSizing: "border-box", margin:0, padding: 15, display: "flex", alignItems: "center", justifyContent: "flex-start", listStyle: "none", gap: 10, overflow: "auto"}}>
          {selectedFiles.map((file, index) => {
            return <li key={index} style={{minWidth: 160, maxWidth: 160, minHeight: 80, position: "relative", display: "flex", justifyContent: "flex-start", alignItems: "center", backgroundColor: "rgb(211, 124, 82)", borderRadius: 9, boxSizing: "border-box", padding: "0 10px"}}>
              <span style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
                {file.name}  
              </span>
              <button onClick={() => {
                deleteAttachedFile(file)
              }} style={{position: "absolute", top: 0, right: 0, padding: 0, width: 18, height: 18, border: '1px solid black', borderRadius: "51%"}}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </li>
          })}
        </ul>}
      </motion.div> */}
  
      {userId._id && 
          <form encType="multipart/form-data" ref={formRef} style={{position: "relative", width: "100%", boxSizing: "border-box", padding: "15px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgb(31, 31, 33)"}} onSubmit={submitMessage}>
            <input style={{display: "none"}} onChange={handleFileChange} type="file" name="file" ref={inputFileRef} multiple="multiple"></input>
            <input ref={inputRef} style={{outline:"none", width: "100%", maxWidth: 580, height: "100%", padding: "0 0 0 25px", border:"none", boxSizing: "border-box", borderRadius: 9, backgroundColor: "#26272C", caretColor: "rgb(199, 199, 201)", color: "white"}} placeholder="Напишите что-нибудь хорошее..." name="text"></input>
            <div style={{display: "flex", alignItems: "center", gap: 20}}>
              <button type="button" onClick={() => {
                openFileUpload();
              }} style={{minWidth: 40, minHeight: 40, backgroundColor: "#5DB0C7", borderRadius: "51%", padding: 0, border: "none", top: 5, right: 10}}>
                <FontAwesomeIcon style={{fontSize: 17, color: "white"}} icon={faPaperclip} />
              </button>
              <button type="submit" style={{minWidth: 40, minHeight: 40, backgroundColor: "#5DB0C7", borderRadius: "51%", padding: 0, border: "none", top: 5, right: 10}}>
                <FontAwesomeIcon style={{fontSize: 17, color: "white", margin: "0 3px 0 0"}} icon={faPaperPlane} />
              </button>
            </div>

            {/* <button onClick={openFileUpload} type="button" style={{position: "absolute", top: 5, left: 10, minWidth: 30, minHeight: 30, border: "none", backgroundColor: "rgba(234, 162, 127, 0.3)", padding: 0, boxSizing: "border-box", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center"}}>
              <FontAwesomeIcon style={{fontSize: 20, color: "rgb(234, 162, 127)"}} icon={faPaperclip} />
            </button> */}
          {/* </div> */}
          </form>}
    </> 
  )
}
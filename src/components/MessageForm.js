import React from "react";
// import Messages from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function MessageForm({ sendMessage, userId, userToken, moduleID, user }) {
  //states
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [emptyMessageInput, setEmptyMessageInput] = React.useState("");

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
    formData.append("to", userId);
    formData.append("user", user._id);
 
    
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
    const filesArrayUpdated = selectedFiles.filter((selectedFile) => {
      return selectedFile.name !== file.name;
    });
    setSelectedFiles(filesArrayUpdated);
  }

  function showAttachButton() {
    setEmptyMessageInput(inputRef.current.value);
  }
  

  // React.useEffect(() => {
  //   console.log(selectedFiles);
  // }, [selectedFiles]);

  return (
    <>
      <motion.div style={{width: "100%", borderTop: "1px solid lightgrey"}}>
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
      </motion.div>
      {userId.length > 0 && <form encType="multipart/form-data" ref={formRef} style={{position: "relative", width: "100%", border: "1px solid lightgrey", boxSizing: "border-box"}} onSubmit={submitMessage}>
        <div style={{position: "relative"}}>
          <input style={{display: "none"}} onChange={handleFileChange} type="file" name="file" ref={inputFileRef} multiple="multiple"></input>
          <input ref={inputRef} style={{outline:"none", width: "100%", minHeight: 40, padding: "0 0 0 55px", border:"none", boxSizing: "border-box"}} placeholder="Напишите что-нибудь хорошее..." name="text" onInput={showAttachButton}></input>
          <button type="submit" style={{display: emptyMessageInput === '' && "none", position: "absolute", minWidth: 30, minHeight: 30, backgroundColor: "#d37c52", borderRadius: 5, padding: 0, border: "none", top: 5, right: 10}}>
            <FontAwesomeIcon style={{fontSize: 17, color: "white"}} icon={faPaperPlane} />
          </button>
          <button onClick={openFileUpload} type="button" style={{position: "absolute", top: 5, left: 10, minWidth: 30, minHeight: 30, border: "none", backgroundColor: "rgba(234, 162, 127, 0.3)", padding: 0, boxSizing: "border-box", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <FontAwesomeIcon style={{fontSize: 20, color: "rgb(234, 162, 127)"}} icon={faPaperclip} />
        </button>
        </div>
      </form>}
    </> 
  )
}
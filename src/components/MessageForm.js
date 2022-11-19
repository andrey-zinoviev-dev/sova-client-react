import React from "react";
import Messages from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
export default function MessageForm({ selectedContact, moduleID, user }) {
  
  React.useEffect(() => {
    console.log(selectedContact);
  }, [selectedContact]);

  return (
    <div style={{minWidth: 390, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", minHeight: 300}}>
      {selectedContact.length > 0 ? 
        <>
          <Messages user={user} moduleID={moduleID} selectedContact={selectedContact}></Messages>
            <form style={{position: "relative", width: "100%"}}>
              <input style={{width: "100%", boxSizing: "border-box", minHeight: 40, borderRadius: 5, padding: "0 0 0 15px"}}></input>
              <button style={{position: "absolute", minWidth: 30, minHeight: 30, backgroundColor: "#d37c52", borderRadius: 5, padding: 0, border: "none", top: 5, right: 10}}>
                <FontAwesomeIcon style={{fontSize: 17, color: "white"}} icon={faPaperPlane} />
              </button>
            </form>
        </> 
      : 
        <p style={{margin: 0}}>Выберите чат</p>
      }
    </div>
  )
}
import React from "react";
import { UserContext } from "../context/userContext";
export default function Contacts ({contacts, admin, filterChatToUser}) {
  const loggedInUser = React.useContext(UserContext);
  const [contactId, setContactId] = React.useState("");

  //functions
  function showContactId(id) {
    filterChatToUser(id);
  };
  
  return (
    <div style={{minWidth: 200, borderRight: "1px solid #d37c52"}}>
      <ul style={{listStyle: "none", margin: 0, padding: "0 20px", boxSizing: "border-box"}}>
        {loggedInUser.admin ?
          contacts.map((contact) => {
            return <li key={contact._id} onClick={() => {
              showContactId(contact._id);
            }} style={{borderBottom: "1px solid rgb(211, 124, 82)", padding: "15px 0", boxSizing: "border-box"}}>{contact.name}</li>
          })
          : 
          <li key={admin._id} onClick={() => {
            showContactId(admin._id);
          }} style={{borderBottom: "1px solid rgb(211, 124, 82)", padding: "15px 0", boxSizing: "border-box"}}>{admin.name}</li>
        }
      </ul>
    </div>
  )
}
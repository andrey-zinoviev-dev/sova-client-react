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
    <div>
      <ul>
        {loggedInUser.admin ?
          contacts.map((contact) => {
            return <li key={contact._id} onClick={() => {
              showContactId(contact._id);
            }}>{contact.name}</li>
          })
          : 
          <li key={admin._id} onClick={() => {
            showContactId(admin._id);
          }}>{admin.name}</li>
        }
      </ul>
    </div>
  )
}
import React from "react";
import { UserContext } from "../context/userContext";
export default function Contacts ({contacts, admin, filterChatToUser}) {
  const loggedInUser = React.useContext(UserContext);
  // const [contactId, setContactId] = React.useState("");

  //functions
  function showContactId(id) {
    filterChatToUser(id);
  };
  
  return (
    <div style={{minWidth: 200, borderRight: "1px solid lightgrey"}}>
      <ul style={{listStyle: "none", margin: 0, padding: "0 20px", boxSizing: "border-box"}}>
        {loggedInUser.admin ?
          contacts.map((contact) => {
            return <li key={contact._id} onClick={() => {
              showContactId(contact._id);
            }} style={{display:"flex", justifyContent:"flex-start", borderBottom: "1px solid rgb(211, 124, 82)", padding: "15px 0", boxSizing: "border-box"}}>
              <div style={{position: "relative", margin: "0 25px 0 0"}}>
                <img style={{maxWidth: 50, borderRadius: 51}} src="https://yaponaroll.ru/images/20200701_001.jpg"></img>
                <div style={{position: "absolute", width: 9, height: 9, backgroundColor: "red", borderRadius: "51%", bottom: 10, right: 5}}></div>
              </div>
              
              <p style={{margin: "none"}}>{contact.name}</p>
            </li>
          })
          : 
          <li key={admin._id} onClick={() => {
            showContactId(admin._id);
          }} style={{display:"flex", justifyContent:"flex-start", borderBottom: "1px solid rgb(211, 124, 82)", padding: "15px 0", boxSizing: "border-box"}}>
            <div style={{position: "relative", margin: "0 25px 0 0"}}>
              <img style={{maxWidth: 50, borderRadius: 51}} src="https://yaponaroll.ru/images/20200701_001.jpg"></img>
              <div style={{position: "absolute", width: 9, height: 9, backgroundColor: "red", borderRadius: "51%", bottom: 10, right: 5}}></div>
            </div>
            <p style={{margin: "none"}}>{admin.name}</p>
          </li>
        }
      </ul>
    </div>
  )
}
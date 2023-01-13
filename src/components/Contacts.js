import React from "react";
import { UserContext } from "../context/userContext";
import { motion } from "framer-motion";
export default function Contacts ({contacts, admin, filterChatToUser}) {
  const loggedInUser = React.useContext(UserContext);
  // const [contactId, setContactId] = React.useState("");

  //functions
  function showContactId(id) {
    filterChatToUser(id);
  };
  React.useEffect(() => {
    console.log(contacts);
  }, [contacts]);
  
  return (
    <div style={{minWidth: 200, borderRight: "1px solid lightgrey"}}>
      <ul style={{listStyle: "none", margin: 0, padding: 0, boxSizing: "border-box"}}>
        {loggedInUser.admin ?
          contacts.length > 0 ? contacts.map((contact) => {
            return <motion.li initial={{backgroundColor: "rgba(255, 255, 255, 0)"}} whileHover={{backgroundColor: "rgba(224, 224, 224, 1)"}} key={contact._id} onClick={() => {
              showContactId(contact._id);
            }} style={{display:"flex", justifyContent:"flex-start", alignItems:"center", padding: "10px 20px", cursor:"pointer", boxSizing: "border-box"}}>
              <div style={{position: "relative", margin: "0 25px 0 0", display: "flex"}}>
                <img style={{maxWidth: 40, borderRadius: 51}} src="https://yaponaroll.ru/images/20200701_001.jpg"></img>
                <div style={{position: "absolute", width: 9, height: 9, backgroundColor: contact.online ? "green" : "red", borderRadius: "51%", bottom: 0, right: 5}}></div>
              </div>
              
              <p style={{margin: 0}}>{contact._id}</p>
            </motion.li>
          })
          :
          <li style={{display:"flex", justifyContent:"flex-start", alignItems:"center", padding: "10px 20px", boxSizing: "border-box"}}>
            <p style={{margin: 0}}>Пока нет студентов в модуле, но их всегда можно добавить!</p>
          </li>
          : 
          <motion.li initial={{backgroundColor: "rgba(255, 255, 255, 0)"}} whileHover={{backgroundColor: "rgba(224, 224, 224, 1)"}} key={admin._id} onClick={() => {
            showContactId(admin._id);
          }} style={{display:"flex", justifyContent:"flex-start", alignItems:"center", padding: "10px 20px", cursor:"pointer", boxSizing: "border-box"}}>
            <div style={{position: "relative", margin: "0 25px 0 0", display: "flex"}}>
              <img style={{maxWidth: 40, borderRadius: 51}} src="https://yaponaroll.ru/images/20200701_001.jpg"></img>
              <div style={{position: "absolute", width: 9, height: 9, backgroundColor: admin.online ? "green" : "red", borderRadius: "51%", bottom: 0, right: 5}}></div>
            </div>
            <p style={{margin: 0}}>{admin.name}</p>
          </motion.li>
        }
      </ul>
    </div>
  )
}
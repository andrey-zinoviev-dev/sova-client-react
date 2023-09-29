import React from "react";
import Contact from "./Contact";
import ContactSearch from './ContactSearch';
import { UserContext } from "../context/userContext";
import Avatar from '../images/IMG-20230525-WA0014 (1).jpg';
import { motion } from "framer-motion";
export default function Contacts ({messages, contacts, admin, filterChatToUser, students, courseAuthor, userId}) {
  const loggedInUser = React.useContext(UserContext);
  // const [contactId, setContactId] = React.useState("");

  //functions
  // function showContactId(student) {
  //   console.log(student);
  //   // filterChatToUser(id);
  // };

  React.useEffect(() => {
    console.log(students);
  }, [students])
  //variables
  let contact = {};
  // React.useEffect(() => {
  //   console.log(userId);
  // }, [userId]);
  // console.log(students);
  return (
    <div className="lesson__div-chat-contacts" style={{width: messages.length > 0 && window.innerWidth <= 767 && "0%"}}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 15, minWidth: 200}}>
        <img style={{width: 40, aspectRatio: "1/1", borderRadius: "51%", objectFit: "cover"}} src={Avatar} alt="аватар"></img>
        <h3 style={{color: "white", margin: 0}}>Контакты</h3>
      </div>
      <ContactSearch messages={messages} />
      <ul className="lesson__div-chat-contacts-ul" style={{listStyle: "none", margin: "25px 0 0 0", padding: "0 10px 0 5px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: 20, overflow: "auto"}}>
        {loggedInUser.admin ?
          // contacts.length > 0 ? contacts.map((contact) => {
          //   return <motion.li initial={{backgroundColor: "rgba(255, 255, 255, 0)"}} whileHover={{backgroundColor: "rgba(224, 224, 224, 1)"}} key={contact._id} onClick={() => {
          //     showContactId(contact._id);
          //   }} style={{display:"flex", justifyContent:"flex-start", alignItems:"center", padding: "10px 20px", cursor:"pointer", boxSizing: "border-box"}}>
          //     <div style={{position: "relative", margin: "0 25px 0 0", display: "flex"}}>
          //       <img style={{maxWidth: 40, borderRadius: 51}} src="https://yaponaroll.ru/images/20200701_001.jpg"></img>
          //       <div style={{position: "absolute", width: 9, height: 9, backgroundColor: contact.online ? "green" : "red", borderRadius: "51%", bottom: 0, right: 5}}></div>
          //     </div>
              
          //     <p style={{margin: 0}}>{contact._id}</p>
          //   </motion.li>
          // })
          // :
          // <li style={{display:"flex", justifyContent:"flex-start", alignItems:"center", padding: "10px 20px", boxSizing: "border-box"}}>
          //   <p style={{margin: 0}}>Пока нет студентов в модуле, но их всегда можно добавить!</p>
          // </li>
          students.length > 0 && students.map((student) => {
            // return <li key={student._id}>
            //   <button onClick={() => {
            //     filterChatToUser(student);
               
            //   }}>{student.name}</button>  
            // </li>
            return <Contact key={student._id} contact={student} filterChatToUser={filterChatToUser}/>
          })
          : 
          courseAuthor._id && <Contact key={courseAuthor._id} contact={courseAuthor} filterChatToUser={filterChatToUser}/>
          // <li key={courseAuthor._id}>
          //   <button onClick={() => {
          //     filterChatToUser(courseAuthor);
             
          //   }}>{courseAuthor.name}</button>
          // </li>
          // <motion.li initial={{backgroundColor: "rgba(255, 255, 255, 0)"}} whileHover={{backgroundColor: "rgba(224, 224, 224, 1)"}} key={admin._id} onClick={() => {
          //   showContactId(admin._id);
          // }} style={{display:"flex", justifyContent:"flex-start", alignItems:"center", padding: "10px 20px", cursor:"pointer", boxSizing: "border-box"}}>
          //   <div style={{position: "relative", margin: "0 25px 0 0", display: "flex"}}>
          //     <img style={{maxWidth: 40, borderRadius: 51}} src="https://yaponaroll.ru/images/20200701_001.jpg"></img>
          //     <div style={{position: "absolute", width: 9, height: 9, backgroundColor: admin.online ? "green" : "red", borderRadius: "51%", bottom: 0, right: 5}}></div>
          //   </div>
          //   <p style={{margin: 0}}>{admin.name}</p>
          // </motion.li>
        }
      </ul>
    </div>
  )
}
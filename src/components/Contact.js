import React from "react";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
export default function Contact({contact, selectedUser, setLesson}) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <button onClick={() => {
            navigate({
                pathname: `${location.pathname}`,
                search: `?${createSearchParams({
                    contactId: contact._id
                })}`
            });
            // window.location.reload(true);
            
            setLesson((prevValue) => {
                const updatedStudents = prevValue.students.map((student) => {
                    return student._id === contact._id ? {...student, notif: 0} : student;
                  });
                  return {...prevValue, students: updatedStudents};
            });

            
                // filterChatToUser(contact);
                // getUserMsgs(contact);
        }} style={{color: selectedUser && selectedUser._id === contact._id && "black"}}>
                {/* <div style={{position: "relative"}}>
                    <img style={{width: 35, aspectRatio: "1/1", borderRadius: "51%", objectFit: "cover"}} src={Avatar} alt="аватар"></img>
                    {contact.online && <div style={{position: "absolute", bottom: 0, right: 5, width: 7, height: 7, borderRadius: "51%", backgroundColor: "#38e725"}}></div>}
                </div> */}
            <div className="lesson__div-chat-contacts-li-name__wrapper">
                <div className="lesson__div-chat-contacts-li-name__wrapper-vip">
                    <p style={{margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{contact.name}</p>
                    {contact.vip && <span className="lesson__div-chat-contacts-li-name__wrapper-span">vip</span>}
                </div>
                {contact.notif > 0 && <span className="lesson__div-chat-contacts-li-name__wrapper-notification">{contact.notif}</span>}
            </div>
            {contact.name !== 'Поддержка' && <p>{contact.email}</p>}
        </button>
    )
};
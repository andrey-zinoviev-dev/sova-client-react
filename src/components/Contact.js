import React from "react";
import Avatar from '../images/IMG-20230525-WA0014 (1).jpg';
export default function Contact({contact, filterChatToUser}) {

    return (
        <li style={{width: 200, height: 40}}>
            <button style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10, padding: "0 10px", boxSizing: "border-box", borderRadius: 9, color: "rgb(199, 199, 201)", backgroundColor: "rgb(38, 39, 44)", border: "none"}} onClick={() => {
                filterChatToUser(contact);
            }}>
                <div style={{position: "relative"}}>
                    <img style={{width: 35, aspectRatio: "1/1", borderRadius: "51%", objectFit: "cover"}} src={Avatar} alt="аватар"></img>
                    {contact.online && <div style={{position: "absolute", bottom: 0, right: 5, width: 7, height: 7, borderRadius: "51%", backgroundColor: "#38e725"}}></div>}
                </div>
                <p style={{margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{contact.email}</p>
            </button>
        </li>
    )
};
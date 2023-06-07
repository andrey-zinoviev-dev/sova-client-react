import React from "react";

export default function Contact({contact, filterChatToUser}) {

    return (
        <li style={{width: 200, height: 40}}>
            <button style={{width: "100%", height: "100%", padding: 0, boxSizing: "border-box", borderRadius: 9, color: "rgb(199, 199, 201)", backgroundColor: "rgb(38, 39, 44)", border: "none"}} onClick={() => {
                filterChatToUser(contact);
            }}>{contact.email}</button>
        </li>
    )
};
import React from "react";

export default function Contact({contact, filterChatToUser}) {

    return (
        <li>
            <button onClick={() => {
                filterChatToUser(contact);
            }}>{contact.email}</button>
        </li>
    )
};
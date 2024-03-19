import React from "react";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
export default function Contact({contact}) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        // <li style={{width: 200, height: 40}}>
            <button onClick={() => {
                navigate({
                    pathname: `${location.pathname}`,
                    search: `?${createSearchParams({
                        contactId: contact._id
                    })}`
                })
                // filterChatToUser(contact);
                // getUserMsgs(contact);
            }}>
                {/* <div style={{position: "relative"}}>
                    <img style={{width: 35, aspectRatio: "1/1", borderRadius: "51%", objectFit: "cover"}} src={Avatar} alt="аватар"></img>
                    {contact.online && <div style={{position: "absolute", bottom: 0, right: 5, width: 7, height: 7, borderRadius: "51%", backgroundColor: "#38e725"}}></div>}
                </div> */}
                <p style={{margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{contact.name}</p>
            </button>
        // </li>
    )
};
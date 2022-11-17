import React from "react";
import Messages from "./Messages";
export default function MessageForm({ selectedContact, moduleID }) {

  return (
    <div>
      <Messages moduleID={moduleID} selectedContact={selectedContact}></Messages>
      <form>
        <input></input>
        <button>Отправить</button>
      </form>
    </div>
  )
}
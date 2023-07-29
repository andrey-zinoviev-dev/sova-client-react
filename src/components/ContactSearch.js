import React from "react";
import SearchPic from '../images/magnifying-glass-solid_1.png';
import './ContactSearch.css';
export default function ContactSearch({messages}) {
  return (
    <form className="lesson__div-chat-contacts-form" style={{width: 200, height: 30, margin: "25px 0 0 0", position: "relative", display: messages.length > 0 && window.innerWidth <= 767 ? "none" : 'block'}} onSubmit={(evt) => {
      evt.preventDefault();
      console.log('ues');
    }}>
      <img style={{aspectRatio: "1/1", width: 15, position: "absolute", top: 7, left: 10}} src={SearchPic} alt="лупа"></img>
      <input className="lesson__div-chat-contacts-form-input" style={{borderRadius: 15, width: "100%", height: "100%", boxSizing: "border-box", padding: "0 0 0 35px", backgroundColor: "#292A2F", border: "none"}} placeholder="Поиск"></input>
    </form>
  )
};

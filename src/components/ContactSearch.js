import React from "react";
import SearchPic from '../images/magnifying-glass-solid_1.png'
export default function ContactSearch() {
  return (
    <form style={{width: 200, height: 30}} onSubmit={(evt) => {
      evt.preventDefault();
      console.log('ues');
    }}>
      <div style={{position: "relative"}}>
        <img src={SearchPic} alt="лупа"></img>
        <input style={{borderRadius: 15, width: "100%", height: "100%", boxSizing: "border-box"}} placeholder="Поиск"></input>
      </div>
      
    </form>
  )
};

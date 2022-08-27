import React from "react";

export default function Navigation(props) {
   
  return (
    <header>
      <button className="header__button header__button_login" onClick={props.openLoginPopup}>Войти</button>
      <button className="header__button header__button_register" onClick={props.openRegisterPopup}>Зарегистрироваться</button>
    </header>
  )
}
import React from "react";
import './Login.css';
export default function Login(props) {
  
  return (
    <section className={props.isOpened ? "popup popup_login popup_opened" : "popup popup_login"}>
        <button className="popup__close" onClick={props.closePopup}>Закрыть</button>
        <h3>Вход</h3>
        <form action="/">
            <input type="text" className="popup__form-input" name="email" placeholder="почта" />
            <input type="password" className="popup__form-input" name="password" id="" placeholder="пароль" />
            <button className="popup__form-button" type="submit" data-type="login">Войти</button>
        </form>
    </section>
  )
}
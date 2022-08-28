import React from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';
export default function Login(props) {
  
  //state variables
  // const [email, setEmail] = React.useState(null);
  // const [password, setPassword] = React.useState(null);
  const objToPost = {};

  //functions
  function setInputValues(evt) {
    objToPost[evt.target.name] = evt.target.value;
  };

  function submitLoginForm(evt) {
    props.formSubmit(evt, objToPost)
  };

  return (
    <section className={props.isOpened ? "popup popup_login popup_opened" : "popup popup_login"}>
        <button className="popup__close" onClick={props.closePopup}>Закрыть</button>
        <h3>Вход</h3>
        <form action="/" onSubmit={submitLoginForm}>
            <input onInput={setInputValues} type="text" className="popup__form-input" name="email" placeholder="почта" />
            <input onInput={setInputValues} type="password" className="popup__form-input" name="password" id="" placeholder="пароль" />
            <button className="popup__form-button" type="submit" data-type="login">Войти</button>
        </form>
    </section>
  )
}
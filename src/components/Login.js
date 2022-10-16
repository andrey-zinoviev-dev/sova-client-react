import React from "react";
import { useNavigate } from 'react-router-dom';
import SovaLogo from '../images/sova_logo_icon.png';
// import './Login.css';

export default function Login({ loginPopupOpened }) {
  const loginRef = React.useRef();
  const passwordRef = React.useRef();

  const objToPost = {};

  //functions
  function setInputValues(evt) {
    // objToPost[evt.target.name] = evt.target.value;
  };

  function submitLoginForm() {
    console.log(loginRef.current.value);
    console.log(passwordRef.current.value);
    // props.formSubmit(evt, objToPost)
  };

  return (
    <section className={loginPopupOpened ? "popup popup_login popup_opened" : "popup popup_login"}>
        {/* <div className="popup__left-wrapper">
          <img className="popup__left-logo" src={SovaLogo}></img>
          <div>
            <span className="popup__left-span">SOVA STUDIO</span>
            <p className="popup__left-p">Заходи, присоединись к семье проессионалов, стань профессионалом</p>
          </div>
        </div>
        <div className="popup__right-wrapper">
          <div className="popup__form-wrapper">
            <button className="popup__close" onClick={closePopups}>Закрыть</button>
            <h3 className="popup__headline">Вход</h3>
            <form className="popup__form" onSubmit={submitLoginForm}>
                <input ref={loginRef} type="text" className="popup__form-input" name="email" placeholder="почта" />
                <input ref={passwordRef} type="password" className="popup__form-input" name="password" id="" placeholder="пароль" />
                <button className="popup__form-button" type="submit" data-type="login">Войти</button>
            </form>
          </div>
        </div> */}
      <div className="popup__overlay">

      </div>
    </section>
  )
}
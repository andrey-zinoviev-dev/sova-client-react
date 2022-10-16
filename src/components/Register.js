import React from "react";

export default function Register({registerPopupOpened, closePopups }) {

  // const [emailInput, setEmailInput] = React.useState(null);
  // const [passwordInput, setPasswordInput] = React.useState(null);
  const loginRef = React.useRef();
  const passwordRef = React.useRef();
  const objToPost = {};

  function submitForm(evt) {
    evt.preventDefault();
    console.log(loginRef.current.value, passwordRef.current.value);
  }

  // function submitRegistForm(evt) {
  //   props.formSubmit(evt, objToPost);
  // };

  return (
    <section className={registerPopupOpened ? "popup popup_register popup_opened" : "popup popup_register"}>
      <div className="popup__left-wrapper">
          <img className="popup__left-logo"></img>
          <div>
            <span className="popup__left-span">SOVA STUDIO</span>
            <p className="popup__left-p">Заходи, присоединись к семье проессионалов, стань профессионалом</p>
          </div>
      </div>
      <div className="popup__right-wrapper">
        <div className="popup__form-wrapper">
          <button className="popup__close" onClick={closePopups}>Закрыть</button>
          <h3 className="popup__headline">Регистрация</h3>
          <form className="popup__form" onSubmit={(evt) => {submitForm(evt)}}>
            <input ref={loginRef} type="text" className="popup__form-input" name="email" placeholder="почта" />
            <input ref={passwordRef} type="password" className="popup__form-input" name="password" id="" placeholder="пароль" />
            <button className="popup__form-button" type="submit" data-type="login">Войти</button>
          </form>
        </div>
      </div>
      <div className="popup__overlay">

      </div>
      {/* <form action="/" onSubmit={submitRegistForm}>
        <input type="text" className="popup__form-input" name="email" placeholder="почта" required={true} onInput={showInput} />
        <input type="password" className="popup__form-input" name="password" id="" placeholder="пароль" required onInput={showInput} />
        <input type="text" className="popup__form-input" name="fullname" placeholder="ФИО" required = {true} onInput={showInput} />
        <button className="popup__form-button" type="submit" data-type="register">Зарегистрироваться</button>
      </form> */}
    </section>
  )
}
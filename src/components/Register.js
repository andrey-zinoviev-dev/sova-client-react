import React from "react";

export default function Register(props) {

  // const [emailInput, setEmailInput] = React.useState(null);
  // const [passwordInput, setPasswordInput] = React.useState(null);
  const objToPost = {};

  function showInput(evt) {
    objToPost[evt.target.name] = evt.target.value;
  }

  function submitRegistForm(evt) {
    props.formSubmit(evt, objToPost);
  };

  return (
    <section className={props.isOpened ? "popup popup_register popup_opened" : "popup popup_register"}>
      <button className="popup__close">Закрыть</button>
      <h3>Регистрация</h3>
      <form action="/" onSubmit={submitRegistForm}>
        <input type="text" className="popup__form-input" name="email" placeholder="почта" required={true} onInput={showInput} />
        <input type="password" className="popup__form-input" name="password" id="" placeholder="пароль" required onInput={showInput} />
        <input type="text" className="popup__form-input" name="fullname" placeholder="ФИО" required = {true} onInput={showInput} />
        <button className="popup__form-button" type="submit" data-type="register">Зарегистрироваться</button>
      </form>
    </section>
  )
}
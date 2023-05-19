import React from "react";

export default function AddStudent({addStudentOpened}) {
  return (
    <section className={!addStudentOpened ? 'popup' : 'popup popup_opened'}>
      <h3>Добавить студента к платформе</h3>
      <form className="popup__form">
          <button className="popup__close" type="button">Закрыть</button>
          <input type="text" className="popup__form-input" name="email" placeholder="почта" />
          <input type="password" className="popup__form-input" name="password" id="" placeholder="пароль" />
          <button className="popup__form-button" type="submit" data-type="login">Войти</button>
      </form>
    </section>
  )
};
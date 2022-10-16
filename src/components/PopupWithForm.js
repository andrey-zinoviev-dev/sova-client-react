import React from "react";
import './PopupWithForm.css';

export default function PopupWithForm({ welcomePopupOpened, children }) {

    return (
        <section className={welcomePopupOpened ? "popup popup_login popup_opened" : "popup popup_login"}>
            {children}
        </section >
        
    //     <section className={welcomePopupOpened ? "popup popup_login popup_opened" : "popup popup_login"}>
    //     <div className="popup__left-wrapper">
    //       <img className="popup__left-logo" src={SovaLogo}></img>
    //       <div>
    //         <span className="popup__left-span">SOVA STUDIO</span>
    //         <p className="popup__left-p">Заходи, присоединись к семье проессионалов, стань профессионалом</p>
    //       </div>
    //     </div>
    //     <div className="popup__right-wrapper">
    //       <div className="popup__form-wrapper">
    //         <button className="popup__close" onClick={closePopups}>Закрыть</button>
    //         <h3 className="popup__headline">Вход</h3>
    //         <form className="popup__form">
    //             <input ref={loginRef} type="text" className="popup__form-input" name="email" placeholder="почта" />
    //             <input ref={passwordRef} type="password" className="popup__form-input" name="password" id="" placeholder="пароль" />
    //             <button className="popup__form-button" type="submit" data-type="login">Войти</button>
    //         </form>
    //       </div>
    //     </div>
    //   <div className="popup__overlay">

    //   </div>
    // </section>
    )
}
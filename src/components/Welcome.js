import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Main from './Main';
// import Login from './Login';
// import Register from './Register';
import Dashboard from './Dashboard';
import PopupWithForm from './PopupWithForm';

import SovaLogo from '../images/sova_logo_icon.png';
import './Welcome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faVk, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

//framer-motion variants
const animationVariants = {
  registerForm: {translate: "0% 0%", transition: {duration: 1, ease: [0.75,0.1,0.39,0.91]}},
  loginForm: {translate: window.innerWidth > 768 ? "0% -50%" : "-50% 0%", transition: {duration: 1, ease: [0.75,0.1,0.39,0.91]}},
}

const rightWrapperVariants = {
  registerForm: {translate: "0%", transition: {delay: 0.15, duration: 0.75, ease: [0.75,0.1,0.39,0.91]}},
  loginForm: {translate: "-100%", transition: { delay: 0.15, duration: 0.75, ease: [0.75,0.1,0.39,0.91]}},
}

const textAnimationVariants = {
  registerForm: {opacity: [0, 0, 1], transition: {duration: 0.75, ease: "easeInOut", opacity: {duration: 0.5, ease: "easeInOut"}}},
  loginForm: {opacity:[0, 0, 1], transition: {duration: 0.75, ease: "easeInOut", opacity: {duration: 0.5, ease: "easeInOut"}}},
}

export default function Welcome({ loginFormSubmit, registerFormSubmit }) {
  
  const loginEmailRef = React.useRef();
  const loginPasswordRef = React.useRef();
  const registerEmailRef = React.useRef();
  const registerPasswordRef = React.useRef();

  const [popupOpened, setPopupOpened] = React.useState(false);
  const [loginButtonPressed, setLoginButtonPressed] = React.useState(true);
  // const [initiateAnimation, setInitiateAnimation] = React.useState(0);

  function openWelcomePopupLogin() {
    // console.log('app is rendered');
    setPopupOpened(true);
    setLoginButtonPressed(true);
  };

  // function openWelcomePopupRegister() {
  //   // console.log('app is rendered');
  //   setWelcomePopupOpened(true);
  //   setLoginButtonPressed(false);
  // };

  function closePopups() {
    setPopupOpened(false);
    // setLoginButtonPressed(false);
    // setInitiateAnimation(0);
  };

  function submitloginForm(evt) {
    evt.preventDefault();
    // console.log(loginEmailRef.current, loginPasswordRef.current);
    const objToPost = {email: loginEmailRef.current.value, password: loginPasswordRef.current.value};
    loginFormSubmit(objToPost)
  }

  function submitregisterForm(evt) {
    evt.preventDefault();
    const objToPost = {email: registerEmailRef.current.value, password: registerPasswordRef.current.value};
    registerFormSubmit(objToPost);
  };


  
  return (
    <>
      <section className='welcome'>

        <Dashboard></Dashboard>
        <div className='welcome__content'>
          <div className='welcome__content-left'>
            <h1 className='welcome__content-headline'>SOVA<span style={{color: "rgba(252,101,48,75%)"}}>.</span></h1>
            <span className='welcome__content-left-span'>BE STELLAR, SING STELLAR</span>
          </div>
        
          <div className='welcome__content-right'>
            {/* <span></span> */}
            <img className='welcome__content-right-img' src='https://soyuzmicrophones.com/wp-content/uploads/2019/03/front-page-hero.jpg'></img>
            
            {/* <div> */}
              
              {/* <button className="welcome__button header__button_login" onClick={openWelcomePopupLogin} >Войти</button>
              <button className="welcome__button header__button_register" onClick={openWelcomePopupRegister} >Зарегистрироваться</button> */}
            {/* </div> */}

          </div>

          <div className='welcome__content-proceed'>
              <button className='welcome__content-button' onClick={openWelcomePopupLogin}>Войти</button>
          </div>
          
          {/* <p>Проходи курсы по вокалу от Саши Совы здесь, становись экспертом здесь, у себя, везде. А потом тренируй остальных, ибо ты уже эксперт(ка)</p> */}

         
        </div>
        <footer className='welcome__footer'>
          <nav className='welcome__footer-nav'>
            <ul className='welcome__links-list'>
              <li className='welcome__links-list-element'>
                <button className='welcome__links-list-element-button'>
                  Fb.
                  {/* <FontAwesomeIcon className='welcome__links-list-element-icon' icon={faFacebookF} /> */}
                </button>
              </li>
              <li className='welcome__links-list-element'>
                <button className='welcome__links-list-element-button'>
                  Vk.
                  {/* <FontAwesomeIcon className='welcome__links-list-element-icon' icon={faVk} /> */}
                </button>
              </li>
              <li className='welcome__links-list-element'>
                <button className='welcome__links-list-element-button'>
                  Yt.
                  {/* <FontAwesomeIcon className='welcome__links-list-element-icon' icon={faYoutube} /> */}
                </button>
              </li>
              <li className='welcome__links-list-element'>
                <button className='welcome__links-list-element-button'>
                  In.
                  {/* <FontAwesomeIcon className='welcome__links-list-element-icon' icon={faInstagram} /> */}
                </button>
              </li>
            </ul>
          </nav>
        </footer>
        <div className='filter'></div>
    </section>
    <PopupWithForm popupOpened={popupOpened} closePopups={closePopups} loginButtonPressed={loginButtonPressed}>
      {/* <motion.div className="popup__left-wrapper" animate={loginButtonPressed ? "registerForm" : "loginForm" } variants={animationVariants}>
        <img className="popup__left-logo" src={SovaLogo}></img>
        <div style={{overflow: "hidden", padding: "5% 10%", boxSizing: "border-box"}}>
          <motion.div animate={loginButtonPressed ? "registerForm" : "loginForm"} variants={textAnimationVariants}>
            <span className="popup__left-span">SOVA STUDIO</span>
            <h3>{loginButtonPressed ? "Добро пожаловать! Присоединяйся к семье, стань профессионалом, начни петь аки мастер" : "С возвращением! Входи, чтобы поскорее вернуться к занятиям"}</h3>

          </motion.div>
          <motion.button whileHover={{scale: 1.1, backgroundColor:"rgba(0, 0, 0)", color:"#f8f205", transition: {duration: 0.25}}} whileTap={{scale: 0.85, transition: {duration: 0.15}}} className='popup__left-button' onClick={() => { setLoginButtonPressed(!loginButtonPressed)}}>{loginButtonPressed ? "Нет учетной записи? Регистрируйся!" : "Уже присоединялся? Тогда входи!"}</motion.button>
        </div>
      </motion.div>
      <motion.div className="popup__right-wrapper" animate={loginButtonPressed ? "registerForm" : "loginForm"} variants={rightWrapperVariants}>
        <div className="popup__form-wrapper">
          <button className="popup__close" onClick={closePopups}>Закрыть</button>
          <h3 className="popup__headline">{loginButtonPressed ? 'Вход' : 'Регистрация'}</h3>
          <form className="popup__form" onSubmit={loginButtonPressed ? submitloginForm : submitregisterForm}>
            <motion.input whileTap={{scale: 0.95}} ref={loginRef} type="text" className="popup__form-input" name="email" placeholder="почта" />
            <motion.input whileTap={{scale: 0.95}} ref={passwordRef} type="password" className="popup__form-input" name="password" id="" placeholder="пароль" />
            <button className="popup__form-button" type="submit" data-type="login">Войти</button>
          </form>
        </div>
      </motion.div> */}
      <div className="popup__left-wrapper">
        <img className="popup__left-logo" src='https://static.tildacdn.com/tild6665-6638-4561-b964-343330373834/sova_logo_icon____4.png'></img>
        <h3 className='popup__left-wrapper-headline'>Войти</h3>
      </div>

      <div className='popup__right-wrapper'>
        <form className="popup__form" onSubmit={(evt) => {submitloginForm(evt)}}>
          <button className="popup__close" onClick={closePopups}>Закрыть</button>
          <input ref={loginEmailRef} type="text" className="popup__form-input" name="email" placeholder="почта" />
          <input ref={loginPasswordRef} type="password" className="popup__form-input" name="password" id="" placeholder="пароль" />
          <button className="popup__form-button" type="submit" data-type="login">Войти</button>
        </form>
      </div>
      <div className="popup__overlay">

      </div>
    </PopupWithForm>
    {/* <Login loginPopupOpened={loginPopupOpened} closePopups={closePopups}></Login> */}
    {/* <Register registerPopupOpened={registerPopupOpened} closePopups={closePopups}></Register> */}
    </>
  )
}
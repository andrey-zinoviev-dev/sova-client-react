import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Main from './Main';
// import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import PopupWithForm from './PopupWithForm';
import RefreshPass from './RefreshPass';

import SovaLogo from '../images/Rectangle_12.png';
import './Welcome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faVk, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { apiCheckUserEmail, apiNewPassword } from '../api';

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

export default function Welcome({ errorMessage, loginFormSubmit, registerFormSubmit, submitForgetPasswordForm }) {
  
  const loginEmailRef = React.useRef();
  const loginPasswordRef = React.useRef();
  const registerEmailRef = React.useRef();
  const registerPasswordRef = React.useRef();
  const registerNameRef = React.useRef();
  const findByEmailRef = React.useRef();
  const newPasswordRef = React.useRef();
  const newPasswordRepeatRef = React.useRef();

  const [popupOpened, setPopupOpened] = React.useState(false);
  const [registerPopupOpened, setRegisterPopupOpened] = React.useState(false);
  const [loginButtonPressed, setLoginButtonPressed] = React.useState(true);
  const [passwordRestorePressed, setPasswordRestorePressed] = React.useState(false);
  const [passwordRestorerStep, setPasswordRestoreStep] = React.useState(0);
  const [userToUpdateData, setUserToUpdateData] = React.useState({email: "", password: ""});
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

  function closeRegisterPopup() {
    setRegisterPopupOpened(false);
  };

  function submitloginForm(evt) {
    evt.preventDefault();
    // console.log(loginEmailRef.current, loginPasswordRef.current);
    const objToPost = {email: loginEmailRef.current.value, password: loginPasswordRef.current.value};
    loginFormSubmit(objToPost)
  }

  function submitNewPasswordForm(evt) {
    evt.preventDefault();
    // console.log(userToUpdateData);
    // console.log('forget password form submitted');

    // const objToPost = {password: newPasswordRef.current.value};
    apiNewPassword(userToUpdateData)
    .then((data) => {
      if(data.success) {
        setPasswordRestoreStep((prevValue) => {
          return prevValue + 1;
        })
      }
    })
    // registerFormSubmit(objToPost);
    // submitForgetPasswordForm(objToPost);
  };

  function renderNewPassword () {
    switch(passwordRestorerStep) {
      case 0: 
        return <div>
          <input ref={findByEmailRef} type="email" style={{margin: "0 0 50px 0"}} className="popup__form-input" name="email" placeholder="Email" />
          {/* <input ref={newPasswordRepeatRef} type="password" className="popup__form-input" name="password" id="" placeholder="повтор пароля" /> */}
          <div style={{display :"flex", justifyContent: "space-between", alignItems: "center"}}>
          {/* <button onClick={() => {
            setPasswordRestorePressed(false);
          }} style={{margin: 0}} className="popup__form-button" type="button" data-type="login">Назад</button> */}
            <button onClick={() => {
              apiCheckUserEmail({email: findByEmailRef.current.value})
              .then((data) => {
                if(data.message) {
                  console.log(data.message);
                }
                if(data._id) {
                  setUserToUpdateData((prevValue) => {
                    return {...prevValue, email: data._id};
                  })
                  setPasswordRestoreStep((prevValue) => {
                    return prevValue + 1;
                  })
                }
              })

              // console.log(findByEmailRef.current.value);
              // setPasswordRestoreStep((prevValue) => {
              //   return prevValue + 1;
              // })
            }} style={{margin: 0}} className="popup__form-button" type="button" data-type="login">Найти по почте</button>
          </div>
        </div>
        
      case 1: 
        return <div>
          <div style={{display: "flex", flexDirection: "column", gap: 10, margin: "0 0 30px 0"}}>
            <input onChange={(evt) => {
              setUserToUpdateData((prevValue) => {
                return {...prevValue, password: evt.target.value};
              })
            }} ref={newPasswordRef} type="password" className="popup__form-input" name="password" placeholder="Новый пароль" />
            <input ref={newPasswordRef} type="password" className="popup__form-input" name="password" placeholder="Повтор нового пароля" />
          </div>
          <div style={{display :"flex", flexDirection: window.innerWidth <= 767 && "column", justifyContent: "space-between", alignItems: window.innerWidth <= 767 ? "stretch" : "center", maxWidth: window.innerWidth <= 767 && 180, margin: "0 auto"}}>
            <button onClick={() => {
              setPasswordRestoreStep((prevValue) => {
                return prevValue - 1;
              })
            }} style={{margin: 0}} className="popup__form-button" type="button" data-type="login">Назад</button>
            <button style={{margin: 0}} className="popup__form-button" type="submit" data-type="login">Обновить пароль</button>
          </div>
        </div>
      
      case 2: 
        return <div>
          <p style={{color: "white"}}>Пароль успешно обновлен!</p>
          <button onClick={() => {
            setPasswordRestorePressed(false);
            setUserToUpdateData({email: "", password: ""});
            setPasswordRestoreStep(0);
          }} className="popup__form-button" type="button">
            Войти
          </button>
          {/* <h3></h3> */}
        </div>
      default: break;
        
    }
  }

  
  return (
    <>
      <section className='welcome'>

        {/* <Dashboard></Dashboard> */}
        <div className='welcome__content'>
          <div className='welcome__content-wrapper'>
            <h1 className='welcome__content-headline'>sasha sova</h1>
            <div className='welcome__content-wrapper-buttons'>
              {/* <button></button> */}
              <motion.button className='welcome__content-button' whileHover={{backgroundColor: "rgb(93, 176, 199, 1)"}} onClick={() => {
                setPopupOpened(true);
              }}>войти</motion.button>
              {/* <motion.button className='welcome__content-button' whileHover={{backgroundColor: "rgb(93, 176, 199, 1)"}} onClick={() => {
                setRegisterPopupOpened(true);
              }}>зарегистрироваться</motion.button> */}
            </div>
          </div>

        </div>

          {/* <div className='welcome__content-proceed'>
              <button className='welcome__content-button' onClick={openWelcomePopupLogin}>Войти</button>
          </div> */}
          
          {/* <p>Проходи курсы по вокалу от Саши Совы здесь, становись экспертом здесь, у себя, везде. А потом тренируй остальных, ибо ты уже эксперт(ка)</p> */}

         
        {/* </div> */}
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
        <img className='welcome__cover' alt='лого сова' src={SovaLogo}></img>
        <div className='welcome__overlay'></div>
        {/* <div className='filter'></div> */}
    </section>
    <PopupWithForm popupOpened={popupOpened} closePopups={closePopups} loginButtonPressed={loginButtonPressed}>
      <div className='popup__right-wrapper'>
        <h3 className='popup__right-wrapper-headline'>{passwordRestorePressed ? "Восстановить пароль" : "Войти"}</h3>
        {!passwordRestorePressed ? <form className="popup__form" onSubmit={(evt) => {submitloginForm(evt)}}>
        <p className='popup__form-error'>{errorMessage}</p>
          <button className="popup__close" onClick={closePopups}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className='popup__right-wrapper-div'>
            <input ref={loginEmailRef} autoComplete='off' type="text" className="popup__form-input" name="email" placeholder="почта" />
          </div>
          <div className='popup__right-wrapper-div' style={{position: "relative"}}>
            <input ref={loginPasswordRef} autoComplete='off' type="password" className="popup__form-input" name="password" id="" placeholder="пароль" />
            <motion.button onClick={() => {
              setPasswordRestorePressed(true);
            }} whileHover={{border: "2px solid #5DB0C7", color: "rgba(255, 255, 255, 1)"}} style={{minWidth: 30, minHeight: 30, position: "absolute", top: 0, right: 0, margin: 0, border: "2px solid #5db0c79c", color: "rgba(255, 255, 255, 0.7)"}} className="popup__form-button" type='button'>?</motion.button>
          </div>
          <button className="popup__form-button" type="submit" data-type="login">Войти</button>
        </form>
        :
        <RefreshPass>
          <form style={{minHeight: 120}} className="popup__form" onSubmit={(evt) => {submitNewPasswordForm(evt)}}>
            <div style={{display: "flex", justifyContent: "space-between", margin: "0 0 20px 0"}}>
              <button type='button' className="popup__close" style={{border: "2px solid #5DB0C7", color: "white"}} onClick={() => {
                setPasswordRestorePressed(false);
              }}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>  
              <button type='button' className="popup__close" onClick={closePopups}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

          
          {renderNewPassword()}

        </form>
        </RefreshPass>}
      </div>
      {/* <RefreshPass */}
      <div className="popup__overlay">

      </div>
    </PopupWithForm>
    {/* <Login loginPopupOpened={loginPopupOpened} closePopups={closePopups}></Login> */}
    {/* <PopupWithForm popupOpened={registerPopupOpened}>
      <div className="popup__left-wrapper">
        <img className="popup__left-logo" alt='лого сова' src='https://static.tildacdn.com/tild6665-6638-4561-b964-343330373834/sova_logo_icon____4.png'></img>
        <h3 className='popup__left-wrapper-headline'>Зарегистрироваться</h3>
      </div>
      <div className="popup__right-wrapper">
          <div className="popup__form-wrapper">
            <button onClick={closeRegisterPopup} className="popup__close">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className="popup__right-wrapper-headline">Регистрация</h3>
            <form className="popup__form" onSubmit={(evt) => {
              submitregisterForm(evt);
            }}>
              <input ref={registerEmailRef} type="text" className="popup__form-input" name="email" placeholder="Почта" />
              <input ref={registerNameRef} type='text' className='popup__form-input' placeholder="Имя"></input>
              <input ref={registerPasswordRef} type="password" className="popup__form-input" name="password" id="" placeholder="Пароль" />
              <button className="popup__form-button" type="submit" data-type="login">Войти</button>
            </form>
          </div>
        </div>
        <div className="popup__overlay">

        </div>
    </PopupWithForm> */}
    </>
  )
}
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Main from './Main';
// import Login from './Login';
// import Register from './Register';
import PopupWithForm from './PopupWithForm';

import SovaLogo from '../images/sova_logo_icon.png';
import './Welcome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faVk, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

//framer-motion variants
const animationVariants = {
  registerForm: {translate: "0%"},
  loginForm: {translate: "100%"},
}

export default function Welcome() {
  
  const loginRef = React.useRef();
  const passwordRef = React.useRef();

  const [welcomePopupOpened, setWelcomePopupOpened] = React.useState(false);
  const [loginButtonPressed, setLoginButtonPressed] = React.useState(false);
  // const [initiateAnimation, setInitiateAnimation] = React.useState(0);

  function openWelcomePopupLogin() {
    // console.log('app is rendered');
    setWelcomePopupOpened(true);
    // setLoginButtonPressed(true);
  };

  function openWelcomePopup() {
    // console.log('app is rendered');
    setWelcomePopupOpened(true);
  };

  function closePopups() {
    setWelcomePopupOpened(false);
    setLoginButtonPressed(false);
    // setInitiateAnimation(0);
  };

  function switchFormToRegsitration() {
    setLoginButtonPressed(false);
    // setInitiateAnimation(1);
  };

  function switchFormToLogin() {
    setLoginButtonPressed(true);
    // setInitiateAnimation(0);
  }

  React.useEffect(() => {
    console.log(loginButtonPressed);
  }, [loginButtonPressed])

  return (
    <>
      <section className='welcome'>
        <header className='welcome__header'>
          <img className='welcome__header-logo' src='https://static.tildacdn.com/tild6665-6638-4561-b964-343330373834/sova_logo_icon____4.png'></img>
          <nav className='welcome__header-nav'>
            <ul className='welcome__header-nav-list'>
              <li className='welcome__header-nav-list-element'><Link className='welcome__header-nav-list-element-link' to='/music'>Музыка</Link></li>
              <li className='welcome__header-nav-list-element'><Link className='welcome__header-nav-list-element-link' to='/education'>Обучение</Link></li>
              <li className='welcome__header-nav-list-element'><Link className='welcome__header-nav-list-element-link' to='courseplatform'>Платформа</Link></li>
              <li className='welcome__header-nav-list-element'><Link className='welcome__header-nav-list-element-link' to='about'>Об Авторе</Link></li>
              <li className='welcome__header-nav-list-element'><Link className='welcome__header-nav-list-element-link' to='contacts'>Контакты</Link></li>
            </ul>
          </nav>
        </header>
        {/* <div className='container'></div> */}
        <div className='welcome__content'>
          <h1>Здраааааааасте, тут можно стать вокальным экспертом</h1>
          <p>Проходи курсы по вокалу от Саши Совы здесь, становись экспертом здесь, у себя, везде. А потом тренируй остальных, ибо ты уже эксперт(ка)</p>
          <div className='welcome__content-buttons-wrapper'>
            <button className="welcome__button header__button_login" onClick={openWelcomePopupLogin} >Войти</button>
            <button className="welcome__button header__button_register" onClick={openWelcomePopup} >Зарегистрироваться</button>
          </div>
          <span className='welcome__span'>SASHA SOVA INC. BE STELLAR, SING STELLAR</span>
        </div>
        <footer className='welcome__footer'>
          <nav className='welcome__footer-nav'>
            <ul className='welcome__links-list'>
              <li className='welcome__links-list-element'>
                <button className='welcome__links-list-element-button'>
                  <FontAwesomeIcon className='welcome__links-list-element-icon' icon={faFacebookF} />
                </button>
              </li>
              <li className='welcome__links-list-element'>
                <button className='welcome__links-list-element-button'>
                  <FontAwesomeIcon className='welcome__links-list-element-icon' icon={faVk} />
                </button>
              </li>
              <li className='welcome__links-list-element'>
                <button className='welcome__links-list-element-button'>
                  <FontAwesomeIcon className='welcome__links-list-element-icon' icon={faYoutube} />
                </button>
              </li>
              <li className='welcome__links-list-element'>
                <button className='welcome__links-list-element-button'>
                  <FontAwesomeIcon className='welcome__links-list-element-icon' icon={faInstagram} />
                </button>
              </li>
            </ul>
          </nav>
        </footer>
        <div className='filter'></div>
    </section>
    <PopupWithForm welcomePopupOpened={welcomePopupOpened} closePopups={closePopups} loginButtonPressed={loginButtonPressed}>
      <motion.div className="popup__left-wrapper" animate={loginButtonPressed ? "loginForm" : "registerForm"} variants={animationVariants} transition={{type: "spring", duration: 1.5}}>
        <img className="popup__left-logo" src={SovaLogo}></img>
        <div>
          <span className="popup__left-span">SOVA STUDIO</span>
          <p className="popup__left-p">Заходи, присоединись к семье проессионалов, стань профессионалом</p>
          <button onClick={() => { setLoginButtonPressed(!loginButtonPressed)}}>{loginButtonPressed ? "Нет учетной записи? Регистрируйся!" : "Уже присоединялся? Тогда входи!"}</button>
        </div>
      </motion.div>
      {/* <div className="popup__right-wrapper">
        <div className="popup__form-wrapper">
          <button className="popup__close" onClick={closePopups}>Закрыть</button>
          <h3 className="popup__headline">{loginButtonPressed ? 'Вход' : 'Регистрация'}</h3>
          <form className="popup__form">
            <input ref={loginRef} type="text" className="popup__form-input" name="email" placeholder="почта" />
            <input ref={passwordRef} type="password" className="popup__form-input" name="password" id="" placeholder="пароль" />
            <button className="popup__form-button" type="submit" data-type="login">Войти</button>
          </form>
        </div>
      </div> */}
      <div className="popup__overlay">

      </div>
    </PopupWithForm>
    {/* <Login loginPopupOpened={loginPopupOpened} closePopups={closePopups}></Login> */}
    {/* <Register registerPopupOpened={registerPopupOpened} closePopups={closePopups}></Register> */}
    </>
  )
}
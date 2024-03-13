import React from "react";
// import { motion } from "framer-motion";
import {UserContext} from '../context/userContext';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
// import MenuButton from '../images/Group 3.png';
import SovaLogo from '../images/sova-logo-white.png';
// import { motion } from "framer-motion";
export default function Dashboard({ setAddUserOpened, logout, loggedIn }) {
  const loggedUser = React.useContext(UserContext);

  //navigate
  const navigate = useNavigate();

  //states
  const [menuOpened, setMenuOpened] = React.useState(false);

  //functions
  // function openMenu() {
  //   setMenuOpened(true);
  // }

  // function closeMenu() {
  //   setMenuOpened(false);
  // }
  return (
    // <nav className="main__courses-nav">
    //   <img className="main__courses-logo" src='https://static.tildacdn.com/tild6665-6638-4561-b964-343330373834/sova_logo_icon____4.png'></img>
    //   <ul className="main__courses-nav-ul">
    //     <li className="main__courses-nav-ul-li"><Link className="main__courses-nav-ul-li-a">Главная</Link></li>
    //     <li className="main__courses-nav-ul-li"><Link className="main__courses-nav-ul-li-a">Обучение</Link></li>
    //     <li className="main__courses-nav-ul-li"><Link className="main__courses-nav-ul-li-a">Контакты</Link></li>
    //     <li className="main__courses-nav-ul-li"><Link className="main__courses-nav-ul-li-a">Профиль {loggedUser.email}</Link></li>
    //   </ul>
    // </nav>
    <>
      <header className='header' style={{margin: !loggedIn && 0}}>
        <div className="header__container">
          <img style={{maxWidth: 30}} src={SovaLogo} alt="sova-logo" />
          <div className="header__buttons">
            {loggedUser._id && loggedUser.admin && <button className="header__buttons-btn" style={{display: window.innerWidth <= 767 && "none"}} onClick={() => {
              navigate({pathname: '/addCourse'});
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="rgb(93, 176, 199)"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            </button>}
          {/* <button onClick={() => {
            navigate({pathname: "/testFiles"})
          }} className="header__buttons-btn">Тест</button> */}

            <button className="header__buttons-btn">{loggedUser._id && loggedUser.name[0]}</button>
            <button className="header__buttons-btn" onClick={logout}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="rgb(93, 176, 199)"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
            </button>
          </div>
        </div>
      </header>
      
    </>

  )
}


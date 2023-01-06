import React from "react";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import {UserContext} from '../context/userContext';
import './Dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
// import SovaLogo from '../images/sova_logo_icon.png';

export default function Dashboard() {
  const loggedUser = React.useContext(UserContext);

  //states
  const [menuOpened, setMenuOpened] = React.useState(false);

  //functions
  function openMenu() {
    setMenuOpened(true);
  }

  function closeMenu() {
    setMenuOpened(false);
  }
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
      <header className='header'>
        <img className='header__logo' alt="Логотип" src='https://static.tildacdn.com/tild6665-6638-4561-b964-343330373834/sova_logo_icon____4.png'></img>
        <button onClick={openMenu} style={{display: window.innerWidth >= 767 ?  "none" : "block", backgroundColor: "transparent", color: "white", fontSize: 18, border: "none"}}>
          <FontAwesomeIcon icon={faBars} style={{fontSize: 18}}/>
        </button>
        
        <nav className='header__nav' style={{display: !menuOpened && window.innerWidth < 768 ? "none" : "flex", height: window.innerWidth < 768 && "100vh", position: window.innerWidth < 768 && "absolute", top: window.innerWidth < 768 && 0, right: window.innerWidth < 768 && 0, borderLeft: window.innerWidth < 768 && "2px solid yellow", backdropFilter: "blur(5px)", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <button onClick={closeMenu} style={{display: window.innerWidth < 768 ? "inline-block" : "none", margin: "0 0 15px 0", backgroundColor: "transparent", border: "2px solid white", color: "white"}}>
            <FontAwesomeIcon icon={faClose} />
          </button>
          <ul className='header__nav-list' style={{flexDirection: window.innerWidth < 768 && "column", minWidth: window.innerWidth < 768 && 270, }}>
            <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='/music'>Музыка</Link></li>
            <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='/education'>Обучение</Link></li>
            <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='courseplatform'>Платформа</Link></li>
            <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='about'>Об Авторе</Link></li>
            <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='contacts'>Контакты</Link></li>
            {loggedUser._id && <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='contacts'>Профиль {`${loggedUser.name}`}</Link></li>}
          </ul>
        </nav>

      </header>
      
    </>

  )
}


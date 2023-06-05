import React from "react";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import {UserContext} from '../context/userContext';
import './Dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import MenuButton from '../images/Group 3.png';

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
        {/* <img className='header__logo' alt="Логотип" src='https://static.tildacdn.com/tild6665-6638-4561-b964-343330373834/sova_logo_icon____4.png'></img>
        <button onClick={openMenu} style={{display: window.innerWidth >= 767 ?  "none" : "block", backgroundColor: "transparent", color: "white", fontSize: 18, border: "none"}}>
          <FontAwesomeIcon icon={faBars} style={{fontSize: 18}}/>
        </button> */}
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 5}}>
          <p style={{margin: 0, fontSize: 40, lineHeight: 1}}>sova</p>
          <div style={{width: 7, height: 7, borderRadius: "51%", backgroundColor: "#5DB0C7", margin: "0 0 5px 0"}}></div>
        </div>
        
        
        <nav className='header__nav' style={{display: !menuOpened && window.innerWidth < 768 ? "none" : "flex", height: window.innerWidth < 768 && "100vh", position: window.innerWidth < 768 && "absolute", top: window.innerWidth < 768 && 0, right: window.innerWidth < 768 && 0, borderLeft: window.innerWidth < 768 && "2px solid yellow", backdropFilter: "blur(5px)", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <button onClick={closeMenu} style={{display: window.innerWidth < 768 ? "inline-block" : "none", margin: "0 0 15px 0", backgroundColor: "transparent", border: "2px solid white", color: "white"}}>
            <FontAwesomeIcon icon={faClose} />
          </button>
          <button style={{backgroundColor: "transparent", padding: 0, display: "flex", justifyContent: "center", alignItems: "center", border: "none"}}>
            <img style={{width: 20}} src={MenuButton} />
          </button>
          {/* <ul className='header__nav-list' style={{flexDirection: window.innerWidth < 768 && "column", minWidth: window.innerWidth < 768 && 270, padding: "10px 0 0 0", boxSizing: "border-box"}}>
            <li className='header__nav-list-element' style={{lineHeight: "1.5"}}><Link className='header__nav-list-element-link' to='/music'>Музыка</Link></li>
            <li className='header__nav-list-element' style={{lineHeight: "1.5"}}><Link className='header__nav-list-element-link' to='/education'>Обучение</Link></li>
            <li className='header__nav-list-element' style={{lineHeight: "1.5"}}><Link className='header__nav-list-element-link' to='courseplatform'>Платформа</Link></li>
            <li className='header__nav-list-element' style={{lineHeight: "1.5"}}><Link className='header__nav-list-element-link' to='about'>Об Авторе</Link></li>
            <li className='header__nav-list-element' style={{lineHeight: "1.5"}}><Link className='header__nav-list-element-link' to='contacts'>Контакты</Link></li>
            {loggedUser._id && <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='contacts'>Профиль {`${loggedUser.name}`}</Link></li>}
          </ul> */}
        </nav>

      </header>
      
    </>

  )
}


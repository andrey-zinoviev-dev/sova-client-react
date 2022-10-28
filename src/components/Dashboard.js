import React from "react";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import {UserContext} from '../context/userContext';
import './Dashboard.css';
// import SovaLogo from '../images/sova_logo_icon.png';

export default function Dashboard() {
  const loggedUser = React.useContext(UserContext);

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
    <header className='header'>
      <img className='header__logo' alt="Логотип" src='https://static.tildacdn.com/tild6665-6638-4561-b964-343330373834/sova_logo_icon____4.png'></img>
      <nav className='header__nav'>
        <ul className='header__nav-list'>
          <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='/music'>Музыка</Link></li>
          <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='/education'>Обучение</Link></li>
          <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='courseplatform'>Платформа</Link></li>
          <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='about'>Об Авторе</Link></li>
          <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='contacts'>Контакты</Link></li>
          {loggedUser._id && <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='contacts'>Профиль {`${loggedUser.name}`}</Link></li>}
        </ul>
      </nav>
    </header>
  )
}


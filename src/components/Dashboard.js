import React from "react";
// import { motion } from "framer-motion";
import {UserContext} from '../context/userContext';
import './Dashboard.css';
import { createSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import MenuButton from '../images/Group 3.png';
import SovaLogo from '../images/sova_logo_icon.png';
import { motion } from "framer-motion";
export default function Dashboard({ setAddUserOpened, logout, loggedIn }) {
  const loggedUser = React.useContext(UserContext);

  //navigate
  const navigate = useNavigate();

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
      <header className='header' style={{margin: !loggedIn && 0}}>
        {/* <img className='header__logo' alt="Логотип" src='https://static.tildacdn.com/tild6665-6638-4561-b964-343330373834/sova_logo_icon____4.png'></img>
        <button onClick={openMenu} style={{display: window.innerWidth >= 767 ?  "none" : "block", backgroundColor: "transparent", color: "white", fontSize: 18, border: "none"}}>
          <FontAwesomeIcon icon={faBars} style={{fontSize: 18}}/>
        </button> */}
          {/* <p style={{margin: 0, fontSize: 40, lineHeight: 1, color: "white"}}>sova</p> */}
          <svg className='header__logo' version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="940.000000pt" height="1847.000000pt" viewBox="0 0 940.000000 1847.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,1847.000000) scale(0.100000,-0.100000)"
            fill="white" stroke="none">
            <path d="M4470 18464 c-843 -57 -1527 -265 -2197 -670 -85 -52 -160 -94 -165
            -94 -8 0 -2012 724 -2092 756 -18 7 -18 -4 -13 -367 5 -402 12 -484 57 -710
            81 -404 262 -797 529 -1148 l59 -78 -50 -89 c-262 -468 -442 -982 -532 -1524
            -60 -364 -59 -326 -63 -1907 l-4 -1452 38 -10 c21 -5 175 -44 343 -86 378 -95
            808 -218 1133 -325 l247 -81 0 -1107 c0 -639 4 -1156 10 -1222 50 -583 268
            -1133 632 -1592 101 -128 332 -360 458 -460 535 -424 1169 -648 1840 -648 671
            0 1305 224 1840 648 126 100 357 332 458 460 364 459 582 1009 632 1592 6 66
            10 583 10 1221 l0 1105 278 92 c414 137 699 219 1152 332 135 33 262 66 283
            71 l38 10 -4 1452 c-4 1581 -3 1543 -63 1907 -90 542 -270 1056 -532 1524
            l-50 89 59 78 c267 351 448 744 529 1148 45 226 52 308 57 710 5 363 5 374
            -13 367 -80 -32 -2084 -756 -2092 -756 -5 0 -80 42 -165 94 -603 364 -1245
            577 -1962 652 -136 14 -575 26 -685 18z m708 -758 c696 -95 1270 -320 1834
            -722 81 -57 153 -104 160 -104 7 0 323 113 702 250 379 138 692 248 694 245
            16 -15 -92 -281 -170 -420 -121 -215 -262 -397 -483 -624 -192 -197 -340 -329
            -816 -727 -717 -600 -980 -852 -1277 -1223 -112 -140 -279 -387 -358 -531 -71
            -128 -753 -1302 -764 -1313 -6 -7 -606 1011 -785 1333 -80 143 -234 371 -347
            511 -290 363 -571 633 -1223 1177 -503 420 -603 509 -820 726 -265 265 -401
            437 -533 671 -78 139 -186 405 -170 420 2 3 315 -107 694 -245 379 -137 695
            -250 702 -250 7 0 79 47 160 104 507 360 1044 588 1628 690 77 13 189 29 249
            35 61 6 124 13 140 15 77 10 676 -3 783 -18z m-3894 -2209 c57 -52 194 -169
            304 -262 l200 -169 -49 -55 c-159 -178 -282 -424 -335 -671 -27 -122 -27 -429
            0 -555 62 -296 209 -561 427 -770 207 -200 438 -322 719 -382 149 -32 385 -36
            530 -10 173 32 402 122 526 208 l43 29 63 -107 c35 -60 270 -462 523 -895 388
            -666 460 -785 470 -770 7 9 211 359 455 777 243 418 474 813 512 878 l69 117
            43 -29 c124 -86 353 -176 526 -208 145 -26 381 -22 530 10 281 60 512 182 719
            382 218 209 365 474 427 770 27 126 27 433 0 555 -53 247 -176 493 -335 671
            l-49 55 200 169 c110 93 247 211 305 263 57 52 106 92 108 90 11 -11 117 -245
            158 -348 124 -315 198 -604 254 -992 14 -98 17 -270 20 -1305 l4 -1192 -43
            -11 c-140 -36 -506 -142 -710 -206 -1157 -361 -2214 -868 -3084 -1479 l-82
            -57 -153 105 c-671 456 -1435 844 -2304 1169 -411 154 -1034 349 -1493 468
            l-43 11 4 1192 c4 1280 2 1224 57 1535 45 253 126 537 224 779 47 116 146 333
            153 333 2 0 51 -42 107 -93z m886 -1258 c15 -84 72 -188 136 -252 161 -160
            412 -182 604 -52 l49 33 74 -96 c77 -102 175 -244 221 -325 l28 -47 -23 -20
            c-38 -32 -199 -109 -264 -125 -85 -21 -235 -19 -329 5 -247 63 -450 259 -528
            510 -30 98 -32 272 -4 368 10 34 20 61 22 59 2 -2 8 -28 14 -58z m5104 -174
            c1 -99 -3 -133 -22 -195 -138 -445 -624 -659 -1022 -449 -41 22 -86 48 -99 59
            l-23 20 28 47 c46 81 144 223 221 325 l74 96 49 -33 c73 -49 154 -77 241 -83
            251 -16 457 153 505 413 l7 40 20 -60 c15 -46 20 -89 21 -180z m-4467 -3807
            c616 -281 1173 -612 1717 -1020 l209 -157 161 123 c546 417 1155 785 1769
            1070 l97 45 0 -684 0 -684 -582 -3 -583 -3 -67 -32 c-162 -76 -258 -224 -258
            -397 0 -192 111 -350 295 -418 59 -22 73 -23 597 -28 l536 -5 -39 -120 c-68
            -207 -184 -427 -320 -607 -80 -107 -280 -307 -387 -387 -296 -224 -645 -365
            -1012 -411 -109 -13 -371 -13 -480 0 -532 66 -1024 336 -1354 744 -160 198
            -291 435 -365 661 l-39 120 521 5 c508 6 524 6 582 28 121 45 215 132 266 247
            47 107 35 285 -27 391 -37 63 -126 141 -201 177 l-68 32 -567 3 -568 3 0 689
            c0 380 2 690 5 690 3 0 76 -32 162 -72z"/>
            <path d="M3495 16771 c-66 -26 -172 -74 -235 -106 -123 -61 -350 -195 -350
            -206 0 -3 60 -50 133 -103 291 -211 504 -393 796 -681 252 -249 396 -404 663
            -718 103 -120 189 -219 191 -220 3 -1 90 97 193 218 269 316 412 471 665 720
            292 288 505 470 797 681 72 53 132 100 132 103 0 12 -228 146 -355 209 -132
            65 -342 152 -369 152 -19 0 -193 -137 -385 -304 -69 -60 -250 -234 -401 -385
            l-275 -276 -275 276 c-151 151 -332 325 -401 385 -196 170 -366 304 -386 304
            -10 0 -72 -22 -138 -49z"/>
            <path d="M318 10101 c-122 -39 -215 -121 -271 -239 l-32 -67 -3 -700 c-3 -703
            1 -854 34 -1110 46 -365 151 -771 289 -1120 103 -262 296 -629 461 -878 332
            -498 803 -969 1301 -1301 253 -167 601 -351 863 -455 376 -149 810 -259 1193
            -302 l107 -13 0 -618 0 -618 -880 0 c-563 0 -916 -4 -978 -11 -368 -41 -707
            -181 -991 -409 -341 -275 -575 -660 -668 -1100 -24 -110 -27 -149 -27 -320 -1
            -206 4 -238 52 -355 51 -126 165 -268 273 -342 69 -48 161 -91 246 -115 l78
            -23 3335 0 3335 0 78 23 c288 83 498 306 562 596 25 114 16 375 -19 541 -171
            814 -831 1412 -1658 1504 -62 7 -415 11 -978 11 l-880 0 0 618 0 618 108 13
            c382 43 816 153 1192 302 262 104 610 288 863 455 498 332 969 803 1301 1301
            165 249 358 616 461 878 138 349 243 755 289 1120 33 256 37 407 34 1110 l-3
            700 -32 67 c-162 343 -634 343 -796 1 l-32 -68 -6 -725 c-7 -778 -12 -871 -65
            -1158 -36 -200 -69 -325 -134 -522 -454 -1374 -1658 -2379 -3091 -2579 -1039
            -145 -2086 142 -2909 798 -577 461 -1009 1081 -1240 1781 -65 197 -98 322
            -134 522 -53 287 -58 380 -65 1158 l-6 725 -32 68 c-95 201 -321 303 -525 238z
            m6663 -8316 c264 -46 509 -204 660 -427 82 -120 148 -290 164 -422 l7 -56
            -3112 0 -3112 0 7 56 c16 131 82 302 162 420 151 222 395 382 652 428 117 22
            4451 23 4572 1z"/>
            </g>
          </svg>

          {/* <div style={{width: 7, height: 7, borderRadius: "51%", backgroundColor: "#5DB0C7", margin: "0 0 5px 0"}}></div> */}
        <div className="header__buttons">
          {loggedUser._id && loggedUser.admin && <button className="header__buttons-btn" style={{display: window.innerWidth <= 767 && "none"}} onClick={() => {
            navigate({pathname: '/addCourse'});
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="rgb(93, 176, 199)"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
          </button>}
          <button onClick={() => {
            navigate({pathname: "/testFiles"})
          }} className="header__buttons-btn">Тест</button>
          {/* {
          loggedUser._id && loggedUser.admin &&<motion.button className="header__buttons-btn" onClick={() => {
            
            navigate('/addUser');
          }}>

          <motion.svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" fill="rgb(93, 176, 199)"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></motion.svg>
          </motion.button>} */}
          <button className="header__buttons-btn">{loggedUser._id && loggedUser.name[0]}</button>
          <button className="header__buttons-btn" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="rgb(93, 176, 199)"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
          </button>
        </div>
        
        {/* <nav className='header__nav' style={{display: !menuOpened && window.innerWidth < 768 ? "none" : "flex", height: window.innerWidth < 768 && "100vh", position: window.innerWidth < 768 && "absolute", top: window.innerWidth < 768 && 0, right: window.innerWidth < 768 && 0, borderLeft: window.innerWidth < 768 && "2px solid yellow", backdropFilter: "blur(5px)", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <button onClick={closeMenu} style={{display: window.innerWidth < 768 ? "inline-block" : "none", margin: "0 0 15px 0", backgroundColor: "transparent", border: "2px solid white", color: "white"}}>
            <FontAwesomeIcon icon={faClose} />
          </button>
          <button style={{backgroundColor: "transparent", padding: 0, display: "flex", justifyContent: "center", alignItems: "center", border: "none"}}>
            <img style={{width: 20}} src={MenuButton} />
          </button> */}
          {/* <ul className='header__nav-list' style={{flexDirection: window.innerWidth < 768 && "column", minWidth: window.innerWidth < 768 && 270, padding: "10px 0 0 0", boxSizing: "border-box"}}>
            <li className='header__nav-list-element' style={{lineHeight: "1.5"}}><Link className='header__nav-list-element-link' to='/music'>Музыка</Link></li>
            <li className='header__nav-list-element' style={{lineHeight: "1.5"}}><Link className='header__nav-list-element-link' to='/education'>Обучение</Link></li>
            <li className='header__nav-list-element' style={{lineHeight: "1.5"}}><Link className='header__nav-list-element-link' to='courseplatform'>Платформа</Link></li>
            <li className='header__nav-list-element' style={{lineHeight: "1.5"}}><Link className='header__nav-list-element-link' to='about'>Об Авторе</Link></li>
            <li className='header__nav-list-element' style={{lineHeight: "1.5"}}><Link className='header__nav-list-element-link' to='contacts'>Контакты</Link></li>
            {loggedUser._id && <li className='header__nav-list-element'><Link className='header__nav-list-element-link' to='contacts'>Профиль {`${loggedUser.name}`}</Link></li>}
          </ul> */}
        {/* </nav> */}

      </header>
      
    </>

  )
}


import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import MenuSide from "./MenuSide";
import SovaLogo from '../images/sova_logo_icon.png';

export default function Menu({ user, logout, setPopupOpened }) {
    //navigation
    const navigateTo = useNavigate();
    //states
    const [openedMenu, setOpenedMenu] = React.useState(false);
    //functions
    function openMenu() {
        setOpenedMenu(true);
    }
    function addCourse() {
        // console.log('course add page opened');
        navigateTo("/addCourse");
    }
    return(
        <div style={{/*position: "absolute", top: 0, left: 0,*/ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", zIndex: 10}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 55}}>
                <img style={{maxWidth: 50}} src="https://static.tildacdn.com/tild6665-6638-4561-b964-343330373834/sova_logo_icon____4.png"/>
                <p style={{margin: 0, fontSize: 18, color: "white"}}>С Возвращением, <span style={{color: "rgb(93, 176, 199)", fontWeight: 700}}>{user.email}</span></p>
            </div>

            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 15}}>
                {user.admin && <button onClick={addCourse} style={{width: 32, height: 32, fontSize: 24, backgroundColor: "rgba(255, 255, 255, 0)", color: "white", padding: 0, border: "none"}}>
                    <FontAwesomeIcon icon={faFileCirclePlus}/>
                </button>}
                <button onClick={openMenu} style={{width: 32, height: 32, backgroundColor: "rgba(255, 255, 255, 0)", color: "white", fontWeight: 700, border: "2px solid rgb(93, 176, 199)", borderRadius: "51%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, padding: 0 }}>
                    <span style={{textTransform: "capitalize"}}>{user.email[0]}</span>
                </button>
            </div>
            <MenuSide openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} setPopupOpened={setPopupOpened} logout={logout}/>
            {/* <ul style={{margin: 0, padding: 0, listStyle: "none"}}>
                <li>
                    <button>Кнопка пользователя</button>
                </li>
                <li>
                    <button>Выйти</button>
                </li>
            </ul> */}
        </div>
    )
};
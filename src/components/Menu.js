import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import MenuSide from "./MenuSide";

export default function Menu({ user }) {
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
        <div style={{/*position: "absolute", top: 0, left: 0,*/ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", padding: "20px 0", zIndex: 10, backdropFilter: "blur(3px)"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 55}}>
                <img style={{maxWidth: 50}} src="https://cdn.icon-icons.com/icons2/3053/PNG/512/steam_alt_macos_bigsur_icon_189698.png"/>
                <p style={{margin: 0, fontSize: 18, color: "white"}}>С Возвращением, {user.name}</p>
            </div>

            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 15}}>
                <button onClick={addCourse} style={{width: 32, height: 32, fontSize: 24, backgroundColor: "rgba(255, 255, 255, 0)", color: "white", padding: 0, border: "none"}}>
                    <FontAwesomeIcon icon={faFileCirclePlus}/>
                </button>
                <button onClick={openMenu} style={{width: 32, height: 32, backgroundColor: "rgba(255, 255, 255, 0)", color: "white", fontWeight: 700, border: "2px solid rgb(211, 124, 82", borderRadius: "51%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, padding: 0 }}>
                    {user.name[0]}
                </button>
            </div>
            <MenuSide openedMenu={openedMenu} setOpenedMenu={setOpenedMenu}/>
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
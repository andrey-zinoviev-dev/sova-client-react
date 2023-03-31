import React from "react";

export default function Menu() {
    return(
        <div style={{display: "flex", alignItems: "center"}}>
            <button>Меню</button>
            <img style={{maxWidth: 50}} src="https://cdn.icon-icons.com/icons2/3053/PNG/512/steam_alt_macos_bigsur_icon_189698.png"/>
            <ul>
                <li>
                    <button>Кнопка пользователя</button>
                </li>
                <li>
                    <button>Выйти</button>
                </li>
            </ul>
        </div>
    )
};
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
function MenuSide({ openedMenu, setOpenedMenu, logout, setPopupOpened}) {
    //animate objs
    const sideMenuVariants = {
        closed: {
            translate: "100%",
            transition: {
                duration: 0.5
            }
        },
        opened: {
            translate: "0%",
            transition: {
                duration: 0.5
            }
        }
    }
    return(
        <motion.section animate={openedMenu ? "opened" : "closed"} variants={sideMenuVariants} style={{position: "absolute", top: 0, right: 0, display: "flex", flexDirection:"column", justifyContent:"space-between", alignItems: "center", color: "white", borderLeft: "2px solid white", width: 300, height: "100vh", boxSizing: "border-box", padding: "20px 10px", backgroundColor: "rgba(0, 0, 0, 0.75)", translate: openedMenu ? "0%" : "100%"}}>
            <button onClick={() => {
                setOpenedMenu(false);
            }} style={{display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", gap: 10, backgroundColor: "transparent", color: "white", border: "none"}}>
                <span style={{lineHeight: "20px", fontSize: 18}}>закрыть</span>
                <FontAwesomeIcon style={{fontSize: 20}} icon={faXmark} />
            </button>
            
            <ul style={{display: "flex", width: "100%", minHeight: 180, margin: "auto 0", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: 0, listStyle: "none"}}>
                <li style={{width: "100%", height: 35}}>
                    <motion.button whileHover={{color: "#d37c52"}} style={{width: "100%", height: "100%", backgroundColor: "transparent", border: "none", color: "rgb(255,255,255)", fontSize: 18, fontWeight: 700}}>
                        Перейти в профиль
                    </motion.button>
                </li>
                <li style={{width: "100%", height: 35}}>
                    <motion.button onClick={setPopupOpened} whileHover={{color: "#d37c52"}} style={{width: "100%", height: "100%", backgroundColor: "transparent", border: "none", color: "rgb(255,255,255)", fontSize: 18, fontWeight: 700}}>
                        Добавить ученика к платформе
                    </motion.button>
                </li>
                <li style={{width: "100%", height: 35}}>
                    <motion.button whileHover={{color: "#d37c52"}} style={{width: "100%", height: "100%", backgroundColor: "transparent", border: "none", color: "rgb(255,255,255)", fontSize: 18, fontWeight: 700}}>
                        Настройки
                    </motion.button>
                </li>
                {/* <li style={{width: "100%", height: 35}}>
                    <motion.button whileHover={{color: "#d37c52"}} style={{width: "100%", height: "100%", backgroundColor: "transparent", border: "none", color: "rgb(255,255,255)", fontSize: 18, fontWeight: 700}}>
                        Изменить курс
                    </motion.button>
                </li> */}
                <li style={{width: "100%", height: 35}}>
                    <motion.button onClick={logout} whileHover={{color: "#d37c52"}} style={{width: "100%", height: "100%", backgroundColor: "transparent", border: "none", color: "rgb(255,255,255)", fontSize: 18, fontWeight: 700}}>
                        Выйти
                    </motion.button>
                </li>
            </ul>
        </motion.section>
    )
};

export default MenuSide;
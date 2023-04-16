import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark , faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/userContext"; 
import { motion } from "framer-motion";
export default function AddStepModule({formData}) {
    const [moduleDivOpened, setModuleDivOpened] = React.useState(false);

    const {course} = formData;

    //refs
    const moduleNameRef = React.useRef();

    //states
    const [modulesOfCourse, setModulesOfCourse] = React.useState([]);

    //user
    const loggedInUser = React.useContext(UserContext);

    React.useEffect(() => {
        console.log(loggedInUser);
        console.log(formData);
    }, []);

    return (
        <div style={{width: "100%", textAlign: "left"}}>
            <div style={{boxSizing: "border-box", padding: "0 45px", margin: "0 0 35px 0", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h2 style={{margin: 0}}>Добавляем модули для курс</h2>
                <button type="button" onClick={() => {
                    setModuleDivOpened(true);
                }} style={{display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", padding: "0 10px", minWidth: 160, minHeight: 40, backgroundColor: "rgb(226, 100, 59)", borderRadius: 5, color: "white", border: "none"}}>
                    <svg style={{display: "block", width: 20, height: 20, borderRadius: "51%", border: "2px solid white"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path style={{fill: "white", scale: "0.7", translate: "15% 15%"}} d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    <span>Добавить модуль</span>
                </button>
            </div>
  
            {!moduleDivOpened && <ul style={{padding: "20px 45px", boxSizing: "border-box", margin: 0, listStyle: "none", borderTop: "2px solid white", lineHeight: "2", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", gap: 15}}>
                {modulesOfCourse.length > 0 ? 
                    modulesOfCourse.map((moduleOfCourse) => {
                        return <motion.li whileHover={{border: "2px solid rgb(226, 100, 59 / 100%)"}} style={{boxSizing: "border-box", fontSize: 18, textAlign: "left", backgroundColor: "#242827", borderRadius: 12, border: "2px solid rgb(226, 100, 59 / 0%)", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <button type="button" onClick={() => {
                                console.log(moduleOfCourse);
                            }} style={{width: "100%", borderRadius: 12, border: "none", boxSizing: "border-box", padding: "10px 45px", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "space-between", color: "white"}}>
                                <div style={{display: "flex", flexDirection:"column", justifyContent: "space-between", alignItems: "flex-start", minHeight: 60}}>
                                    <span style={{fontWeight: 700, fontSize: 21}}>{moduleOfCourse.title}</span> 
                                    <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 90, fontSize: 16}}>
                                        <span>{moduleOfCourse.course.name}</span>
                                        <span>&#8212;</span>
                                        <span>{moduleOfCourse.author.name}</span>
                                    </div>
                                </div>
                                <FontAwesomeIcon style={{color: "rgb(226, 100, 59)", fontSize: 22}} icon={faAngleRight} />
                            </button>
                        </motion.li>
                    }) : <li style={{padding: "0 0 0 45px", boxSizing: "border-box", fontSize: 18, textAlign: "center"}}>
                    <p style={{margin: 0}}>Модулей нет, но их можно добавить</p>
                </li>
                }
                {/* <li style={{padding: "0 0 0 45px", boxSizing: "border-box", fontSize: 18, textAlign: "center"}}>
                    <p style={{margin: 0}}>Модулей нет, но их можно добавить</p>
                </li> */}
            </ul>}
            {moduleDivOpened && <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgb(0 0 0/75%)", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", padding: "90px 0"}}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", boxSizing: "border-box", padding: 30, border: "2px solid rgb(226, 100, 59)", borderRadius: 12}}>
                    <button style={{backgroundColor: "transparent", color: "white", border: "none", fontSize: 18, padding: 0, alignSelf: "flex-end", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 15, minHeight: 30, minWidth: 100, margin: "0 15px 0 0"}} onClick={() => {
                        setModuleDivOpened(false);
                    }}>
                        <span>
                            закрыть
                        </span>
                        <FontAwesomeIcon icon={faXmark} />   
                    </button>
                    <div style={{minWidth: 450, minHeight: 320, boxSizing: "border-box", padding: 15}}>
                        {/* <h3>Данные модуля</h3> */}
                        <p style={{fontSize: 21}}>Курс <span style={{color: "rgb(226, 100, 59)", fontWeight: 700, margin: "0 0 0 15px"}}>{course.name}</span></p>
                        <div style={{disaply: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: "column"}}>
                            <label style={{fontSize: 18}}>Название модуля</label>
                            <input ref={moduleNameRef} className="addCourse__form-input" style={{margin: "20px 0 0 0", width: "100%"}}></input>
                        </div>
                        <button type="button" onClick={() => {
                            const objWithModule = {};
                            objWithModule.title = moduleNameRef.current.value;
                            objWithModule.course = formData.course;
                            objWithModule.author = loggedInUser;

                            setModulesOfCourse((prevValue) => {
                                return [...prevValue, objWithModule];
                            });
                            setModuleDivOpened(false);

                        }} style={{minWidth: 120, minHeight: 40, padding: 0, margin: "30px 0 0 0", borderRadius: 9, backgroundColor: "transparent", border: "2px solid rgb(226, 100, 59)", color: "rgb(225, 100, 59)"}}>Готово</button>
                    </div>

                </div>


                {/* <div>
                    <label>Автор курса</label>

                </div> */}
            </div>}

        </div>
    )
};
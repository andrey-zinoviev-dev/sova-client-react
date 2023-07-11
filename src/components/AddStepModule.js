import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark , faAngleRight, faArrowLeft, faPlus} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../context/userContext"; 
import { motion } from "framer-motion";
import EmptyLogo from '../images/Group_20.png';

export default function AddStepModule({formData, setFormData, setFormStep}) {
    //derived states
    const {course} = formData;
    const {modules} = formData;

    //refs
    const moduleNameRef = React.useRef();
    const moduleCoverRef = React.useRef();
    const lessonNameRef = React.useRef();
    const moduleLessonBlockRef = React.useRef();

    //states
    // const [modulesOfCourse, setModulesOfCourse] = React.useState([]);
    const [moduleDivOpened, setModuleDivOpened] = React.useState(false);
    const [selectedModule, setSelectedModule] = React.useState({});
    const [lessonPopupOpened, setLessonPopupOpened] = React.useState(false);
    // const [lessonsOfModule, setLessonsOfModule] = React.useState([]);

    //user
    const loggedInUser = React.useContext(UserContext);

    // React.useEffect(() => {
    //     // console.log(loggedInUser);
    //     const { modules } = formData;
    //     console.log(modules);
    //     console.log(selectedModule);

    // }, [formData, selectedModule]);

    return (
        <div style={{textAlign: "left",  width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: modules.length > 0 ? "flex-start" : "center", justifyContent: "space-between"}}>
            {/* <div className="addCourse__form-moduleLesson" ref={moduleLessonBlockRef} style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", overflow: "auto hidden", width: "100%"}}> */}
                {/* <div style={{flex: "1 0 100%", width: "100%"}}> */}
                    {/* <div style={{boxSizing: "border-box", padding: "0 45px", margin: "0 0 35px 0", display: "flex", alignItems: "center", justifyContent: "space-between"}}> */}
                        {/* <h2 style={{margin: 0, width: "75%", height: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace:"nowrap"}}>Добавляем модули для курса <span style={{color: "rgb(226, 100, 59)"}}>{course.name}</span></h2> */}

                    {/* </div> */}

                {/* </div> */}
                {/* <div style={{width: "100%", display: "block"}}>
                    <div style={{boxSizing: "border-box", padding: "0 45px", margin: "0 0 35px 0", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button type="button" onClick={() => {
                            moduleLessonBlockRef.current.scrollTo({top: 0, left: -moduleLessonBlockRef.current.clientWidth, behavior: "smooth" });
                        }} style={{minWidth: 35, minHeight: 35, borderRadius: "51%", border: "2px solid white", color: "white", backgroundColor: "transparent"}}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <h2 style={{margin: 0, width: "75%", height: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace:"nowrap"}}>Добавляем уроки для модуля <span style={{color: "rgb(226, 100, 59)"}}>{selectedModule.title}</span></h2>
                        <button type="button" onClick={() => {
                            setLessonPopupOpened(true);
                        }} style={{display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", padding: "0 5px", minWidth: 140, minHeight: 40, backgroundColor: "rgb(226, 100, 59)", borderRadius: 5, color: "white", border: "none"}}>
                            <svg style={{display: "block", width: 20, height: 20, borderRadius: "51%", border: "2px solid white"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path style={{fill: "white", scale: "0.7", translate: "15% 15%"}} d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                            <span>Добавить урок</span>
                        </button>
                    </div>
                    <ul className="addCourse__form-moduleLesson-list-scroll" style={{padding: "20px 45px", boxSizing: "border-box", margin: 0, listStyle: "none", borderTop: "2px solid white", lineHeight: "2", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", gap: 15}}>
                        {selectedModule.lessons && selectedModule.lessons.length > 0 ? selectedModule.lessons.map((lessonOfModue, index, array) => {
                            return <li key={index} style={{boxSizing: "border-box", boxShadow: "3px 3px 5px rgb(0 0 0/50%)", fontSize: 18, textAlign: "left", backgroundColor: "#242827", borderRadius: 12, border: "2px solid rgb(226, 100, 59 / 0%)", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 80, padding: "10px 45px", position: "relative"}}>
                                <span style={{fontWeight: 700, fontSize: 21}}>
                                    {lessonOfModue.title}
                                </span>
                                <button type="button" onClick={() => {
                                    setFormData((prevValue) => {
 
                                        const updatedModulesArray = prevValue.modules.map((courseModule) => {

                                            return courseModule.title === selectedModule.title ? {...courseModule, lessons: [...courseModule.lessons].filter((moduleLesson) => {
                                                return moduleLesson.title !== lessonOfModue.title
                                            })} : courseModule;
                                        });
                                        console.log(updatedModulesArray);
                                        //find module and update array of its lessons by filtered Array in formData state variable
                                        return {...prevValue, modules: updatedModulesArray};
                                    });

                                    setSelectedModule((prevValue) => {
                                        return {...prevValue, lessons: [...prevValue.lessons].filter((moduleLesson) => {
                                            return moduleLesson.title !== lessonOfModue.title;
                                        })}
                                    });
                                }} style={{position: "absolute", top: 3, left: 3, border: "none", backgroundColor: "transparent", color: "white", fontSize: 18}}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </li>
                        }) : <li key={0} style={{padding: "0 0 0 45px", boxSizing: "border-box", fontSize: 18, textAlign: "center"}}>
                            Уроков для модуля нет
                        </li>}
                    </ul>
                </div> */}
            {/* </div> */}
            {modules.length <= 0 && <div style={{textAlign: "center"}}>
                {/* <button type="button" onClick={() => {
                    setModuleDivOpened(true);
                }} style={{display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", padding: 0, minWidth: 120, minHeight: 120, backgroundColor: "transparent", borderRadius: 5, color: "white", border: "2px solid  rgb(93, 176, 199)"}}>
                    <svg style={{display: "block", width: 20, height: 20, borderRadius: "51%", border: "2px solid white"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white"><path style={{fill: "white", scale: "0.7", translate: "15% 15%"}} d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    
                </button> */}
                <img style={{maxWidth: 90, margin: "0 0 20px 0"}} src={EmptyLogo} alt="" />
                <p style={{margin: 0}}>Модулей нет, но их можно добавить</p>
            </div>}
            {modules.length > 0 && <ul className="addCourse__form-moduleLesson-list-scroll" style={{display: "grid", gridTemplateColumns: "repeat(5, 280px)", gridAutoRows: "280px", boxSizing: "border-box", padding: 0, listStyle: "none", lineHeight: "2", overflow: "hidden auto", gap: "45px", margin: "0 auto", maxHeight: 605}}>
                {modules.map((moduleOfCourse, index) => {
                    return <motion.li key={index} whileHover={{border: "2px solid rgb(255, 255, 255)"}} style={{boxSizing: "border-box", padding: "15px 40px", boxShadow: "3px 3px 5px rgb(0 0 0/50%)", fontSize: 18, textAlign: "center", backgroundColor: "transparent", borderRadius: 12, border: "2px solid rgb(93, 176, 199)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", position: "relative", maxHeight: 605}}>
                        <button type="button" onClick={() => {
                            setFormData((prevValue) => {
                                const filteredArray = prevValue.modules.filter((courseModule) => {
                                    return courseModule.title !== moduleOfCourse.title;
                                });
                                return {...prevValue, modules: filteredArray}
                            });
                        }} style={{position: "absolute", top: 5, right: 5, border: "none", backgroundColor: "transparent", color: "white", fontSize: 18}}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                            <h3 style={{margin: 0, width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{moduleOfCourse.title}</h3>
                            <img style={{maxWidth: 140, borderRadius: 9, aspectRatio: "1 / 1", objectFit: "cover"}} src={moduleOfCourse.cover} alt={moduleOfCourse.title}></img>
                            <p style={{margin: 0, width: "100%"}}>{moduleOfCourse.lessons.length > 0 ? `Уроки ${moduleOfCourse.lessons.length}` : "Уроков в модуле нет"}</p>
                    </motion.li>
                })}     
            </ul>}

            <div style={{boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                <button type="button" onClick={() => {
                    setFormStep((prevValue) => {
                        return prevValue -= 1;
                    });
                }} style={{ fontWeight: 500, minWidth: /*120*/ 180, minHeight: 50, borderRadius: 5, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(93, 176, 199)", border: "2px solid rgb(93, 176, 199)"}}>Назад к курсу</button>
                <button type="button" style={{width: 60, height: 60, borderRadius: 5, backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", color: "rgb(93, 176, 199)", fontSize: 20}} onClick={() => {
                    setModuleDivOpened(true);
                }}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <button onClick={() => {
                    setFormStep((prevValue) => {
                        return prevValue += 1;
                    });
                }} type="button" style={{ fontWeight: 500, minWidth: /*120*/ 180, minHeight: 50, borderRadius: 5, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(93, 176, 199)", border: "2px solid rgb(93, 176, 199)"}}>Далее</button>
            </div>

            {moduleDivOpened && <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgb(0 0 0/75%)", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", padding: "90px 0", backdropFilter: "blur(2px)"}}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", boxSizing: "border-box", padding: 30, border: "2px solid rgb(93, 176, 199)", borderRadius: 5}}>
                    <button style={{backgroundColor: "transparent", color: "white", border: "none", fontSize: 18, padding: 0, alignSelf: "flex-end", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 15, minHeight: 30, minWidth: 100, margin: "0 15px 0 0"}} onClick={() => {
                        setModuleDivOpened(false);
                    }}>
                        <span>
                            закрыть
                        </span>
                        <FontAwesomeIcon icon={faXmark} />   
                    </button>
                    <div>
                        <div style={{minWidth: 450, minHeight: 280, boxSizing: "border-box", padding: 15, display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between"}}>
                            <p style={{fontSize: 21, margin: 0}}>Добавление модуля</p>

                            <input ref={moduleNameRef} placeholder="Название модуля" className="addCourse__form-input" style={{width: "100%"}}></input>
                            <input ref={moduleCoverRef} placeholder="обложка модуля" className="addCourse__form-input" style={{ width: "100%"}}></input>

                            <button type="button" onClick={() => {
                                const objWithModule = {lessons: []};
                                objWithModule.title = moduleNameRef.current.value;
                                objWithModule.cover = moduleCoverRef.current.value;
                                // objWithModule.course = formData.course;
                                objWithModule.author = loggedInUser;
                                // objWithModule.lessons.push({title: moduleCoverRef.current.value})
                                setFormData((prevValue) => {
                                    return {...prevValue, modules: [...prevValue.modules, objWithModule]};
                                })
                                // setModulesOfCourse((prevValue) => {
                                //     return [...prevValue, objWithModule];
                                // });
                                
                                setModuleDivOpened(false);

                            }} style={{alignSelf: "center", minWidth: 140, minHeight: 45, padding: 0, margin: "30px 0 0 0", borderRadius: 9, backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", color: "rgb(93, 176, 199)"}}>Добавить модуль</button>
                        </div>
                       
                    </div>
                </div>
            </div>}

            {lessonPopupOpened && <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgb(0 0 0/75%)", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", padding: "90px 0", backdropFilter: "blur(2px)"}}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", boxSizing: "border-box", padding: 30, border: "2px solid rgb(226, 100, 59)", borderRadius: 12}}>
                    <button style={{backgroundColor: "transparent", color: "white", border: "none", fontSize: 18, padding: 0, alignSelf: "flex-end", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 15, minHeight: 30, minWidth: 100, margin: "0 15px 0 0"}} onClick={() => {
                       setLessonPopupOpened(false);
                    }}>
                        <span>
                            закрыть
                        </span>
                        <FontAwesomeIcon icon={faXmark} />   
                    </button>
                    <div style={{minWidth: 450, minHeight: 320, boxSizing: "border-box", padding: 15}}>
                        <p style={{fontSize: 21}}>Модуль <span style={{color: "rgb(226, 100, 59)", fontWeight: 700, margin: "0 0 0 15px"}}>{selectedModule.title}</span></p>
                        <div style={{disaply: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: "column"}}>
                            <label style={{fontSize: 18}}>Название урока</label>
                            <input ref={lessonNameRef} className="addCourse__form-input" style={{margin: "20px 0 0 0", width: "100%"}}></input>
                        </div>
                        <button type="button" onClick={() => {
                            // console.log('lesson to add to module');
                            const objWithLesson = {};
                            objWithLesson.title = lessonNameRef.current.value;
                            objWithLesson.module = {title: selectedModule.title};
                            // console.log(selectedModule);
                            // console.log(objWithLesson);
                            setFormData((prevValue) => {
                                const { modules } = prevValue;
                                // console.log(modules);
                                // console.log(objWithLesson);
                                const newModulesArray = modules.map((module) => {
                                    let moduleToUpdate;
                                    if(module.title ===  objWithLesson.module.title) {
                                        moduleToUpdate = module;
                                        moduleToUpdate.lessons.push(objWithLesson);
                                        return moduleToUpdate;
                                    }
                                    return module;
                                //     const moduleToUpdate = module.title ===  objWithLesson.module.title && module;
                                //     // console.log(moduleToUpdate);
                                //     moduleToUpdate.lessons.push(objWithLesson);
                                //     return moduleToUpdate ? moduleToUpdate : module;
                                });
                                
                                return {...prevValue, modules: [...newModulesArray]};
                            });
                            // setSelectedModule((prevValue) => {
                            //     return {...prevValue, lessons: [...prevValue.lessons, objWithLesson]}
                            // });
                            setLessonPopupOpened(false);
                        }} style={{minWidth: 120, minHeight: 40, padding: 0, margin: "30px 0 0 0", borderRadius: 9, backgroundColor: "transparent", border: "2px solid rgb(226, 100, 59)", color: "rgb(225, 100, 59)"}}>Готово</button>
                    </div>
                </div>
            </div>}
        </div>
    )
};
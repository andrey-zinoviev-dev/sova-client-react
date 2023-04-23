import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark , faAngleRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../context/userContext"; 
import { motion } from "framer-motion";
export default function AddStepModule({formData, setFormData, setFormStep}) {
    //derived states
    const {course} = formData;
    const {modules} = formData;

    //refs
    const moduleNameRef = React.useRef();
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
        <div style={{textAlign: "left",  width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
            <div className="addCourse__form-moduleLesson" ref={moduleLessonBlockRef} style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", overflow: "auto hidden", width: "100%"}}>
                <div style={{flex: "1 0 100%", width: "100%"}}>
                    <div style={{boxSizing: "border-box", padding: "0 45px", margin: "0 0 35px 0", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <h2 style={{margin: 0, width: "75%", height: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace:"nowrap"}}>Добавляем модули для курса <span style={{color: "rgb(226, 100, 59)"}}>{course.name}</span></h2>
                        <button type="button" onClick={() => {
                            setModuleDivOpened(true);
                        }} style={{display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", padding: "0 10px", minWidth: 160, minHeight: 40, backgroundColor: "rgb(226, 100, 59)", borderRadius: 5, color: "white", border: "none"}}>
                            <svg style={{display: "block", width: 20, height: 20, borderRadius: "51%", border: "2px solid white"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path style={{fill: "white", scale: "0.7", translate: "15% 15%"}} d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                            <span>Добавить модуль</span>
                        </button>
                    </div>
        
                    {<ul className="addCourse__form-moduleLesson-list-scroll" style={{padding: "20px 45px", boxSizing: "border-box", margin: 0, listStyle: "none", borderTop: "2px solid white", lineHeight: "2", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", gap: 15, maxHeight: 500, overflow: "hidden auto"}}>
                        {formData.modules.length > 0 ? 
                            formData.modules.map((moduleOfCourse, index) => {
                                return <motion.li key={index} whileHover={{border: "2px solid rgb(226, 100, 59 / 100%)"}} style={{boxSizing: "border-box", boxShadow: "3px 3px 5px rgb(0 0 0/50%)", fontSize: 18, textAlign: "left", backgroundColor: "#242827", borderRadius: 12, border: "2px solid rgb(226, 100, 59 / 0%)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative"}}>
                                    <button type="button" onClick={() => {
                                        moduleLessonBlockRef.current.scrollTo({top: 0, left: moduleLessonBlockRef.current.clientWidth, behavior: "smooth" });
                                        setSelectedModule(moduleOfCourse);
                                    }} style={{width: "100%", borderRadius: 12, border: "none", boxSizing: "border-box", padding: "10px 45px", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "space-between", color: "white"}}>
                                        <div style={{display: "flex", flexDirection:"column", justifyContent: "space-between", alignItems: "flex-start", minHeight: 60}}>
                                            <span style={{fontWeight: 700, fontSize: 21}}>{moduleOfCourse.title}</span> 
                                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 150, fontSize: 16, gap: 10}}>
                                                <span style={{height: 20, maxWidth: "70px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "rgb(226, 100, 59)"}}>{formData.course.name}</span>
                                                <span>&#8212;</span>
                                                <span>{moduleOfCourse.author.name}</span>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon style={{color: "rgb(226, 100, 59)", fontSize: 22}} icon={faAngleRight} />
                                    </button>
                                    <button type="button" onClick={() => {
                                        setFormData((prevValue) => {
                                            const filteredArray = prevValue.modules.filter((courseModule) => {
                                                return courseModule.title !== moduleOfCourse.title;
                                            });
                                            return {...prevValue, modules: filteredArray}
                                        });
                                    }} style={{position: "absolute", top: 3, left: 3, border: "none", backgroundColor: "transparent", color: "white", fontSize: 18}}>
                                        <FontAwesomeIcon icon={faTrashCan} />
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
                </div>
                <div style={{flex: "1 0 100%", width: "100%", display: formData.modules.length> 0 ? "block" : "none"}}>
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
                                        // const filteredArray = selectedModule.lessons.filter((moduleLesson) => {
                                        //     return moduleLesson.title !== lessonOfModue.title;
                                        // });
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
                        {/* {selectedModule.title && console.log(modules.find((courseModule) => {
                            return courseModule.title === selectedModule.title;
                        }).lessons)} */}
                    </ul>
                </div>
            </div>

            <div style={{padding: "0 45px", boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                <button type="button" onClick={() => {
                    setFormStep((prevValue) => {
                        return prevValue -= 1;
                    });
                }} style={{ fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(255 255 255 / 100%)", border:"2px solid rgb(226, 100, 59)"}}>Назад к курсу</button>
                <button onClick={() => {
                    setFormStep((prevValue) => {
                        return prevValue += 1;
                    });
                }} type="button" style={{ fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(255 255 255 / 100%)", border: "2px solid rgb(226, 100, 59)"}}>Далее</button>
            </div>

            {moduleDivOpened && <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgb(0 0 0/75%)", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", padding: "90px 0", backdropFilter: "blur(2px)"}}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", boxSizing: "border-box", padding: 30, border: "2px solid rgb(226, 100, 59)", borderRadius: 12,}}>
                    <button style={{backgroundColor: "transparent", color: "white", border: "none", fontSize: 18, padding: 0, alignSelf: "flex-end", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 15, minHeight: 30, minWidth: 100, margin: "0 15px 0 0"}} onClick={() => {
                        setModuleDivOpened(false);
                    }}>
                        <span>
                            закрыть
                        </span>
                        <FontAwesomeIcon icon={faXmark} />   
                    </button>
                    <div style={{minWidth: 450, minHeight: 320, boxSizing: "border-box", padding: 15}}>
                        <p style={{fontSize: 21}}>Курс <span style={{color: "rgb(226, 100, 59)", fontWeight: 700, margin: "0 0 0 15px"}}>{course.name}</span></p>
                        <div style={{disaply: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: "column"}}>
                            <label style={{fontSize: 18}}>Название модуля</label>
                            <input ref={moduleNameRef} className="addCourse__form-input" style={{margin: "20px 0 0 0", width: "100%"}}></input>
                        </div>
                        <button type="button" onClick={() => {
                            const objWithModule = {lessons: []};
                            objWithModule.title = moduleNameRef.current.value;
                            // objWithModule.course = formData.course;
                            objWithModule.author = loggedInUser;
                            setFormData((prevValue) => {
                                return {...prevValue, modules: [...prevValue.modules, objWithModule]};
                            })
                            // setModulesOfCourse((prevValue) => {
                            //     return [...prevValue, objWithModule];
                            // });
                            
                            setModuleDivOpened(false);

                        }} style={{minWidth: 120, minHeight: 40, padding: 0, margin: "30px 0 0 0", borderRadius: 9, backgroundColor: "transparent", border: "2px solid rgb(226, 100, 59)", color: "rgb(225, 100, 59)"}}>Готово</button>
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
                            objWithLesson.module = selectedModule;
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
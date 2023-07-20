import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faAngleRight, faArrowLeft, faPlus, faCamera} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../context/userContext"; 
import { motion } from "framer-motion";
import EmptyLogo from '../images/Group_20.png';
import LessonImg from '../images/5af7b516f65dd48bf1c3daae143f8fd7.jpg';
import TipTapEditor from "./TipTapEditor";

export default function AddStepModule({formData, setFormData, setFormStep, setSelectedFiles}) {

    //refs
    const moduleNameRef = React.useRef();
    const moduleCoverRef = React.useRef();
    const lessonNameRef = React.useRef();
    const moduleCoverInputRef = React.useRef();
    const moduleCoverImg = React.useRef();
    const moduleLessonsRef = React.useRef();
    const lessonTitleRef = React.useRef();
    const lessonCoverLinkRef = React.useRef();
    const lessonCoverImg = React.useRef();
    const lessonCoverInputRef = React.useRef();

    //states
    // const [modulesOfCourse, setModulesOfCourse] = React.useState([]);
    const [moduleDivOpened, setModuleDivOpened] = React.useState(false);
    const [selectedModuleTitle, setSelectedModuleTitle] = React.useState({});
    const [lessonPopupOpened, setLessonPopupOpened] = React.useState(false);
    const [lessonAddEnabled, setLessonAddEnabled] = React.useState(false);
    const [selectedModuleCover, setSelectedModuleCover] = React.useState('');
    const [moduleContent, setModuleContent] = React.useState({title: "", cover: "", lessons: []});
    const [lessonContent, setLessonContent] = React.useState({title: "", cover: "", content: {}});
    // const [selectedLessonCover, setSelectedLessonCover] = React.useState('');
    // const [lessonsOfModule, setLessonsOfModule] = React.useState([]);

    //derived states
    const {course} = formData;
    const {modules} = formData;
    const foundModule = modules.find((courseModule) => {
        return courseModule.title === selectedModuleTitle;
    }) ? modules.find((courseModule) => {
        return courseModule.title === selectedModuleTitle;
    }) : {title: "", cover: "", lessons: []};

    //user
    const loggedInUser = React.useContext(UserContext);

    //functions
    function handleCoverUpload(evt) {
        const coverFile = evt.target.files[0];
        const clientPath = window.URL.createObjectURL(coverFile);
        coverFile.clientPath = clientPath;
        // moduleCoverImg.current.src = clientPath;
        
        setSelectedFiles((prevValue) => {
            return [...prevValue, coverFile];
        });

        return clientPath;
    };

    function handleModuleCoverUpload(evt) {
        const picPath = handleCoverUpload(evt);
        moduleCoverImg.current.src = picPath;
        setModuleContent((prevValue) => {
            return {...prevValue, cover: picPath};
        });
        // setFormData((prevValue) => {

        // });
    };

    function handleLessonCoverUpload(evt) {
        const picPath = handleCoverUpload(evt);
        lessonCoverImg.current.src = picPath;
        setLessonContent((prevValue) => {
            return {...prevValue, cover: picPath};
        });
    }

    function handleCoverLink(evt) {
        // moduleCoverImg.current.src = evt.target.value;
        if(evt.target.value.length > 0) {
            // moduleCoverImg.current.src = evt.target.value;
            setSelectedModuleCover(evt.target.value);
        } else {
            moduleCoverImg.current.src = "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4=";
            setSelectedModuleCover('');
        }
          
        
    };

    React.useEffect(() => {
        // console.log(selectedModuleTitle);
        console.log(foundModule);
    }, [selectedModuleTitle, formData]);

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
            {modules.length > 0 && <ul className="addCourse__form-moduleLesson-list-scroll" style={{display: "grid", boxSizing: "border-box", padding: 0, listStyle: "none", lineHeight: "2", overflow: "hidden auto", gap: "45px", margin: "0 auto"}}>
                {modules.map((moduleOfCourse, index) => {
                    return <motion.li onClick={() => {
                        setLessonPopupOpened(true);
                        setSelectedModuleTitle(moduleOfCourse.title);
                        // setSelectedModuleTitle(moduleOfCourse.title);
                    }} key={index} whileHover={{border: "2px solid rgb(255, 255, 255)", cursor: "pointer"}} style={{boxSizing: "border-box", boxShadow: "3px 3px 5px rgb(0 0 0/50%)", textAlign: "center", backgroundColor: "transparent", borderRadius: 12, border: "2px solid rgb(93, 176, 199)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", position: "relative", maxHeight: 605}}>
                        <button type="button" className="addCourse__form-moduleLesson-list-scroll-element-close" onClick={(evt) => {
                            evt.stopPropagation();
                            setFormData((prevValue) => {
                                const filteredArray = prevValue.modules.filter((courseModule) => {
                                    return courseModule.title !== moduleOfCourse.title;
                                });
                                return {...prevValue, modules: filteredArray};
                            });
                            
                        }} style={{position: "absolute", border: "none", backgroundColor: "transparent", color: "white", fontSize: 18}}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                            <h3 style={{margin: 0, width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{moduleOfCourse.title}</h3>
                            <img style={{borderRadius: 9, aspectRatio: "1 / 1", objectFit: "cover"}} src={moduleOfCourse.cover} alt={moduleOfCourse.title}></img>
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
                        <div style={{minWidth: 520, minHeight: 280, boxSizing: "border-box", padding: 15, display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between"}}>
                            <p style={{fontSize: 21, margin: 0}}>Добавление модуля</p>

                            <div style={{display: "flex", alignItems: "stretch", justifyContent:  "space-between", margin: '20px 0 0 0'}}>
                                <div style={{maxWidth: 280, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 15}}>
                                    <input ref={moduleNameRef} onChange={(evt) => {
                                        setModuleContent((prevValue) => {
                                            return {...prevValue, title: evt.target.value};
                                        });
                                    }} placeholder="Название модуля" className="addCourse__form-input" style={{width: "100%"}}></input>
                                    <input ref={moduleCoverRef} onChange={(evt) => {}} placeholder="обложка модуля" className="addCourse__form-input" style={{ width: "100%"}}></input>
                                </div>
                                <div style={{position: "relative", display: "flex", alignItems: "flex-end"}}>
                                    <img ref={moduleCoverImg} style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={"https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}/>
                                    <input onChange={(evt) => {handleModuleCoverUpload(evt)}} ref={moduleCoverInputRef} style={{display: "none"}} type="file"></input>
                                    <button type="button" onClick={(() => {
                                        moduleCoverInputRef.current.click();
                                    })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                                        <FontAwesomeIcon icon={faCamera} />
                                    </button>
                                </div>
                            </div>

                            <button type="button" onClick={() => {
                                setFormData((prevValue) => {
                                    return {...prevValue, modules: [...prevValue.modules, moduleContent]};
                                });
                                setSelectedModuleCover('');
                                setModuleContent({title: '', cover: '', lessons: []});
                                // setModulesOfCourse((prevValue) => {
                                //     return [...prevValue, objWithModule];
                                // });
                                
                                setModuleDivOpened(false);

                            }} style={{alignSelf: "center", minWidth: 140, minHeight: 45, padding: 0, margin: "30px 0 0 0", borderRadius: 9, backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", color: "rgb(93, 176, 199)"}}>Добавить модуль</button>
                        </div>
                       
                    </div>
                </div>
            </div>}

            {lessonPopupOpened && <section style={{position: "absolute", top: 0, left: 0, padding: 45, boxSizing: "border-box", width: "100%", height: "100%", backgroundColor: "rgb(0 0 0/75%)", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", padding: "45px 0", backdropFilter: "blur(2px)"}}>
                <div style={{position:"relative", width: "100%", maxWidth: 920, height: "100%", maxHeight: 768, padding: "20px 35px", boxSizing: "border-box", border: "2px solid #5DB0C7", boxSizing: "border-box", borderRadius: 9, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                    <button type="button" onClick={() => {
                        setLessonPopupOpened(false);
                    }} style={{position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%", border: "2px solid #EB4037", color: "#EB4037", fontSize: 18, backgroundColor: "transparent"}}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <h3 style={{margin: 0}}>Уроки</h3> 
                    <div ref={moduleLessonsRef} style={{display: "flex", width: "100%", height: "100%", overflow: "hidden", margin: "25px 0"}}>
                        <div style={{flex: "100% 1 0", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>

                            {!foundModule.lessons.length > 0 ?
                                <>
                                    <img style={{maxWidth: 90, margin: "auto 0 20px 0"}} src={EmptyLogo} alt="" />
                                    <p style={{margin: 0}}>Уроков в модуле нет</p>
                                </> 
                                : 
                                
                                <ul className="addCourse__addLesson-lessons-list" style={{width: "100%", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", margin: 0, gap: 15}}>
                                    {/* {foundModule.lessons.map((lesson, index) => {
                                        return <li key={index} style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", border: "2px solid white", borderRadius: 9, boxSizing: "border-box", padding: "7px 40px"}}>
                                            <img style={{width: 40, aspectRatio: "1/1", borderRadius: "50%"}} src={lesson.cover} alt=""></img>
                                            <p style={{margin: 0, fontWeight: 700}}>{lesson.title}</p>
                                            <div>
                                                <button style={{backgroundColor: "transparent", color: "white", fontSize: 18, border: "none"}}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </button>
                                                <button style={{backgroundColor: "transparent", color: "white", fontSize: 18, border: "none"}}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                            </div>
                                        </li>
                                    })} */}

                            </ul>
                            }
                            <button type="button" style={{margin: "auto 0 0 0", width: 140, height: 40, borderRadius: 5, backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", color: "rgb(93, 176, 199)", fontSize: 16}} onClick={() => {
                                moduleLessonsRef.current.scrollTo({top: 0, left: moduleLessonsRef.current.clientWidth, behavior: "smooth"})
                            }}>
                                Добавить урок
                            </button>
                        </div>
                        <div className="addCourse__addModule-addLesson-lessonContent" style={{flex: "100% 1 0", overflow: "auto", boxSizing: "border-box", padding: "0 30px", textAlign: "center"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                                <button style={{backgroundColor: "transparent", width: 35, height: 35, borderRadius: "50%", border: "2px solid #5DB0C7", color: "#5DB0C7"}} type="button" onClick={() => {
                                    moduleLessonsRef.current.scrollTo({top: 0, left: -moduleLessonsRef.current.clientWidth, behavior: "smooth"})

                                }}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                                <h3 style={{margin: "0 auto"}}>Добавить урок</h3>
                            </div>
                            <form style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%"}}>
                                <div style={{display: "flex", alignItems: "flex-start"}}>
                                    <div style={{display: "flex", flexDirection: "column", minWidth: 280, margin: "0 60px 0 0", gap: 20}}>
                                        <input ref={lessonTitleRef} onChange={(evt) => {
                                            setLessonContent((prevValue) => {
                                                return {...prevValue, title: evt.target.value};
                                            });
                                        }} className="addCourse__form-input" type="text" placeholder="Название урока" />
                                        <input ref={lessonCoverLinkRef} className="addCourse__form-input" type="text" placeholder="Ссылка на обложку урока"/>
                                    </div>
                                    <div style={{display: "flex", alignItems: "flex-end"}}>
                                        <img alt="обложка урока" ref={lessonCoverImg} style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={"https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}/>
                                        <input onChange={(evt) => {handleLessonCoverUpload(evt)}} ref={lessonCoverInputRef} style={{display: "none"}} type="file"></input>
                                        <button type="button" onClick={(() => {
                                            lessonCoverInputRef.current.click();
                                        })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                                            <FontAwesomeIcon icon={faCamera} />
                                        </button>
                                    </div>
                                </div>

                                
                            </form>
                            <TipTapEditor setLessonContent={setLessonContent}></TipTapEditor>
                            <button type="button" style={{margin: "auto 0 0 0", width: 140, height: 40, borderRadius: 5, backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", color: "rgb(93, 176, 199)", fontSize: 16}} onClick={() => {
                                // console.log(modules);
                                // const lessonObj = {title: lessonTitleRef.current.value, content: lessonContent};
                                // console.log(lessonContent);
                                const updatedModules = modules.map((module) => {
                                    return module.title === foundModule.title ? {...module, lessons:[...module.lessons, lessonContent]} : module;
                                });
                                setFormData((prevValue) => {
                                    return {...prevValue, modules: updatedModules};
                                });
                                setLessonContent({});
                                moduleLessonsRef.current.scrollTo({top: 0, left: -moduleLessonsRef.current.clientWidth, behavior: "smooth"})
                                // const updatedModules = modules.map((module) => {
                                //     return module.title === selectedModule.title ? {...module, lessons:[...module.lessons, lessonObj]} : module;
                                // });
                                // console.log(updatedModules);
                            }}>
                                Добавить урок
                            </button>
                        </div>
                    </div>

                </div>
            </section>}
        </div>
    )
};
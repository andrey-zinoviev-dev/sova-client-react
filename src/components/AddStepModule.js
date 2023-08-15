import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faAngleRight, faArrowLeft, faPlus, faCamera, faPen} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../context/userContext"; 
import { motion } from "framer-motion";
import EmptyLogo from '../images/Group_20.png';
import LessonImg from '../images/5af7b516f65dd48bf1c3daae143f8fd7.jpg';
import TipTapEditor from "./TipTapEditor";
import SuccessAddCourse from './SuccessAddCourse';


export default function AddStepModule({successfullCourseAddOpened, formData, setFormData, setFormStep, selectedFiles, setSelectedFiles, isLoading, uploadProgress}) {
    //navigate
    const navigate = useNavigate();

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
    const editLessonCoverImg = React.useRef();
    const editLessonCoverInput = React.useRef();
    const lessonAddFormRef = React.useRef();

    //states
    // const [modulesOfCourse, setModulesOfCourse] = React.useState([]);
    const [moduleDivOpened, setModuleDivOpened] = React.useState(false);
    const [selectedModuleTitle, setSelectedModuleTitle] = React.useState("");
    const [selectedLessonTitle, setSelectedLessonTitle] = React.useState("");
    const [lessonPopupOpened, setLessonPopupOpened] = React.useState(false);
    const [lessonAddEnabled, setLessonAddEnabled] = React.useState(false);
    const [selectedModuleCover, setSelectedModuleCover] = React.useState('');
    const [moduleContent, setModuleContent] = React.useState({title: "", cover: "", lessons: []});
    const [lessonContent, setLessonContent] = React.useState({title: "", cover: "", content: {"type": "doc",
    "content": [
      // …
    ]}});
    const [lessonCoverEditOpened, setLessonCoverEditOpened] = React.useState(false);
    const [lessonContentEditOpened, setLessonContentEditOpened] = React.useState(false);


    //derived states
    const {course} = formData;
    const {modules} = formData;
    const foundModule = modules.find((courseModule) => {
        return courseModule.title === selectedModuleTitle;
    }) ? modules.find((courseModule) => {
        return courseModule.title === selectedModuleTitle;
    }) : {title: "", cover: "", lessons: []};

    const foundLesson = foundModule.lessons.find((moduleLesson) => {
        return moduleLesson.title === selectedLessonTitle;
    }) ? foundModule.lessons.find((moduleLesson) => {
        return moduleLesson.title === selectedLessonTitle;
    }) : {title: "", cover: "", content: {}};

    //user
    const loggedInUser = React.useContext(UserContext);

    //functions
    function handleCoverUpload(evt) {
        const coverFile = evt.target.files[0];
        const clientPath = window.URL.createObjectURL(coverFile);
        coverFile.clientPath = clientPath;
        coverFile.title = coverFile.name;
        // moduleCoverImg.current.src = clientPath;
        
        setSelectedFiles((prevValue) => {
            return [...prevValue, coverFile];
        });

        return coverFile;
    };

    function handleModuleCoverUpload(evt) {
        const picFile = handleCoverUpload(evt);
        moduleCoverImg.current.src = picFile.clientPath;
        setModuleContent((prevValue) => {
            return {...prevValue, cover: picFile};
        });
        // setFormData((prevValue) => {

        // });
    };

    function handleLessonCoverUpload(evt) {
        const picFile = handleCoverUpload(evt);
        lessonCoverImg.current.src = picFile.clientPath;
        setLessonContent((prevValue) => {
            return {...prevValue, cover:picFile};
        });
    };

    function handleEditLessonCoverUpload(evt) {
        const picFile = handleCoverUpload(evt);
        editLessonCoverImg.current.src = picFile.clientPath;

    }

    // function handleCoverLink(evt) {
    //     // moduleCoverImg.current.src = evt.target.value;
    //     if(evt.target.value.length > 0) {
    //         // moduleCoverImg.current.src = evt.target.value;
    //         setSelectedModuleCover(evt.target.value);
    //     } else {
    //         moduleCoverImg.current.src = "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4=";
    //         setSelectedModuleCover('');
    //     }
          
        
    // };

    // React.useEffect(() => {
    //     // console.log(foundModule);
    //     // console.log(foundLesson);
    //     // console.log(selectedLessonTitle);
    //     console.log(formData);
    // }, [selectedModuleTitle, selectedLessonTitle, formData]);

    return (
        <div style={{textAlign: "left",  width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: modules.length > 0 ? "flex-start" : "center", justifyContent: "space-between"}}>
            {modules.length <= 0 && <div style={{textAlign: "center"}}>
                <img style={{maxWidth: 90, margin: "0 0 20px 0"}} src={EmptyLogo} alt="" />
                <p style={{margin: 0}}>Модулей нет, но их можно добавить</p>
            </div>}
            {modules.length > 0 && <ul className="addCourse__form-moduleLesson-list-scroll" style={{display: "grid", boxSizing: "border-box", padding: 0, listStyle: "none", lineHeight: "2", overflow: "hidden auto", gap: "45px", margin: "0 auto"}}>
                {modules.map((moduleOfCourse, index) => {
                    return <motion.li onClick={() => {
                        setLessonPopupOpened(true);
                        setSelectedModuleTitle(moduleOfCourse.title);
                       
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
                            <img style={{borderRadius: 9, aspectRatio: "1 / 1", objectFit: "cover"}} src={moduleOfCourse.cover.clientPath} alt={moduleOfCourse.title}></img>
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
                    // setFormStep((prevValue) => {
                    //     return prevValue += 1;
                    // });
                }} type="submit" style={{ fontWeight: 500, minWidth: /*120*/ 180, minHeight: 50, borderRadius: 5, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(93, 176, 199)", border: "2px solid rgb(93, 176, 199)"}}>
                    Далее
                </button>
            </div>

            {moduleDivOpened && <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgb(0 0 0/75%)", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", padding: "90px 0", backdropFilter: "blur(2px)"}}>
                <div style={{position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", boxSizing: "border-box", padding: 30, border: "2px solid rgb(93, 176, 199)", borderRadius: 5}}>
                    {/* <button style={{backgroundColor: "transparent", color: "white", border: "none", fontSize: 18, padding: 0, alignSelf: "flex-end", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 15, minHeight: 30, minWidth: 100, margin: "0 15px 0 0"}} onClick={() => {
                        setModuleDivOpened(false);
                    }}>
                        <span>
                            закрыть
                        </span>
                        <FontAwesomeIcon icon={faXmark} />   
                    </button> */}
                    <button type="button" onClick={() => {
                        setModuleDivOpened(false);
                    }} style={{position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%", border: "2px solid #EB4037", color: "#EB4037", fontSize: 18, backgroundColor: "transparent"}}>
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
                                // setSelectedModuleCover('');
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
                                    {foundModule.lessons.map((lesson, index) => {
                                        return <motion.li whileHover={{border: "2px solid #ffffff"}} onClick={() => {
                                            
                                            // setSelectedLessonTitle(lesson.title);
                                        }} key={index} style={{cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", border: "2px solid #5DB0C7", borderRadius: 9, boxSizing: "border-box", padding: "7px 40px"}}>
                                            <div style={{position: "relative"}}>
                                                <img style={{width: 40, aspectRatio: "1/1", borderRadius: "50%", objectFit: "cover"}} src={lesson.cover.clientPath} alt=""></img>
                                                <motion.button type="button" onClick={() => {
                                                    setLessonCoverEditOpened(true);
                                                    setSelectedLessonTitle(lesson.title);
                                                }} whileHover={{opacity: 1}} style={{opacity: 0, border: "none", position: "absolute", top: 0, left: 0, width: 40, height: 40, borderRadius: "50%", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "#ffffff"}}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </motion.button>
                                            </div>
                                            <p style={{margin: 0, fontWeight: 700}}>{lesson.title}</p>
                                            <div>
                                                <motion.button type="button" onClick={() => {

                                                    setFormData((prevValue) => {
                                                        const modulesToUpdate = prevValue.modules.map((module) => {
                                                            if(module.title === foundModule.title) {
                                                                const lessonsToUpdate = module.lessons.filter((lessonToFilter) => {
                                                                    return lessonToFilter.title !== lesson.title;
                                                                });
                                                                module.lessons = lessonsToUpdate;
                                                            };
                                                            return module;
                                                        });
                                                        return {...prevValue, modules: modulesToUpdate};
                                                    });
                                                }} style={{backgroundColor: "transparent", color: "white", fontSize: 18, border: "none"}}>
                                                    <motion.svg whileHover={{fill: "#ffffff"}} fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></motion.svg>
                                                </motion.button>
                                                <button type="button" onClick={() => {
                                                    setSelectedLessonTitle(lesson.title);
                                                    setLessonContentEditOpened(true);
                                                }} style={{backgroundColor: "transparent", color: "white", fontSize: 18, border: "none"}}>
                                                    <motion.svg whileHover={{fill: "#ffffff"}} fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></motion.svg>
                                                </button>
                                            </div>
                                        </motion.li>
                                    })}

                            </ul>
                            }
                            <button type="button" style={{margin: "auto 0 0 0", width: 140, height: 40, borderRadius: 5, backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", color: "rgb(93, 176, 199)", fontSize: 16}} onClick={() => {
                                moduleLessonsRef.current.scrollTo({top: 0, left: moduleLessonsRef.current.clientWidth, behavior: "smooth"})
                            }}>
                                Добавить урок
                            </button>
                        </div>
                        <div className="addCourse__addModule-addLesson-lessonContent" style={{flex: "100% 1 0", overflow: "hidden auto", boxSizing: "border-box", padding: "0 30px", textAlign: "center"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                                <button style={{backgroundColor: "transparent", width: 35, height: 35, borderRadius: "50%", border: "2px solid #5DB0C7", color: "#5DB0C7"}} type="button" onClick={() => {
                                    moduleLessonsRef.current.scrollTo({top: 0, left: -moduleLessonsRef.current.clientWidth, behavior: "smooth"})

                                }}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                                <h3 style={{margin: "0 auto"}}>Добавить урок</h3>
                            </div>
                            <form ref={lessonAddFormRef} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%"}}>
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
                            <TipTapEditor setLessonContent={setLessonContent} lessonContent={lessonContent} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}></TipTapEditor>
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
                                setLessonContent({title: "", cover: "", content: {"type": "doc",
                                "content": [
                                  // …
                                ]}});
                                lessonAddFormRef.current.reset();
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
            {lessonCoverEditOpened && <section style={{display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 30, backgroundColor: "rgba(0, 0, 0, 0.75)"}}>

                <div style={{position:"relative", width: "100%", maxWidth: 540, padding: 30, border: "2px solid #5DB0C7", boxSizing: "border-box", borderRadius: 9, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <button type="button" onClick={() => {
                            setLessonCoverEditOpened(false);
                    }} style={{position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%", border: "2px solid #EB4037", color: "#EB4037", fontSize: 18, backgroundColor: "transparent"}}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <h3 style={{margin: "0 0 50px 0"}}>Редактировать обложку урока</h3>
                    <div style={{display: "flex", alignItems: "center", margin: "0 0 50px 0"}}>
                        <input className="addCourse__form-input" placeholder="ссылка на картинку" style={{margin: "0 25px 25px 0"}}>
                        </input>
                        <div style={{display: "flex", alignItems: "flex-end"}}>
                            <img alt="обложка урока" ref={editLessonCoverImg} style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={foundLesson.cover}/>
                            <input onChange={(evt) => {handleEditLessonCoverUpload(evt)}} ref={editLessonCoverInput} style={{display: "none"}} type="file"></input>
                            <button type="button" onClick={(() => {
                                editLessonCoverInput.current.click();
                            })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                                <FontAwesomeIcon icon={faCamera} />
                            </button>
                        </div>
                    </div>
                    <button type="button" onClick={() => {
                        setFormData((prevValue) => {
                            const modulesToUpdate = prevValue.modules.map((module) => {
                                if(module.title === foundModule.title) {
                                    const lessonsToUpdate = module.lessons.map((lesson) => {
                                        return lesson.title === foundLesson.title ? {...lesson, cover: editLessonCoverImg.current.src} : lesson;
                                    });
                                    module.lessons = lessonsToUpdate;
                                }
                                return module;
                                // return module.title === foundModule.title ? 
                            });
                            // console.log(prevValue);
                            return {...prevValue, modules: modulesToUpdate};
                        });
                        setLessonCoverEditOpened(false);
                    }} style={{margin: "auto 0 0 0", width: 160, height: 40, borderRadius: 5, backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", color: "rgb(93, 176, 199)", fontSize: 16}}>
                        Обновить обложку
                    </button>
                </div>
                

            </section>}
            {lessonContentEditOpened && <section style={{display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 45, backgroundColor: "rgba(0, 0, 0, 0.75)"}}>
                <div style={{position:"relative", width: "100%", maxWidth: 920, height: "100%", maxHeight: 768, padding: "20px 35px", boxSizing: "border-box", border: "2px solid #5DB0C7", borderRadius: 9, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                    <button type="button" onClick={() => {
                        setLessonContentEditOpened(false);
                    }} style={{position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%", border: "2px solid #EB4037", color: "#EB4037", fontSize: 18, backgroundColor: "transparent"}}>
                            <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <h3 style={{margin: "0 0 50px 0"}}>Редактировать контент урока</h3>
                    <TipTapEditor foundLesson={foundLesson} foundModule={foundModule} setFormData={setFormData} setSelectedFiles={setSelectedFiles}/>
                    <button type="button" onClick={() => {
                        setLessonContentEditOpened(false);
                    }} style={{width: 160, height: 40, borderRadius: 5, backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", color: "rgb(93, 176, 199)", fontSize: 16}}>Обновить контент</button>
                </div>
            </section>}
            {successfullCourseAddOpened && <SuccessAddCourse>
                <div className="addCourse__success-wrapper">
                    <p>{uploadProgress < 100 ? "Идет добавление курса" : "Курс успешно добавлен!" }</p>
                    <div style={{width: "50%"}}>
                        <p>Прогресс загрузки курса</p>
                        <div style={{backgroundColor: "white", display: "flex", height: 4, borderRadius:9, alignItems: "stretch", justifyContent: "flex-start"}}>
                            <div style={{backgroundColor: "rgb(93, 176, 199)", borderRadius: 9, width: `${uploadProgress}%`}}>
                            </div>
                        </div>  
                    </div>

                    <button type="button" onClick={() => {
                        navigate('../');
                    }} className="addCourse__success-wrapper-finish">
                        <p style={{margin: 0, position: "relative", color: "white", zIndex: 5}}>Вернуться к курсам</p>
                    </button>
                </div>
            </SuccessAddCourse>}
        </div>
    )
};
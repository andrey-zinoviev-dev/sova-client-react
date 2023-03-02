import React from "react";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faCircleLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import { Node, mergeAttributes } from "@tiptap/react";
import { motion } from "framer-motion";

export default function AddStep3({ formData, setFormData, formStep, setFormStep }) {
    //states
    const [editable, setEditable] = React.useState(false);
    // const [contentZone, setContentZone] = React.useState(false);

    const { course, module } = formData;

    // console.log(module.text);

      //crete Video extension
  const Video = Node.create({
    name: "video",
    group: "block",
    selectable: "true",
    atom: "true",
    parseHTML() {
      return [
        {
          tag: "video",
        },
      ]
    },
    addAttributes() {
      return {
        "src": {
          default: null,
        },
        "controls" : {
          default: true,
        },
        "controlsList": {
          default: "nodownload",
        },
        "oncontextmenu": {
          default: "return false"
        },
      }
    },
    renderHTML({HTMLAttributes}) {
      return ['video', mergeAttributes(HTMLAttributes)];
    },
  });


    const editor = useEditor({
      editable,
      content: module.text,
      extensions: [StarterKit, Image, Video,],
    });

    //refs
    const sliderRef = React.useRef();
    const courseNameRef = React.useRef();
    const courseDescRef = React.useRef();

    //functions
    function scrollTocontent() {
        sliderRef.current.scrollTo({top: 0, left: sliderRef.current.clientWidth, behavior: "smooth"});
    };

    function scrollToCourseDetails() {
        sliderRef.current.scrollTo({top: 0, left: -sliderRef.current.clientWidth, behavior: "smooth"});
    };

    function handleBackClick() {
        setFormStep((prevValue) => {
            return prevValue - 1;
        });
    };

    function focusCourseNameInput() {
        courseNameRef.current.focus();
    };

    function focusCourseDescInput() {
        courseDescRef.current.focus();
    };

    return (
        <>
                <div className="addCourse__form-stepwrapper" ref={sliderRef} style={{width: "100%", height: "100%", display: "flex", alignItems: "flex-start", overflow: "scroll hidden",boxSizing: "border-box"}}>
            {/* <h3 style={{margin: 0}}>Проверим, что бодует добавлено</h3> */}
            <div style={{flex: "1 0 100%", boxSizing: "border-box", padding: "0 75px", height: "100%"}}>
                <div style={{margin: "0 0 20px 0", textAlign: "left"}}>
                    <span>Шаг {formStep + 1}/3</span>
                    <h3 style={{margin: "10px 0 0 0"}}>Проверим, что бодует добавлено в новый курс</h3>
                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", width: "50%", minHeight: 270, margin: "0 0 45px 0"}}>
                    <div style={{display: "flex", flexDirection: "column", width: "100%", minHeight: 70, justifyContent: "space-between", alignItems: "flex-start", position: "relative"}}>
                        <label>Название курса</label>
                        <input ref={courseNameRef} className="addCourse__form-input" placeholder="Введите название курса" value={course.name} onChange={(evt) => {
                            setFormData({...formData, course: {
                                ...formData.course, name: evt.target.value,
                            }})
                        }}></input>
                        <button onClick={focusCourseNameInput} style={{position: "absolute", top: 40, right: 10, fontSize: 14, backgroundColor: "transparent", minWidth: 20, minHeight: 20, color: "rgb(226, 100, 59)", border: "none", padding: "0"}}>
                            <FontAwesomeIcon icon={faPen}  />
                        </button>
                        
                    </div>
                    <div style={{display: "flex", flexDirection: "column", width: "100%", minHeight: 70, justifyContent: "space-between", alignItems: "flex-start", position: "relative"}}>
                        <label>Описание курса</label>
                        <input ref={courseDescRef} className="addCourse__form-input" placeholder="Введите описание курса" value={course.description} onChange={(evt) => {
                            setFormData({...formData, course: {
                                ...formData.course, description: evt.target.value,
                            }})
                        }}></input>
                        <button onClick={focusCourseDescInput} style={{position: "absolute", top: 40, right: 10, fontSize: 14, backgroundColor: "transparent", minWidth: 20, minHeight: 20, color: "rgb(226, 100, 59)", border: "none", padding: "0"}}>
                            <FontAwesomeIcon onMouseEnter={() => {console.log('test hover')}} icon={faPen}  />
                        </button>
                    </div>
                    
                    <motion.button whileHover={{backgroundColor: "rgb(226, 100, 59)", color:"rgb(255, 255, 255)"}} style={{padding: "0 10px", minWidth: 175, minHeight: 50, border: "2px solid rgb(226, 100, 59)", backgroundColor: "rgba(226, 100, 59, 0)", color: "rgb(226, 100, 59)", display: "inline-flex", justifyContent: "space-between", alignItems: "center", fontSize: 16, borderRadius: 7}} type="button" onClick={scrollTocontent}>
                        <span>К контенту</span>
                        <FontAwesomeIcon style={{fontSize: 18}} icon={faCircleRight} />
                    </motion.button>
                </div>
            </div>
                    
            <div style={{flex: "1 0 100%", boxSizing: "border-box", padding: "0 75px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start"}}>
                <h2 style={{margin: 0}}>Что будет в модуле</h2>
                <motion.button whileHover={{backgroundColor: "rgb(226, 100, 59)", color:"rgb(255, 255, 255)"}} style={{padding: "0 10px", minWidth: 175, minHeight: 50, border: "2px solid rgb(226, 100, 59)", backgroundColor: "rgba(226, 100, 59, 0)", color: "rgb(226, 100, 59)", display: "inline-flex", justifyContent: "space-between", alignItems: "center", fontSize: 16, margin: "auto 0", borderRadius: 7}} type="button" onClick={scrollToCourseDetails}>
                    <FontAwesomeIcon style={{fontSize: 18}} icon={faCircleLeft} />
                    <span>К деталям курса</span>    
                </motion.button>
                <EditorContent className="addCourse__form-stepwrapper-editor-div" style={{width: "100%", height: "100%", /*maxHeight: 475,*/ display: "flex", alignItems: "flex-start", justifyContent: "center",  overflow: "auto", boxSizing:"border-box", borderRadius: 15, margin: "auto 0"}} editor={editor}/>
            </div>      
            {/* <div style={{minHeight: 120, width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", margin: "30px 0"}}>
                <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", padding: "10px 20px"}}>
                    <span>Название новго курса</span>
                    <h4 style={{margin: 0}}>{course.name}</h4>
                </div>
                <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", padding: "10px 20px"}}>
                    <span>Описание нового курса</span>
                    <p style={{margin: 0}}>{course.description}</p>
                </div>
            </div> */}

        </div>
            <div style={{display: "flex", alignItems: "stretch", justifyContent: "space-between", minHeight: 40, width: "100%", boxSizing: "border-box", padding: "0 75px"}}>
                <motion.button onClick={handleBackClick} type="button" whileHover={{backgroundColor: "rgb(226 100 59 / 100%)", color: "rgb(255 255 255 / 100%)"}} style={{  fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color:  "rgb(255 255 255 / 100%)", border: "2px solid rgb(226, 100, 59)"}}>Назад</motion.button>
                <motion.button type="submit" whileHover={{backgroundColor: "rgb(226 100 59 / 100%)", color: "rgb(255 255 255 / 100%)"}} style={{ fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(255 255 255 / 100%)", border: "2px solid rgb(226, 100, 59)"}}>Загрузить</motion.button>
            </div>
        </>


    )
}
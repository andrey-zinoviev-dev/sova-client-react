import React from "react";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function AddStep3({ formData, setFormData, formStep }) {
    //states
    const [editable, setEditable] = React.useState(false);
    // const [contentZone, setContentZone] = React.useState(false);

    const { course, module } = formData;

    console.log(module.text);

    const editor = useEditor({
      editable,
      content: module.text,
      extensions: [StarterKit],
    });

    //refs
    const sliderRef = React.useRef();

    //functions
    function scrollTocontent() {
        // console.log(sliderRef.current);

        sliderRef.current.scrollTo({top: 0, left: sliderRef.current.clientWidth, behavior: "smooth"});
    };

    function scrollToCourseDetails() {

        sliderRef.current.scrollTo({top: 0, left: -sliderRef.current.clientWidth, behavior: "smooth"});
    }



    return (
        <div className="addCourse__form-stepwrapper" ref={sliderRef} style={{width: "100%", height: "100%", display: "flex", alignItems: "center", overflow: "scroll hidden",boxSizing: "border-box"}}>
            {/* <h3 style={{margin: 0}}>Проверим, что бодует добавлено</h3> */}
            <div style={{flex: "1 0 100%"}}>
                <div style={{margin: "0 0 20px 0", textAlign: "left"}}>
                    <span>Шаг {formStep + 1}/3</span>
                    <h3 style={{margin: "10px 0 0 0"}}>Проверим, что бодует добавлено в новый курс</h3>
                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", width: "50%", minHeight: 270, margin: "0 0 45px 0"}}>
                    <div style={{display: "flex", flexDirection: "column", width: "100%", minHeight: 70, justifyContent: "space-between", alignItems: "flex-start"}}>
                        <label>Название курса</label>
                        <input className="addCourse__form-input" placeholder="Введите название курса" value={course.name} onChange={(evt) => {
                            setFormData({...formData, course: {
                                ...formData.course, name: evt.target.value,
                            }})
                        }}></input>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", width: "100%", minHeight: 70, justifyContent: "space-between", alignItems: "flex-start"}}>
                        <label>Описание курса</label>
                        <input className="addCourse__form-input" placeholder="Введите описание курса" value={course.description} onChange={(evt) => {
                            setFormData({...formData, course: {
                                ...formData.course, description: evt.target.value,
                            }})
                        }}></input>
                    </div>
                    
                    <button style={{padding: 0, minWidth: 180, minHeight: 30, border: "none", backgroundColor: "transparent", color: "rgb(226, 100, 59)", display: "inline-flex", justifyContent: "space-between", alignItems: "center", fontSize: 16}} type="button" onClick={scrollTocontent}>
                        <span>К контенту модуля</span>
                        <FontAwesomeIcon style={{fontSize: 18}} icon={faCircleRight} />
                    </button>
                </div>
            </div>
                    
            <div style={{flex: "1 0 100%"}}>
                <span>Что будет в модуле</span>
                <EditorContent className="addCourse__form-stepwrapper-editor-div" style={{width: "100%", height: "100%", maxHeight: 475, display: "flex", alignItems: "flex-start", justifyContent: "center",  overflow: "auto", boxSizing:"border-box", border: "2px solid white", borderRadius: 15}} editor={editor}/>
                <button style={{padding: 0, minWidth: 180, minHeight: 30, border: "none", backgroundColor: "transparent", color: "rgb(226, 100, 59)", display: "inline-flex", justifyContent: "space-between", alignItems: "center", fontSize: 16}} type="button" onClick={scrollToCourseDetails}>
                        <span>К деталям курса</span>
                        <FontAwesomeIcon style={{fontSize: 18}} icon={faCircleLeft} />
                </button>
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
    )
}
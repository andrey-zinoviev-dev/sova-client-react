import React from "react";
import "./AddCourse.css";
import { motion } from "framer-motion";
export default function AddStep1({formData, setFormData, formStep, setFormStep}) {
    const { course } = formData;

    //states
    const [disableButton, setDisableButton] = React.useState(true);

    //effects
    React.useEffect(() => {
        if(course.name.length > 0 && course.description.length > 0) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }

    }, [course.name.length, course.description.length]);

    //functions
    function handleNextClick() {
        setFormStep((prevValue) => {
            return prevValue + 1;
        });
    }

    return (
        <div style={{width: "100%", height: "100%", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between", padding: "0 0 0 75px", /*minHeight: 400,*/ maxWidth: 540, /*margin: "0px 0px 70px 0"*/ }}>
            <div style={{height: "100%", maxHeight: 550, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", minHeight: 160, borderBottom: "2px solid rgb(226, 100, 59)", boxSizing: "border-box", padding: "0 0 30px 0"}}>
                    <span>Шаг {formStep + 1}/3</span>
                    <h2 style={{margin: 0}}>Добавим название и описание нового курса</h2>
                    <p style={{margin: 0}}>Введите данные нового курса, чтобы добавить новый курс.</p>
                </div>

                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", minHeight: 80}}>
                    <label>Название курса</label>
                    <input className="addCourse__form-input" placeholder="Введите название курса" value={course.name} onChange={(evt) => {
                        setFormData({...formData, course: {
                            ...formData.course, name: evt.target.value,
                        }})
                    }}></input>
                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", minHeight: 80}}>
                    <label>Описание курса</label>
                    <input className="addCourse__form-input" placeholder="Введите описание курса" value={course.description} onChange={(evt) => {
                        setFormData({...formData, course: {
                            ...formData.course, description: evt.target.value,
                        }})
                    }}></input>
                </div>
            </div>

            <div style={{display: "flex", alignItems: "stretch", justifyContent: "flex-start", minHeight: 40}}>
                <motion.button type="button" onClick={handleNextClick} whileHover={{backgroundColor: "rgb(226 100 59 / 100%)"}} disabled={disableButton ? true : false} style={{pointerEvents: disableButton && "none",  fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: disableButton ? "rgb(255 255 255 / 30%)" : "rgb(255 255 255 / 100%)", border: disableButton ? "2px solid rgb(255 255 255 / 30%)" : "2px solid rgb(226, 100, 59)"}}>Далее</motion.button>
            </div>
        </div>
    )
}
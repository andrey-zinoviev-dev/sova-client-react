import React from "react";
import "./AddCourse.css";
export default function AddStep1({formData, setFormData, formStep}) {
    const { course } = formData;
    // console.log(course);
    // React.useEffect(() => {
    //     console.log(formStep);
    // }, [formStep]);

    return (
        <div style={{width: "100%", height: "100%", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between", padding: "0 0 0 75px", /*minHeight: 400,*/ maxHeight: 550, maxWidth: 540, /*margin: "0px 0px 70px 0"*/ }}>
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
    )
}
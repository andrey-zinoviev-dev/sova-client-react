import React from "react";
import "./AddCourse.css";
export default function AddStep1({formData, setFormData, formStep}) {
    const { course } = formData;
    // console.log(course);
    // React.useEffect(() => {
    //     console.log(formStep);
    // }, [formStep]);

    return (
        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between", minHeight: 320, maxWidth: 540, margin: "0px 0px 70px 0"}}>
            <div>
                <span>Шаг {formStep + 1}/3</span>
                <h3 style={{margin: "10px 0 0 0"}}>Добавим название и описание нового курса</h3>
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
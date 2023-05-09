import React from "react";
import "./AddCourse.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
export default function AddStep1({formData, setFormData, formStep, setFormStep}) {
    const { course } = formData;

    //states
    const [disableButton, setDisableButton] = React.useState(true);
    const [selectedImage, setSelectedImage] = React.useState({});

    //refs
    const inputFileRef = React.useRef();
    const imgRef = React.useRef();
    
    //functions
    function handleNextClick() {
        setFormStep((prevValue) => {
            return prevValue + 1;
        });
    };

    function openFileInput() {
        inputFileRef.current.click();
    };

    function processFile(evt) {
        // console.log(evt.target.files);
        const imageToUpload = evt.target.files[0];
        imageToUpload.clientPath = window.URL.createObjectURL(imageToUpload);
        setSelectedImage(imageToUpload)
    }

    //effects
    React.useEffect(() => {
        if(course.name.length > 0 && course.description.length > 0) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [course.name.length, course.description.length]);

    React.useEffect(() => {
        // console.log(selectedImage);
        //set file to img src
        
        imgRef.current.src = Object.keys(selectedImage).length > 0 ? selectedImage.clientPath : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="
    }, [selectedImage])

    return (
        <div style={{width: "100%", height: "100%", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between", padding: "0 0 0 75px", /*minHeight: 400,*/ maxWidth: 540, /*margin: "0px 0px 70px 0"*/ }}>
            <div style={{height: "100%", maxHeight: 550, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", minHeight: 160, borderBottom: "2px solid rgb(226, 100, 59)", boxSizing: "border-box", padding: "0 0 30px 0"}}>
                    <span>Шаг {formStep + 1}/3</span>
                    <h2 style={{margin: 0}}>Добавим название и описание нового курса</h2>
                    <p style={{margin: 0}}>Введите данные нового курса, чтобы добавить новый курс.</p>
                </div>
                <div style={{margin: "25px 0 auto 0", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", gap: 25}}>
                    <div style={{display: "flex", flexDirection: "column", justifyContent:"space-between", alignItems: "stretch", gap: 25}}>
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
                        <div style={{display: "flex", flexDirection:"column", alignItems: "stretch", justifyContent: "space-between", gap: 25}}>
                            <label>Обложка курса</label>
                            <input className="addCourse__form-input" placeholder="Ссылка на картинку"></input>
                            <input ref={inputFileRef} type="file" onChange={(evt) => {processFile(evt)}} style={{display: "none"}}></input>
                            <div style={{position: "relative", alignSelf: "flex-start"}}>
                                <img ref={imgRef} style={{width: 220, borderRadius: 12}} src="https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4=" alt="обложка курса"/>
                                <button onClick={openFileInput} type="button" style={{position: "absolute", bottom: -10, right: -10, width: 45, height: 45, border: "none", borderRadius: "51%", fontSize: 20, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <FontAwesomeIcon icon={faCamera} />
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>

            <div style={{display: "flex", alignItems: "stretch", justifyContent: "flex-start", minHeight: 40}}>
                <motion.button type="button" onClick={handleNextClick} whileHover={{backgroundColor: "rgb(226 100 59 / 100%)"}} disabled={disableButton ? true : false} style={{pointerEvents: disableButton && "none",  fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: disableButton ? "rgb(255 255 255 / 30%)" : "rgb(255 255 255 / 100%)", border: disableButton ? "2px solid rgb(255 255 255 / 30%)" : "2px solid rgb(226, 100, 59)"}}>Далее</motion.button>
            </div>
        </div>
    )
}
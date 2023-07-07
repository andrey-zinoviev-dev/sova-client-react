import React from "react";
import "./AddCourse.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
export default function AddStep1({formData, setFormData, formStep, setFormStep, setSelectedFiles}) {
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
        setSelectedFiles((prevValue) => {
            return[...prevValue, imageToUpload]
        });
        imageToUpload.clientPath = window.URL.createObjectURL(imageToUpload);
        imageToUpload.title = imageToUpload.name;
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
        imgRef.current.src = Object.keys(selectedImage).length > 0 ? selectedImage.clientPath : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="
        setFormData((prevValue) => {
            return {...prevValue, course: {...prevValue.course, cover: selectedImage}}
        });
        
    }, [selectedImage])

    return (
        <div style={{width: "100%", height: "100%", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between" }}>
            {/* <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch"}}> */}
                {/* <div className="addForm__first-step-title" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid rgb(226, 100, 59)", boxSizing: "border-box"}}>
                    <span>Шаг {formStep + 1}/3</span>
                    <h2 style={{margin: 0}}>Добавим название и описание нового курса</h2>
                    <p style={{margin: 0}}>Введите данные нового курса, чтобы добавить новый курс.</p>
                </div> */}
                {/* <div className="addForm__first-step-content" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch"}}>

                </div> */}

            {/* </div> */}
            {/* <div> */}
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 768, margin: "35px auto 35px 0", width: "100%"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent:"space-between", alignItems: "stretch", height: 230}}>
                            <div className="addCourse__form-div" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start"}}>
                                {/* <label>Название курса</label> */}
                                <input className="addCourse__form-input" placeholder="Введите название курса" value={course.name} onChange={(evt) => {
                                    setFormData({...formData, course: {
                                        ...formData.course, name: evt.target.value,
                                    }})
                                }}></input>
                            </div>
                            <div className="addCourse__form-div" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start"}}>
                                {/* <label>Описание курса</label> */}
                                <input className="addCourse__form-input" placeholder="Введите описание курса" value={course.description} onChange={(evt) => {
                                    setFormData({...formData, course: {
                                        ...formData.course, description: evt.target.value,
                                    }})
                                }}></input>
                            </div>
                            <div style={{display: "flex", alignItems: "stretch", justifyContent: "space-between", gap: 25}}>
                                <div style={{width: "100%"}}>
                                    {/* <label>Обложка курса</label> */}
                                    <input className="addCourse__form-input" placeholder="Ссылка на картинку"></input>
                                    <input ref={inputFileRef} type="file" onChange={(evt) => {processFile(evt)}} style={{display: "none"}}></input>
                                </div>                            
                            </div>
                        </div>
                <div style={{position: "relative", boxSizing: "border-box", display: "flex"}}>
                    <img ref={imgRef} style={{width: 230, borderRadius: 12, aspectRatio: "1/1", objectFit: "cover", objectPosition: "top"}} src="https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4=" alt="обложка курса"/>
                    <button onClick={openFileInput} type="button" style={{position: "absolute", bottom: -10, right: -10, width: 45, height: 45, border: "none", borderRadius: "51%", fontSize: 20, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <FontAwesomeIcon icon={faCamera} />
                    </button>
                </div>
            </div>

            {/* </div> */}

            <motion.button type="button" onClick={handleNextClick} whileHover={{backgroundColor: "rgb(93, 176, 199)", color: "rgb(255, 255, 255)"}} style={{alignSelf: "flex-end",  fontWeight: 500, minWidth: /*120*/ 180, minHeight: 50, borderRadius: 5, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(93, 176, 199)", border: "2px solid rgb(93, 176, 199)"}}>Продолжить</motion.button>

        </div>
    )
}
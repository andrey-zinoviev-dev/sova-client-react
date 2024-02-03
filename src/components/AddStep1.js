import React from "react";
import "./AddCourse.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import CyrillicToTranslit from 'cyrillic-to-translit-js';

export default function AddStep1({formData, setFormData, formStep, setFormStep, setSelectedFiles}) {
    const { course } = formData;
  
    const cyrillicToTranslit = new CyrillicToTranslit();

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
        let imageToUpload = evt.target.files[0];
        if(/[А-Я ]/.test(imageToUpload.name)) {
            imageToUpload = new File([imageToUpload], cyrillicToTranslit.transform(imageToUpload.name, "_"), {
                type: imageToUpload.type
            })
        //     const updatedName = cyrillicToTranslit.transform(imageToUpload.name, "_");
        //     Object.defineProperty(imageToUpload, 'name', {
        //         writable: true,
        //         value: updatedName
        //     });
        }
        imageToUpload.clientPath = window.URL.createObjectURL(imageToUpload);
        imageToUpload.title = imageToUpload.name;
        
        setSelectedFiles((prevValue) => {
            return[...prevValue, imageToUpload]
        });

        // imgRef.current.src = imageToUpload.clientPath;

        // setFormData((prevValue) => {
        //     return {...prevValue, course: {...prevValue.course, cover: imageToUpload}}
        // });
        saveInputChanges(evt.target.name, imageToUpload)
        // setSelectedImage(imageToUpload)
    }

    function saveInputChanges(name, value) {
        // console.log(name, value);
        localStorage.setItem("courseData", JSON.stringify({...formData, course: {
            ...formData.course, [name]: value
        }}))
        setFormData({...formData, course: {
            ...formData.course, [name]: value,
        }})
    };

    //effects
    React.useEffect(() => {
        // console.log(localStorage);
        const { courseData } = localStorage;
        if(courseData) {
            const parsedCourseData = JSON.parse(courseData);
            // console.log(parsedCourseData);
            setFormData({...formData, course: parsedCourseData.course})
        }

        // const courseTitle = localStorage.getItem("courseName");
        // console.log(courseTitle);
        // const courseDescription = localStorage.getItem("courseDescription");
        // console.log(courseDescription);
        // setFormData({...formData, course: {
        //     ...formData.course, name: courseTitle ? courseTitle: "", description: courseDescription ? courseDescription : "" 
        // }})
        // courseTitle && setFormData({...formData, course: {
        //     ...formData.course, name: courseTitle,
        // }});
        // courseDescription && setFormData({...formData, course: {
        //     ...formData.course, description: courseDescription,
        // }});
    }, []);

    React.useEffect(() => {
        
        if(course.name.length > 0 && course.description.length > 0) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [course.name.length, course.description.length]);

    // React.useEffect(() => {
    //     imgRef.current.src = Object.keys(selectedImage).length > 0 ? selectedImage.clientPath : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="
    //     setFormData((prevValue) => {
    //         return {...prevValue, course: {...prevValue.course, cover: selectedImage}}
    //     });
        
    // }, [selectedImage])

    return (
        <div style={{width: "100%", height: "100%", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", maxWidth: 1280, boxSizing: "border-box", padding: "0 40px" }}>
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
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", margin: "35px auto", width: "100%"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent:"space-between", alignItems: "stretch", height: 230}}>
                            <div className="addCourse__form-div" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start"}}>
                                {/* <label>Название курса</label> */}
                                <input className="addCourse__form-input" placeholder="Введите название курса" name="name" value={course.name} onChange={(evt) => {
                                    // localStorage.setItem(evt.target.name, evt.target.value);
                                    // setFormData({...formData, course: {
                                    //     ...formData.course, name: evt.target.value,
                                    // }})
                                    saveInputChanges(evt.target.name, evt.target.value)
                                }}></input>
                            </div>
                            <div className="addCourse__form-div" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start"}}>
                                {/* <label>Описание курса</label> */}
                                <input className="addCourse__form-input" name="description" placeholder="Введите описание курса" value={course.description} onChange={(evt) => {
                                    // localStorage.setItem(evt.target.name, evt.target.value);
                                    // setFormData({...formData, course: {
                                    //     ...formData.course, description: evt.target.value,
                                    // }})
                                    saveInputChanges(evt.target.name, evt.target.value)
                                }}></input>
                            </div>
                            <div style={{display: "flex", alignItems: "stretch", justifyContent: "space-between", gap: 25}}>
                                <div style={{width: "100%"}}>
                                    {/* <label>Обложка курса</label> */}
                                    <input className="addCourse__form-input" onInput={(evt) => {
                                        // setFormData((prevValue) => {
                                        //     return {...prevValue, course: {...prevValue.course, tarifs: evt.target.value.split(",")}}
                                        // })
                                        saveInputChanges(evt.target.name, evt.target.value)
                                    }} value={course.tarifs} name="tarifs" placeholder="Тарифы курса через запятую"></input>
                                    <input ref={inputFileRef} name="cover" type="file" onChange={(evt) => {processFile(evt)}} style={{display: "none"}}></input>
                                </div>                            
                            </div>
                        </div>
                <div style={{position: "relative", boxSizing: "border-box", display: "flex"}}>
                    <img ref={imgRef} style={{width: 230, borderRadius: 12, aspectRatio: "1/1", objectFit: "cover", objectPosition: "top"}} src={formData.course.cover.clientPath ? formData.course.cover.clientPath : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="} alt="обложка курса"/>
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
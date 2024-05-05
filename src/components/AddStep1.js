import React from "react";
import "./AddCourse.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { createSearchParams, useNavigate } from "react-router-dom";
import axiosClient from '../axios';
// import { useSearchParams } from "react-router-dom";

export default function AddStep1({token, formData, setFormData, formStep, setFormStep, setSelectedFiles}) {
    //navigate
    const navigate = useNavigate();

    const { course } = formData;
  
    const cyrillicToTranslit = new CyrillicToTranslit();

    //states
    const [disableButton, setDisableButton] = React.useState(true);
    const [selectedImage, setSelectedImage] = React.useState({});
    const [errorMessage, setErrorMessage] = React.useState("");
    // let [searchParams, setSearchParams] = useSearchParams();

    //refs
    const inputFileRef = React.useRef();
    const imgRef = React.useRef();
    const proceedButton = React.useRef();
    const studentsRef = React.useRef();
    
    //functions
    // function proceedForm() {
    //     updateQueryString(2)
    // }

    function openFileInput() {
        inputFileRef.current.click();
    };

    function readCSV(evt) {
        const file = evt.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csvData = e.target.result;
            const addedStudents = convertCSVtoJSON(csvData);
            setFormData((prevValue) => {
                return {...prevValue, students: addedStudents};
            });
            // console.log(csvData.split("\n"));
        }
        reader.readAsText(file)
    };

    function convertCSVtoJSON(file) {
        // console.log(file);
        const finalJSON = [];
        const lines = file.split("\n");
        
        const headers = lines[0].split(lines[0].includes(";") ? (";") : ",");
        // console.log(headers);

        let lineIndex = 1;
        while(lineIndex < lines.length) {
            const userString = lines[lineIndex].split(lines[lineIndex].includes(";") ? (";") : ",");
            const obj = {};
            headers.forEach((header, index) => {
                // console.log(header.replace(" ",""))
                obj[header.replace("\r","")] = userString[index].replace("\r","");
            });
            finalJSON.push(obj);
            lineIndex += 1;
        };
        return finalJSON;
    }

    function processFile(evt) {
        let imageToUpload = evt.target.files[0];
        const filePath = window.URL.createObjectURL(imageToUpload);
        imageToUpload.title = imageToUpload.name;
        imageToUpload.clientPath = filePath;
        setSelectedFiles((prevValue) => {
            // localStorage.setItem("courseFiles", JSON.stringify([...prevValue, imageToUpload]));
            return[...prevValue, imageToUpload]
        });
        saveInputChanges(evt.target.name, imageToUpload)
        window.URL.revokeObjectURL(imageToUpload);

    }

    function saveInputChanges(name, value) {
        // console.log(name, value);
        // localStorage.setItem("courseData", JSON.stringify({...formData, course: {
        //     ...formData.course, [name]: value
        // }}))
        setFormData({...formData, course: {
            ...formData.course, [name]: value,
        }})
    };

    //effects
    

    // React.useEffect(() => {
    //     if(formData.course.name.length > 0) {
    //         axiosClient.get(`/findCourse/${formData.course.name}`, {
    //                 headers: {
    //                     'Authorization': token,
                        
    //                 },
    //             })
    //             .then(() => {
    //                 setErrorMessage("");
    //                 saveInputChanges("name", formData.course.name);
    //             })
    //             .catch((err) => {
                    
    //                 setErrorMessage(err.response.data.message);
    //             })
    //     }
    //     if(errorMessage.length === 0 && formData.course.name.length > 0 && formData.course.description.length > 0 && formData.course.cover.clientPath) {
    //         proceedButton.current.disabled = false;
    //         proceedButton.current.classList.remove("addCourse__form-btn_disabled-btn");
    //     } else {
    //         proceedButton.current.disabled = true;
    //         proceedButton.current.classList.add("addCourse__form-btn_disabled-btn");
    //     }
    //     // if(course.name.length > 0 && course.description.length > 0) {
    //     //     setDisableButton(false);
    //     // } else {
    //     //     setDisableButton(true);
    //     // }
        

    // }, [errorMessage.length, formData.course.name, formData.course.description, formData.course.cover.clientPath]);

    // React.useEffect(() => {
    //     console.log(formData);
    // }, [formData])

    // React.useEffect(() => {
    //     imgRef.current.src = Object.keys(selectedImage).length > 0 ? selectedImage.clientPath : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="
    //     setFormData((prevValue) => {
    //         return {...prevValue, course: {...prevValue.course, cover: selectedImage}}
    //     });
        
    // }, [selectedImage])

    return (
        <form onSubmit={(evt) => {
            evt.preventDefault();
            setFormStep((prevValue) => {
                return prevValue + 1;
            });
        }} style={{margin: "0 auto", width: "100%", height: "100%", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", maxWidth: 1280, boxSizing: "border-box"}}>
            <div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", margin: "35px auto", width: "100%"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent:"space-between", alignItems: "stretch", gap: 35}}>
                    <div className="addCourse__form-div" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start"}}>
                                {/* <label>Название курса</label> */}
                        <input className="addCourse__form-input" placeholder="Введите название курса" name="name" value={formData.course.name} onChange={(evt) => {
                                    // localStorage.setItem(evt.target.name, evt.target.value);
                            setFormData({...formData, course: {
                                 ...formData.course, name: evt.target.value,
                            }})
                        }}></input>
                        {errorMessage.length > 0 && <p style={{marginLeft: "0 0 0 10px", color: "#ff4949"}}>{errorMessage}</p>}
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
                            <input className="addCourse__form-input" onInput={(evt) => {
                                const tarifs = evt.target.value.split(",").map((tarif) => {
                                    return {name: tarif, expire: ""};
                                });
                                setFormData((prevValue) => {
                                    return {...prevValue, tarifs: tarifs};
                                });
                                // console.log(tarifs);
                                // const tarifsUpdated = tarifs.map((tarif) => {
                                //     return tarif.replace(" ","");
                                // });
                                // console.log(tarifsUpdated);
                                // saveInputChanges(evt.target.name, tarifs)
                            }} value={course.tarifs} name="tarifs" placeholder="Тарифы курса через запятую"></input>
                            <input ref={inputFileRef} name="cover" type="file" onChange={(evt) => {processFile(evt)}} style={{display: "none"}}></input>
                        </div>                            
                    </div>
                    {formData.tarifs.length > 0 &&<ul style={{listStyle: "none", padding: 0}}>
                        {formData.tarifs.map((tarif, index) => {
                            // console.log(tarif);
                            return <li style={{padding: "15px 0 0 0"}} key={tarif.name}>
                                <label htmlFor={`tarif ${tarif}`}>Доступ для тарифа {index + 1}</label>
                                <input id={`tarif ${tarif}`} onChange={(evt) => {
                                    // console.log(evt.target.name, evt.target.value);
                                    setFormData((prevValue) => {
                                        return {...prevValue, tarifs: prevValue.tarifs.map((tarif, index) => {
                                            // console.log(index, evt.target.name)
                                            return index === +evt.target.name? {...tarif, expire: evt.target.value} : tarif;
                                        })}
                                    })
                                }} className="addCourse__form-input" style={{colorScheme: "dark"}} type="date" name={index} placeholder={`Доступ для тарифа ${index + 1}`}></input>
                            </li>
                        })}
                        <li style={{padding: "15px 0 0 0"}} key="access date start">
                            <label htmlFor={`tarif start`}>Начало доступа</label>
                            <input key="tarifs start" id={`tarifs start`} onChange={(evt) => {
                                    // console.log(evt.target.name, evt.target.value);
                                setFormData((prevValue) => {
                                    return {...prevValue, tarifs: prevValue.tarifs.map((tarif) => {
                                            // console.log(index, evt.target.name)
                                        return {...tarif, start: evt.target.value};
                                    })}
                                })
                            }} className="addCourse__form-input" style={{colorScheme: "dark"}} type="date" name="tarifs start" placeholder={`Начало доступа к курсу`}></input>
                        </li>
                    </ul>}
                    {/* {formData.tarifs.length > 0 && <div style={{display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between", gap: 25}}>
                    </div>} */}
                    <div>
                        <p>Ученики: {formData.students.length}</p>
                        <input type="file" ref={studentsRef} onChange={(evt) => {
                            readCSV(evt);
                        }} style={{display: "none"}}></input>
                        <button onClick={() => {
                            studentsRef.current.click();
                        }} type="button" style={{maxWidth: 140}} className="addCourse__form-btn">Добавить учеников CSV</button>
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

            <motion.button type="submit" ref={proceedButton} className="addCourse__form-btn" style={{alignSelf: "flex-end"}}>Продолжить</motion.button>

        </form>
    )
}
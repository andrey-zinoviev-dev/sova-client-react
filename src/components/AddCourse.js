import React from "react";
import "./AddCourse.css";
// import { Stepper, Step, Box, StepLabel } from "@mui/material";
import AddStep1 from "./AddStep1";
import AddStep2 from "./AddStep2";
import AddStep3 from "./AddStep3";
import AddModule from "./AddModule";
import AddStepModule from "./AddStepModule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faKeyboard, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { UserContext } from '../context/userContext';
import { apiCreateCourse } from '../api';
import CyrillicToTranslit from 'cyrillic-to-translit-js';


export default function AddCourse() {
  //token
  const userToken = localStorage.getItem('token');
  //user context
  const loggedInUser = React.useContext(UserContext);
  //states
  const [formStep, setFormStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    // author: loggedInUser,
    course: {
      name: "",
      description: "",
      cover: {},
    },
    modules: [

    ],
    // files: [

    // ],
    // module: {
    //   text: "",
    // },
  });
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  //functions
  function renderStep() {
    switch (formStep) {
      case 0:
        return <AddStep1 formData={formData} setFormData={setFormData} formStep={formStep} setFormStep={setFormStep} setSelectedFiles={setSelectedFiles}/>
      case 1: 
        return <AddStepModule formData={formData} setFormData={setFormData} setFormStep={setFormStep}/>
      case 2:
        return <AddStep2 formData={formData} setFormData={setFormData} formStep={formStep} setFormStep={setFormStep} setSelectedFiles={setSelectedFiles}/>
      case 3:
        return <AddStep3 formData={formData} setFormData={setFormData} formStep={formStep} setFormStep={setFormStep}/>
      default:
        break;
    }
  };

  // function submitForm() {
  //   console.log(formData);
  // }

  //refs
  const stepsRef = React.useRef();
  const prevStepRef = React.useRef();
  const nextButtonRef = React.useRef();
  // const buttonStepRef = React.useRef();

  //variables
  const stepsArray = [
    {
      description: "Название и описание курса",
      icon: faSignature,
    }, 
    {
      description: "Добавление модулей и уроков",
      icon: faChartBar,
    },
    {
      description: "Содержание уроков",
      icon: faKeyboard
    }, 
    {
      description: "Проверка курса",
      icon: faListCheck,
    }
  ];

  
  const cyrillicToTranslit = new CyrillicToTranslit();

  React.useEffect(() => {
    console.log(formData);
  }, [formData])

  // React.useEffect(() => {
  //   // console.log(formStep);
  //   const step = Array.from(stepsRef.current.children)[formStep];
  //   const prevStep = Array.from(stepsRef.current.children)[prevStepRef.current];
  //   // console.log(step);
  //   // console.log(prevStep);
  //   step.querySelector('.addCourse__navigation-list-element-logo').style.border = '2px solid rgb(226, 100, 59)';
  //   step.querySelector('.addCourse__navigation-list-element-logo').style.backgroundColor = 'transparent';
  //   step.querySelector('.addCourse__navigation-list-element-step-connection').style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
  //   step.querySelector('.addCourse__navigation-list-element-logo').style.color = "rgba(255, 255, 255, 1)";

  //   if(formStep > prevStepRef.current) {
  //     console.log('next step');
  //     prevStep.querySelector('.addCourse__navigation-list-element-logo').style.backgroundColor = 'rgb(226, 100, 59)';
  //     prevStep.querySelector('.addCourse__navigation-list-element-logo').style.border = '2px solid rgb(226, 100, 59)';
  //     prevStep.querySelector('.addCourse__navigation-list-element-logo').style.color = "rgba(255, 255, 255, 1)";
  //     prevStep.querySelector('.addCourse__navigation-list-element-step-connection').style.backgroundColor = 'rgb(226, 100, 59)';
  //   } else if(formStep < prevStepRef.current) {
  //     console.log('prev step');
  //     prevStep.querySelector('.addCourse__navigation-list-element-logo').style.border = '2px solid rgba(255, 255, 255, 0.5)';
  //     prevStep.querySelector('.addCourse__navigation-list-element-logo').style.backgroundColor = 'transparent';
  //     prevStep.querySelector('.addCourse__navigation-list-element-step-connection').style.backgroundColor = 'rgba(255, 255, 255, 0.5)';

  //   }
  //   prevStepRef.current = formStep;
  // }, [formStep]);

  // React.useEffect(() => {
  //   console.log(selectedFiles);
  // }, [selectedFiles]);

  // React.useEffect(() => {
  //   // console.log(selectedFiles);
  //   // console.log(formData.module.text.content);
  //   if(formData.module.text.content) {
  //     setSelectedFiles((prevValue) => {
  //       // console.log(prevValue);
  //       const contentFilteredArray = formData.module.text.content.filter((contentFile) => {
  //         return contentFile.type === 'image' || contentFile.type === 'video'
  //       });
  //       // console.log(contentFilteredArray);
  //       const newFilesArray = prevValue.map((newFile, array) => {
  //         if(/[А-Я]/.test(newFile.name)) {
  //           // console.log('test ciryllic');
  //           const renamedFile = new File([newFile], cyrillicToTranslit.transform(newFile.name, "_"), {
  //             type: newFile.type,
  //             lastModified: newFile.lastModified,
  //           });
  //           renamedFile.clientPath = newFile.clientPath;
  //           renamedFile.match = contentFilteredArray.some((layoutFile) => {
  //             return layoutFile.attrs.src === renamedFile.clientPath;
  //           });
  //           return renamedFile;
  //         }
  //         const newFilename = newFile.name.replace(" ", "");
  //         console.log(newFilename);
  //         const renamedFile = new File([newFile], newFilename, {
  //           type: newFile.type,
  //           lastModified: newFile.lastModified,
  //         });
  //         renamedFile.clientPath = newFile.clientPath;
  //         renamedFile.match = contentFilteredArray.some((layoutFile) => {
  //           return layoutFile.attrs.src === newFile.clientPath;
  //         });
  //         console.log(newFile);
  //         return renamedFile;
  //       });
  //       // console.log(newFilesArray);
  //       return newFilesArray.filter((file) => {
  //         return file.match !== false;
  //       });
  //       // return [{}, {}, {}];
  //         // const newFilesArray = [...prevValue].map((newFile, array) => {
  //         //   console.log(newFile);
  //         //   return {
  //         //     newFile,
  //         //     match: formData.module.text.content.filter((contentFile) => {
  //         //       return contentFile.type === 'image' || contentFile.type === 'video'
  //         //     }).some((layoutFile) => {
  //         //       return layoutFile.attrs.src === newFile.clientPath;
  //         //     })
  //         //   };
  //         // });
  //         // console.log(newFilesArray);
  //         // return newFilesArray.filter((newFile) => {
  //         //   return newFile.match === true;
  //         // });

  //     })
  //     // const filesLocal = [...selectedFiles];
  //     // console.log(filesLocal);

  //     // setSelectedFiles([]);
  //   }
  // }, [formData.module.text.content]);

  return (
    <section className="addCourse">
      {/* <div style={{width: "100%", display: "flex", flexDirection: "column", maxWidth: 1280, margin: "0 auto"}}>
       
       
      </div> */}
      <div className="addCourse__navigation">
          <div className="addCourse__headline-wrapper">
            <h2 style={{margin: "0 0 10px 0"}}>Добавить новый курс</h2>
            <p style={{margin: 0}}>Через эту форму можно добавить новый курс</p>
          </div>
           
          <ul className="addCourse__navigation-list" ref={stepsRef} style={{padding: 0, listStyle: "none", minWidth: 260, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "space-between", margin: 0, width: "100%"}}>
            {stepsArray.map((step, index) => {
              return <li className="addCourse__navigation-list-element" style={{display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative"}} key={index}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", maxWidth: 200, minHeight: 65, boxSizing: "border-box", padding: "5px 0", color:"rgba(255, 255, 255, 0.5)"}}>
                  <span>Этап {index + 1}</span>
                  <p style={{margin: 0, textAlign: "left"}}>{step.description}</p>
                </div>
                <div className="addCourse__navigation-list-element-logo" style={{width: 55, height: 55, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "51%", backgroundColor: "transparent", border: "2px solid rgba(255, 255, 255, 0.5)", color:"rgba(255, 255, 255, 0.5)", position: "relative"}}>
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                {/* <div className="addCourse__navigation-list-element-step-connection" style={{display: index === stepsArray.length -1 && "none", position: "absolute", top: window.innerWidth < 1439 ? "96%" : "93%", right: window.innerWidth < 1439 ? "9.5%" : "7.5%", width: 4, height: "135%" "180%", backgroundColor: "rgba(255, 255, 255, 0.5)"}}></div> */}
              </li>
            })}

          </ul>
        </div>

          <form className="addCourse__form" onSubmit={(evt) => {
            evt.preventDefault();
            // console.log(formData);
            // console.log(selectedFiles)
            const form = new FormData();
            form.append("author", JSON.stringify(loggedInUser));
            form.append("course", JSON.stringify(formData.course));
            form.append("modules", JSON.stringify(formData.modules));
            // form.append("files", JSON.stringify(selectedFiles));
            
            
            
            selectedFiles.forEach((file) => {
              // console.log(file);
              form.append("files", file);
            });

            // console.log(form);

            apiCreateCourse(userToken, form)
            .then((data) => {
              console.log(data);
            });

            // apiUploadFilesToCourse(userToken, form)
            // .then(() => {

            // });

          }} style={{/*width: 'calc(100% - 600px)',*/width: window.innerWidth < 1440 ? "calc(100% - 370px)" : "calc(100% - 500px)", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", boxSizing: "border-box", /*padding: "45px 75px"*/}}>
            {renderStep()}
            {/* <div className="addCourse__form-buttons-wrapper" style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", boxSizing: "border-box", padding:  "0 75px"}}>
              <motion.button className="addCourse__form-buttons-wrapper-button" type="button" style={{display: formStep < 1 ? "none": "inline-block", fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15}} onClick={() =>{
                formStep > 0 &&
                setFormStep((prevStep) => {
                  return prevStep - 1;
                });
              }}>Назад</motion.button>
              <motion.button className="addCourse__form-buttons-wrapper-button" ref={nextButtonRef} disabled={(formData.course.name.length === 0 || formData.course.description.length === 0) && true} type="button" onClick={() =>{
                // console.log(formData);
                formStep < 2 && 
                setFormStep((prevStep) => {
                  return prevStep + 1;
                });
              }}  style={{pointerEvents: (formData.course.name.length === 0 || formData.course.description.length === 0) && "none", fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, border: formData.course.name.length === 0 || formData.course.description.length === 0 ? "2px solid rgb(255 255 255 / 30%)" : "2px solid rgb(226, 100, 59)", color: formData.course.name.length === 0 || formData.course.description.length === 0 ? "rgb(255 255 255 / 30%)" : "rgb(255 255 255 / 100%)"}}>Вперед</motion.button>
            </div> */}
            
          </form>
      {/* <div></div> */}
    </section>
  )
}
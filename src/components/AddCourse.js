import React from "react";
import "./AddCourse.css";
// import { Stepper, Step, Box, StepLabel } from "@mui/material";
import AddStep1 from "./AddStep1";
// import AddStep2 from "./AddStep2";
// import AddStep3 from "./AddStep3";
// import AddModule from "./AddModule";
import AddStepModule from "./AddStepModule";
import AddCourseSuccess from "./AddCourseSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faKeyboard, faListCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { UserContext } from '../context/userContext';
import { apiCreateCourse } from '../api';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import Dashboard from './Dashboard';
import axiosClient from '../axios';

export default function AddCourse() {
  //token
  const token = localStorage.getItem('token');
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
      tarifs: [],
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadFormSubmitted, setUploadFormSubmitted] = React.useState(false);
  const [successfullCourseAddOpened, setSuccessfullCourseAddOpened] = React.useState(false);

  //functions
  function renderStep() {
    switch (formStep) {
      case 0:
        return <AddStep1 formData={formData} setFormData={setFormData} formStep={formStep} setFormStep={setFormStep} setSelectedFiles={setSelectedFiles}/>
      case 1: 
        return <AddStepModule formData={formData} isLoading={isLoading} setFormData={setFormData} setFormStep={setFormStep} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} successfullCourseAddOpened={successfullCourseAddOpened} uploadProgress={uploadProgress}/>
      // case 2:
      //   return <AddCourseSuccess />
      // case 3:
      //   return <AddStep3 formData={formData} setFormData={setFormData} formStep={formStep} setFormStep={setFormStep}/>
      default:
        break;
    }
  };

  function submitForm() {
    console.log(formData);
  }

//   function saveInputChanges(name, value) {
//     // console.log(name, value);
//     localStorage.setItem("courseData", JSON.stringify({...formData, course: {
//         ...formData.course, [name]: value
//     }}))
//     setFormData({...formData, course: {
//         ...formData.course, [name]: value,
//     }})
// };

  //refs
  const stepsRef = React.useRef();
  const prevStepRef = React.useRef();
  const nextButtonRef = React.useRef();
  // const buttonStepRef = React.useRef();

  //variables
  // const stepsArray = [
  //   {
  //     description: "Название и описание курса",
  //     icon: faSignature,
  //   }, 
  //   {
  //     description: "Добавление модулей и уроков",
  //     icon: faChartBar,
  //   },
  //   {
  //     description: "Содержание уроков",
  //     icon: faKeyboard
  //   }, 
  //   {
  //     description: "Проверка курса",
  //     icon: faListCheck,
  //   }
  // ];

  React.useEffect(() => {
    console.log(formData);
  } ,[formData])

  return (
    <section className="addCourse">
      
      <div className="addCourse__progress-wrapper">
        <div style={{display: "flex"}}>
          {/* <button onClick={() => {}} style={{width: 40, height: 30, backgroundColor: "transparent", border: "none", padding: 0, margin: "5px 0 0 0"}}>
            <FontAwesomeIcon style={{color: "rgb(93, 176, 199)", fontSize: 24}} icon={faArrowLeft} />
          </button> */}
          <h2 className="addCourse__headline" style={{textAlign: "left", fontWeight: 400, color: "#747374", margin: 0}}><span style={{color: "white"}}>Вернуться к курсам</span>, либо добавить новый</h2>
        </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 25, maxWidth: 410, margin: "20px 0 0 0", boxSizing: "border-box", padding: "0 0 0 35px"}}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", minWidth: 80, minHeight: 80, borderRadius: "50%", backgroundImage: `radial-gradient(closest-side, black 75%, transparent 80%, transparent 100%), conic-gradient(rgb(116, 115, 116) 50%, rgb(93, 176, 199) 0%)`}}>
            {/* <progress value="25" style={{visibility: "hidden", width: 0, height: 0}}></progress> */}
            <p>{formStep + 1} / 2</p>
          </div>
          <p style={{margin: 0, maxWidth: 280, textAlign: "left"}}>
            <span style={{display: "block"}}>Этап {formStep + 1}</span>
            {formStep + 1 === 1 && 'Название, описание и обложка курса'}
            {formStep + 1 === 2 && 'Модули и уроки курса'}
            {/* {formStep + 1 >= 3 && 'Контент уроков'} */}
          </p>
        </div>
        {/* <button style={{width: 50, height: 50, padding: 0, backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", borderRadius: 5, color: "rgb(93, 176, 199)", fontWeight: 500, fontSize: 20}}>S</button> */}

      </div>
      {/* <div style={{width: "100%", boxSizing: "border-box", padding: "0 50px"}}>


      </div> */}
      <form className="addCourse__form" onSubmit={(evt) => {
              evt.preventDefault();
              // console.log(formData);
              const form = new FormData();
              form.append("author", JSON.stringify(loggedInUser));
              form.append("course", JSON.stringify(formData.course));
              form.append("modules", JSON.stringify(formData.modules));
            
              selectedFiles.forEach((file) => {
                form.append("files", file);
              });

              setSuccessfullCourseAddOpened(true); 

              axiosClient.post(`/courses/add`, form, {
                headers: {
                  'Authorization': token,
                },
                onUploadProgress: (evt) => {
                  setUploadProgress(Math.floor(evt.progress * 100));
                }
              })
              .then((data) => {
                if(!data) {
                  return;
                }
                
              })
              // .then
            
              // setSuccessfullCourseAddOpened(true);
              // setIsLoading(true);
              // apiCreateCourse(userToken, form)
              // .then((data) => {
                
                
              //   if(data) {
              //     setIsLoading(false);
              //   }
              // });

            }} style={{width: "100%", height: "100%", boxSizing: "border-box",}}>
              {renderStep()}
              {/* <motion.button type="button" whileHover={{backgroundColor: "rgb(226 100 59 / 100%)"}}  style={{fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(255 255 255 / 100%)", border: "2px solid rgb(226, 100, 59)"}}>Далее</motion.button> */}
      </form>

      {/* <div style={{width: "100%", display: "flex", flexDirection: "column", maxWidth: 1280, margin: "0 auto"}}>
       
       
      </div> */}
      {/* <div className="addCourse__navigation">
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
               
              </li>
            })}

          </ul>
        </div> */}


   
    </section>
  )
}
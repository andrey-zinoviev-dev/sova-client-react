import React from "react";
import "./AddCourse.css";
// import { Stepper, Step, Box, StepLabel } from "@mui/material";
import AddStep1 from "./AddStep1";
// import AddStep2 from "./AddStep2";
// import AddStep3 from "./AddStep3";
// import AddModule from "./AddModule";
import AddStepModule from "./AddStepModule";
// import AddCourseSuccess from "./AddCourseSuccess";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignature, faKeyboard, faListCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { faChartBar } from "@fortawesome/free-regular-svg-icons";
// import { motion } from "framer-motion";
// import { UserContext } from '../context/userContext';
// import { apiCreateCourse } from '../api';
// import CyrillicToTranslit from 'cyrillic-to-translit-js';
// import Dashboard from './Dashboard';
// import axiosClient from '../axios';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

export default function AddCourse() {
  //token
  const token = localStorage.getItem('token');
  //user context
  // const loggedInUser = React.useContext(UserContext);

  //navigate
  const navigate = useNavigate();

  //location
  // const location = useLocation();

  //states
  const [formStep, setFormStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    // author: loggedInUser,
    course: {
      name: "",
      description: "",
      cover: {},
    },
    tarifs: [
      
    ],
    modules: [

    ],
    students: [

    ],
  });
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  // const [uploadProgress, setUploadProgress] = React.useState(0);
  const [successfullCourseAddOpened, setSuccessfullCourseAddOpened] = React.useState(false);
  const [foundSketch, setFoundSketch] = React.useState({
    found: false,
    editFoundSketch: false,
    skip: false,
  });

  // console.log(selectedFiles);

  function renderStep() {
    switch (formStep) {
      case 0:
        return <AddStep1 token={token} saveInputChanges={saveInputChanges} formData={formData} setFormData={setFormData} formStep={formStep} setFormStep={setFormStep} setSelectedFiles={setSelectedFiles}/>
      case 1: 
        return <AddStepModule token={token} saveInputChanges={saveInputChanges} formData={formData} isLoading={isLoading} setFormData={setFormData} setFormStep={setFormStep} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} successfullCourseAddOpened={successfullCourseAddOpened}/>
      default:
        break;
    }
  };

  function openFoundSketch() {
    setFoundSketch((prevValue) => {
      sessionStorage.setItem("skipFoundSketch", JSON.stringify(true))
      return {...prevValue, found: false, editFoundSketch: true, skip: true}
    })
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

  //refs
  // const stepsRef = React.useRef();
  // const prevStepRef = React.useRef();
  // const nextButtonRef = React.useRef();

  // React.useEffect(() => {
  //   const courseData = localStorage.getItem("courseData");
  //   const skipFoundSkecth = sessionStorage.getItem("skipFoundSketch");
  //   const parsedSkipSketch = JSON.parse(skipFoundSkecth);
  //   const parsedCourseData = JSON.parse(courseData);
  //   // console.log(skipFoundSkecth);
  //   if(!parsedSkipSketch) {
  //     // console.log('yes')
  //     const timeout = setTimeout(() => {
  //       if(parsedCourseData) {
  //         setFoundSketch((prevValue) => {
  //           return {...prevValue, found: true}
  //         })
  //       }
  //     }, 500)
      
  //     return () => {
  //       clearTimeout(timeout);
  //     }
  //   } else {
  //     parsedSkipSketch && setFoundSketch((prevValue) => {
  //       return {...prevValue, skip: true};
  //     });
  //   }
  // }, []);

  // React.useEffect(() => {
  //   const courseData = localStorage.getItem("courseData");
  //   const parsedCourseData = JSON.parse(courseData);
  //   const savedFormStep = sessionStorage.getItem("formStep");
  //   const parsedSavedFormStep = JSON.parse(savedFormStep);
  //   // const courseFiles = localStorage.getItem("courseFiles");
  //   // const parsedCourseFiles = JSON.parse(courseFiles);
  //   // console.log(parsedCourseFiles);
  //   foundSketch.skip && parsedCourseData && setFormData(parsedCourseData);
  //   // foundSketch.skip && parsedCourseFiles && setSelectedFiles(parsedCourseFiles);
  //   foundSketch.skip && parsedSavedFormStep && setFormStep(parsedSavedFormStep);
  //   // console.log(foundSketch.skip)
  // }, [foundSketch.skip]);

  // React.useEffect(() => {
  //   console.log(formData)
  // }, [formData]);

  return (
    <section className="addCourse">
      <div className="addCourse__progress-wrapper">
        <div style={{display: "flex"}}>
          <h2 className="addCourse__headline" style={{textAlign: "left", fontWeight: 400, color: "#747374", margin: 0}}><span style={{color: "white"}}>Вернуться к курсам</span>, либо добавить новый</h2>
        </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 25, maxWidth: 410, margin: "20px 0 0 0", boxSizing: "border-box"}}>
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
        {/* <button onClick={leaveAddCourse}>Назад</button> */}
        {foundSketch.found && <div>
          <p>Был найден курс, который вы хотели добавить, вернуться к его редактированию?</p>
          <button onClick={openFoundSketch}>
            Вернуться к редкатированию курса
          </button>
        </div>}
      </div>
      <>
        {renderStep()}
      </>
    </section>
  )
}
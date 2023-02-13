import React from "react";
import "./AddCourse.css";
// import { Stepper, Step, Box, StepLabel } from "@mui/material";
import AddStep1 from "./AddStep1";
import AddStep2 from "./AddStep2";
import AddStep3 from "./AddStep3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faKeyboard, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function AddCourse() {
  //states
  const [formStep, setFormStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    author: {},
    course: {
      name: "",
      description: "",
    },
    module: {
      text: "",
    }
  });

  //functions
  function renderStep() {
    switch (formStep) {
      case 0:
        return <AddStep1 formData={formData} setFormData={setFormData} formStep={formStep} setFormStep={setFormStep}/>
      case 1:
        return <AddStep2 formData={formData} setFormData={setFormData} formStep={formStep} setFormStep={setFormStep}/>
      case 2:
        return <AddStep3 formData={formData} setFormData={setFormData} formStep={formStep} />
      default:
        break;
    }
  }

  //refs
  const stepsRef = React.useRef();
  const prevStepRef = React.useRef();
  // const buttonStepRef = React.useRef();

  //variables
  const stepsArray = [
    {
      description: "Название и описание курса",
      icon: faSignature,
    }, 
    {
      description: "Содержание курса",
      icon: faKeyboard
    }, 
    {
      description: "Проверка курса",
      icon: faListCheck,
    }
  ];

  React.useEffect(() => {
    // console.log(formStep);
    const step = Array.from(stepsRef.current.children)[formStep];
    const prevStep = Array.from(stepsRef.current.children)[prevStepRef.current];

    step.querySelector('.addCourse__navigation-list-element-logo').style.border = '2px solid rgb(226, 100, 59)';
    step.querySelector('.addCourse__navigation-list-element-logo').style.backgroundColor = 'transparent';
    step.querySelector('.addCourse__navigation-list-element-step-connection').style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    step.querySelector('.addCourse__navigation-list-element-logo').style.color = "rgba(255, 255, 255, 1)";

    if(formStep > prevStepRef.current) {
      console.log('next step');
      prevStep.querySelector('.addCourse__navigation-list-element-logo').style.backgroundColor = 'rgb(226, 100, 59)';
      prevStep.querySelector('.addCourse__navigation-list-element-logo').style.border = '2px solid rgb(226, 100, 59)';
      prevStep.querySelector('.addCourse__navigation-list-element-logo').style.color = "rgba(255, 255, 255, 1)";
      prevStep.querySelector('.addCourse__navigation-list-element-step-connection').style.backgroundColor = 'rgb(226, 100, 59)';
    } else if(formStep < prevStepRef.current) {
      console.log('prev step');
      prevStep.querySelector('.addCourse__navigation-list-element-logo').style.border = '2px solid rgba(255, 255, 255, 0.5)';
      prevStep.querySelector('.addCourse__navigation-list-element-logo').style.backgroundColor = 'transparent';
      prevStep.querySelector('.addCourse__navigation-list-element-step-connection').style.backgroundColor = 'rgba(255, 255, 255, 0.5)';

    }
    prevStepRef.current = formStep;
  }, [formStep]);

  return (
    <section className="addCourse">
      {/* <div style={{width: "100%", display: "flex", flexDirection: "column", maxWidth: 1280, margin: "0 auto"}}>
       
       
      </div> */}
      <div className="addCourse__navigation">
      {/* <img src="https://d10j3mvrs1suex.cloudfront.net/u/516665/ebc1a0a065ca47fcaf444f6c2e229a0d39335176/original/flea-47-simon-campbell-supertone-studio.jpg/!!/b%3AW1sicmVzaXplIiwxMDAwXSxbIm1heCJdLFsid2UiXV0%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.jpg"></img> */}
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
                <div className="addCourse__navigation-list-element-step-connection" style={{display: index === stepsArray.length -1 && "none", position: "absolute", top: window.innerWidth < 1439 ? "96%" : "93%", right: window.innerWidth < 1439 ? "9.5%" : "7.5%", width: 4, height: /*"135%"*/ "180%", backgroundColor: "rgba(255, 255, 255, 0.5)"}}></div>
              </li>
            })}

          </ul>
        </div>

          <form className="addCourse__form" onSubmit={(evt) => {
            evt.preventDefault();
            console.log('submit form');
          }} style={{/*width: 'calc(100% - 600px)',*/width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", boxSizing: "border-box", padding: "75px 0" /*padding: "45px 75px"*/}}>
            {renderStep()}
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", boxSizing: "border-box", padding:  "0 75px"}}>
              <motion.button whileHover={{backgroundColor: "rgba(226, 100, 59, 1)", color: "rgb(255, 255, 255)"}} type="button" style={{display: formStep < 1 ? "none": "inline-block", fontWeight: 700, minWidth: 120, minHeight: 50, backgroundColor: "rgba(226, 100, 59, 0)", borderRadius: 15, border: "2px solid rgba(226, 100, 59, 1)", color: "rgba(226, 100, 59, 1)"}} onClick={() =>{
                formStep > 0 &&
                setFormStep((prevStep) => {
                  return prevStep - 1;
                });
              }}>Назад</motion.button>
              <motion.button whileHover={{backgroundColor: "rgba(226, 100, 59, 1)", color: "rgb(255, 255, 255)"}} type="button" onClick={() =>{
                // console.log(formData);
                formStep < 2 && 
                setFormStep((prevStep) => {
                  return prevStep + 1;
                });
              }}  style={{fontWeight: 700, minWidth: 120, minHeight: 50, backgroundColor: "rgba(226, 100, 59, 0)", borderRadius: 15, border: "2px solid rgb(226, 100, 59)", color: "rgb(226, 100, 59)"}}>Вперед</motion.button>
            </div>
            
          </form>
      {/* <div></div> */}
    </section>
  )
}
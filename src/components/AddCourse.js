import React from "react";
import "./AddCourse.css";
import AddStep1 from "./AddStep1";
import AddStep2 from "./AddStep2";
import AddStep3 from "./AddStep3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faKeyboard, faListCheck } from "@fortawesome/free-solid-svg-icons";

export default function AddCourse() {
  const [formStep, setFormStep] = React.useState(0);

  //functions
  function renderStep() {
    switch (formStep) {
      case 0:
        return <AddStep1 formStep={formStep} setFormStep={setFormStep}/>
      case 1:
        return <AddStep2 formStep={formStep} setFormStep={setFormStep}/>
      case 2:
        return <AddStep3 />
      default:
        break;
    }
  }

  //refs
  const stepsRef = React.useRef();
  const prevStepRef = React.useRef(0);

  React.useEffect(() => {
    stepsRef.current.children[prevStepRef.current].querySelector("div").style.color = "rgba(255, 255, 255, 0.5)";
    prevStepRef.current = formStep;
    stepsRef.current.children[formStep].querySelector("div").style.color = "rgba(255, 255, 255, 1)";
    //  console.log(prevStepRef.current);
    // if(prevStepRef.current >= 0) {
    //   Array.from(stepsRef.current.children)[prevStepRef.current].sstyle.color = "rgba(255, 255, 255, 0.5)";
    // }
    // prevStepRef.current = formStep;
    // Array.from(stepsRef.current.children)[formStep].style.color = "rgba(255, 255, 255, 1)";
    // prevStepRef.current = formStep;
    // console.log(prevStepRef.current);
    
    // Array.from(stepsRef.current.children)[formStep].style.backgroundColor = "red";

  }, [formStep]);

  return (
    <section className="addCourse">
      {/* <div style={{width: "100%", display: "flex", flexDirection: "column", maxWidth: 1280, margin: "0 auto"}}>
       
       
      </div> */}
      <div className="addCourse__navigation">
      {/* <img src="https://d10j3mvrs1suex.cloudfront.net/u/516665/ebc1a0a065ca47fcaf444f6c2e229a0d39335176/original/flea-47-simon-campbell-supertone-studio.jpg/!!/b%3AW1sicmVzaXplIiwxMDAwXSxbIm1heCJdLFsid2UiXV0%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.jpg"></img> */}
          <div className="addCourse__headline-wrapper">
            <h3 style={{margin: "0 0 10px 0"}}>Добавить новый курс</h3>
            <p style={{margin: 0}}>Через эту форму можно добавить новый курс</p>
          </div>
          <ul ref={stepsRef} style={{padding: 0, listStyle: "none", minWidth: 260, minHeight: 360, display: "flex", flexDirection: "column", justifyContent: "space-between", margin: 0, width: "100%"}}>
              <li style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", maxWidth: 200, minHeight: 65, boxSizing: "border-box", padding: "5px 0", color:"rgba(255, 255, 255, 0.5)"}}>
                  <span>Этап 1</span>
                  <p style={{margin: 0, textAlign: "left"}}>Название и описание курса</p>
                </div>
                <div style={{width: 55, height: 55, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "51%", backgroundColor: "transparent", border: "2px solid rgba(255, 255, 255, 0.5)", color:"rgba(255, 255, 255, 0.5)", position: "relative"}}>
                  <FontAwesomeIcon icon={faSignature} />
                  <div></div>
                </div>
              </li>
              <li style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", maxWidth: 200, minHeight: 65, boxSizing: "border-box", padding: "5px 0", color:"rgba(255, 255, 255, 0.5)"}}>
                  <span>Этап 2</span>
                  <p style={{margin: 0, textAlign: "left"}}>Содержание курса</p>
                </div>
                
                <div style={{width: 55, height: 55, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "51%", backgroundColor: "transparent", border: "2px solid rgba(255, 255, 255, 0.5)", color:"rgba(255, 255, 255, 0.5)"}}>
                  <FontAwesomeIcon icon={faKeyboard} />
                </div>
              </li>
              <li style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", maxWidth: 200, minHeight: 65, boxSizing: "border-box", padding: "5px 0", color:"rgba(255, 255, 255, 0.5)"}}>
                  <span>Этап 3</span>
                  <p style={{margin: 0, textAlign: "left"}}>Проверка курса</p>
                </div>
                
                <div style={{width: 55, height: 55, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "51%", backgroundColor: "transparent", border: "2px solid rgba(255, 255, 255, 0.5)", color:"rgba(255, 255, 255, 0.5)"}}>
                  <FontAwesomeIcon icon={faListCheck} />
                </div>
              </li>
          </ul>
        </div>
        

          {/* <div style={{display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-start", boxSizing: "border-box", padding: "35px 0", borderTop: "2px solid white"}}> */}
          {/* <img src="" alt="обложка курса"></img> */}


          {/* <form onSubmit={(evt) => {
            evt.preventDefault();
            setFormStep((prevValue) => {
              return prevValue + 1;
            })
          }} className="addCourse__form">

            <div className="addCourse__form-div">
              <label  htmlFor="course-name">Название курса</label>
              <input className="addCourse__form_input" id="course-name"></input>
            </div>

            <div className="addCourse__form-div">
              <label id="course-description">Описание курса</label>
              <input className="addCourse__form_input" id="course-description"></input>
            </div>
              
            <button>Добавить</button>
          </form> */}
        {/* </div> */}

          <form className="addCourse__form" onSubmit={(evt) => {
            evt.preventDefault();
            console.log('submit form');
          }} style={{/*width: 'calc(100% - 600px)',*/width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", boxSizing: "border-box", padding: "0 0 0 180px"}}>
            {renderStep()}
            <div>
              <button type="button" style={{display: formStep < 1 ? "none": "inline-block",fontWeight: 700, minWidth: 120, minHeight: 50, backgroundColor: "rgb(226, 100, 59)", borderRadius: 15,}} onClick={() =>{
                formStep > 0 &&
                setFormStep((prevStep) => {
                  return prevStep - 1;
                });
              }}>Назад</button>
              <button type="button" onClick={() =>{
                formStep < 1 && 
                setFormStep((prevStep) => {
                  return prevStep + 1;
                });
              }} style={{fontWeight: 700, minWidth: 120, minHeight: 50, backgroundColor: "rgb(226, 100, 59)", borderRadius: 15, }}>Вперед</button>
            </div>
            
          </form>
      <div></div>
    </section>
  )
}
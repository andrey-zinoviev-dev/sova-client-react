import React from "react";
import "./AddCourse.css";
import AddStep1 from "./AddStep1";
import AddStep2 from "./AddStep2";
import AddStep3 from "./AddStep3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";

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

  React.useEffect(() => {
    console.log(formStep);
  }, [formStep]);

  return (
    <section className="addCourse">
      <h3>Добавить новый курс</h3>
      <div>
        {/* <img src="" alt="обложка курса"></img> */}
        <div>
          <ul>
            <li style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", maxWidth: 200}}>
                <span>Этап 1</span>
                <p style={{margin: 0, textAlign: "left"}}>Создадим название и описание курса</p>
              </div>
              
              <div style={{width: 45, height: 45, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "51%", backgroundColor: "#363838", border: "2px solid #e2643b"}}>
                <FontAwesomeIcon icon={faSignature} />
              </div>
              
            </li>
            <li>Этап 2</li>
            <li>Этап 3</li>
          </ul>
        </div>
        <form onSubmit={(evt) => {
          evt.preventDefault();
          console.log('submit form');
        }}>
          {renderStep()}
          <button type="button" onClick={() =>{
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
          }}>Вперед</button>
        </form>

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
      </div>

    </section>
  )
}
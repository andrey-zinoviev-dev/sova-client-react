import React from "react";
import "./SendEmail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faC, faCheck, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { apiSendEmailToStudents } from "../api";

export default function SendEmail({selectedCourse, setSelectedCourseId, setEmailCourse, token}) {
  // const { state } = useLocation();
  // const naviagte = useNavigate();
  const [selectedTarifs, setSelectedTarifs] = React.useState([]);
  const [successfullNotification, setSuccessfullNotification] = React.useState(false);

  //refs
  const emailRef = React.useRef();

  return (
    <section className="email">
        <div className="email__wrapper">
          <button className="email__wrapper-close" onClick={() => {
            setSelectedCourseId(null);
            setEmailCourse(false);
          }}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {successfullNotification ? <div>
            <div>
              <FontAwesomeIcon icon={faCheck} />  
            </div>
            <h3>Уведомление успешно отправлено</h3>
          </div>
          :
          <>
            <h2>Отправить сообщение ученикам</h2>
            <p>Тарифы</p>
            <ul className="email__ul">
              {selectedCourse.tarifs.map((tarif) => {
                return <li className="email__ul-li" key={tarif.name}>
                  <button className="email__ul-li-button" onClick={(evt) => {
                    evt.currentTarget.classList.toggle("tarif-active");
                    setSelectedTarifs((prevValue) => {
                        // console.log(prevValue);
                        // console.log(tarif.name);
                      return prevValue.includes(tarif.name) ? prevValue.filter((prevTarif) => {
                        return prevTarif !== tarif.name;
                      }) : [...prevValue, tarif.name]
                    })
                  }}>
                    <p>{tarif.name}</p>
                    {selectedTarifs.find((prevTarif) => {
                      return prevTarif.name === tarif.name;
                    }) && <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>}
                  </button>
                </li>
              })}
            </ul>
            <form className="email__form" onSubmit={(evt) => {
              evt.preventDefault();
              // console.log(selectedTarifs);
              // console.log(selectedCourse.students);
              const studentsToNotify = selectedCourse.students.filter((courseStudent) => {
                const courseTarif = courseStudent.courses.find((course) => {
                  return course.id === selectedCourse._id;
                }).tarif;
                
                return selectedTarifs.includes(courseTarif);
              });

              apiSendEmailToStudents(token, selectedCourse._id, {message: emailRef.current.value, users: studentsToNotify, courseName: selectedCourse.name})
              .then((data) => {
                setSuccessfullNotification(true);
              })

              // console.log(studentsToNotify);
              // console.log(selectedCourse.students);
              // apiSendEmailToStudents(token, selectedCourse._id, {message: emailRef.current.value, tarifs: selectedTarifs})
            }}>
              <input ref={emailRef} name="message" placeholder="Сообщение для учеников..."></input>
              <button disabled={selectedTarifs.length === 0 ? true : false}>
                <span>Отправить</span>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </>
          }

        </div>
    </section>
  )
}
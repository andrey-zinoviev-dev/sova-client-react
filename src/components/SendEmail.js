import React from "react";
import "./SendEmail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { apiSendEmailToStudents } from "../api";

export default function SendEmail({selectedCourse, setSelectedCourseId, token}) {
  // const { state } = useLocation();
  // const naviagte = useNavigate();
  const [selectedTarifs, setSelectedTarifs] = React.useState([]);

  //refs
  const emailRef = React.useRef();

  return (
    <section className="email">
        <div className="email__wrapper">
          <button className="email__wrapper-close" onClick={() => {
            setSelectedCourseId(null);
          }}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2>Отправить сообщение ученикам</h2>
          <p>Тарифы</p>
          <ul className="email__ul">
              {selectedCourse.tarifs.map((tarif) => {
                return <li className="email__ul-li" key={tarif.name}>
                  <button className="email__ul-li-button" onClick={(evt) => {
                    evt.currentTarget.classList.toggle("tarif-active");

                    setSelectedTarifs((prevValue) => {
                      return prevValue.find((prevTarif) => {
                        return prevTarif.name === tarif.name;
                      }) ? prevValue.filter((prevTarif) => {
                        return prevTarif.name !== tarif.name
                      }) : [...prevValue, tarif]
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
            apiSendEmailToStudents(token, selectedCourse._id, {message: emailRef.current.value, tarifs: selectedTarifs})
          }}>
            <input ref={emailRef} name="message" placeholder="Сообщение для учеников..."></input>
            <button disabled={selectedTarifs.length === 0 ? true : false}>
              <span>Отправить</span>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
    </section>
  )
}
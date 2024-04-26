import React from "react";
import { useLocation } from "react-router-dom"
import "./SendEmail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SendEmail() {
  const { state } = useLocation();

  const [selectedTarifs, setSelectedTarifs] = React.useState([]);

  return (
    <section className="email">
      <div className="container">
        <div className="email__back-wrapper">
          <button>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <p>Назад к курсам</p>
        </div>
        <h3>Рассылка</h3>
        <div>
          <p>Тарифы</p>
          <ul>
            {state.tarifs.map((tarif) => {
              return <li key={tarif.name}>
                <button onClick={() => {
                  setSelectedTarifs((prevValue) => {
                    return prevValue.includes(tarif.name) ? prevValue.filter((prevTarif) => {
                      return prevTarif.name !== tarif.name
                    }) : [...prevValue, tarif]
                    // return [...prevValue]
                  })
                }}>{tarif.name}</button>
              </li>
            })}
          </ul>
        </div>
        <form onSubmit={(evt) => {
          evt.preventDefault();
          console.log(selectedTarifs);
        }}>
          <input></input>
          <button>Отправить</button>
        </form>
      </div>
    </section>
  )
}
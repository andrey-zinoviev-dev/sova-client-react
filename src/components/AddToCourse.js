import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function AddToCourse() {
    const {state} = useLocation();
    // const [dataToInsert, setDataToInsert] = 
    return (
        <section className="add-to-course">
            <div>
                <h3>Добавить к курсу {state.name}</h3>
                <form>
                    <input name="name"></input>
                    <img src=""></img>
                    <input type="file"></input>
                    {/* <input name=""></input> */}
                </form>
                <ul>
                    <li key="add-new-lesson">
                    <button>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    </li>
                </ul>
                {/* <TipTapEditor></TipTapEditor> */}
            </div>
        </section>
    )
}
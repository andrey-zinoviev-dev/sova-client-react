import React from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Course() {
  const loggedInUser = React.useContext(UserContext);

  return(
    <section>
      <div>
        
      </div>
      <h3>Курс "название курса"</h3>

    </section>
    

  )
}
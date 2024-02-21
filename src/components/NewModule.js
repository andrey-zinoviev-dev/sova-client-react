import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
export default function NewModule({module, index, lessonsLength, openModule, openEditModule, deleteModule}) {
  //navigate
  // const navigate = useNavigate();
  // const [moduleOpened, setModuleOpened] = React.useState(false);

  // React.useEffect(() => {
  //   console.log(moduleOpened);
  // }, [moduleOpened]);

  // function openLessonModal(index) {
  //   // navigate("./addLessons", {
  //   //   state: module,
  //   // })
  //   openModule(index);
  // }

  return (
    <>
      <h3 style={{margin: 0, width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", lineHeight: 1}}>{module.name}</h3>
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around"}}>
        <button style={{backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", color: "rgb(93, 176, 199)", borderRadius: "50%", aspectRatio: "1/1"}} onClick={(() => {
          openEditModule(index);
        })}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button style={{backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", color: "rgb(93, 176, 199)", borderRadius: "50%", aspectRatio: "1/1", fontSize: 18}} onClick={(() => {
          deleteModule(index);
          // openEditModule(index);
        })}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <img style={{borderRadius: 9, aspectRatio: "1 / 1", objectFit: "cover"}} src={module.cover.clientPath} alt={module.name}></img>
      <p style={{margin: 0, width: "100%"}}>{module.lessons.length > 0 ? `Уроки: ${module.lessons.length}` : "Уроков в модуле нет"}</p>
      <button style={{padding: "10px 15px", backgroundColor: "transparent", border: "2px solid rgb(93, 176, 199)", borderRadius: 7, color: "rgb(255, 255, 255)", fontSize: 16}} type="button" onClick={() => {
        openModule(index);
      }}>Добавить урок</button>
    </>
  )
}
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
      <div>
        <button onClick={(() => {
          openEditModule(index);
        })}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button onClick={(() => {
          deleteModule(index);
          // openEditModule(index);
        })}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <img style={{borderRadius: 9, aspectRatio: "1 / 1", objectFit: "cover"}} src={module.cover} alt={module.name}></img>
      <p style={{margin: 0, width: "100%"}}>{module.lessons.length > 0 ? `Уроки: ${module.lessons.length}` : "Уроков в модуле нет"}</p>
      <button type="button" onClick={() => {
        openModule(index);
      }}>Добавить урок</button>
    </>
  )
}
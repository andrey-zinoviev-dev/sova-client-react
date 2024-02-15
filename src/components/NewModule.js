import React from "react";
// import { useNavigate } from "react-router-dom";
export default function NewModule({module, index, lessonsLength, openModule}) {
  //navigate
  // const navigate = useNavigate();
  // const [moduleOpened, setModuleOpened] = React.useState(false);

  // React.useEffect(() => {
  //   console.log(moduleOpened);
  // }, [moduleOpened]);

  function openLessonModal(index) {
    // navigate("./addLessons", {
    //   state: module,
    // })
    openModule(index);
  }

  return (
    <>
      <h3 style={{margin: 0, width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", lineHeight: 1}}>{module.name}</h3>
      <img style={{borderRadius: 9, aspectRatio: "1 / 1", objectFit: "cover"}} src={module.cover} alt={module.name}></img>
      <p style={{margin: 0, width: "100%"}}>{lessonsLength > 0 ? `Уроки ${lessonsLength}` : "Уроков в модуле нет"}</p>
      <button type="button" onClick={() => {
        openLessonModal(index);
      }}>Добавить урок</button>
    </>
  )
}
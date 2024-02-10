import React from "react";

export default function NewModule({module, lessonsLength, openModule}) {
  // const [moduleOpened, setModuleOpened] = React.useState(false);

  // React.useEffect(() => {
  //   console.log(moduleOpened);
  // }, [moduleOpened]);

  function openLessonModal() {
    openModule(module.name);
  }

  return (
    <>
      <h3 style={{margin: 0, width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{module.name}</h3>
      <img style={{borderRadius: 9, aspectRatio: "1 / 1", objectFit: "cover"}} src={module.cover} alt={module.name}></img>
      <p style={{margin: 0, width: "100%"}}>{lessonsLength > 0 ? `Уроки ${lessonsLength}` : "Уроков в модуле нет"}</p>
      <button type="button" onClick={() => {
        openLessonModal(module);
      }}>Добавить урок</button>
    </>
  )
}
import React from "react";

export default function EditCourse({ selectedCourse }) {
  // React.useEffect(() => {
  //   console.log(selectedCourse);
  // }, [selectedCourse]);

  //states
  const [courseCover, setCourseCover] = React.useState("");

  return (
    <section style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgb(0 0 0/ 50%)", color: "white", zIndex: 10, display: "flex", justifyContent: "center", alignItems: "flex-start", boxSizing: "border-box", padding: "2% 0"}}>
      <div>
        <h2>Редактировать курс</h2>
        <form style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", textAlign: "left", minHeight: 500}}>
          <div>
            <label htmlFor="course-name">Название</label>
            <input id="course-name" value={selectedCourse.name}></input>
          </div>
          <div>
            <label htmlFor="course-desc">Описание</label>
            <input id="course-desc" value={selectedCourse.description}></input>
          </div>
          <div style={{textAlign: "left"}}>
            <span style={{display: "block"}}>Текущая обложка курса</span>
            <img style={{maxWidth: 500, borderRadius: 9, border: "2px solid white"}} src={courseCover.length > 0 ? courseCover : selectedCourse.cover}></img>
          </div>
        </form>
      </div>
    </section>
  )
};

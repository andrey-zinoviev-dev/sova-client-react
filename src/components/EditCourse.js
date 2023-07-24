import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function EditCourse({ children }) {
  // React.useEffect(() => {
  //   console.log(selectedCourse);
  // }, [selectedCourse]);

  //states
  // const [courseCover, setCourseCover] = React.useState("");

  // //refs
  // const courseNameRef = React.useRef();
  // const courseDescRef = React.useRef();
  // const courseCoverRef = React.useRef();

  // //functions
  // function handleCoverEdit() {
  //   const relativePath = window.URL.createObjectURL(courseCoverRef.current.files[0]);
  //   setCourseCover(relativePath);
  //   // setCourseCover(courseCoverRef.current.files[0]);
  // };

  // // React.useEffect(() => {

  // // }, [courseCover])

  // React.useEffect(() => {
  //   console.log(children);
  // }, [])
  return (
    <section className="course-edit" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgb(0 0 0/ 70%)", color: "white", zIndex: 10, display: "flex", justifyContent: "center", alignItems: "flex-start", boxSizing: "border-box", padding: "2% 0", fontSize: 20, overflow: "auto"}}>
      {/* <div style={{textAlign: "left", position: "relative"}}>
        <button onClick={setIsEditCourse(false)} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 style={{fontSize: 36}}>Редактировать курс</h2>
        <form style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", textAlign: "left", minHeight: 500}}>
          <div style={{margin: '0 0 30px 0'}}>
            <label style={{display: "block", margin: "0 0 25px 0"}} htmlFor="course-name">Название</label>
            <input ref={courseNameRef} style={{width: "100%", boxSizing: "border-box", borderRadius: 12, padding: "10px 20px", border: "none", fontSize: 16}} id="course-name" value={selectedCourse.name} onChange={() => {}}></input>
          </div>
          <div>
            <label style={{display: "block", margin: "0 0 25px 0"}} htmlFor="course-desc">Описание</label>
            
            <textarea ref={courseDescRef} style={{width: "100%", height: 350, boxSizing: "border-box", padding: "10px 20px", borderRadius: 12, fontSize: 16}} value={selectedCourse.description} onChange={(evt) => {
              console.log(evt.target.value);
            }}></textarea>
          </div>
          <div style={{textAlign: "left", margin: "30px 0 0 0"}}>
            <span style={{display: "block"}}>Текущая обложка курса</span>
            <img style={{height: 250, objectFit: "cover", width: 500, boxSizing: "border-box", borderRadius: 9, border: "2px solid white", margin: "30px 0"}} src={courseCover.length > 0 ? courseCover : selectedCourse.cover} alt="Обложка курса"></img>
            <button type="button" style={{display: "block", boxSizing: "border-box", padding: "10px 20px", border: "2px solid white", color: "white", borderRadius: 12, backgroundColor: "transparent", fontSize: 18}}>
              <label style={{cursor: "pointer"}} htmlFor="course-cover">Изменить обложку</label>
            </button>
            <input ref={courseCoverRef} onChange={handleCoverEdit} id="course-cover" type="file" style={{display: "none"}}></input> 
          </div>
        </form>
      </div> */}
      {children}
    </section>
  )
};

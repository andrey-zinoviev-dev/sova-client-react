import React from "react";
import './EditCourse.css';
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// import './EditCourse.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function EditCourse() {
  //location
  const location = useLocation();
  const { state } = location;

  //refs
  const courseNameRef = React.useRef();
  const courseDescRef = React.useRef();
  const courseCoverRef = React.useRef();

  //states
  const [courseData, setCourseData] = React.useState({});
  // const [courseCover, setCourseCover] = React.useState("");

  // //refs
  // const courseNameRef = React.useRef();
  // const courseDescRef = React.useRef();
  // const courseCoverRef = React.useRef();

  // //functions
  function handleCoverEdit() {
    console.log('yes');
  //   const relativePath = window.URL.createObjectURL(courseCoverRef.current.files[0]);
  //   setCourseCover(relativePath);
  //   // setCourseCover(courseCoverRef.current.files[0]);
  };

  React.useState(() => {
    setCourseData(state);
  }, [])

  React.useEffect(() => {
    console.log(courseData);
  }, [courseData])

  // React.useEffect(() => {
  //   console.log(state)
  // }, []);

  return (
    <section className="course-edit">
      <div>
        <h3>Редактировать курс</h3>
        <form className="course-edit__form" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", textAlign: "left", margin: '0 0 30px 0'}}>
            <label style={{display: "block", margin: "0 0 10px 0"}} htmlFor="course-name">Название</label>
            <input className="course-edit__form-input" ref={courseNameRef} id="course-name" value={courseData.name} onChange={(evt) => {
              setCourseData((prevValue) => {
                return {...prevValue, name: evt.target.value};
              });
            }}></input>
        </form>
        <form className="course-edit__form" style={{display: "flex", maxWidth: "100%", justifyContent: "space-between", alignItems: "stretch", gap: 50}}>
            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
              <label style={{display: "block", margin: "0 0 20px 0"}} htmlFor="course-desc">Описание</label> 
              <textarea className="course-edit__form-textarea" ref={courseDescRef} value={courseData.description} onChange={(evt) => {
                setCourseData((prevValue) => {
                  return {...prevValue, description: evt.target.value};
                });
              }}></textarea>
            </div>
            <div style={{textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", width: "100%"}}>
              <span style={{display: "block", margin: "0 0 20px 0"}}>Текущая обложка курса</span>
              <div style={{position: "relative", display: "flex"}}>
                <img style={{objectFit: "cover", width: "100%", aspectRatio: "16/10", height: "100%", boxSizing: "border-box", borderRadius: 9, border: "2px solid white"}} src="" alt="Обложка курса"></img>
                <motion.button whileHover={{opacity: 1}} type="button" onClick={(() => {
                  courseCoverRef.current.click();
                })} style={{position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", fontSize: 20, bottom: 0, right: 0, opacity: 0, width: "100%", height: "100%", padding: 0, border: "none", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <p>Изменить обложку</p>
                  
                </motion.button>
                <input ref={courseCoverRef} onChange={handleCoverEdit} id="course-cover" type="file" style={{display: "none"}}></input> 
              </div>

            </div>
          </form>
      </div>
    </section>
  )
};

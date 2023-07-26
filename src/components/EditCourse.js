import React from "react";
import './Courses.css';
// import './EditCourse.css';
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
    <section className="course-edit">
      {children}
    </section>
  )
};

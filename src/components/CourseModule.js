import React from "react";
import { useParams } from "react-router-dom";
import { apiGetCourse } from "../api";

export default function CourseModule(props) {
  const {courseID, moduleID} = useParams();
  const [courseData, setCourseData] = React.useState({});

  //useEffect
  React.useEffect(() => {
    const userToken = localStorage.getItem('token');
    if(userToken) {
      apiGetCourse(courseID, userToken)
      .then((course) => {
        const newCourseData = Object.assign({}, course);
        setCourseData(newCourseData);
      })
    }

  }, [courseData._id]);

  
  
  return (
    <section>
      <h3>Курс {courseData.name}</h3>
      
      {/* <p>Модуль {props.courseModule.name}</p>
      <p>{props.courseModule.description}</p> */}
    </section>
  )
}
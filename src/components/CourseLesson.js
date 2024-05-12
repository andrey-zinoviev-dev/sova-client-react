import React from "react";
import { useParams } from "react-router-dom";
import { apiGetLesson } from "../api";
import { UserContext } from "../context/userContext";
import "./CourseLesson.css";
import LessonMenu from "./LessonMenu";
import LessonContent from "./LessonContent";

export default function CourseLesson({ socket }) {
  const {courseID, moduleID, lessonID} = useParams();

  const token = localStorage.getItem("token");
  
  const loggedInUser = React.useContext(UserContext);
  // console.log(loggedInUser);
  //states
  const [lesson, setLesson] = React.useState(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    // console.log(abortControllerRef.current);
    const signal = abortController.signal;

    apiGetLesson(courseID, moduleID, lessonID, token, {signal: signal})
    .then((data) => {
      // console.log(data.students);
      setLesson({...data, students: data.students.filter((student) => {
        return student._id !== loggedInUser._id;
      }).map((student) => {
        return {...student, notif: 0};
      })});
      // console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    return () => {
      abortController.abort();
    }
  }, [lessonID]);

  return (
    lesson && <section className="main__lesson">
      <LessonMenu courseID={courseID} lesson={lesson.lesson} module={lesson.module}/>
      <LessonContent socket={socket} courseID={courseID} setLesson={setLesson} students={lesson.students} author={lesson.author} lesson={lesson.lesson} module={lesson.module} />
    </section>
  )
};
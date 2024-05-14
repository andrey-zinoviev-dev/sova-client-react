import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

import { apiDeleteCourse } from "../api";

import "./DeleteCourse.css";
export default function DeleteCourse({ course, setSelectedCourseId, setDeleteCourse, setCoursesData }) {
  const token = localStorage.getItem("token");

  return (
    <section className="email">
      <div className="email__wrapper">
        <button className="email__wrapper-close" onClick={() => {
          setSelectedCourseId(null);
          setDeleteCourse(false);
        }}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Удаление курса</h2>
        <p>Вы действительно хотите удалить курс {course.name}?</p>
        <div className="delete-course__buttons">
          <button onClick={() => {
            apiDeleteCourse(token, course._id)
            .then(({ courseId }) => {
              setCoursesData((prevValue) => {
                return {...prevValue, courses: prevValue.courses.filter((prevCourse) => {
                  return prevCourse._id !== courseId;
                })}
              });
              setSelectedCourseId(null);
              setDeleteCourse(false);
            })
          }}>
            Удалить
          </button>
          <button onClick={() => {
              setSelectedCourseId(null);
              setDeleteCourse(false);
          }}>Отменить</button>
        </div>
      </div>
    </section>
  )
}
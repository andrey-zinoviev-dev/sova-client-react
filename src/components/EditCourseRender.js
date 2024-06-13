import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function EditCourseRender({setRenderCourse, setSelectedCourseId, course}) {
  return (
    <section className="email">
      <div className="email__wrapper">
        <button className="email__wrapper-close" onClick={() => {
            setSelectedCourseId(null);
            setRenderCourse(false);
            // setSelectedCourseId(null);
            // setDeleteCourse(false);
          }}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2>Изменение статуса курса</h2>
          <p>Вы действительно хотите открыть доступ к курсу {course.name}?</p>
          <div className="delete-course__buttons">
            <button onClick={() => {
              console.log("send request to api here");
              // apiDeleteCourse(token, course._id)
              // .then(({ courseId }) => {
              //   setCoursesData((prevValue) => {
              //     return {...prevValue, courses: prevValue.courses.filter((prevCourse) => {
              //       return prevCourse._id !== courseId;
              //     })}
              //   });
              //   setSelectedCourseId(null);
              //   setDeleteCourse(false);
              // })
            }}>
              Открыть
            </button>
            <button onClick={() => {
              setSelectedCourseId(null);
              setRenderCourse(false);
            }}>Отменить</button>
          </div>
      </div>
    </section>
  )
};
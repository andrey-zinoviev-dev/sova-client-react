import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { apiShowHideCourse } from "../api";

// export default function EditCourseRender({setCoursesData, setRenderCourse, setSelectedCourseId, course}) {
export default function EditCourseRender({ closeWindow, buttonFunction, children, setRenderCourse, setCoursesData, setSelectedCourseId, hidden, available})  {

  const token = localStorage.getItem("token");

  return (
    <section className="email">
      <div className="email__wrapper">
        <button className="email__wrapper-close" onClick={() => {
            closeWindow();
            // setSelectedCourseId(null);
            // setRenderCourse(false);
          }}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {children}
          <div className="delete-course__buttons">
            <button onClick={() => {
              buttonFunction();

            }}>
              {/* Открыт÷ь */}
              {hidden ||  !available ? "Открыть" : "Скрыть"}
            </button>
            <button onClick={() => {
              closeWindow();
              // setSelectedCourseId(null);
              // setRenderCourse(false);
            }}>Отменить</button>
          </div>
      </div>
    </section>
  )
};
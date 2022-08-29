import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {  
  apiGetCourses
} from '../api';

export default function Courses(props) {
  //variables
  const naviagte = useNavigate();
  //functions
  // function openCourse(id) {
  //   naviagte(`/courses/${id}`);
  // }
  function showSelectedModule(module) {
    props.selectModule(module);
  }

  return (
    <section>
      <h2>Эй, ты, <p className="headline">{props.user && props.user.name}</p>, это твоя панель... управления</h2>
      
      <p>Здесь можно открыть курс, пройти задания, не пройти задания (шучу), посмотреть свой профиль и так далее</p>
      <ul>
        {props.courses.length > 0 && props.courses.map((course) => {
          return <li key={course._id}>
            <h3>{course.name}</h3>
            <p>`Курс из {course.length} этапов`</p>
            <p>Модули:</p>
            <ul>
              {course.modules.map((courseModule) => {
                return <li key={courseModule._id}>
                  <Link onClick={() => {
                    // showSelectedModule(courseModule);
                  }} to={`/courses/${course._id}/modules/${courseModule._id}`}>{courseModule.name}</Link>
                </li>
              })}
            </ul>
          </li>
        })}
      </ul>
    </section>

  )
}
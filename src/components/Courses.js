import React from "react";

export default function Courses(props) {
  return (
    <section>
      <h2>Эй, ты, <p className="headline">{props.user && props.user.name}</p>, это твоя панель... управления</h2>
      <h3>Курсы</h3>
      <p>Здесь можно открыть курс, пройти задания, не пройти задания (шучу), посмотреть свой профиль и так далее</p>
    </section>

  )
}
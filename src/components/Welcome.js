import React from 'react';
// import Main from './Main';
// import Login from './Login';
// import Register from './Register';

import './Welcome.css';

export default function Welcome({ loggedIn, switchToLoggedIn }) {
  console.log(loggedIn);
  return (
    <section className='welcome'>
      <div>
        <h1>Здраааааааасте, тут можно стать вокальным экспертом</h1>
          <p>Проходи курсы по вокалу от Саши Совы здесь, становись экспертом здесь, у себя, везде. А потом тренируй остальных, ибо ты уже эксперт(ка)</p>
          <div>
            <button className="welcome__button header__button_login" onClick={switchToLoggedIn} >Войти</button>
            <button className="welcome__button header__button_register" >Зарегистрироваться</button>
          </div>
      </div>
    </section>
  )
}
import './App.css';
import React, {useState} from 'react';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  //state variables
  const [loginPopupOpened, setloginPopupOpened] = useState(false);
  const [registerPopupOpened, setregisterPopupOpened] = useState(false);
  
  //functions
  function openLoginPopup() {
    setloginPopupOpened(true);
  };

  function openRegisterPopup() {
    setregisterPopupOpened(true);
  };

  function closePopups() {
    setloginPopupOpened(false);
    setregisterPopupOpened(false);
  };

  function navigationFormSubmit(evt, formData) {
    evt.preventDefault();
    console.log(formData);
  };

  return (
    <div className="App">

      {/* <header className="App-header"> */}

      {/* </header> */}
      <Main openLoginPopup={openLoginPopup} openRegisterPopup={openRegisterPopup}></Main>
      <Login formSubmit={navigationFormSubmit} isOpened={loginPopupOpened} closePopup={closePopups}></Login>
      <Register formSubmit={navigationFormSubmit} isOpened={registerPopupOpened} closePopup={closePopups}></Register>
    </div>
  );
}

export default App;

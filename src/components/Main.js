import React from "react";
import Welcome from './Welcome';
import Navigation from './Navigation';

export default function Main(props) {
  return (
    <main>
      <Navigation openLoginPopup={props.openLoginPopup} openRegisterPopup={props.openRegisterPopup}></Navigation>
      <Welcome></Welcome>
    </main>
  )
}
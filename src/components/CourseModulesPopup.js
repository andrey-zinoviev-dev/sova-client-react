import React from "react";
import './CourseModulePopup.css';
export default function CourseModulesPopup ({modulesPopupOpened, children}) {
  return (
    <section className={`${modulesPopupOpened ? 'popup popup_opened' : 'popup'}`} style={{justifyContent: 'center', zIndex: 10}}>
      {children}
    </section>
  )
}
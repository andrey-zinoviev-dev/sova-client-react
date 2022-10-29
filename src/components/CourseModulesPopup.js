import React from "react";

export default function CourseModulesPopup ({modulesPopupOpened, children}) {
  return (
    <section className={`${modulesPopupOpened ? 'popup popup_opened' : 'popup'}`}>
      {children}
    </section>
  )
}
import React from "react";
import './AddModulePopup.css';

export default function AddModulePopup ({ children }) {
  return (
    <section className="course__edit-addModule">
      {children}
    </section>
  )
};
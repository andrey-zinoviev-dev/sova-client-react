import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
export default function TipTapButtons ({ editor }) {
  //states
  const [imageSrc, setImageSrc] = React.useState("");

  React.useEffect(() => {}, [imageSrc]);

  return (
    <ul className="addCourse__form-stepwrapper-menu-list" style={{padding: 0, margin: "0 0 20px 0", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 9}}>
      <li className="addCourse__form-stepwrapper-menu-list-element">
        <button style={{fontWeight: 700}} className={editor.isActive('bold') ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'}  type="button" onClick={() => {
          return editor.chain().focus().toggleBold().run()
        }}>B</button>
      </li>
      <li>
        <button style={{fontStyle: "italic"}} className={editor.isActive('italic') ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleItalic().run()
        }}>I</button>
      </li>
      <li>
        <button className={editor.isActive('paragraph') ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().setParagraph().run();
        }}>Параграф</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 1 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 1}).run();
        }}>H1</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 2 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 2}).run();
        }}>H2</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 3 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 3}).run();
        }}>H3</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 4 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 4}).run();
        }}>H4</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 5 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 5}).run();
        }}>H5</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 6 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 6}).run();
        }}>H6</button>
      </li>
      <li>
        <button onClick={() => {
          console.log('image button test');
        }}>
          <FontAwesomeIcon icon={faImage} />
          <input type="file" />
        </button>
      </li>
    </ul>
  )
}
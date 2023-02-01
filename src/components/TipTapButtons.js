import React from "react";

export default function TipTapButtons ({ editor }) {

  console.log(editor)
  return (
    <ul style={{padding: 0, listStyle: "none", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
      <li>
        <button style={{fontWeight: 700}} className={editor.isActive('bold') ? 'is-active' : ''}  type="button" onClick={() => {
          return editor.chain().focus().toggleBold().run()
        }}>B</button>
      </li>
      <li>
        <button style={{fontStyle: "italic"}} className={editor.isActive('italic') ? 'is-active' : ''} type="button" onClick={() => {
          return editor.chain().focus().toggleItalic().run()
        }}>I</button>
      </li>
      <li>
        <button className={editor.isActive('paragraph') ? 'is-active' : ''} type="button" onClick={() => {
          return editor.chain().focus().setParagraph().run();
        }}>Параграф</button>
      </li>
      <li>
        <button className={editor.isActive('heading') ? 'is-active' : ''} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 1}).run();
        }}>H1</button>
      </li>
      <li>
        <button className={editor.isActive('heading') ? 'is-active' : ''} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 2}).run();
        }}>H2</button>
      </li>
      <li>
        <button className={editor.isActive('heading') ? 'is-active' : ''} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 3}).run();
        }}>H3</button>
      </li>
      <li>
        <button className={editor.isActive('heading') ? 'is-active' : ''} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 4}).run();
        }}>H4</button>
      </li>
      <li>
        <button className={editor.isActive('heading') ? 'is-active' : ''} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 5}).run();
        }}>H5</button>
      </li>
      <li>
        <button className={editor.isActive('heading') ? 'is-active' : ''} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 6}).run();
        }}>H6</button>
      </li>
    </ul>
  )
}
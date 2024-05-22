import React from "react";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
// import { Node, mergeAttributes } from "@tiptap/react";
import Link from '@tiptap/extension-link'
import "./AddCourse.css";

export default function TipTapEmail({ setEmailContent }) {
  //states
  const [email, setEmail] = React.useState(true);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Сообщение студентам..."
      }),
      Link.configure({
        openOnClick: true,
        rel: "opener",
        target: "_blank",
        linkOnPaste: true,
        HTMLAttributes: {
          class: "email__link"
        }
      })

    ],
    // content: selectedLesson && selectedLesson.content ,
      
    onUpdate: ({editor}) => {
      setEmailContent(editor.getHTML());
        // setLessonData((prevValue) => {
        //   return {...prevValue, content: editor.getJSON()};
        // })
        // setNewLesson((prevValue) => {
        //   return {...prevValue, content: editor.getJSON()}
        // });
    },
  });

  return (
    <div className="tiptap__wrapper">
      <TipTapButtons content={editor && editor.getJSON()} email={email} editor={editor} setSelectedFiles={setSelectedFiles}/>
      <EditorContent style={{height: "calc(100% - 40px)"}} editor={editor} />
    </div>
  )
};
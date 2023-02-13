import React from "react";
import './AddCourse.css';
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder'

export default function AddStep2({ formData, setFormData, formStep }) {
  const { module } = formData;
  // React.useEffect(() => {
  //   console.log(module)
  // }, [module])
  const editor = useEditor({
        extensions: [
          StarterKit,
          Image,
          Placeholder.configure({
            placeholder: "Здесь можно написать контент для курса",
          })
        ],
        content: module.text,
        onUpdate: ({ editor }) => {
          // console.log(formData);
          // console.log(editor.getHTML());
          setFormData({...formData, module: {
            ...formData.module,  text: editor.getJSON()
          }})
        }
  });

    if(!editor) {
      return null;
    }



    return (
        <div className="addCourse__form-stepwrapper" style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box", padding: "0 75px", textAlign: "left"}}>
            <h2 style={{margin: "0 0 10px 0"}}>Этап 2 добавления курса</h2>
            <div className="addCourse__form-stepwrapper-editor" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent:"center", width: "100%", height: "100%"}}>
                <TipTapButtons editor={editor} />
                <EditorContent tabIndex="-1" className="addCourse__form-stepwrapper-editor-div" editor={editor} />
            </div>

        </div>
    )
}
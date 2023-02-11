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
        <div className="addCourse__form-stepwrapper" style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
            <h3 style={{margin: "0 0 10px 0"}}>Этап 2 добавления курса</h3>
            <div className="addCourse__form-stepwrapper-editor" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent:"flex-start", width: "100%", height: "100%", boxShadow: "-5px -5px 5px #696f71, 5px 5px 5px rgb(15 13 13 / 53%)"}}>
                <TipTapButtons editor={editor} />
                <EditorContent className="addCourse__form-stepwrapper-editor-div" style={{width: "100%", height: "100%", maxHeight: 475, display: "flex", alignItems: "flex-start", justifyContent: "center",  overflow: "auto", boxSizing:"border-box", border: "2px solid white", borderRadius: 15}} editor={editor} />
            </div>

        </div>
    )
}
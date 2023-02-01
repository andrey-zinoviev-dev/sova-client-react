import React from "react";
import './AddCourse.css';
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder'

export default function AddStep2() {
    const editor = useEditor({
        extensions: [
          StarterKit,
          Image,
          Placeholder.configure({
            placeholder: "Здесь можно написать контент для курса",
          })
        ],
        content: '',
    });

    if(!editor) {
        return null;
      }

    return (
        <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden"}}>
            <h3>Этап 2 добавления курса</h3>
            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent:"space-between", width: "100%", height: "100%"}}>
                <TipTapButtons editor={editor} />
                <EditorContent style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}} editor={editor} />
            </div>

        </div>
    )
}
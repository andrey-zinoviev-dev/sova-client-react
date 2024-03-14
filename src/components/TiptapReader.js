import React from "react";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Node, mergeAttributes } from "@tiptap/react";
import "./TipTap.css";

export default function TiptapReader({content}) {

    //crete Video extension
    const Video = Node.create({
      name: "video",
      group: "block",
      selectable: "true",
      atom: "true",
      parseHTML() {
        return [
          {
            tag: "video",
          },
        ]
      },
      addAttributes() {
        return {
          "src": {
            default: null,
          },
          "controls" : {
            default: true,
          },
          "controlsList": {
            default: "nodownload",
          },
          "oncontextmenu": {
            default: "return false"
          },
          "title": {
            default: null,
          }
        }
      },
      renderHTML({HTMLAttributes}) {
        return ['video', mergeAttributes(HTMLAttributes)];
      },
    });
  
    const editor = useEditor({
          extensions: [
              StarterKit,
              Image,
              Placeholder.configure({
                  placeholder: "Добавьте контент уроку..."
              }),
              Video
          ],
          content: content && content ,
          editable: false,
          // onUpdate: ({editor}) => {
          //   setNewLesson((prevValue) => {
          //     return {...prevValue, content: editor.getJSON()}
          //   });
          // },
    });

  return (
    <EditorContent editor={editor}/>

      // <div style={{maxWidth: 1024, margin: "0 auto"}}>
      // </div>
  )
}
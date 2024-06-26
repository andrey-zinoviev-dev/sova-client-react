import React from "react";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Node, mergeAttributes } from "@tiptap/react";
import "./AddCourse.css";
import Link from '@tiptap/extension-link'

export default function TipTapLesson({selectedLesson, setLessonData, setSelectedFiles}) {
  // console.log(selectedLesson);
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

  //audio node
  const Audio = Node.create({
    name: "audio",
    group: "block",
    selectable: "true",
    atom: "true",
    parseHTML() {
      return [
        {
          tag: "audio",
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
        },
        "type": {
          default: null,
        }
      }
    },
    renderHTML({HTMLAttributes}) {
      return ['audio', mergeAttributes(HTMLAttributes)];
    },
  });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Placeholder.configure({
                placeholder: "Добавьте контент уроку..."
            }),
            Link.configure({
              openOnClick: true,
              rel: "opener",
              target: "_blank",
              linkOnPaste: true,
              HTMLAttributes: {
                class: "email__link"
              }
            }),
            Video,
            Audio
        ],
        content: selectedLesson && selectedLesson.content ,
        
        onUpdate: ({editor}) => {
          setLessonData((prevValue) => {
            return {...prevValue, content: editor.getJSON()};
          })
          // setNewLesson((prevValue) => {
          //   return {...prevValue, content: editor.getJSON()}
          // });
        },
    });

    React.useEffect(() => {
      if(editor && selectedLesson) {
        editor.commands.setContent(selectedLesson.content);
      }
    }, [editor, selectedLesson])

    return (
        <div className="tiptap__wrapper">
            <TipTapButtons content={editor && editor.getJSON()} editor={editor} setSelectedFiles={setSelectedFiles}/>
            <EditorContent style={{height: "calc(100% - 40px)"}} editor={editor} />
        </div>
        
    );
}
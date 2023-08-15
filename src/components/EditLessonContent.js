import React from "react";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {apiEditLessonContent} from '../api';
import { Node, mergeAttributes } from "@tiptap/react";

export default function EditLessonContent({lessonContent, setLessonContent, foundCourse, foundLesson, setCoursesData, foundModule, formData, setFormData, setSelectedFiles}) {
  const token = localStorage.getItem('token');
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
    content: foundLesson && foundLesson.content, 
    onUpdate: ({editor}) => {
      apiEditLessonContent(foundCourse._id, foundModule._id, foundLesson._id, token, {content :editor.getJSON()})
      .then((data) => {
        console.log(data);
        setCoursesData((prevValue) => {
          return {...prevValue, courses: prevValue.courses.map((course) => {
            return course._id === data._id ? {...course, modules: data.modules} : course;
          })};
        })
      })

    },
  });

    // React.useEffect(() => {
    //     console.log(foundLesson);
    // }, [foundLesson])

  React.useEffect(() => {
    if(editor) {
            // lessonContent && lessonContent.content.content.length === 0 && editor.commands.setContent({});
      // foundLesson.content && foundLesson.content.content.length === 0 && editor.commands.setContent({});
    }
         
  }, [foundLesson, editor])

  return (
    <div style={{height: "100%", width: "100%", borderRadius: "9px", border: "2px solid #5DB0C7", maxHeight: 540, margin: "0 0 25px 0"}}>
      <TipTapButtons editor={editor} setSelectedFiles={setSelectedFiles}/>
      <EditorContent style={{height: "calc(100% - 40px)"}} editor={editor} />
    </div>
        
  );
};


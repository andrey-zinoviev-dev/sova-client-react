import React from "react";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Node, mergeAttributes } from "@tiptap/react";

export default function TipTapEditor({lessonContent, setLessonContent, foundLesson, foundModule, formData, setFormData, setSelectedFiles}) {
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
        content: foundLesson ? foundLesson.content : lessonContent.content,
        
        onUpdate: ({editor}) => {
            foundLesson ? setFormData((prevValue) => {
                
                const modulesToUpdate = prevValue.modules.map((module) => {
                    return module.title === foundModule.title ? {...module, lessons: module.lessons.map((lesson) => {
                        return lesson.title === foundLesson.title ? {...lesson, content: editor.getJSON()} : lesson;
                    })} : module;
                });
                return {...prevValue, modules: modulesToUpdate};
            }) :
            setLessonContent((prevValue) => {
                // console.log('yes');
                return {...prevValue, content: editor.getJSON()}
            })

        //     setSelectedLesson((prevValue) => {
        //         return {...prevValue, layout: editor.getJSON()}
        //     });

        //     // setFormData((prevValue) => {
        //     //     const updatedModules = prevValue.modules.map((courseModule) => {
        //     //         if(courseModule.title === selectedModule.title) {
        //     //             const updatedModuleLessons = courseModule.lessons.map((lesson) => {
        //     //                 return lesson.title === selectedLesson.title ? {...lesson, layout: editor.getJSON()} : lesson
        //     //             });
        //     //             return {...courseModule, lessons: updatedModuleLessons};
        //     //         }
        //     //         return courseModule;
        //     //     });
        //     //     // console.log(prevValue);

        //     //     return {...prevValue, modules: [...updatedModules]};
        //     // });

        //     // console.log(editor.getJSON());
        },
    });

    // React.useEffect(() => {
    //     console.log(foundLesson);
    // }, [foundLesson])

    // React.useEffect(() => {
    //     if(editor) {
    //         // lessonContent && lessonContent.content.content.length === 0 && editor.commands.setContent({});

    //     }
         
    // }, [lessonContent, editor])

    return (
        <div style={{height: "100%", width: "100%", borderRadius: "9px", border: "2px solid #5DB0C7", maxHeight: 540, margin: "0 0 25px 0", overflow: "auto"}}>
            <TipTapButtons editor={editor} setSelectedFiles={setSelectedFiles}/>
            <EditorContent style={{height: "calc(100% - 40px)"}} editor={editor} />
        </div>
        
    );
};
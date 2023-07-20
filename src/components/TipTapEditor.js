import React from "react";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

export default function TipTapEditor({setLessonContent, formData, setFormData, selectedModule, selectedLesson, setSelectedLesson, setSelectedFiles}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image
        ],
        content: '<p>Тут можно создать контент урока</p>',
        onUpdate: ({editor}) => {
            setLessonContent((prevValue) => {
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

    React.useEffect(() => {
        // selectedLesson.layout && editor && editor.commands.setContent(selectedLesson.layout);
    }, [editor]);

    return (
        <div style={{height: "100%", borderRadius: "9px", border: "2px solid #5DB0C7", maxHeight: 540, margin: "0 0 25px 0"}}>
            <TipTapButtons editor={editor} setSelectedFiles={setSelectedFiles}/>
            <EditorContent style={{height: "calc(100% - 40px)"}} editor={editor} />
        </div>
        
    );
};
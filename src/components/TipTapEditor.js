import React from "react";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

export default function TipTapEditor({formData, setFormData, selectedModule, selectedLesson, setSelectedLesson, setSelectedFiles}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image
        ],
        content: '<p>Тут можно создать контент урока</p>',
        onUpdate: ({editor}) => {
            setSelectedLesson((prevValue) => {
                return {...prevValue, layout: editor.getJSON()}
            });

            // setFormData((prevValue) => {
            //     const updatedModules = prevValue.modules.map((courseModule) => {
            //         if(courseModule.title === selectedModule.title) {
            //             const updatedModuleLessons = courseModule.lessons.map((lesson) => {
            //                 return lesson.title === selectedLesson.title ? {...lesson, layout: editor.getJSON()} : lesson
            //             });
            //             return {...courseModule, lessons: updatedModuleLessons};
            //         }
            //         return courseModule;
            //     });
            //     // console.log(prevValue);

            //     return {...prevValue, modules: [...updatedModules]};
            // });

            // console.log(editor.getJSON());
        },
    });

    React.useEffect(() => {
        // selectedLesson.layout && editor && editor.commands.setContent(selectedLesson.layout);
    }, [editor]);

    return (
        <>
            <TipTapButtons editor={editor} setSelectedFiles={setSelectedFiles}/>
            <EditorContent style={{height: "100%"}} editor={editor} />
        </>
        
    );
};
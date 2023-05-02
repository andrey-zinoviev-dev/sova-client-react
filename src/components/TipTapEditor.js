import React from "react";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

export default function TipTapEditor({formData, setFormData, selectedModule, selectedLesson}) {
    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: '<p>Тут можно создать контент урока</p>',
        onUpdate: ({editor}) => {
            setFormData((prevValue) => {
                const updatedModules = prevValue.modules.map((courseModule) => {
                    if(courseModule.title === selectedModule.title) {
                        const updatedModuleLessons = courseModule.lessons.map((lesson) => {
                            return lesson.title === selectedLesson.title ? {...lesson, layout: editor.getJSON()} : lesson
                        });
                        return {...courseModule, lessons: updatedModuleLessons};
                    }
                    return courseModule;
                });
                console.log(prevValue);

                return {...prevValue, modules: [...updatedModules]};
            });

            // console.log(editor.getJSON());
        },
    });

    React.useEffect(() => {
        selectedLesson.layout && editor && editor.commands.setContent(selectedLesson.layout);
    }, [editor, selectedLesson.layout]);
    return (
        <>
            <TipTapButtons editor={editor} />
            <EditorContent style={{height: "calc(100% - 125px)"}} editor={editor} />
        </>
        
    );
};
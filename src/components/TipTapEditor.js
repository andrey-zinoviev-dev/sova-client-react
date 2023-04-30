import React from "react";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: '<p>Тут можно создать контент урока</p>',
        onUpdate: ({editor}) => {
            console.log(editor.getJSON());
        },
    });

    return (
        <>
            <TipTapButtons editor={editor} />
            <EditorContent style={{height: "calc(100% - 125px)"}} editor={editor} />
        </>
        
    );
};
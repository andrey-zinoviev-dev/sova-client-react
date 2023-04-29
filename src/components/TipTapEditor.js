import React from "react";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

export default function TipTapEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: '<p>Тут можно создать контент урока</p>'
    });

    return (
        <EditorContent editor={editor} />
    );
};
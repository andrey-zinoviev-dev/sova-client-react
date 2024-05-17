import React from "react";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Node, mergeAttributes } from "@tiptap/react";
import NewLesson from "./NewLesson";

export default function TipTapEditor({setNewLesson, addContentToNewLesson, editContentOfLesson, selectedLesson, selectedFiles, setSelectedFiles}) {
  //useMemo
  // const memoFiles = React.useMemo(() => {
  //   console.log(selectedFiles);
  //   console.log(editor);
  // }, [selectedFiles.length, editor]);

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
        content: selectedLesson && selectedLesson.content ,
        
        onUpdate: ({editor}) => {
          setNewLesson((prevValue) => {
            return {...prevValue, content: editor.getJSON()}
          });
        },
    });

    return (
        <div style={{width: "100%", borderRadius: "9px", border: "2px solid #5DB0C7", boxSizing: "border-box"}}>
            <TipTapButtons content={editor && editor.getJSON()} editor={editor} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>
            <EditorContent style={{height: "calc(100% - 40px)"}} editor={editor} />
        </div>
        
    );
};
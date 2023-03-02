import React from "react";
import './AddCourse.css';
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Node, mergeAttributes } from "@tiptap/react";
import { motion } from "framer-motion";

export default function AddStep2({ formData, setFormData, formStep, setFormStep, setSelectedFiles }) {
  const { module } = formData;

  //states
  const [disableButton, setDisableButton] = React.useState(false);

  //functions
  function handleNextClick() {
    setFormStep((prevValue) => {
      return prevValue + 1;
    })
  };

  function handleBackClick() {
    setFormStep((prevValue) => {
      return prevValue - 1;
    })
  };

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
          Video,
          Placeholder.configure({
            placeholder: "Здесь можно написать контент для курса",
          })
        ],
        content: module.text,
        onUpdate: ({ editor }) => {
          setFormData({...formData, module: {
            ...formData.module,  text: editor.getJSON()
          }});
          // if(editor.getHTML() === '<p></p>') {
          //   setDisableButton(true);
          // } else {
          //   setDisableButton(false);
          // }
          
        }
  });

  React.useEffect(() => {
    // console.log(formData.module.text);
    if(!formData.module.text || !formData.module.text.content[0].content) {
      // console.log('no data in editor');
      setDisableButton(true);
    } else {
      // console.log(formData.module.text.content[0]);
      setDisableButton(false);
    }
  }, [formData.module.text]);

  // React.useEffect(() => {
  //   console.log(disableButton);
  // }, [disableButton]);

  if(!editor) {
    return null;
  }


  
  return (
    <div className="addCourse__form-stepwrapper" style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box", padding: "0 75px", textAlign: "left"}}>
      <h2 style={{margin: "0 0 10px 0"}}>Этап 2 добавления курса</h2>
      <div className="addCourse__form-stepwrapper-editor" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent:"center", width: "100%", height: "100%"}}>
        <TipTapButtons editor={editor} formData={formData} setSelectedFiles={setSelectedFiles}/>
        <EditorContent tabIndex="-1" className="addCourse__form-stepwrapper-editor-div" editor={editor} />
      </div>
      <div style={{display: "flex", alignItems: "stretch", justifyContent: "space-between", minHeight: 40}}>
        <motion.button onClick={handleBackClick} type="button" whileHover={{backgroundColor: "rgb(226 100 59 / 100%)"}}  style={{ fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(255 255 255 / 100%)", border: "2px solid rgb(226, 100, 59)"}}>Назад</motion.button>
        <motion.button onClick={handleNextClick} type="button" whileHover={{backgroundColor: "rgb(226 100 59 / 100%)"}}  style={{ pointerEvents: disableButton && "none", fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: disableButton ? "rgb(255 255 255 / 30%)" : "rgb(255 255 255 / 100%)", border: disableButton ? "2px solid rgb(255 255 255 /30%)" : "2px solid rgb(226, 100, 59)"}}>Далее</motion.button>
      </div>
    </div>
  )
}
import React from "react";
import './AddCourse.css';
import AddCourseContent from "./AddCourseContent";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Node, mergeAttributes } from "@tiptap/react";
import { motion } from "framer-motion";

export default function AddStep2({ formData, setFormData, formStep, setFormStep, setSelectedFiles }) {
  //derived state
  const { modules } = formData;
  const {course} = formData;
  const lessons = modules.map((courseModule) => {
    return courseModule.lessons;
  }).flat();

  //refs


  //states
  const [disableButton, setDisableButton] = React.useState(false);
  const [filesToUpload, setFilesToUpload] = React.useState([]);
  const [contentEditIsOpened, setContentEditIsOpened] = React.useState(false);
  const [selectedModule, setSelectedModule] = React.useState({});
  const [selectedLesson, setSelectedLesson] = React.useState({});

  //functions
  function handleNextClick() {
    setFormStep((prevValue) => {
      return prevValue += 1;
    })
  };

  function handleBackClick() {
    setFormStep((prevValue) => {
      return prevValue -= 1;
    })
  };

  // function handleFileUpload(evt) {
  //   console.log(evt.target.files[0]);
  // }

  //crete Video extension
  // const Video = Node.create({
  //   name: "video",
  //   group: "block",
  //   selectable: "true",
  //   atom: "true",
  //   parseHTML() {
  //     return [
  //       {
  //         tag: "video",
  //       },
  //     ]
  //   },
  //   addAttributes() {
  //     return {
  //       "src": {
  //         default: null,
  //       },
  //       "controls" : {
  //         default: true,
  //       },
  //       "controlsList": {
  //         default: "nodownload",
  //       },
  //       "oncontextmenu": {
  //         default: "return false"
  //       },
  //       "title": {
  //         default: null,
  //       }
  //     }
  //   },
  //   renderHTML({HTMLAttributes}) {
  //     return ['video', mergeAttributes(HTMLAttributes)];
  //   },
  // });

  // const editor = useEditor({
  //   extensions: [
  //     StarterKit,
  //     Image,
  //     Video,
  //     Placeholder.configure({
  //       placeholder: "Здесь можно написать контент для курса",
  //     })
  //   ],
  //   content: module.text,
  //   onUpdate: ({ editor }) => {
  //     // console.log(editor.getJSON());
  //     setFormData({...formData, module: {
  //       ...formData.module,  text: editor.getJSON()
  //     }});
  //   }
  // });

  // React.useEffect(() => {
  //   // console.log(formData.module.text);
  //   if(!formData.module.text || !formData.module.text.content[0].content) {
  //     // console.log('no data in editor');
  //     setDisableButton(true);
  //   } else {
  //     // console.log(formData.module.text.content[0]);
  //     setDisableButton(false);
  //   }
  // }, [formData.module.text]);

  // // React.useEffect(() => {
  // //   console.log(disableButton);
  // // }, [disableButton]);

  // if(!editor) {
  //   return null;
  // }

  React.useEffect(() => {
    selectedLesson.module && selectedLesson.title && selectedLesson.layout &&
    setFormData((prevValue) => {
      const newModules = prevValue.modules.map((prevModule) => {
        if(prevModule.title === selectedLesson.module.title) {
          const newLessons = prevModule.lessons.map((lesson) => {
            return lesson.title === selectedLesson.title ? {...lesson, layout: selectedLesson.layout} : lesson;
          });
          return {...prevModule, lessons: newLessons};
        }
        return prevModule;
      });
      return {...prevValue, modules: newModules};
    });
  }, [selectedLesson.layout]);
  
  return (
    <div className="addCourse__form-stepwrapper" style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box", padding: "0 75px", textAlign: "left"}}>
      <h2 className="addCourse__form-stepwrapper-headline">Этап 2 добавления курса <span style={{color: "rgb(226, 100, 59)", fontWeight: 700}}>{course.name}</span></h2>
      {!contentEditIsOpened ? 
        <div style={{height: "calc(100% - 30px)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch"}}>
          <p style={{margin: "0 0 50px 0", fontSize: 18}}>К какому уроку добавить контент?</p>
          <ul style={{margin: "0 0 auto 0", padding: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", gap: 20, maxHeight: 500, overflow: "hidden auto"}}>
            {/* {modules.map((courseModule, index) => {
              return <li key={index} onClick={() => {
                setContentEditIsOpened(true);
                setSelectedModule(courseModule);
              }} style={{boxSizing: "border-box", boxShadow: "3px 3px 5px rgb(0 0 0/50%)", fontSize: 18, textAlign: "left", backgroundColor: "#242827", borderRadius: 12, border: "2px solid rgb(226, 100, 59 / 0%)", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 80, padding: "10px 45px", position: "relative"}}>{courseModule.title}</li>
            })} */}
            {lessons.map((moduleLesson) => {
              return <li onClick={() => {
                setContentEditIsOpened(true);
                setSelectedModule(moduleLesson.module);
                setSelectedLesson(moduleLesson);
              }} style={{boxSizing: "border-box", boxShadow: "3px 3px 5px rgb(0 0 0/50%)", fontSize: 18, textAlign: "left", backgroundColor: "#242827", borderRadius: 12, border: "2px solid rgb(226, 100, 59 / 0%)", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 60, padding: "10px 45px", position: "relative"}} key={moduleLesson.title}>
                <span>{moduleLesson.title}</span>
                <span>{moduleLesson.module.title}</span>
              </li>
            })}
          </ul>
          <div style={{display: "flex", alignItems: "stretch", justifyContent: "space-between", minHeight: 40}}>
            <motion.button onClick={handleBackClick} type="button" whileHover={{backgroundColor: "rgb(226 100 59 / 100%)"}}  style={{ fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(255 255 255 / 100%)", border: "2px solid rgb(226, 100, 59)"}}>Назад</motion.button>
            <motion.button onClick={handleNextClick} type="button" whileHover={{backgroundColor: "rgb(226 100 59 / 100%)"}}  style={{ fontWeight: 700, minWidth: 120, minHeight: 50, borderRadius: 15, backgroundColor: "rgb(0 0 0 /0%)", color: "rgb(255 255 255 / 100%)", border: "2px solid rgb(226, 100, 59)"}}>Далее</motion.button>
          </div>
        </div> 
        :
        <AddCourseContent setContentEditIsOpened={setContentEditIsOpened} formData={formData} setFormData={setFormData} selectedModule={selectedModule} selectedLesson={selectedLesson} setSelectedLesson={setSelectedLesson} setSelectedFiles={setSelectedFiles}/>
      }
      {/* <div className="addCourse__form-stepwrapper-editor" style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent:"center", width: "100%", height: "100%"}}>
        <TipTapButtons editor={editor} formData={formData} setSelectedFiles={setSelectedFiles}/>
        <EditorContent tabIndex="-1" className="addCourse__form-stepwrapper-editor-div" editor={editor} />
      </div> */}

    </div>
  )
}
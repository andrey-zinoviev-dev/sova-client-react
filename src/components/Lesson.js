import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import TipTapButtons from "./TipTapButtons";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { apiAddLessonToCourse, apiEditLessonContent} from '../api';
import { Node, mergeAttributes } from "@tiptap/react";

export default function Lesson({ token, setAddLessonPressed, /*setSelectedFiles,*/ setEditLessonPressed, setModuleData, lessonToUpdate }) {
  //params
  const { courseID, moduleID } = useParams();

    //states
    const [lessonData, setLessonData] = React.useState(!lessonToUpdate ? {title: "", cover: {}, content: {content: {"type": "doc", "content": [
      // …
    ]}}}
    :
    lessonToUpdate
    );
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    //refs
    const coverInputRef = React.useRef();
    const coverImgRef = React.useRef();
    //editor
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
        content: lessonToUpdate && lessonData.content, 
        onUpdate: ({editor}) => {
          setLessonData((prevValue) => {
            return {...prevValue, content: editor.getJSON()}
          });
        //   apiEditLessonContent(foundCourse._id, foundModule._id, foundLesson._id, token, {content :editor.getJSON()})
        //   .then((data) => {
        //     console.log(data);
        //     setCoursesData((prevValue) => {
        //       return {...prevValue, courses: prevValue.courses.map((course) => {
        //         return course._id === data._id ? {...course, modules: data.modules} : course;
        //       })};
        //     })
        //   })
    
        },
    });

    // React.useEffect(() => {
    //   console.log(lessonToUpdate);
    // }, [lessonToUpdate])

    // React.useEffect(() => {
    //   console.log(lessonToUpdate)
    // }, [])

    React.useEffect(() => {
      console.log(lessonData);
    }, [lessonData]);

    return (
        <div className="module-edit__wrapper">
          <div className="course-edit__wrapper-back-div">
            <button onClick={() => {
                // navigate(-1);
                setAddLessonPressed(false);
                lessonToUpdate && setEditLessonPressed(false);
            }} className="course-edit__wrapper-back">
                <svg fill="rgb(93, 176, 199)" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
            </button>
            <h3 className="module-add__headline">{lessonToUpdate ? "Редактировать урок" : "Добавить урок"}</h3>
          </div>
          <form className="module-edit__form">
              <div className="module-edit__form-div">
                <label className="module-edit__form-label">Название</label>
                <input className="module-edit__form-input" onChange={(evt) => {
                  setLessonData((prevValue) => {
                    return {...prevValue, title: evt.target.value};
                  });
                }} value={lessonData.title} type="text" placeholder="Название урока"></input>
              </div>
              <div className="module-edit__form-div">
                    <label className="module-edit__form-label">Обложка урока</label>
                    <div className="module-edit__cover-div">
                        <img ref={coverImgRef} className="module-edit__cover-img" alt="Обложка урока" src={lessonData.cover.clientPath ? lessonData.cover.clientPath : lessonData.cover.length > 0 ? lessonData.cover : 'https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4='}></img>
                        <motion.button className="module-edit__cover-btn" whileHover={{opacity: 1}} type="button" onClick={(() => {
                            coverInputRef.current.click();
                        })}>
                            <p>Изменить обложку</p>
                        </motion.button>
                        <input ref={coverInputRef} onChange={(evt) => {
                            const uploadedFile = evt.target.files[0];
                            uploadedFile.clientPath = window.URL.createObjectURL(uploadedFile);
                            uploadedFile.title = uploadedFile.name;
                            coverImgRef.current.src = uploadedFile.clientPath;
                            setLessonData((prevValue) => {
                              return {...prevValue, cover: uploadedFile};
                            });
                            setSelectedFiles((prevValue) => {
                              return [...prevValue, uploadedFile];
                            })
                            // setSelectedImageFile(evt.target.files[0]);
                        }} style={{display: "none"}} id="course-cover" type="file"></input> 
                    </div>
                </div>
            </form> 
            <div>
              <TipTapButtons editor={editor} setSelectedFiles={setSelectedFiles}/>
              <EditorContent editor={editor} />
            </div>
          <button onClick={() => {
            const form = new FormData();
            form.append('lessonData', JSON.stringify(lessonData));
            selectedFiles.forEach((file) => {
              form.append('file', file);
            });

            !lessonToUpdate ? 
            // console.log(lessonData)
            apiAddLessonToCourse(courseID, moduleID, token, form)
            .then((data) => {
              console.log(data);
              setAddLessonPressed(false);
              setModuleData((prevValue) => {
                return {...prevValue, lessons: data.lessons};
              });
              setSelectedFiles([]);
            })
            : 
            // console.log(lessonData);
            apiEditLessonContent(courseID, moduleID, lessonData._id, token, form)
            .then((data) => {
              // console.log(data);
              if(data._id) {
                setEditLessonPressed(false);
                setModuleData((prevValue) => {
                  return {...prevValue, lessons: data.lessons};
                });
                setSelectedFiles([]);
              }
            })
            // console.log(!lessonToUpdate ? "Добавить урок" : "Обновить урок");
            // setAddLessonPressed(false);
            // lessonToUpdate && setEditLessonPressed(false);
            // !lessonToUpdate ? setModuleData((prevValue) => {
            //   return {...prevValue, lessons: [...prevValue.lessons, lessonData]};
            // })
            // :
            // setModuleData((prevValue) => {
            //   return {...prevValue, lessons: prevValue.lessons.map((lesson) => {
            //     return lesson.title === lessonData.title ? {...lesson, title: lesson.title, cover: lesson.cover, content: lessonData.content}
            //     : lesson;
            //   })};
            // });
          }} className="module-edit__update-btn">{!lessonToUpdate ? "Добавить урок" : "Обновить урок"}</button>
        </div>
    )
}
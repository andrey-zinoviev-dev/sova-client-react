import React from "react";
import TipTapEditor from "./TipTapEditor";

export default function Test() {
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [content, setContent] = React.useState({content: {type: "doc",
    content: [
    // …
    ]
  }});

  //useMemo
  const filteredFiles = React.useMemo(() => {
    const filteredContent = content.content.content.filter((el) => {
      return el.type === 'image' || el.type === 'video';
    });
    const updatedFilesArray = selectedFiles.filter((file) => {
        // console.log(content.content.content);
        return filteredContent.find((el) => {
          // console.log(el);
          return el.attrs.title === file.name;
        });
    });
    return updatedFilesArray;
    // console.log(updatedFilesArray);
    // console.log(filteredContent);
    // console.log(selectedFiles);

    // console.log(selectedFiles.filter((file) => {
    //   console.log(content.content.content);
    //   return content.content.content.find((el) => {
    //     console.log(el);
    //     return el.attrs.title === file.name;
    //   });
    // }))
  }, [content.content.content, selectedFiles]);

  // console.log(filteredFiles);

  // console.log(content);
  // console.log(selectedFiles);
  return (
    <section>
      <div>
        <TipTapEditor setNewLesson={setContent} setSelectedFiles={setSelectedFiles}></TipTapEditor>
        <button onClick={() => {
          console.log(selectedFiles);
          console.log(filteredFiles);
        }}>Отправить контент</button>
      </div>
    </section>
  )
}
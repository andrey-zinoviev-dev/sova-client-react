import React from "react";
import TipTapEditor from "./TipTapEditor";

export default function Test() {
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [content, setContent] = React.useState({content: {type: "doc",
    content: [
    // …
    ]
  }});
  // console.log(content);
  // console.log(selectedFiles);
  return (
    <section>
      <div>
        <TipTapEditor setNewLesson={setContent} setSelectedFiles={setSelectedFiles}></TipTapEditor>
      </div>
    </section>
  )
}
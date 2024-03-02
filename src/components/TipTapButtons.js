import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFilm } from "@fortawesome/free-solid-svg-icons";
import CyrillicToTranslit from "cyrillic-to-translit-js";


export default function TipTapButtons ({ formData, editor, selectedFiles, setSelectedFiles }) {
  // console.log(content.content);
  //token
  const token = localStorage.getItem('token');
  //states
  const [image, setImage] = React.useState({});
  const [video, setVideo] = React.useState({});

  //variables
  const cyrillicToTranslit = new CyrillicToTranslit();

  //refs
  const imageInputRef = React.useRef();
  const videoInputRef = React.useRef();

  //functions
  function handleFileChange(evt) {
    let uploadedImage = evt.target.files[0];

    // //s3 upload
    // const formData = new FormData();
    // formData.append("file", uploadedImage);
    // fetch(`http://localhost:3000/testUpload`, {
    //   method: "POST",
    //   headers: {
    //     'Authorization': token,
    //   },
    //   body: formData,
    //   // "Content-Type": "multipart/form-data",
    // })
    // .then((data) => {
    //   console.log(data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    // //s3 upload


    // console.log(image);
    // const relPath = window.URL.createObjectURL(image);
    if(/[А-Яа-я ]/.test(uploadedImage.name)) {
      uploadedImage = new File([uploadedImage], cyrillicToTranslit.transform(uploadedImage.name, "_"), {
        type: uploadedImage.type,
      })
    };
    uploadedImage.clientPath = window.URL.createObjectURL(uploadedImage);;
    uploadedImage.title = uploadedImage.name;
    setImage(uploadedImage);

    setSelectedFiles((prevValue) => {
      return [...prevValue, uploadedImage]
    });

    // console.log(evt.target.files[0]);
    // const fileReader = new FileReader();

    // fileReader.readAsDataURL(evt.target.files[0]);

    // fileReader.onload = (evt) => {
    //   setImageSrc(evt.target.result);
    // }
  }

  function handleVideoUpload(evt) {
    let uploadedVideo = evt.target.files[0];

    // //s3 upload
    // const formData = new FormData();
    // formData.append("file", uploadedVideo);
    // fetch(`http://localhost:3000/testUpload`, {
    //   method: "POST",
    //   headers: {
    //     'Authorization': token,
    //   },
    //   body: formData,
    //   // "Content-Type": "multipart/form-data",
    // })
    // .then((data) => {
    //   console.log(data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    // //s3 upload


    if(/[А-Яа-я ]/.test(uploadedVideo.name)) {
      uploadedVideo = new File([uploadedVideo], cyrillicToTranslit.transform(uploadedVideo.name, "_"), {
        type: uploadedVideo.type,
      })
    };
    uploadedVideo.clientPath = window.URL.createObjectURL(uploadedVideo);
    uploadedVideo.title = uploadedVideo.name;
    // if(/[А-Я]/.test(video.name)) {
    //   let videoLatinName = cyrillicToTranslit.transform(video.name, "_");
    //   // Object.defineProperties(video, 'name', {
    //   //   writable: true,
    //   //   value: videoLatinName
    //   // })
    //   // video.name = videoLatinName;
    // } 
    // const relPath = window.URL.createObjectURL(video);
    // video.clientPath = relPath;
    // video.title = video.name;
    setVideo(uploadedVideo);

    setSelectedFiles((prevValue) => {
      return [...prevValue, uploadedVideo]
    });

    
  };

  React.useEffect(() => {
    if(image.clientPath) {
      editor && editor.chain().focus().setImage({ src: image.clientPath, title: image.name}).run();
    };
    // console.log(Object.keys(image));
    // if(imageSrc.length > 0) {
    //   editor.chain().focus().setImage({ src: image.src, title: image.relPath}).run();
    // }
    
    // window.URL.revokeObjectURL(imageSrc);
  }, [image.clientPath, editor]);

  React.useEffect(() => {
    // console.log(video);
    if(video.clientPath) {
      // console.log(video);
      editor && editor.chain().focus().insertContent(`<video src="${video.clientPath}" title=${/[А-Я]/.test(video.name) ? cyrillicToTranslit.transform(video.name, "_") : video.name.replace(" ", "")}></video>`).run();
      // console.log(Object.keys(video.video));
    };
    // if(videoSrc.length > 0) {
    //   editor.chain().focus().insertContent(`<video src="${videoSrc}"></video>`).run();
    // }
    
  }, [video.clientPath, editor]);

  // React.useEffect(() => {
  //   if(selectedFiles.length === 0) {
  //     setImage({});
  //     setVideo({});
  //   }
  // }, [selectedFiles]);

  return (
    editor && <ul className="addCourse__form-stepwrapper-menu-list">
      <li className="addCourse__form-stepwrapper-menu-list-element">
        <button style={{fontWeight: 700}} className={editor.isActive('bold') ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'}  type="button" onClick={() => {
          return editor.chain().focus().toggleBold().run()
        }}>B</button>
      </li>
      <li>
        <button style={{fontStyle: "italic"}} className={editor.isActive('italic') ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleItalic().run()
        }}>I</button>
      </li>
      <li>
        <button className={editor.isActive('paragraph') ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().setParagraph().run();
        }}>Параграф</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 1 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 1}).run();
        }}>H1</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 2 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 2}).run();
        }}>H2</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 3 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 3}).run();
        }}>H3</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 4 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 4}).run();
        }}>H4</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 5 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 5}).run();
        }}>H5</button>
      </li>
      <li>
        <button className={editor.isActive('heading', { level: 6 }) ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} type="button" onClick={() => {
          return editor.chain().focus().toggleHeading({level: 6}).run();
        }}>H6</button>
      </li>
      <li>
        <button type="button" className={editor.isActive('image') ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} onClick={() => {
          imageInputRef.current.click();
        }}>
          <FontAwesomeIcon icon={faImage} />
          <input ref={imageInputRef} onChange={handleFileChange} type="file" name="image" style={{display: "none"}}/>
        </button>
      </li>
      <li>
        <button type="button" className={editor.isActive('video') ? 'is-active' : 'addCourse__form-stepwrapper-menu-list-element-button'} onClick={() => {
          videoInputRef.current.click();
        }}>
          <FontAwesomeIcon icon={faFilm} />
          <input ref={videoInputRef} onChange={handleVideoUpload} type="file" name="video" style={{display: "none"}}/>
        </button>
      </li>
    </ul>
  )
}
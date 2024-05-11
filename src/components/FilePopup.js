import React, { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FilePopup.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";

export default function FilePopup({ selectedFiles, setSelectedFiles, cancelFile, sendFiles }) {
  const [uploadProgress, setUploadProgress] = React.useState({});
  const [sendingMessage, setSendingMessage] = React.useState(false);
  const [messageText, setMessageText] = React.useState(null);
  // const [filesSent, setFileSent] = React.useState(false);
  //functions
  function upload(captionValue) {
    // console.log(selectedFiles);
    // console.log(captionRef.current.value);
    return Promise.all(selectedFiles.map((selectedFile) => {
      const uploadS3 = new Upload({
        client: new S3({region: process.env.REACT_APP_REGION, credentials: {
          secretAccessKey: process.env.REACT_APP_SECRET,
          accessKeyId: process.env.REACT_APP_ACCESS
          }, endpoint: "https://storage.yandexcloud.net"
        }),
          params: {Bucket: process.env.REACT_APP_NAME, Key: selectedFile.file.name, Body: selectedFile.file},
          queueSize: 4,
          partSize: 10 * 1024 * 1024,
        });
    
        uploadS3.on("httpUploadProgress", (progress) => {
          setUploadProgress({name: progress.Key, progress: (progress.loaded/progress.total) * 100});
          // setUploadingFiles(() => {
          //   return Math.ceil(index/memoFiles.length * 100);
          // })
        })
    
        return uploadS3.done();
    }))
    .then((result) => {
      console.log(result);
      // console.log("send data to node js");
      // sendFiles(result, captionValue);
    })
  }

  //refs
  const captionRef = useRef();

  React.useEffect(() => {
    console.log(uploadProgress);
  }, [uploadProgress])

  return (
    <section className="popup-file">
      <div className="container">
        <h3>Отправить файлы</h3>
        <form className="popup-file__form" onSubmit={(evt) => {
          evt.preventDefault();
          // console.log(selectedFiles);
          // upload(captionRef.current.value);
          // sendFiles(selectedFiles, captionRef.current.value);
        }}>
          {/* {Object.keys(uploadProgress).length < 1 ? 
          <> */}
            <ul className="popup-file__ul">
              {selectedFiles.map((selectedFile) => {
                return <li key={selectedFile.file.name}>
                  <div className="popup-file__ul-li-actions">
                    {selectedFile.file.type.includes("image") && <img src={selectedFile.clientPath} alt={selectedFile.name}></img>}
                    {selectedFile.file.type.includes("video") && <video src={selectedFile.clientPath} muted controls></video>}
                    {selectedFile.file.type.includes("audio") && <audio src={selectedFile.clientPath} controls></audio>}
                    <button type="button" onClick={() => {
                      setSelectedFiles((prevValue) => {
                        return prevValue.filter((prevFile) => {
                          return prevFile.file.name !== selectedFile.file.name;
                        })
                      });
                    }} id="delete-file-attach">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <p style={{width: selectedFile.file.type.includes("audio") && "100%", textAlign: selectedFile.file.type.includes("audio") && "center"}}>{selectedFile.file.name}</p>
                </li>
              })}
            </ul>
            <input className="popup-file__form-input" ref={captionRef} name="caption" placeholder="Добавить подпись"></input>
            <div className="popup-file-buttons">
                <button onClick={cancelFile}>Отменить</button>
                <button type="submit" onClick={() => {

                  // upload()

                  // sendFile(selectedFile);
                }}>Отправить</button>
            </div>
          {/* </>
          // :
          // <>
          //   <span style={{color: "white"}}>{uploadProgress.name}</span>
          //   <div style={{width: `${uploadProgress.progress}%`, height: 3, borderRadius: 5, backgroundColor: "white"}}></div>
          // </>} */}
          
        </form>
        {/* {Object.keys(uploadProgress) < 1 ? 
        <>

          <form>
            <ul className="popup-file__ul">
              {selectedFiles.map((selectedFile) => {
                return <li key={selectedFile.file.name}>
                  <div className="popup-file__ul-li-actions">
                    {selectedFile.file.type.includes("image") && <img src={selectedFile.clientPath} alt={selectedFile.name}></img>}
                    {selectedFile.file.type.includes("video") && <video src={selectedFile.clientPath} muted controls></video>}
                    {selectedFile.file.type.includes("audio") && <audio src={selectedFile.clientPath} controls></audio>}
                    <button type="button" onClick={() => {
                      setSelectedFiles((prevValue) => {
                        return prevValue.filter((prevFile) => {
                          return prevFile.file.name !== selectedFile.file.name;
                        })
                      });
                    }} id="delete-file-attach">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <p style={{width: selectedFile.file.type.includes("audio") && "100%", textAlign: selectedFile.file.type.includes("audio") && "center"}}>{selectedFile.file.name}</p>
                </li>
              })}
            </ul>
            <input name="caption" placeholder="Добавить подпись"></input>
            <div className="popup-file-buttons">
              <button onClick={cancelFile}>Отменить</button>
              <button onClick={() => {
                Promise.all(selectedFiles.map((selectedFile) => {
                  const uploadS3 = new Upload({
                    client: new S3({region: process.env.REACT_APP_REGION, credentials: {
                      secretAccessKey: process.env.REACT_APP_SECRET,
                      accessKeyId: process.env.REACT_APP_ACCESS
                      }, endpoint: "https://storage.yandexcloud.net"
                    }),
                      params: {Bucket: process.env.REACT_APP_NAME, Key: selectedFile.file.name, Body: selectedFile.file},
                      queueSize: 4,
                      partSize: 10 * 1024 * 1024,
                    });
                
                    uploadS3.on("httpUploadProgress", (progress) => {
                      setUploadProgress({name: progress.Key, progress: (progress.loaded/progress.total) * 100});
                      // setUploadingFiles(() => {
                      //   return Math.ceil(index/memoFiles.length * 100);
                      // })
                    })
                
                    return uploadS3.done();
                }))
                .then((result) => {
                  // console.log(result);
                  sendFiles(result);
                })

                // sendFile(selectedFile);
              }}>Отправить</button>
            </div>
          </form>
        </>
        :  
        !sendingMessage ? <>
          <p style={{color: "white"}}>{uploadProgress.name}</p>
          <div style={{width: `${uploadProgress.progress}%`, height: 3, backgroundColor: "white"}}></div>
        </>
        :
        <>

          <p>Отправление файлов</p>
        </>
        } */}
      </div>
    </section>
  )
}
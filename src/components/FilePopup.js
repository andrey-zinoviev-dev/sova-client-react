import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FilePopup.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";

export default function FilePopup({ selectedFiles, setSelectedFiles, cancelFile, sendFiles }) {
  const [uploadProgress, setUploadProgress] = React.useState({});
  const [sendingMessage, setSendingMessage] = React.useState(false);
  // const [filesSent, setFileSent] = React.useState(false);
  // console.log(selectedFiles);
  // const filePath = window.URL.createObjectURL(selectedFile);
  // console.log(filePath);

  return (
    <div className="popup-file">
      <div className="container">
        <h3>Отправить файлы</h3>
        {Object.keys(uploadProgress) < 1 ? 
        <>
          <ul className="popup-file__ul">
            {selectedFiles.map((selectedFile) => {
              return <li key={selectedFile.file.name}>
                <div className="popup-file__ul-li-actions">
                  {selectedFile.file.type.includes("image") && <img src={selectedFile.clientPath} alt={selectedFile.name}></img>}
                  {selectedFile.file.type.includes("video") && <video src={selectedFile.clientPath} muted controls></video>}
                  {selectedFile.file.type.includes("audio") && <audio src={selectedFile.clientPath} controls></audio>}
                  <button onClick={() => {
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
        </>
        :
        
        !sendingMessage ? <>
          <p style={{color: "white"}}>{uploadProgress.name}</p>
          <div style={{width: `${uploadProgress.progress}%`, height: 3, backgroundColor: "white"}}></div>
        </>
        :
        <>

          {/* <p>Отправление файлов</p> */}
        </>
        }

        {/* <h3>Отправить {selectedFile.type.includes("image") ? "изображение" : "видео"}</h3> */}
        {/* {selectedFile.type.includes("image") && <img src={filePath} alt={selectedFile.name}></img>}
        {selectedFile.type.includes("video") && <video src={filePath} muted controls></video>}
        {selectedFile.type.includes("audio") && <audio src={filePath} controls contextMenu="false"></audio>} */}
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
      </div>
    </div>
  )
}
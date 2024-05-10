import "./FilePopup.css";

export default function FilePopup({ selectedFiles, cancelFile, sendFile }) {
  console.log(selectedFiles);
  // const filePath = window.URL.createObjectURL(selectedFile);
  // console.log(filePath);
  return (
    <div className="popup-file">
      <div className="container">
        <ul>
          {selectedFiles.map((file) => {
            return <li key={file.name}>
              <p>{file.name}</p>
            </li>
          })}
        </ul>
        {/* <h3>Отправить {selectedFile.type.includes("image") ? "изображение" : "видео"}</h3> */}
        {/* {selectedFile.type.includes("image") && <img src={filePath} alt={selectedFile.name}></img>}
        {selectedFile.type.includes("video") && <video src={filePath} muted controls></video>}
        {selectedFile.type.includes("audio") && <audio src={filePath} controls contextMenu="false"></audio>} */}
        <div className="popup-file-buttons">
          <button onClick={cancelFile}>Отменить</button>
          <button onClick={() => {
            // sendFile(selectedFile);
          }}>Отправить</button>
        </div>
      </div>
    </div>
  )
}
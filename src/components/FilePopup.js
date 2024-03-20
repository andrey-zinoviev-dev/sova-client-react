import "./FilePopup.css";

export default function FilePopup({ selectedFile, cancelFile, sendFile }) {
  const filePath = window.URL.createObjectURL(selectedFile);
  // console.log(filePath);
  return (
    <div className="popup-file">
      <div className="container">
        <h3>Отправить {selectedFile.type.includes("image") ? "изображение" : "видео"}</h3>
        {selectedFile.type.includes("image") && <img src={filePath} alt={selectedFile.name}></img>}
        {selectedFile.type.includes("video") && <video src={filePath} muted controls></video>}
        <div className="popup-file-buttons">
          <button onClick={cancelFile}>Отменить</button>
          <button onClick={() => {
            sendFile(selectedFile);
          }}>Отправить</button>
        </div>
      </div>
    </div>
  )
}
import React from "react";

export default function SelectedFiles({selectedFiles}) {
    React.useEffect(() => {
        console.log(selectedFiles);
    }, [selectedFiles]);
    //states

    return (
        <section style={{visibility: "hidden", pointerEvents: "none", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backdropFilter: "blur(2px)", color: "white"}}>
            <h3>Файлы</h3>
            <button>Закрыть</button>
            <ul>
                {selectedFiles.map((file, index) => {
                    return <li key={index}>{file.name}</li>
                })}
            </ul>
            
        </section>
    )
};
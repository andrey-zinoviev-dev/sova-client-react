import React from "react";
import { motion } from "framer-motion";
export default function SelectedFiles({selectedFiles, setSelectedFiles}) {
    // //states
    // const {}
    //variants
    const filesVariants = {
        opened: {
            maxWidth: 180,
            display: "flex",
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            }
        },
        closed: {
            maxWidth: 0,
            transition: {
                duration: 0.5, 
                ease: "easeInOut", 

            },
            transitionEnd: {
                display: "none",
            }
        }
    };

    //functions
    function removeFile(file) {
        // console.log(selectedFiles);
        // console.log(file);
        setSelectedFiles((prevValue) => {
            return prevValue.filter((fileToFilter) => {
                return fileToFilter.name !== file.name;
            })
        })
    };

    React.useEffect(() => {
        console.log(selectedFiles);
    }, [selectedFiles]);
    //states

    return (
        <motion.section variants={filesVariants} initial="closed" animate={selectedFiles.length > 0 ? "opened" : "closed"} style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" /*padding: "0 20px",*/,  color: "white", borderLeft: "2px solid rgba(93, 176, 199, 0.5)", boxSizing: "border-box", padding: "0 20px"}}>
            <h3>Файлы</h3>
            {/* <button>Закрыть</button> */}
            <ul style={{padding: 0, margin: 0, listStyle: "none", width: "100%"}}>
                {selectedFiles.length > 0 && selectedFiles.map((file, index) => {
                    return <li key={index} style={{width: "100%"}}>
                        {file.type.includes('image') && <div style={{position: "relative"}}>
                            <button style={{position: "absolute", top: 0, right: 0, padding: 0, boxSizing: "border-box", width: 25, height: 25, borderRadius: "51%", border: "2px solid white", backgroundColor: "rgb(93, 176, 199)", color: "white"}} onClick={() => {
                                removeFile(file);
                            }}>X</button>
                            <img style={{width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: 9}} src={file.relPath} alt={file.name}></img>
                            <span>{file.name}</span>
                        </div>}
                        {file.type.includes('audio') && <audio controls src={file.relPath}></audio>}
                        {file.type.includes('video') && <div style={{position: "relative"}}>
                            <button style={{position: "absolute", top: 0, right: 0, padding: 0, boxSizing: "border-box", width: 25, height: 25, borderRadius: "51%", border: "2px solid white", backgroundColor: "rgb(93, 176, 199)", color: "white"}} onClick={() => {
                                removeFile(file);
                            }}>X</button>
                            <video style={{width: "100%", borderRadius: 9}} controls muted src={file.relPath}></video>
                            <span>{file.name}</span>
                        </div>}
                    </li>
                })}
            </ul>
            
        </motion.section>
    )
};
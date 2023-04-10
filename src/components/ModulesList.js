import React from "react";
import { motion } from "framer-motion";
function ModulesList({selectedModuleLessons}) {
    const liMotion = {
        rest: {border: '2px solid rgba(211, 124, 82, 0)', transition: { ease: "easeInOut", duration: 0.25 }},
        hover: {border: '2px solid rgba(211, 124, 82, 1)', transition: { ease: "easeInOut", duration: 0.25 }},
    }
    // React.useEffect(()=> {
    //     console.log(selectedModuleLessons);
    // }, [selectedModuleLessons])

    return (
        <ul style={{listStyle: "none", padding: 0, lineHeight: 2.5}}>
            {selectedModuleLessons.map((lesson) => {
                return <motion.li whileHover="hover" initial="rest" variants={liMotion} key={lesson._id} style={{color: "white", fontSize: 18, padding: "0 20px", borderRadius: 9}}>
                    {lesson.title}
                </motion.li>
            })}
        </ul>
    )
};

export default ModulesList;
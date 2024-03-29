import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
function ModulesList({selectedModule, selectedCourse}) {
    const navigate = useNavigate();

    const liMotion = {
        rest: {border: '2px solid rgba(211, 124, 82, 0)', transition: { ease: "easeInOut", duration: 0.25 }},
        hover: {border: '2px solid rgba(211, 124, 82, 1)', transition: { ease: "easeInOut", duration: 0.25 }},
    }
    // React.useEffect(()=> {
    //     // console.log(selectedModule);
    //     console.log(selectedCourse);
    // }, [selectedModule, selectedCourse])

    return (
        <ul style={{listStyle: "none", padding: 0, lineHeight: 2.5}}>
            {selectedModule.lessons.map((lesson) => {
                return <motion.li onClick={() => {

                    navigate(`../courses/${selectedModule.course}/modules/${selectedModule._id}/lessons/${lesson._id}`, {
                        state: {selectedCourse}
                    })

                    // redirect(`../courses/${selectedModule.course}/modules/${selectedModule._id}/lessons/${lesson._id}`)
                }} whileHover="hover" initial="rest" variants={liMotion} key={lesson._id} style={{color: "white", fontSize: 18, padding: "0 20px", borderRadius: 9}}>
                    {/* <Link to={`../courses/${selectedModule.course}/modules/${selectedModule._id}/lessons/${lesson._id}`}>{lesson.title}</Link> */}
                    {lesson.title}
                </motion.li>
            })}
        </ul>
    )
};

export default ModulesList;
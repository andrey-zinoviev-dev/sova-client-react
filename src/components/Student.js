import React from "react";
import { motion } from "framer-motion";
export default function Student({student, setStudentsToAddToCourse}) {
  //states
  const [activeStudent, setActiveStudent] = React.useState(false);
  return (
    <li style={{ width: 225, height: 40, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", boxSizing: "border-box", border: "none", borderRadius: 9}}>
      <motion.button whileHover={{backgroundColor:"rgba(255, 255, 255, 1)", color: "rgb(0, 0, 0)"}} style={{backgroundColor: activeStudent ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)", color: activeStudent ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)"}} type="button" className="main__courses-student" onClick={(evt) => {
        setStudentsToAddToCourse((prevValue) => {
          if(prevValue.has(student._id)) {
            const setToInsert = new Set(prevValue);
            setToInsert.delete(student._id);
            return setToInsert;
          } else {
            return new Set(prevValue).add(student._id);
          }  
        })
        setActiveStudent(true);
      }}>{student.email}</motion.button>
    </li>
  )
};

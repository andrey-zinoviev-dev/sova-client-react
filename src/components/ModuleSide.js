import React from "react";
import './CourseModule.css';
import './ModuleSide.css';
import { motion } from "framer-motion";
export default function ModuleSide({children, menuOpened}) {
  const menuVariants = {
    closed: {width: 60, transition: {duration: 0.75, ease: "easeInOut", delay: 0.3}},
    opened: {width: 310, transition: {duration: 0.75, ease: "easeInOut", delay: 0.3}},
  };

  const menuVariantsMobile = {
    opened: {left: "0%", transition: {duration: 0.75, ease: "easeInOut", }},
    closed: {left: "-100%", transition: {duration: 0.75, ease: "easeInOut", delay: 0.3}}
  }

  return (
    <motion.div className="module__side" initial="closed" animate={menuOpened ? "opened" : "closed"} variants={window.innerWidth < 768 ? menuVariantsMobile : menuVariants}>
      {children}
    </motion.div>
  )
}
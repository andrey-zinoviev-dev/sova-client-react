import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPen, faXmark, faLock, faAnglesDown, faCamera, faPlus, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../context/userContext";
import Menu from "./Menu";
import Dashboard from "./Dashboard";
import CourseModulesPopup from "./CourseModulesPopup";
import ModulesList from "./ModulesList";
import PopupWithForm from "./PopupWithForm";
import AddModulePopup from "./AddModulePopup";
import AddLessonPopup from "./AddLessonPopup";
import AddUser from "./AddUser";
import NoCourses from '../images/Group_20.png'
// import AddCourse from "./AddCourse";
import './Courses.css';
import {  
  apiGetCourses,
  apiGetAllStudents,
  apiAddStudentsToCourse,
  apiEditCourse,
  apiDeleteModule,
  apiDeleteLesson,
  apiEditModuleCover,
  apiEditLessonCover,
  apiAddLessonToCourse,
  apiRegister
} from '../api';
import axiosClient from '../axios';
import EditCourse from "./EditCourse";
import EditModule from "./EditModule";
import EditLesson from "./EditLesson";
// import Student from "./Student"
import TipTapEditor from "./TipTapEditor";
import EditLessonContent from "./EditLessonContent";

export default function Courses({ socket, setCourseInEdit, logout, loggedIn, registerFormSubmit }) {
  //naviagte
  const navigate = useNavigate();
  //contexts
  const loggedInUser = React.useContext(UserContext);

  //token
  const token = localStorage.getItem('token');

  //state variables
  const [coursesData, setCoursesData] = React.useState({
    courses: [],
    allStudents: [],
  });
  const [selectedCourseId, setSelectedCourseId] = React.useState("");
  const [selectedModuleId, setSelectedModuleId] = React.useState("");
  const [selectedLessonId, setSelectedLessonId] = React.useState("");
  const [modulesPopupOpened, setModulesPopupOpened] = React.useState(false);
  const [isEditCourse, setIsEditCourse] = React.useState(false);
  const [isEditModule, setIsEditModule] = React.useState(false);
  const [isEditLesson, setIsEditLesson] = React.useState(false);
  const [courseCover, setCourseCover] = React.useState("");
  const [addUserOpened, setAddUserOpened] = React.useState(false);
  const [popupOpened, setPopupOpened] = React.useState(false);
  const [studentsToAddToCourse, setStudentsToAddToCourse] = React.useState([]);
  const [addModulePopupOpened, setAddModulePopupOpened] = React.useState(false);
  const [addLessonPopupOpened, setAddLessonPopupOpened] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [lessonContent, setLessonContent] = React.useState({title: "", cover: "", content: {"type": "doc", "content": [
    // …
  ]}});
  const [coursesLoading, setCoursesLoading] = React.useState(false);
  const [lessonUploadProgress, setLessonUploadProgress] = React.useState(0);
  const [successfullyAddedUser, setSuccessfullyAddedUser] = React.useState(false);
  const [uploadFormSubmitted, setUploadFormSubmitted] = React.useState(false);
  const [uploadSuccessful, setUploadSuccessful] = React.useState(false);

  //derived states
  let foundCourse = coursesData.courses.find((course) => {
    return course._id === selectedCourseId;
  }) ? coursesData.courses.find((course) => {
    return course._id === selectedCourseId;
  }) : {name: "", description: "", author: "", modules: [], cover: "", students: []};

  const foundModule = foundCourse.modules.find((module) => {
    return module._id === selectedModuleId;
  }) ? foundCourse.modules.find((module) => {
    return module._id === selectedModuleId;
  }) : {title: "", author: {}, lessons: []};

  const foundLesson = foundModule.lessons.find((lesson) => {
    return lesson._id === selectedLessonId;
  }) ? foundModule.lessons.find((lesson) => {
    return lesson._id === selectedLessonId;
  }) : {title: "", cover: "", content: {"type": "doc", "content": [
    // …
  ]}};

  //variants
  const liGradient = {
    rest: {
      // translate: "0 -100%",
      // backgroundColor: "rgba(0, 0, 0, 1)",
      // backDropFilter: "blur(7px)",
      border: "2px solid rgb(52, 52, 60)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    },
    hover: {
      // translate: "0 0%",
      // backgroundColor: "rgba(0, 0, 0, 0.5)",
      // backDropFilter: "blur(0px)",
      border: "2px solid #5DB0C7",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    }
  };

  const liGradientDisabled = {
    rest: {
      // translate: "0 -100%",
      // backgroundColor: "rgba(0, 0, 0, 1)",
      // backDropFilter: "blur(7px)",
      border: "2px solid rgb(52, 52, 60)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    },
    hover: {
      // translate: "0 0%",
      // backgroundColor: "rgba(0, 0, 0, 0.5)",
      // backDropFilter: "blur(0px)",
      border: "2px solid rgb(249, 249, 249)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    }
  };

  const liContent = {
    rest: {
      border: "2px solid rgb(93, 176, 199)",
      color: "rgb(93, 176, 199)",
    },
    hover: {
      border: "2px solid rgba(255, 255, 255, 1)",
      color: "rgba(255, 255, 255, 1)"
    }
  };

  const dotColor = {
    rest: {
      // border: "2px solid rgb(93, 176, 199)",
      backgroundColor: "rgb(93, 176, 199)",
    },
    hover: {
      // border: "2px solid rgba(255, 255, 255, 1)",
      backgroundColor: "rgba(255, 255, 255, 1)"
    }
  };

  const authorColor = {
    rest: {
      color: "rgb(64, 64, 64)"
    },
    hover: {
      color: "rgba(252, 249, 249, 0.65)",
    }
  }

  //refs
  const buttonsRef = React.useRef();
  const ulRef = React.useRef();
  const courseNameRef = React.useRef();
  const courseDescRef = React.useRef();
  const courseCoverRef = React.useRef();

  const addModuleNameRef = React.useRef();
  const addMoudleImg = React.useRef();
  const addModuleImgInput = React.useRef();
  const addLessonImgRef = React.useRef();
  const addLessonImgInput = React.useRef();
  const editModuleNameRef = React.useRef();
  const editModuleImgRef = React.useRef();
  const editModuleImgInput = React.useRef();
  const lessonNameRef = React.useRef();
  const editLessonImgRef = React.useRef();
  const editLessonImgInput = React.useRef();

  //functions
  function showCoursePopup(courseId) {
    setSelectedCourseId(courseId);
    setModulesPopupOpened(true);
  }

  function closeCoursePopup() {
    setModulesPopupOpened(false);
    setSelectedCourseId("");
  };

  function handleCoverEdit() {
    const relativePath = window.URL.createObjectURL(courseCoverRef.current.files[0]);
    setCourseCover(relativePath);
    // setCourseCover(courseCoverRef.current.files[0]);
  };

  function handleModuleCoverUpload(evt) {
    const newCover = evt.target.files[0];
    const relativePath = window.URL.createObjectURL(newCover);
    addMoudleImg.current.src = relativePath;
    newCover.clientPath = relativePath;
    newCover.title = newCover.name;
    // console.log(newCover);
    setSelectedFiles((prevValue) => {
      return [...prevValue, newCover];
    })
  };

  function handleLessonCoverUpload(evt) {
    const newCover = evt.target.files[0];
    addLessonImgRef.current.src = window.URL.createObjectURL(newCover);
    newCover.title = newCover.name;
    setLessonContent((prevValue) => {
      return {...prevValue, cover: {title: newCover.title}}
    });
    setSelectedFiles((prevValue) => {
      return [...prevValue, newCover];
    });
  }

  function handleModuleEditCoverUpload(evt) {
    const newCover = evt.target.files[0];
    const relativePath = window.URL.createObjectURL(newCover);
    editModuleImgRef.current.src = relativePath;
    newCover.clientPath = relativePath;
    newCover.title = newCover.name;

    return newCover;
  };

  function handleLessonEditCoverUpload(evt) {
    const newCover = evt.target.files[0];
    const relativePath = window.URL.createObjectURL(newCover);
    editLessonImgRef.current.src = relativePath;
    newCover.clientPath = relativePath;
    newCover.title = newCover.name;
    return newCover;
  };

  React.useEffect(() => {
    const userToken = localStorage.getItem('token');

    if(userToken) {
      setCoursesLoading(true);
      const coursesFromApi = apiGetCourses(userToken)

      const allStudentsFromApi = apiGetAllStudents(userToken)

      Promise.all([coursesFromApi, allStudentsFromApi])
      .then(([coursesReceived, studentsReceived]) => {
        // console.log(coursesReceived);
        // console.log(coursesIds);
        const coursesToRender =  loggedInUser.admin ? coursesReceived.filter((courseReceived) => {
          return courseReceived.author && courseReceived.author._id === loggedInUser._id;
        }) 
        : 
        // coursesReceived
        coursesReceived.map((courseReceived) => {
          
          return loggedInUser.courses.find((userCourse) => {
            return userCourse.id === courseReceived._id;
          }) ? courseReceived : {...courseReceived, available: false};
        });

        // console.log(coursesToRender);

        setCoursesData({courses: coursesToRender, allStudents: studentsReceived});
        setCoursesLoading(false);
      })
    }
  }, []);

  // React.useEffect(() => {
  //   console.log(loggedInUser);
  // }, [loggedInUser]);

  // React.useEffect(() => {
  //   console.log(selectedFiles);
  // }, [selectedFiles])

  // React.useEffect(() => {
  //   console.log(coursesLoading);
  // }, [coursesLoading])

  // React.useEffect(() => {
  //   console.log(coursesData);
  // }, [coursesData])

  return (
    <>
      <section className="main__courses">
        <Dashboard setAddUserOpened={setAddUserOpened} logout={logout} loggedIn={loggedIn}/>

        <div style={{display: "flex", alignItems: "stretch", justifyContent: "space-between", width: "100%"}}>
          <h2 className="main__courses-headline" style={{textAlign: "left", fontWeight: 400, color: "#747374"}}>
          Добро пожаловать в Школу Экстремального вокала<span style={{color: "rgb(93, 176, 199)"}}> Саши Совы</span><span style={{color: "rgb(93, 176, 199)"}}>.</span></h2>
        </div>
        {coursesLoading ? <div className="main__courses-loader">
          <svg className="main__courses-loader-svg" version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="940.000000pt" height="1847.000000pt" viewBox="0 0 940.000000 1847.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,1847.000000) scale(0.100000,-0.100000)"
            fill="white" stroke="none">
            <path d="M4470 18464 c-843 -57 -1527 -265 -2197 -670 -85 -52 -160 -94 -165
            -94 -8 0 -2012 724 -2092 756 -18 7 -18 -4 -13 -367 5 -402 12 -484 57 -710
            81 -404 262 -797 529 -1148 l59 -78 -50 -89 c-262 -468 -442 -982 -532 -1524
            -60 -364 -59 -326 -63 -1907 l-4 -1452 38 -10 c21 -5 175 -44 343 -86 378 -95
            808 -218 1133 -325 l247 -81 0 -1107 c0 -639 4 -1156 10 -1222 50 -583 268
            -1133 632 -1592 101 -128 332 -360 458 -460 535 -424 1169 -648 1840 -648 671
            0 1305 224 1840 648 126 100 357 332 458 460 364 459 582 1009 632 1592 6 66
            10 583 10 1221 l0 1105 278 92 c414 137 699 219 1152 332 135 33 262 66 283
            71 l38 10 -4 1452 c-4 1581 -3 1543 -63 1907 -90 542 -270 1056 -532 1524
            l-50 89 59 78 c267 351 448 744 529 1148 45 226 52 308 57 710 5 363 5 374
            -13 367 -80 -32 -2084 -756 -2092 -756 -5 0 -80 42 -165 94 -603 364 -1245
            577 -1962 652 -136 14 -575 26 -685 18z m708 -758 c696 -95 1270 -320 1834
            -722 81 -57 153 -104 160 -104 7 0 323 113 702 250 379 138 692 248 694 245
            16 -15 -92 -281 -170 -420 -121 -215 -262 -397 -483 -624 -192 -197 -340 -329
            -816 -727 -717 -600 -980 -852 -1277 -1223 -112 -140 -279 -387 -358 -531 -71
            -128 -753 -1302 -764 -1313 -6 -7 -606 1011 -785 1333 -80 143 -234 371 -347
            511 -290 363 -571 633 -1223 1177 -503 420 -603 509 -820 726 -265 265 -401
            437 -533 671 -78 139 -186 405 -170 420 2 3 315 -107 694 -245 379 -137 695
            -250 702 -250 7 0 79 47 160 104 507 360 1044 588 1628 690 77 13 189 29 249
            35 61 6 124 13 140 15 77 10 676 -3 783 -18z m-3894 -2209 c57 -52 194 -169
            304 -262 l200 -169 -49 -55 c-159 -178 -282 -424 -335 -671 -27 -122 -27 -429
            0 -555 62 -296 209 -561 427 -770 207 -200 438 -322 719 -382 149 -32 385 -36
            530 -10 173 32 402 122 526 208 l43 29 63 -107 c35 -60 270 -462 523 -895 388
            -666 460 -785 470 -770 7 9 211 359 455 777 243 418 474 813 512 878 l69 117
            43 -29 c124 -86 353 -176 526 -208 145 -26 381 -22 530 10 281 60 512 182 719
            382 218 209 365 474 427 770 27 126 27 433 0 555 -53 247 -176 493 -335 671
            l-49 55 200 169 c110 93 247 211 305 263 57 52 106 92 108 90 11 -11 117 -245
            158 -348 124 -315 198 -604 254 -992 14 -98 17 -270 20 -1305 l4 -1192 -43
            -11 c-140 -36 -506 -142 -710 -206 -1157 -361 -2214 -868 -3084 -1479 l-82
            -57 -153 105 c-671 456 -1435 844 -2304 1169 -411 154 -1034 349 -1493 468
            l-43 11 4 1192 c4 1280 2 1224 57 1535 45 253 126 537 224 779 47 116 146 333
            153 333 2 0 51 -42 107 -93z m886 -1258 c15 -84 72 -188 136 -252 161 -160
            412 -182 604 -52 l49 33 74 -96 c77 -102 175 -244 221 -325 l28 -47 -23 -20
            c-38 -32 -199 -109 -264 -125 -85 -21 -235 -19 -329 5 -247 63 -450 259 -528
            510 -30 98 -32 272 -4 368 10 34 20 61 22 59 2 -2 8 -28 14 -58z m5104 -174
            c1 -99 -3 -133 -22 -195 -138 -445 -624 -659 -1022 -449 -41 22 -86 48 -99 59
            l-23 20 28 47 c46 81 144 223 221 325 l74 96 49 -33 c73 -49 154 -77 241 -83
            251 -16 457 153 505 413 l7 40 20 -60 c15 -46 20 -89 21 -180z m-4467 -3807
            c616 -281 1173 -612 1717 -1020 l209 -157 161 123 c546 417 1155 785 1769
            1070 l97 45 0 -684 0 -684 -582 -3 -583 -3 -67 -32 c-162 -76 -258 -224 -258
            -397 0 -192 111 -350 295 -418 59 -22 73 -23 597 -28 l536 -5 -39 -120 c-68
            -207 -184 -427 -320 -607 -80 -107 -280 -307 -387 -387 -296 -224 -645 -365
            -1012 -411 -109 -13 -371 -13 -480 0 -532 66 -1024 336 -1354 744 -160 198
            -291 435 -365 661 l-39 120 521 5 c508 6 524 6 582 28 121 45 215 132 266 247
            47 107 35 285 -27 391 -37 63 -126 141 -201 177 l-68 32 -567 3 -568 3 0 689
            c0 380 2 690 5 690 3 0 76 -32 162 -72z"/>
            <path d="M3495 16771 c-66 -26 -172 -74 -235 -106 -123 -61 -350 -195 -350
            -206 0 -3 60 -50 133 -103 291 -211 504 -393 796 -681 252 -249 396 -404 663
            -718 103 -120 189 -219 191 -220 3 -1 90 97 193 218 269 316 412 471 665 720
            292 288 505 470 797 681 72 53 132 100 132 103 0 12 -228 146 -355 209 -132
            65 -342 152 -369 152 -19 0 -193 -137 -385 -304 -69 -60 -250 -234 -401 -385
            l-275 -276 -275 276 c-151 151 -332 325 -401 385 -196 170 -366 304 -386 304
            -10 0 -72 -22 -138 -49z"/>
            <path d="M318 10101 c-122 -39 -215 -121 -271 -239 l-32 -67 -3 -700 c-3 -703
            1 -854 34 -1110 46 -365 151 -771 289 -1120 103 -262 296 -629 461 -878 332
            -498 803 -969 1301 -1301 253 -167 601 -351 863 -455 376 -149 810 -259 1193
            -302 l107 -13 0 -618 0 -618 -880 0 c-563 0 -916 -4 -978 -11 -368 -41 -707
            -181 -991 -409 -341 -275 -575 -660 -668 -1100 -24 -110 -27 -149 -27 -320 -1
            -206 4 -238 52 -355 51 -126 165 -268 273 -342 69 -48 161 -91 246 -115 l78
            -23 3335 0 3335 0 78 23 c288 83 498 306 562 596 25 114 16 375 -19 541 -171
            814 -831 1412 -1658 1504 -62 7 -415 11 -978 11 l-880 0 0 618 0 618 108 13
            c382 43 816 153 1192 302 262 104 610 288 863 455 498 332 969 803 1301 1301
            165 249 358 616 461 878 138 349 243 755 289 1120 33 256 37 407 34 1110 l-3
            700 -32 67 c-162 343 -634 343 -796 1 l-32 -68 -6 -725 c-7 -778 -12 -871 -65
            -1158 -36 -200 -69 -325 -134 -522 -454 -1374 -1658 -2379 -3091 -2579 -1039
            -145 -2086 142 -2909 798 -577 461 -1009 1081 -1240 1781 -65 197 -98 322
            -134 522 -53 287 -58 380 -65 1158 l-6 725 -32 68 c-95 201 -321 303 -525 238z
            m6663 -8316 c264 -46 509 -204 660 -427 82 -120 148 -290 164 -422 l7 -56
            -3112 0 -3112 0 7 56 c16 131 82 302 162 420 151 222 395 382 652 428 117 22
            4451 23 4572 1z"/>
            </g>
          </svg>
          <p className="main__courses-loader-p">Загрузка курсов</p>
        </div>
        :
          coursesLoading ? <p style={{color: "white"}}>Загрузка курсов...</p> : coursesData.courses.length > 0 ?  <ul ref={ulRef} className="main__courses-list">
          {coursesData.courses.map((course, index) => {
            return <motion.li variants={course.available ? liGradient : liGradientDisabled} initial="rest" whileHover="hover" animate="rest" className="main__courses-list-element" key={course._id} style={{overflow:"hidden", width: "100%", boxShadow: "rgba(0, 0, 0, 0.75) 5px 5px 10px", position: "relative", borderRadius: 5, border: "2px solid #34343C", boxSizing: "border-box"}}>
              <motion.div style={{zIndex: 16, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgb(0, 0, 0, 0.35)"}}></motion.div>
              <img style={{position: "absolute", top: 0, left: 0, zIndex: 15, width: "100%", height: "100%", objectFit: "cover"}} src={course.cover} alt="обложка курса" />
              <button onClick={() => {
                showCoursePopup(course._id);
              }} style={{pointerEvents: !course.available && "none", position: "relative", zIndex: 20, width: "100%", height: "100%", backgroundColor: "transparent", borderRadius: 5, border: "none", boxSizing: "border-box", padding: "20px 35px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignContent: "flex-start"}}>
                
                <div style={{position: "relative", zIndex: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between", minWidth: 35, fontSize: 28, color: "white"}}>
                  <p style={{margin: 0}}>0{index + 1}</p>
                  <motion.div variants={dotColor} style={{backgroundColor: "#5DB0C7", width: 5, height: 5, borderRadius: "51%", margin: "0 0 6px 0"}}></motion.div>
                </div>
                <motion.div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "space-between", textAlign: "left", order: 2, width: "100%"}}>
                  <h3 style={{margin: 0, letterSpacing: 2, width: "100%", height: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "white", fontSize: 24}}>{course.name}</h3>
                  <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", margin: "10px 0 0 0"}}>
                    <motion.p style={{margin: 0, color: "rgb(249, 249, 249)", fontSize: 20}}>{course.author.name}</motion.p>
                
                    {!course.available && <FontAwesomeIcon style={{color: "#C7C7C9", width: "100%", height: "100%", maxWidth: 20 }} icon={faLock} />}
                  </div>

                </motion.div>
              </button>
              
              {loggedInUser._id && loggedInUser.admin &&
                <motion.button variants={liContent} onClick={() => {
                  setSelectedCourseId(course._id);
                  // setIsEditCourse(true);
                  navigate(`/editCourse/${course._id}`, {
                    state: course,
                  })
                }} style={{position: "absolute", top: "6.5%", right: 35, zIndex:25, display: window.innerWidth <= 767 ? "none" : 'flex', justifyContent: "center", alignItems: "center", width: 27, height: 27, borderRadius: "51%", backgroundColor: "transparent", border: "2px solid #5DB0C7", color: "#5DB0C7", fontSize: 10}}>
                  <FontAwesomeIcon icon={faPen}/>
                </motion.button>
              }
             
            
            </motion.li>
          })

        }
        </ul>
        :
        <div className="main__no-courses">
          <img src={NoCourses} alt="нет курсов"/>
          <p>Курсов нет</p>
        </div>
      }
      </section>

      {modulesPopupOpened && <CourseModulesPopup modulesPopupOpened={modulesPopupOpened}>
        <div className="popup__modules">
          <button className="popup__close popup__close_modules" onClick={closeCoursePopup}>
              <FontAwesomeIcon icon={faXmark} />
          </button>
          <img className="popup__modules-cover" alt={foundCourse.cover} src={foundCourse.cover}></img>
          <div className="popup__modules-content-wrapper">
            <h3 style={{margin: "0 0 30px 0"}} className="popup__modules-headline">{foundCourse.name}</h3>
            <div className="popup__modules-navigation">
              <button className="popup__modules-navigation-btn" onClick={() => {
                setSelectedModuleId("");
              }} style={{lineHeight: 1.5, backgroundColor: "transparent", border: "none", color: "rgb(255, 255, 255)", fontWeight: 700, padding: 0}}>Модули курса</button>
              {foundModule._id && <FontAwesomeIcon className="popup__modules-arrow-svg" icon={faArrowRight}/>}
              {foundModule._id && <span className="popup__modules-arrow-span">{foundModule.title}</span>}

            </div>
            
            {foundModule.lessons.length > 0 ? <ul className="popup__modules-ul">
                {foundModule.lessons.map((lesson) => {
                  return <li key={lesson._id} onClick={() => {
                    navigate(`../courses/${foundCourse._id}/modules/${foundModule._id}/lessons/${lesson._id}`)
                  }} className="popup__modules-ul-li">
                    <img className="popup__modules-ul-li-lesson-img" alt="обложка урока" src={lesson.cover}></img>
                    <p className="popup__modules-ul-li-lesson-p">{lesson.title}</p>
                  </li>
                })}
            </ul> : <ul className="popup__modules-ul">
              {foundCourse.modules.map((module, index) => {
                return <li key={module._id} onClick={() => {
                  setSelectedModuleId(module._id);
                }} className="popup__modules-ul-li">
                  <img className="popup__modules-ul-li-lesson-img" alt="обложка модуля" src={module.cover}></img>
                  <span className="popup__modules-ul-li-span">{`0${index + 1} ${module.title}`}</span>
                </li>
              })}  
            </ul>}
          </div>
          <div className="popup__modules-module-overlay"></div>
        </div>
        <div className="popup__overlay"></div>
      </CourseModulesPopup>}

      {/* {isEditCourse && <EditCourse>
        <div style={{position: "relative", width: "100%", maxWidth: 920}}>
          <button onClick={() => {
            setIsEditCourse(false);
            
            }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2 style={{fontSize: 36}}>Редактировать курс</h2>
          <form className="course-edit__form" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", textAlign: "left", margin: '0 0 30px 0'}}>
            <label style={{display: "block", margin: "0 0 10px 0"}} htmlFor="course-name">Название</label>
            <input className="course-edit__form-input" ref={courseNameRef} id="course-name" value={foundCourse.name} onChange={() => {}}></input>
          </form>
          <form className="course-edit__form" style={{display: "flex", maxWidth: "100%", justifyContent: "space-between", alignItems: "stretch", gap: 50}}>
            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
              <label style={{display: "block", margin: "0 0 20px 0"}} htmlFor="course-desc">Описание</label> 
              <textarea className="course-edit__form-textarea" ref={courseDescRef} value={foundCourse.description} onChange={(evt) => {
                console.log(evt.target.value);
              }}></textarea>
            </div>
            <div style={{textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", width: "100%"}}>
              <span style={{display: "block", margin: "0 0 20px 0"}}>Текущая обложка курса</span>
              <div style={{position: "relative", display: "flex"}}>
                <img style={{objectFit: "cover", width: "100%", aspectRatio: "16/10", height: "100%", boxSizing: "border-box", borderRadius: 9, border: "2px solid white"}} src={courseCover.length > 0 ? courseCover : foundCourse.cover} alt="Обложка курса"></img>
                <motion.button whileHover={{opacity: 1}} type="button" onClick={(() => {
                  courseCoverRef.current.click();
                })} style={{position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", fontSize: 20, bottom: 0, right: 0, opacity: 0, width: "100%", height: "100%", padding: 0, border: "none", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <p>Изменить обложку</p>
                  
                </motion.button>
                <input ref={courseCoverRef} onChange={handleCoverEdit} id="course-cover" type="file" style={{display: "none"}}></input> 
              </div>

            </div>
          </form>
          <div className="course-edit__modules-wrapper">
            <p style={{margin: "0 0 25px 0"}}>Модули</p>
            <ul className="course-edit__modules-ul">
              {foundCourse.modules.map((module) => {
                return <motion.li whileHover={{ border: "2px solid rgb(93, 176, 199)"}} className="course-edit__modules-ul-li" key={module._id}>
                  <button className="course-edit__modules-ul-li-edit" onClick={() => {
                    setIsEditModule(true);
                    setSelectedModuleId(module._id);
                  }} type="button">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button type="button" className="course-edit__modules-ul-li-delete" onClick={(evt) => {
                    evt.stopPropagation();

                    apiDeleteModule(foundCourse._id, module._id, token)
                    .then((data) => {
                      setCoursesData((prevValue) => {
                        const updatedCourses = prevValue.courses.map((course) => {
                          return course._id === data._id ? {...course, modules: data.modules} : course;
                        });
                        return {...prevValue, courses: updatedCourses};
                      });

                    });
                  }} style={{position: "absolute", border: "none", backgroundColor: "transparent", color: "white", fontSize: 18}}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <h3 className="course-edit__modules-ul-li-headline">{module.title}</h3>
                  
                  <img className="course-edit__modules-ul-li-img" src={module.cover} alt="обложка модуля"></img>
                  
                  <p className="course-edit__modules-ul-li-p">{module.lessons.length > 0 ? `Уроки ${module.lessons.length}` : `Уроков пока нет`}</p>
                </motion.li>
              })}
              <motion.li whileHover={{ border: "2px solid rgb(93, 176, 199)"}} className="course-edit__modules-ul-li" key="new-module">
                <h3 className="course-edit__modules-ul-li-headline">Добавить модуль</h3>
                <button onClick={() => {
                  setAddModulePopupOpened(true);
                }} type="button" className="course-edit__modules-ul-li-addButton">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </motion.li>
            </ul>
          </div>
          <div className="course-edit__students-wrapper">
            <p>Ученики</p>
            <div className="course-edit__students-wrapper-group course-edit__students-wrapper-group_allStudents">

              <p>Кого можно добавить</p>

              <ul className="course-edit__students-wrapper-ul">
                {coursesData.allStudents.filter((student) => {
                  return !foundCourse.students.find((courseStudent) => {
                    return courseStudent.email === student.email;
                  });
                }).map((courseStudent) => {
                  return <motion.li whileHover={{border: "2px solid #5DB0C7"}} className="course-edit__students-wrapper-ul-li" key={courseStudent._id}>
                    <button onClick={() => {
                      studentsToAddToCourse.find((studentToAdd) => {
                        return studentToAdd.studentId === courseStudent._id;
                      }) ? setStudentsToAddToCourse((prevValue) => {
                        return prevValue.filter((prevStudentToAdd) => {
                          return prevStudentToAdd.studentId !== courseStudent._id;
                        })
                      }) :
                      setStudentsToAddToCourse((prevValue) => {
                        return [...prevValue, {studentId: courseStudent._id, grade: "Rising Star"}];
                      })
                    }} className="course-edit__students-wrapper-ul-li-btn">
                      <p style={{margin: "0 0 20px 0"}}>{courseStudent.email}</p>
                      <div className="add-user__form-select-wrapper">
                      <label>Тариф</label>  
                      <select className="add-user__form-select" defaultValue="Rising Star" onClick={(evt) => {
                        evt.stopPropagation();

                        return;
                      }} onChange={(evt) => {
                       
                        setStudentsToAddToCourse((prevValue) => {
                          return prevValue.map((prevStudent) => {
                            return prevStudent.studentId === courseStudent._id ? {...prevStudent, grade: evt.target.value} : prevStudent;
                          })
                        })
                      }}>
                        <option className="add-user__form-select-option" value="Rising Star">Rising Star</option>
                        <option className="add-user__form-select-option" value="Headliner">Headliner</option>
                        <option className="add-user__form-select-option" value="Legend">Legend</option>
                      </select>
                      </div>
                    </button>
                    {studentsToAddToCourse.find((studentToAdd) => {
                        return studentToAdd.studentId === courseStudent._id;
                      }) && <div className="course-edit__students-wrapper-ul-li-selection-div">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>}
                  </motion.li>
                })}
              </ul>

              <button onClick={() => {
                
                apiAddStudentsToCourse(foundCourse._id, token, studentsToAddToCourse)
                .then((data) => {
                  console.log(data);
                  setCoursesData((prevData) => {
                    const updatedCourses = prevData.courses.map((course) => {
                      return course._id === data.course._id ? {...course, students: data.course.students} : course;
                    });
                    return {...prevData, courses: updatedCourses, allStudents: data.users};
                  })
                });
              }} className="course-edit__students-wrapper-btn" type="button">Добавить учеников</button>

            </div>
            <div className="course-edit__students-wrapper-group course-edit__students-wrapper-group_courseStudents">
              <p>Кто уже добавлен</p>
              <ul className="course-edit__students-wrapper-ul">
                {foundCourse.students.map((courseStudent) => {
                  return <li whileHover={{border: "2px solid #5DB0C7"}} className="course-edit__students-wrapper-ul-li" key={courseStudent._id}>
                    <p className="course-edit__students-wrapper-ul-li-p">{courseStudent.email}</p>
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>

      </EditCourse>} */}

      {addModulePopupOpened && <AddModulePopup>
        <div className="course__edit-addModule-wrapper" style={{position: "relative"}}>
          <button onClick={() => {
              setAddModulePopupOpened(false);
              // setSelectedCourse({});
              }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
              <FontAwesomeIcon icon={faXmark} />
          </button>
            <h3>Добавить модуль</h3>
            <form onSubmit={(evt) => {
              evt.preventDefault();
              // console.log(formData);
              const form = new FormData();
              const foundImg = selectedFiles.find((file) => {
                return file.clientPath === addMoudleImg.current.src;
              });
              form.append("moduleData", JSON.stringify({title: addModuleNameRef.current.value, lessons: [], cover: foundImg ? foundImg : addMoudleImg.current.src}));
              form.append('moduleCover', foundImg);
              axiosClient.put(`/courses/${foundCourse._id}`, form, {
                headers: {
                  'Authorization': token
                },
                onUploadProgress: (evt) => {
                  console.log(evt.loaded);
                }
              })
              .then((data) => {
                console.log(data);
              })
              // apiEditCourse(foundCourse._id, token, form)
              // .then((data) => {
              //   console.log(data);
              //   setCoursesData((prevValue) => {
              //     const { courses } = prevValue;
              //     const updatedCourses = courses.map((course) => {
              //       return course._id === data._id ? {...course, modules: data.modules} : course;
              //     })
              //     return {...prevValue, courses: updatedCourses};
              //   });
              //   setAddModulePopupOpened(false);
              //   setSelectedFiles([]);
              // })

            }} className="course__edit-addModule-wrapper-form">
              <div className="course__edit-addModule-wrapper-form-data">
                <div className="course__edit-addModule-wrapper-form-data-inputs">
                  <input ref={addModuleNameRef} className="course__edit-addModule-wrapper-form-input" type="text" placeholder="Название модуля"></input>
                  <input onChange={(evt) => {
                    addMoudleImg.current.src = evt.target.value;
                  }} className="course__edit-addModule-wrapper-form-input" type="text" placeholder="Ссылка на картинку"></input>
                </div>
                <div style={{position: "relative", display: "flex", alignItems: "flex-end"}}>
                  <img alt="обложка модуля" ref={addMoudleImg} style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={"https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}/>
                  <input ref={addModuleImgInput} onChange={(evt) => {
                    handleModuleCoverUpload(evt);

                  }}  style={{display: "none"}} type="file"></input>
                  <button type="button" onClick={(() => {
                    addModuleImgInput.current.click();
                  })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                </div>
              </div>

              <button type="submit" className="course__edit-addModule-wrapper-form-btn">Добавить модуль</button>
            </form>
        </div>
        
      </AddModulePopup>}

      {addLessonPopupOpened && <AddLessonPopup>
        <div className="module-edit__addLesson-wrapper" style={{position: "relative"}}>
          <button onClick={() => {
              setAddLessonPopupOpened(false);
              
              }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
              <FontAwesomeIcon icon={faXmark} />
          </button>
          <h3>Добавить урок</h3>
          {!uploadFormSubmitted ? <form onSubmit={(evt) => {
            evt.preventDefault();
            setUploadFormSubmitted(true);

              const form = new FormData();
              
              form.append("moduleData", JSON.stringify(lessonContent));
             
              selectedFiles.forEach((file) => {
                form.append("files", file);
              });

              axiosClient.put(`/courses/${foundCourse._id}/modules/${foundModule._id}`, form, {
                headers: {
                  'Authorization': token,
                },
                onUploadProgress: (evt) => {
                  setLessonUploadProgress(evt.progress);
                }
              })
              .then((data) => {
                
                setUploadSuccessful(true);
                setLessonContent({title: "", cover: "", content: {"type": "doc", "content": [
                  // …
                ]}});
                setSelectedFiles([]);
                setCoursesData((prevValue) => {
                  return {...prevValue, courses: prevValue.courses.map((course) => {
                    console.log(course._id, data);
                    return course._id === data.data._id ? {...course, modules: data.data.modules} : course;
                  })};
                });
                
              })

              // console.log(lessonContent);
              // console.log(selectedFiles);

              // apiAddLessonToCourse(foundCourse._id, foundModule._id, token, form)
              // .then((data) => {
              //   console.log(data);
              //   setCoursesData((prevValue) => {
              //     return {...prevValue, courses: prevValue.courses.map((course) => {
              //       return course._id === data._id ? {...course, modules: data.modules} : course;
              //     })};
              //   });

              //   setAddLessonPopupOpened(false);
              //   setLessonContent({title: "", cover: "", content: {"type": "doc", "content": [
              //     // …
              //   ]}});
              //   setSelectedFiles([]);
              // })

          }} className="course__edit-addLesson-wrapper-form">
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 0 25px 0"}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between", gap: 15, width: "100%", maxWidth: 320}}>
                <input className="course__edit-addLesson-wrapper-form-input" onChange={(evt) => {
                  setLessonContent((prevValue) => {
                    return {...prevValue, title: evt.target.value};
                  })
                }} type="text" placeholder="Название урока"></input>
                <input className="course__edit-addLesson-wrapper-form-input" type="text" placeholder="Ссылка на картинку"></input>
              </div>
              <div style={{position: "relative", display: "flex", alignItems: "flex-end"}}>
                <img ref={addLessonImgRef} alt="обложка урока" style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={"https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}/>
                <input ref={addLessonImgInput} onChange={(evt) => {
                  handleLessonCoverUpload(evt);

                }} style={{display: "none"}} type="file"></input>
                <button type="button" onClick={(() => {
                  addLessonImgInput.current.click();
                })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>
            </div>

            <TipTapEditor selectedFiles={selectedFiles} lessonContent={lessonContent} setLessonContent={setLessonContent} setSelectedFiles={setSelectedFiles}>
            </TipTapEditor>
            <button type="submit" className="course__edit-addLesson-wrapper-form-btn">Добавить урок</button>
          </form>
          :
          <div style={{margin: "auto 0"}}>
            <p style={{color: "white"}}>Загрузка контента урока</p>
            <div style={{backgroundColor: "white", display: "flex", height: 4, borderRadius:9, alignItems: "stretch", justifyContent: "flex-start"}}>
              <div style={{backgroundColor: "rgb(93, 176, 199)", borderRadius: 9, width: `${lessonUploadProgress * 100}%`}}></div>
            </div>
            {uploadSuccessful && <button style={{
              width: 210,
              height: 40,
              backgroundColor: "transparent",
              border: "2px solid rgb(93, 176, 199)",
              borderRadius: 9,
              color: "white",
              margin: "20px 0 0 0",
            }} type="button" onClick={() => {
                setUploadFormSubmitted(false);

                setAddLessonPopupOpened(false);
                setLessonUploadProgress(0);
            }}>Вернуться к урокам модуля</button>}
          </div>
          }

        </div>
      </AddLessonPopup>}
      
      {isEditModule && <EditModule>
        <div className="module-edit__wrapper">
          <button className="module-edit__close-btn" onClick={() => {
            setIsEditModule(false);
            }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h3 className="module-edit__headline">Редактировать модуль</h3>
          <form className="module-edit__form">
            <div className="module-edit__form-inputs-wrapper">
              <div className="module-edit__form-inputs-wrapper-title">
                <p className="module-edit__form-inputs-wrapper-title-p">Название</p>
                <input ref={editModuleNameRef} className="module-edit__form-inputs-wrapper-title-input" type="text" placeholder="Название модуля" value={foundModule.title}></input>

              </div>
              <div className="module-edit__form-inputs-wrapper-cover">
                <div className="module-edit__form-inputs-wrapper-cover-link">
                  <p className="module-edit__form-inputs-wrapper-cover-link-p">Обложка</p>
                  <input className="module-edit__form-inputs-wrapper-title-input" onChange={(evt) => {
                      const form = new FormData();
                      form.append("coverFile", JSON.stringify({link: evt.target.value}));
                      // apiEditModuleCover(foundCourse._id, foundModule._id, token, form)
                      // .then((data) => {
                      //   setCoursesData((prevValue) => {
                      //     const updatedCourses = prevValue.courses.map((course) => {
                      //       return course._id === data._id ? {...course, modules: data.modules} : course;
                      //     });
  
                      //     return {...prevValue, courses: updatedCourses};
                      //   })
                      // })
                  }} style={{maxWidth: 360}} type="text" placeholder="Ссылка на картинку">
                  </input>
                </div>
                <div style={{position: "relative", display: "flex", alignItems: "flex-end"}}>
                  <img alt="обложка модуля" ref={editModuleImgRef} style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={foundModule.cover ? foundModule.cover : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}/>
                  <input ref={editModuleImgInput} onChange={(evt) => {
                    const coverToSend = handleModuleEditCoverUpload(evt);
                    const form = new FormData();
                    form.append("coverFile", JSON.stringify({title: coverToSend.title, clientPath: coverToSend.clientPath}));
                    form.append('file', coverToSend);
                    // apiEditModuleCover(foundCourse._id, foundModule._id, token, form)
                    // .then((data) => {
                      
                    //   setCoursesData((prevValue) => {
                    //     const updatedCourses = prevValue.courses.map((course) => {
                    //       return course._id === data._id ? {...course, modules: data.modules} : course;
                    //     });

                    //     return {...prevValue, courses: updatedCourses};
                    //   });
                    //   setSelectedFiles([]);
                    // })

                  }} style={{display: "none"}} type="file"></input>
                  <button type="button" onClick={(() => {
                    editModuleImgInput.current.click();
                  })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                </div>
                {/* <button type="button">Изменить обложку</button> */}
              </div>

            </div>
          </form>
          <div>
            <p>Уроки</p>
            <ul className="module-edit__lessons-ul">
              {foundModule.lessons.map((lesson) => {
                return <motion.li whileHover={{border: "2px solid #ffffff"}} className="module-edit__lessons-ul-li" key={lesson._id}>
                  <img className="module-edit__lessons-ul-li-img" src={lesson.cover} alt="обложка урока"></img>
                  <h3 className="module-edit__lessons-ul-li-headline">{lesson.title}</h3>
                  <div className="module-edit__lessons-ul-li-buttons">
                    <button onClick={() => {
                      apiDeleteLesson(foundCourse._id, foundModule._id, lesson._id, token)
                      .then((data) => {
                        setCoursesData((prevValue) => {
                          return {...prevValue, courses: prevValue.courses.map((course) => {
                            return course._id === data._id ? {...course, modules: data.modules} : course;
                          })};
                        });
                      })
                      // setCoursesData((prevValue) => {
                      //   return {...prevValue, courses: prevValue.courses.}
                      // })
                      // setSelectedLessonId(lesson._id);
                    }} className="module-edit__lessons-ul-li-buttons-btn">
                      <motion.svg whileHover={{fill: "#ffffff"}} fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></motion.svg>
                    </button>
                    <button onClick={() => {
                     
                      setSelectedLessonId(lesson._id);
                      setIsEditLesson(true);
                    }} className="module-edit__lessons-ul-li-buttons-btn">
                      <motion.svg whileHover={{fill: "#ffffff"}}  fill="#5DB0C7" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></motion.svg>
                    </button>
                  </div>
                </motion.li>
                // <motion.li></motion.li>
              })}
              <motion.li className="module-edit__lessons-ul-li" key="new-lesson" style={{justifyContent: "center"}}>
                <button onClick={() => {
                  setAddLessonPopupOpened(true);
                }} type="button" className="module-edit__lessons-ul-li-addButton">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </motion.li>
            </ul>
          </div>

        </div>

      </EditModule>}

      {isEditLesson && <EditLesson>
        <div className="lesson-edit__wrapper">
          <button className="lesson-edit__close-btn" onClick={() => {
            setIsEditLesson(false);
            }} style={{position: "absolute", top: "3%", right: "-5%", padding: 0, width: 40, height: 40, border: "2px solid #f91262", color: "#f91262", backgroundColor: "transparent", borderRadius: "51%"}}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h3 className="lesson-edit__headline">Редактировать урок</h3>
          <form className="lesson-edit__form">
            <div className="lesson-edit__form-inputs-wrapper-title">
              <p className="lesson-edit__form-inputs-wrapper-title-p">Название</p>
              <input ref={lessonNameRef} value={foundLesson.title} className="lesson-edit__form-inputs-wrapper-title-input" type="text" placeholder="Название урока"></input>
            </div>
            <div className="lesson-edit__form-inputs-wrapper-cover">
              <div className="lesson-edit__form-inputs-wrapper-cover-link">
                <p className="lesson-edit__form-inputs-wrapper-cover-link-p">Обложка</p>
                <input className="lesson-edit__form-inputs-wrapper-title-input" onChange={(evt) => {
                      const form = new FormData();
                      form.append("coverFile", JSON.stringify({link: evt.target.value}));

                      apiEditLessonCover(foundCourse._id, foundModule._id, foundLesson._id, token, form)
                      .then((data) => {
                        setCoursesData((prevValue) => {
                          return {...prevValue, courses: prevValue.courses.map((course) => {
                            return course._id === data._id ? {...course, modules: data.modules} : course;
                          })};
                        })
                      });
                  }} style={{maxWidth: 360}} type="text" placeholder="Ссылка на картинку">
                </input>
              </div>
              <div style={{position: "relative", display: "flex", alignItems: "flex-end"}}>
                <img alt="обложка урока" ref={editLessonImgRef} style={{maxWidth: 140, aspectRatio: "1/1", borderRadius: 9, objectFit: "cover"}} src={foundLesson.cover ? foundLesson.cover : "https://media.istockphoto.com/id/1147544807/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B5%D1%82-thumbnail-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9.jpg?s=612x612&w=0&k=20&c=qA0VzNlwzqnnha_m2cHIws9MJ6vRGsZmys335A0GJW4="}/>
                <input ref={editLessonImgInput} onChange={(evt) => {
                  const coverToSend = handleLessonEditCoverUpload(evt);
                 
                  const form = new FormData();
                  form.append("coverFile", JSON.stringify({title: coverToSend.title, clientPath: coverToSend.clientPath}));
                  form.append('file', coverToSend);
                  apiEditLessonCover(foundCourse._id, foundModule._id, foundLesson._id, token, form)
                  .then((data) => {
                    setCoursesData((prevValue) => {
                      return {...prevValue, courses: prevValue.courses.map((course) => {
                        return course._id === data._id ? {...course, modules: data.modules} : course;
                      })};
                    })
                  });
                }} style={{display: "none"}} type="file"></input>
                <button type="button" onClick={(() => {
                  editLessonImgInput.current.click();
                })} style={{translate: "-25px 5px", width: 30, aspectRatio: "1/1", padding: 0, border: "none", borderRadius: "50%"}}>
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>
            </div>
            
          </form>
        </div>  
      </EditLesson>}

      {/* {addUserOpened && <AddUser coursesData={coursesData} setCoursesData={setCoursesData} setAddUserOpened={setAddUserOpened} setSuccessfullyAddedUser={setSuccessfullyAddedUser} successfullyAddedUser={successfullyAddedUser}></AddUser>} */}
    </>

  )
}
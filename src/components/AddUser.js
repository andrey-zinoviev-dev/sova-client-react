import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import axiosClient from '../axios';

import {
  apiRegister
} from '../api';

export default function AddUser() {
  //direved states
  // const modifiedCourses = coursesData.courses.map((modifiedCourse) => {
  //   return {...modifiedCourse, grade: 'Rising Star'};
  // });
  const cyrillicToTranslit = new CyrillicToTranslit();

  const token = localStorage.getItem('token');

  //states
  const [registerStep, setRegisterStep] = React.useState(0);
  const [studentData, setStudentData] = React.useState({email: "", name: "", password: "", courses: []});
  const [selectedCsv, setSelectedCsv] = React.useState({});

  //refs
  const importRef = React.useRef();

  // function renderRegisterSteps() {
  //   switch (registerStep) {
  //     case 0: 
  //       return <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: 25}}>
  //         <h3 style={{margin: 0}}>Данные пользователя</h3>

  //         <input className="add-user__form-input" onChange={(evt) => {
  //           setStudentData((prevValue) => {
  //             return {...prevValue, email: evt.target.value};
  //           })
  //         }} placeholder="Email пользователя" value={studentData.email} type="email"></input>

  //         <input className="add-user__form-input" value={studentData.name} onChange={(evt) => {
  //            setStudentData((prevValue) => {
  //             return {...prevValue, name: evt.target.value};
  //           })
  //         }} placeholder="Имя пользователя" type="text"></input>

  //         <input onChange={(evt) => {
  //           setStudentData((prevValue) => {
  //             return {...prevValue, password: evt.target.value};
  //           })
  //         }} value={studentData.password} className="add-user__form-input" placeholder="Пароль пользователя" type="password"></input>

  //         <button onClick={() => {
  //           setRegisterStep((prevValue) => {
  //             return prevValue + 1;
  //           });
  //         }} className="add-user__form-btn" type="button">Далее</button>
  //       </div>
  //     case 1:
  //       return <div>
  //         <h3 style={{margin: "0 0 25px 0"}}>Выбор курса</h3>
  //         {modifiedCourses.length > 0 && <ul className="add-user__form-ul">
  //           {modifiedCourses.map((course, index) => {
  //             return <li onClick={() => {
  //               studentData.courses.find((courseToFind) => {
  //                 return courseToFind._id === course._id;
  //               }) ? setStudentData((prevValue) => {
  //                 return {...prevValue, courses: prevValue.courses.filter((prevCourse) => {
  //                   return prevCourse._id !== course._id;
  //                 })};
                 
  //               }) :
  //               setStudentData((prevValue) => {
  //                 return {...prevValue, courses: [...prevValue.courses, course]};
  //               })
  //             }} className="add-user__form-ul-li" key={course._id}>
  //               <p className="add-user__form-ul-li-p">{course.name}</p>
  //               <div className="add-user__form-select-wrapper">
  //                 <label>Тариф</label>  
  //                 <select className="add-user__form-select" defaultValue="Rising Star" onClick={(evt) => {
  //                   evt.stopPropagation();
  //                   return;
  //                 }} onChange={(evt) => {
                    
  //                   setStudentData((prevValue) => {
  //                     return {...prevValue, courses: prevValue.courses.map((courseToUpdate) => {
  //                       return courseToUpdate._id === course._id ? {...courseToUpdate, grade: evt.target.value} : courseToUpdate;
  //                     })}
                    
  //                   })
  //                 }}>
  //                   <option className="add-user__form-select-option" value="Rising Star">Rising Star</option>
  //                   <option className="add-user__form-select-option" value="Headliner">Headliner</option>
  //                   <option className="add-user__form-select-option" value="Legend">Legend</option>
  //                 </select>
  //               </div>
  //               {studentData.courses.find((courseToAdd) => {
  //                       return courseToAdd._id === course._id;
  //                     }) && <div className="course-edit__students-wrapper-ul-li-selection-div">
  //                     <FontAwesomeIcon icon={faCheck} />
  //                   </div>}
  //             </li>
  //           })}
  //         </ul>
  //         }

  //         <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
  //           <button onClick={() => {
  //             setRegisterStep((prevValue) => {
  //               return prevValue - 1;
  //             });
  //           }} className="add-user__form-btn" type="button">Назад</button>
  //           <button className="add-user__form-btn" type="submit">
  //             Добавить ученика
  //           </button>
  //         </div>

  //       </div>
  //     default: 
  //     break;
  //   }
  // };

  // React.useEffect(() =>{
  //   console.log(selectedCsv);
  // }, [selectedCsv])

  return (
    <section className="add-user">
      <div className="add-user__wrapper">
          {/* <button type="button" onClick={() => {
            // setAddUserOpened(false);
            // setSuccessfullyAddedUser(false);
          }} className="add-user__close-btn">
            <FontAwesomeIcon icon={faXmark} />
          </button> */}
          <h2 className="add-user__headline">Добавить учеников к платформе</h2>

          <form  onSubmit={(evt) => {
            evt.preventDefault();
            console.log(selectedCsv);
            const form = new FormData();
            form.append("csv", selectedCsv);
            axiosClient.post('/register', form, {
              headers: {
                'Authorization': token,
              },
              onUploadProgress: (evt) => {
                console.log(evt);
              }
            })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            })
          }}>
            <input type="file" onChange={(evt) => {
              const uploadedCsv = evt.target.files[0];
              if(/[А-Я]/.test(uploadedCsv.name)) {
                const updatedName = cyrillicToTranslit.transform(uploadedCsv.name, "_");
                
                Object.defineProperty(uploadedCsv, 'name', {
                  writable: true,
                  value: updatedName
                });
                
              } 
              uploadedCsv.title = uploadedCsv.name;
              setSelectedCsv(uploadedCsv);


            }} style={{display: "none"}} ref={importRef}></input>
            <button type={!selectedCsv.title ? "button" : "submit"} onClick={() => {
              !selectedCsv.title && importRef.current.click()
            }}>
              {!selectedCsv.title ? 
              
              <p>Добавить CVS файл</p>

              :

              <p>Отправить файл</p>}
            </button>
          </form>
          
          {/* {!successfullyAddedUser ? <form className="add-user__form" onSubmit={(evt) => {
            evt.preventDefault();
            console.log(studentData);
           
            apiRegister(studentData)
            .then((data) => {
              if(data) {
                console.log(data);
                setSuccessfullyAddedUser(true);
                setStudentData({email: "", name: "", password: "", courses: []});
                setCoursesData((prevValue) => {
                  return {...prevValue, courses: data.courses, allStudents: data.students};
                })
              
              }
            })

          }}>
            {renderRegisterSteps()}

          </form>
          :
          <div className="add-user__success">
            <p className="add-user__success-p">Пользователь успешно добавлен к платформе!</p>
            <button onClick={() => {
              setAddUserOpened(false);
              setSuccessfullyAddedUser(false);
            }} className="add-user__success-btn">Вернуться к курсам</button>
          </div>
          } */}
        </div>
    </section>
  )
}
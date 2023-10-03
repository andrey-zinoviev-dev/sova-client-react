//api variable
// const apiAdress = 'https://api.sova-courses.site';
const apiAdress = 'http://localhost:3000';
// 
//api calls
function apiLogin(formData) {
  return fetch(`${apiAdress}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }
  )
  .then((res) => {
    return res.json();
  })
}

function apiRegister(formData) {
  return fetch(`${apiAdress}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then((res) => {
    return res.json();
  })
}

function apiNewPassword(formData) {
  return fetch(`${apiAdress}/newPassword`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': token,
    },
    body: JSON.stringify(formData),
  })
  .then((res) => {
    return res.json();
  })
}

function apiGetCurrentUser(token) {
  return fetch(`${apiAdress}/currentUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  })
  .then((res) => {
    // console.log(res);
    return res.json();
  })
  // .catch((err) => {
  //   console.log(err);
  // })

}

function apiCheckUserEmail(email) {
  return fetch(`${apiAdress}/email`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  })
  .then((res) => {
    return res.json();
  })
};

function apiGetCourses(token) {
  return fetch(`${apiAdress}/coursesList`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  })
  .then((res) => {
    return res.json();
  })
}

function apiGetCourse(courseID, token) {
  return fetch(`${apiAdress}/courses/${courseID}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  })
  .then((res) => {
    return res.json();
  })
};

function apiEditCourse(courseID, token, content) {
  return fetch(`${apiAdress}/courses/${courseID}`, {
    method: "PUT",
    headers: {
      'Authorization': token,
    },
    body: content,
  })
  .then((res) => {
    return res.json();
  })
};

function apiAddModule(courseID, token, content) {
  return fetch(`${apiAdress}/courses/${courseID}/addModule`, {
    method: "PUT",
    headers: {
      'Authorization': token,
    },
    body: content,
  })
  .then((res) => {
    return res.json();
  })
}

function apiDeleteModule(courseID, moduleID, token) {
  return fetch(`${apiAdress}/courses/${courseID}/modules/${moduleID}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  })
  .then((res) => {
    return res.json();
  })
};

function apiDeleteLesson(courseID, moduleID, lessonID, token) {
  return fetch(`${apiAdress}/courses/${courseID}/modules/${moduleID}/lessons/${lessonID}/delete`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  })
  .then((res) => {
    return res.json();
  })
}

function apiEditModule(courseID, moduleID, token, cover) {
  return fetch(`${apiAdress}/courses/${courseID}/modules/${moduleID}/editModule`, {
    method: "PUT",
    headers: {
      'Authorization': token,
    },
    body: cover,
  })
  .then((res) => {
    return res.json();
  })
};

// function apiAddStu

function apiEditLessonCover(courseID, moduleID, lessonID, token, cover) {
  return fetch(`${apiAdress}/courses/${courseID}/modules/${moduleID}/lessons/${lessonID}/cover`, {
    method: "PUT",
    headers: {
      'Authorization': token,
    },
    body: cover,
  })
  .then((res) => {
    return res.json();
  })
};

function apiEditLessonContent(courseID, moduleID, lessonID, token, content) {
  return fetch(`${apiAdress}/courses/${courseID}/modules/${moduleID}/lessons/${lessonID}/content`, {
    method: "PUT",
    headers: {
      // 'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: content,
  })
  .then((res) => {
    return res.json();
  })
};

function apiAddLessonToCourse(courseID, moduleID, token, content) {
  return fetch(`${apiAdress}/courses/${courseID}/modules/${moduleID}`, {
    method: "PUT",
    headers: {
      'Authorization': token,
    },
    body: content,
  })
  .then((res) => {
    return res.json();
  })
}

function apiGetLesson(courseID, moduleID, lessonID, token) {
  return fetch(`${apiAdress}/courses/${courseID}/modules/${moduleID}/lessons/${lessonID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  })
  .then((res) => {
    return res.json();
  })
}

function apiCreateCourse(token, content) {
  return fetch(`${apiAdress}/courses/add`, {
    method: "POST",
    headers: {
      // 'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: content,
  })
  .then((res) => {
    return res.json();
  })
};

function apiUpdateCourseTitle(token, courseId, title) {
  return fetch(`${apiAdress}/courses/${courseId}/title`, {
    method: "PUT",
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(title),
  })
  .then((res) => {
    return res.json();
  })
};

function apiUpdateCourseDescription(token, courseId, desc) {
  return fetch(`${apiAdress}/courses/${courseId}/desc`, {
    method: "PUT",
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(desc),
  })
  .then((res) => {
    return res.json();
  })
};

function apiUpdateCourseCover(token, courseId, file) {
  return fetch(`${apiAdress}/courses/${courseId}/cover`, {
    method: "PUT",
    headers: {
      'Authorization': token,
    },
    body: file,
  })
  .then((res) => {
    return res.json();
  })
};

function apiUploadFilesToCourse(token, files) {
  return fetch(`${apiAdress}/courses/add/files`, {
    method: "POST",
    headers: {
      'Authorization': token,
    },
    body: files
  })
  .then((res) => {
    return res.json();
  })
}

function apiGetConversation(token, userId, location) {
  return fetch(`${apiAdress}/contact/${userId}/courses/${location.course}/modules/${location.module}/lessons/${location.lesson}/messages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  })
  .then((res) => {
    return res.json();
  })
};

function apiSendMessage(token, message) {
  return fetch(`${apiAdress}/messages`, {
    method: 'POST',
    headers: {
      
      'Authorization': token,
    },
    body: message,
  })
  .then((res) => {
    return res.json();
  })
};

function apiGetAllStudents(token) {
  return fetch(`${apiAdress}/students`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  })
  .then((res) => {
    return res.json();
  })
};

function apiAddStudentsToCourse(courseID, token, students) {
  // console.log(updateData);
  return fetch(`${apiAdress}/courses/${courseID}/students`, {
    method: "PUT",
    headers: {
      // 'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: students,
  })
  .then((res) => {
    return res.json();
  })
};

function apiNewLessonEmail(token, location, students) {
  return fetch(`${apiAdress}/courses/${location.course}/modules/${location.module}/lessons/${location.lesson}/notification`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(students),
  })
  .then((res) => {
    return res.json();
  })
}

export {
  apiLogin,
  apiRegister,
  apiNewPassword,
  apiGetCurrentUser,
  apiCheckUserEmail,
  apiGetCourses,
  apiGetCourse,
  apiCreateCourse,
  apiUpdateCourseTitle,
  apiUpdateCourseDescription,
  apiUpdateCourseCover,
  apiEditCourse,
  apiDeleteModule,
  apiDeleteLesson,
  apiAddModule,
  apiEditModule,
  apiEditLessonCover,
  apiEditLessonContent,
  apiAddLessonToCourse,
  apiUploadFilesToCourse,
  apiGetLesson,
  apiGetConversation,
  apiSendMessage,
  apiGetAllStudents,
  apiAddStudentsToCourse,
  apiNewLessonEmail
}
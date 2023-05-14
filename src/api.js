//api variable
// const apiAdress = 'http://api.sova-courses.site';
const apiAdress = 'http://localhost:3000';

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

function apiGetUserMessages(moduleID, token) {
  return fetch(`${apiAdress}/modules/${moduleID}/messages`, {
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

export {
  apiLogin,
  apiRegister,
  apiGetCurrentUser,
  apiGetCourses,
  apiGetCourse,
  apiCreateCourse,
  apiUploadFilesToCourse,
  apiGetLesson,
  apiGetUserMessages,
  apiSendMessage,
}
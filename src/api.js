//api variable
const apiAdress = 'http://localhost:3001';

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
    return res.json();
  })

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

export {
  apiLogin,
  apiRegister,
  apiGetCurrentUser,
  apiGetCourses,
  apiGetCourse
}
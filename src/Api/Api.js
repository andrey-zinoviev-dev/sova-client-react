//api here
import React from "react";
export default class Api extends React.Component{
  constructor({url}) {
    super({url})
    this.url = url;
  }
  loginUser(formData) {
    return fetch(`${this.url}/login`, {
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
  registerUser(formData) {
    return fetch(`${this.url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((res) => {
      return res.json();
    })
  }
  getCurrentUser(token) {
    return fetch(`${this.url}/currentUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token, 
      },
    })
    .then((res) => {
      return res.json();
    })  
  }
}
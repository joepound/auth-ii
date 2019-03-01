import React, { createContext, useState } from "react";
import axios from "axios";

export const UsersContext = createContext();

axios.defaults.withCredentials = true;

function UsersProvider(props) {
  const [departments, setDepartments] = useState([]);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [departmentInput, setDepartmentInput] = useState("");

  const [users, setUsers] = useState(null);

  const baseURL = "http://localhost:5000/api";
  const getAuthToken = () => ({
    headers: { Authorization: localStorage.getItem("token") }
  });
  const usersContext = {
    departments,

    usernameInput,
    passwordInput,

    textInputSetters: {
      setUsernameInput,
      setPasswordInput,
      setDepartmentInput
    },

    users,

    authenticate() {
      axios
        .get(`${baseURL}/auth`, getAuthToken())
        .then(res => alert("success!"))
        .catch(err => {
          setUsers(null);
          console.log(err.toString());
        });
    },

    getDepartments() {
      axios
        .get(`${baseURL}/departments`, getAuthToken())
        .then(res => setDepartments(res.data.departments))
        .catch(err => {
          alert("An error occurred in fetching departments.");
          console.log(err);
        });
    },

    register(e) {
      e.preventDefault();

      if (!usernameInput) {
        alert("Please enter a username first.");
      } else if (!passwordInput) {
        alert("Please enter a password first.");
      } else if (!departmentInput) {
        alert("Please select an associated department first.");
      } else {
        const userData = {
          UserName: usernameInput,
          UserPassword: passwordInput,
          UserDepartment: departmentInput
        };
        axios
          .post(`${baseURL}/register`, userData)
          .then(res => {
            alert("User registration successful.");
            window.location.href = "/";
          })
          .catch(err => {
            alert("An error occurred in user registration.");
            console.log(err);
          });
      }
    },

    login(e) {
      e.preventDefault();

      if (!usernameInput) {
        alert("Please enter a username first.");
      } else if (!passwordInput) {
        alert("Please enter a password first.");
      } else {
        const userData = {
          UserName: usernameInput,
          UserPassword: passwordInput
        };
        axios
          .post(`${baseURL}/login`, userData)
          .then(res => {
            localStorage.setItem("token", res.data.token);
            alert("Login was successful.");
            window.location.href = "/";
          })
          .catch(err => {
            alert("Login failed.");
            setUsers(null);
            console.log(err);
          });
      }
    },

    getAllUsers() {
      axios
        .get(`${baseURL}/users`)
        .then(res => setUsers(res.data))
        .catch(err => {
          setUsers(null);
          alert("You must log in to view this content.");
          console.log(err);
        });
    },

    logout() {
      axios
        .get(`${baseURL}/logout`)
        .then(res => {
          localStorage.setItem("token", "");
          alert("Logout was successful.");
        })
        .catch(err => {
          alert("An error occurred in logging out.");
          console.log(err);
        })
        .finally(setUsers(null));
    },

    handleTextInputChange(e) {
      usersContext.textInputSetters[e.currentTarget.name](
        e.currentTarget.value
      );
    },

    clearUserInfoForm(e) {
      setUsernameInput("");
      setPasswordInput("");
      setDepartmentInput("");
    }
  };

  return (
    <UsersContext.Provider value={usersContext}>
      {props.children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;

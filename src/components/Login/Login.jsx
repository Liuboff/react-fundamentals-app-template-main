// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2927-216&mode=design&t=0FIG0iRzKcD0s16M-0
// * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-191&mode=design&t=0FIG0iRzKcD0s16M-0
// * render this component by route '/login'
// * use login service to submit form data and make POST API request '/login'.
// * component should have a link to the Registration page (see design)
// * save token from API after success login to localStorage.
// ** PAY ATTENTION ** token should be saved to localStorage inside login handler function after login service response
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#login-new-component

// Module 3.
// * use 'setUserData' from 'userSlice.js' to save user's name, token and email to the store after success login.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#login-component

// Module 4.
// * use 'setUserData' from 'userSlice.js' to add user's data to store. (DO NOT use 'user/me' [GET] request)

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Button, Input } from "../../common";
import { login } from "../../services";

import styles from "./styles.module.css";
import { setUserData } from "../../store/slices/userSlice";

export const Login = ({ getCurrentUser }) => {
  // write your code here
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await login({
        email: email.trim(),
        password: password.trim(),
      });
      if (response.successful && response.result) {
        const token = response.result.split(" ")[1];
        setEmail("");
        setPassword("");
        try {
          let userData = await getCurrentUser();
          dispatch(setUserData({ token, ...userData.result }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        navigate("/courses");
      } else {
        setErrors({ server: "Invalid email or password." });
      }
    } catch (error) {
      setErrors({
        server: "An error occurred while logging in. Please try again later.",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {/* reuse Input component for email field, reuse Input component for password field, reuse Button component for 'Login' button */}
          <label>
            Email:
            <Input
              type="text"
              placeholder="Enter an email"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({});
              }}
              data-testid="login.email.input"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </label>
          <label>
            Password:
            <Input
              type="text"
              placeholder="Enter a password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({});
              }}
              data-testid="login.password.input"
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </label>
          {errors.server && <p className={styles.error}>{errors.server}</p>}
          <Button
            handleClick={handleSubmit}
            buttonText="Login"
            data-testid="login.loginButton"
          />
        </form>
        <p>
          {/* If you don't have an account you may&nbsp; use <Link /> component for navigation to Registration page */}
          If you don't have an account you may go to
          <Link to="/registration"> Registration </Link> page
        </p>
      </div>
    </div>
  );
};

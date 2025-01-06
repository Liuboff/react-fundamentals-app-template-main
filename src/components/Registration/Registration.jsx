// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)
//
// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-219&mode=design&t=0FIG0iRzKcD0s16M-0
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-257&mode=design&t=0FIG0iRzKcD0s16M-0
// // * render this component by route '/registration'
// // * submit form data and make POST API request '/registration'.
// // * after successful registration navigates to '/login' route.
// // * component should have a link to the Login page (see design)
// // ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#registration-new-component
//
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Input } from "../../common";
import { createUser } from "../../services";
import styles from "./styles.module.css";

export const Registration = () => {
  // write your code here
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      newErrors.email = "Invalid email format.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.trim().length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await createUser({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.successful) {
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      } else {
        const errorMessage =
          response.errors?.[0] || "Registration failed. Please try again.";
        setErrors({
          server: errorMessage,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      setErrors({
        server: error.message || "An error occurred during registration.",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {/* // reuse Input component for email field
          // reuse Input component for name field
          // reuse Input component for password field
          // reuse Button component for 'Login' button */}
          <label>
            Name:
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({});
              }}
              data-testid="register.name.input"
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </label>
          <label>
            Email:
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({});
              }}
              data-testid="register.email.input"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </label>
          <label>
            Password:
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({});
              }}
              data-testid="register.password.input"
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </label>
          {errors.server && <p className={styles.error}>{errors.server}</p>}
          <Button
            handleClick={handleSubmit}
            buttonText="Register"
            data-testid="register.registerButton"
          />
        </form>
        <p>
          {/* If you have an account you may&nbsp; // use <Link /> component for navigation to Login page */}
          If you have an account you may go to
          <Link to="/login"> Login </Link> page
        </p>
      </div>
    </div>
  );
};

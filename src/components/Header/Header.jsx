// Module 1:
// * add Logo and Button components
// * add Header component to the App component
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#header

// Module 2:
// * show user's name if he is logged in (use selector from store/selectors.js to get user token from store)
// * navigate to the /login route after 'LOGOUT' button click
// * hide 'LOGOUT' button and user's name for Login and Registration pages
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#header

// Module 3:
// * use selector from store/selectors.js to get user's name from the store
// * remove user's data from the store. Use action 'removeUserData' from the 'src/store/slices/userSlice by LOGOUT button click
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#header

// Module 4:
// make a request to lod out on 'LOGOUT' button click
// use thunk 'logoutThunk' from 'src/store/thunks/userThunk.js' and service 'logout' from 'src/services.js'
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function

// Module 5:
// *proposed cases for unit tests:
//   ** Header should have logo and user's name.

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Logo } from "./components";
import { Button } from "../../common";
import { logout } from "../../services";

import styles from "./styles.module.css";

export const Header = ({ currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginLogout = () => {
    if (currentUser) {
      try {
        logout();
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error("Error logout current user:", error);
        throw error;
      }
    } else {
      navigate("/login");
    }
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/registration";

  return (
    <div className={styles.headerContainer}>
      <Logo />
      {!isAuthPage && (
        <div className={styles.userContainer}>
          <p className={styles.userName}>{currentUser?.name || "Stranger"}</p>
          <Button
            buttonText={currentUser?.name ? "Logout" : "Login"}
            handleClick={handleLoginLogout}
            data-testid="header.login-logout.button"
          />
        </div>
      )}
    </div>
  );
};

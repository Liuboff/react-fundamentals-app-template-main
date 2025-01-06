// Module 1:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * add next components to the App component: Header, Courses and CourseInfo
// * pass 'mockedAuthorsList' and 'mockedCoursesList' to the Courses and CourseInfo components
// * use hook useState for saving selected courseId [showCourseId, handleShowCourse]

// Module 2:
// * remove mockedAuthorsList and mockedCoursesList mocked data
// * remove useState for selected courseId
// * use hook useState for storing list of courses and authors
// * import Routes and Route from 'react-router-dom'
// * Add Routes to the container div (do not include Header to the Routes since header will not be changed with pages)
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#add-the-router-to-the-app-component

// Module 3:
// * the App component and BrowserRouter components should be wrapped with Redux 'Provider' in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * use selector from store/selectors.js to get user token from store
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component
// * get authorized user info by 'user/me' GET request if 'localStorage' contains token

import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";

import {
  CourseForm,
  CourseInfo,
  Courses,
  Header,
  Login,
  Registration,
} from "./components";
import {
  getCourses,
  getAuthors,
  createAuthor,
  createCourse,
  getCurrentUser,
} from "./services";

import styles from "./App.module.css";

function App() {
  // write your code here
  const [courses, setCourses] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchData = async () => {
    try {
      let coursesList = await getCourses();
      let authorsList = await getAuthors();
      setCourses(coursesList.result);
      setAuthors(authorsList.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header currentUser={currentUser} />
      <div className={styles.container}>
        {/* place other components */}
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/login"
            element={
              <Login
                getCurrentUser={getCurrentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/courses"
            element={
              <Courses
                coursesList={courses}
                authorsList={authors}
                onRefreshCourses={fetchData}
              />
            }
          />
          <Route
            path="/courses/:courseId"
            element={<CourseInfo coursesList={courses} authorsList={authors} />}
            exact="true"
          />
          <Route
            path="/courses/add"
            element={
              <CourseForm
                authorsList={authors}
                createCourse={createCourse}
                createAuthor={createAuthor}
              />
            }
            exact="true"
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// This component shows information about the current chosen course.

// Module 1.
// * Use template to show course's information:
// ** ID of course;
// ** Title;
// ** Description;
// ** Duration;
// ** List of authors;
// ** Creation date;
// * use <Button /> component to replace CourseInfo component with Courses component
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#course-info

// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#course-info

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getAuthorsSelector, getCoursesSelector } from "../../store/selectors";

import { formatCreationDate, getCourseDuration } from "../../helpers";

import styles from "./styles.module.css";
import { Button } from "../../common";

export const CourseInfo = () => {
  // write your code here
  const coursesList = useSelector(getCoursesSelector);
  const authorsList = useSelector(getAuthorsSelector);

  const { courseId } = useParams();
  const course = coursesList.find((course) => course.id === courseId);

  return (
    <div className={styles.container} data-testid="courseInfo">
      <h1>{course.title}</h1>
      <div className={styles.courseInfo}>
        <p className={styles.description}>{course.description}</p>
        <div>
          <p>
            <b>ID: </b>
            {course.id}
          </p>
          <p>
            <b>Duration: </b>
            {getCourseDuration(course.duration)}
          </p>
          <p>
            <b>Created: </b>
            {formatCreationDate(course.creationDate)}
          </p>
          <div>
            <b>Authors</b>
            <ul className={styles.authorsList}>
              {/* use '.map' to render authors list with 'li' tag */}

              {course.authors.map((authorId) => {
                const author = authorsList.find(
                  (author) => author.id === authorId
                );
                return author ? <li key={author.id}>{author.name}</li> : null;
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* Module 1: reuse Button component for 'onBack' functionality
          Module 2: use 'react-router-dom' 'Link' component for button 'Back' and remove 'onBack' prop */}
      <Link to="/courses">
        <Button
          className={styles.backButton}
          buttonText={"Back"}
          data-testid="courseInfo.back.button"
        />
      </Link>
    </div>
  );
};

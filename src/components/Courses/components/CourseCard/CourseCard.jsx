// Module 1.
// * figma link: https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Angular-Fundamentals?type=design&node-id=2905-67147&t=gTZjFcI0d4hheNiz-0
// * render this component inside 'Courses' component
// * this component should display single course info:
//   ** title;
//   ** description;
//   ** authors list. Authors' names should be displayed on the one line, add '...' if authors' names do not fit on one line.
//   ** duration (format: hh:mm + 'hours'). Create function 'src/helpers/getCourseDuration.js' for duration mapping;
//   ** creation date (format: dd.mm.yyyy). Create function 'src/helpers/formatCreationDate.js' for date formatting;
//   ** show course button. Render 'CourseInfo' component with course's data instead of 'Courses' component
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#coursecard-component
// * find course's authors in the 'authorsList' by ids

// Module 2.
// * remove prop 'handleShowCourse' => use 'Link' from 'react-router-dom' instead

// Module 3.
// * add two new buttons: update and delete'. Use icons from 'src/assets/...'.
// * remove course from the store by 'delete' button click
// * no functionality for 'update' button for now
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#coursecard-component
// * remove prop 'authorsList' => use 'getAuthorsSelector' to get authors from store

// Module 4.
// * show 'delete' and 'update' buttons only for ADMIN user
// * make delete request by 'delete' button click
// * use 'deleteCourseService' from 'src/services.js' and 'deleteCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#coursecard-component

// Module 5:
// * proposed cases for unit tests:
//   ** CourseCard should display title.
//   ** CourseCard should display description.
//   ** CourseCard should display duration in the correct format.
//   ** CourseCard should display authors list.
//   ** CourseCard should display created date in the correct format.

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "../../../../common";
import { getAuthorsSelector } from "../../../../store/selectors";
import { deleteCourse } from "../../../../store/slices/coursesSlice";

import { getCourseDuration, formatCreationDate } from "../../../../helpers";
import deleteIcon from "../../../../assets/deleteButtonIcon.svg";
import editIcon from "../../../../assets/editButtonIcon.svg";

import styles from "./styles.module.css";

export const CourseCard = ({ course }) => {
  // write your code here
  const authorsList = useSelector(getAuthorsSelector);
  const dispatch = useDispatch();

  const handleCourseDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  return (
    <div className={styles.cardContainer} data-testid="courseCard">
      <div className={styles.cardText}>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
      </div>
      <div className={styles.cardDetails}>
        <p>
          <b>Authors: </b>
          {course.authors
            .map((authorId) => {
              const author = authorsList.find(
                (author) => author.id === authorId
              );
              return author ? author.name : null;
            })
            .join(", ")}
        </p>
        <p>
          <b>Duration:</b>
          <span>{getCourseDuration(course.duration)}</span>
        </p>
        <p>
          <b>Created: </b>
          <span>{formatCreationDate(course.creationDate)}</span>
        </p>
        <div className={styles.buttonsContainer}>
          {/* 
            reuse Button component for 'Show course' button 
            reuse Button	component with deleteButtonIcon from 'src/assets' for 'Delete' button with data-testid="deleteCourse" 
            reuse Button component wrapped with Link from react-router with editButtonIcon from 'src/assets' for 'Update' button with
              data-testid="updateCourse" 
			    */}

          <Link
            to={`/courses/${course.id}`}
            data-testid="coursecard.showCourse.link"
          >
            <Button
              buttonText="Show course"
              data-testid="coursecard.showCourse.button"
            />
          </Link>
          <Button
            buttonText={<img src={deleteIcon} alt="Delete" />}
            handleClick={() => handleCourseDelete(course.id)}
            data-testid="coursecard.deleteCourse.button"
          />
          <Link
            to={`/courses/${course.id}/edit`}
            data-testid="coursecard.showCourse.link"
          >
            <Button
              buttonText={<img src={editIcon} alt="Update" />}
              handleClick={() => {}}
              data-testid="coursecard.updateCourse.button"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

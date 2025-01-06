// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * add functionality to create new course with:
//   ** title
//   ** description
//   ** duration (user enters in minutes, you should map in format «hh:mm»)
//   ** existing authors (use 'authorsList' prop)
//   ** new created author (create field and button, update 'authorsList')
//   ** user should be able to remove author from the course
//   ** add validation to the fields
//   ** add new course to the 'coursesList' and navigate to the '/courses' page => new course should be in the courses list
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-2/home-task/components#add-new-course

// Module 3.
// * remove props - authorsList, createCourse, createAuthor
// * use selector from store/selectors.js to get authorsList from store
// * save new course to the store. Use action 'saveCourse' from 'src/store/slices/coursesSlice'
// * save new author to the store. Use action 'saveAuthor' from 'src/store/slices/authorsSlice'
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-3/home-task/components#add-new-course

// Module 4.
// * render this component only for ADMIN user
// * in this module you should separate functionality for this component:
//   ** create mode:
//     * form for the course creation should be opened by 'courses/add' route by 'ADD NEW COURSE' button click (as before)
//     * make a request to save new course
//     * use 'createCourse' service from 'src/services.js' and 'createCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     * use 'createAuthor ' service from 'src/services.js' and 'createAuthorThunk' thunk from 'src/store/thinks/authorsThunk.js'
//     * save new course to the store after success response
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#add-new-course
//   ** update mode:
//     * form should be opened by route '/courses/update/:courseId' route by 'update' button click
//     * appropriate forms field should be prefilled with course's info
//     * user should have ability to modify course information in the fields and change authors list
//     * make a request to save updated course
//     * use 'updateCourseService' from 'src/services.js' and 'updateCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     save updated course to the store after success response.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-4/home-task/components#update-course

// Module 5:
// * proposed cases for unit tests:
//   ** CourseForm should show authors lists (all and course authors).
//   **  CourseForm 'Create author' button click should call dispatch.
//   **  CourseForm 'Add author' button click should add an author to the course authors list.
//   **  CourseForm 'Delete author' button click should delete an author from the course list.

import React from "react";
import { useNavigate } from "react-router";

import { Button, Input } from "../../common";
import { AuthorItem, CreateAuthor } from "./components";

import { getCourseDuration } from "../../helpers";

import styles from "./styles.module.css";

export const CourseForm = ({ authorsList, createCourse, createAuthor }) => {
  //write your code here
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [authors, setAuthors] = React.useState([]);
  const [availableAuthors, setAvailableAuthors] = React.useState(authorsList);
  const [formErrors, setFormErrors] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    setAvailableAuthors(authorsList);
  }, [authorsList]);

  const courseData = { title, description, duration, authors };

  const handleCreateAuthor = async (authorName) => {
    console.log("Attempting to create author:", authorName); // Логування спроби створення автора
    try {
      const newAuthor = await createAuthor(authorName);
      console.log("New Author Created:", newAuthor); // Логування успішного створення автора

      setAvailableAuthors((authorsList) => [...authorsList, newAuthor]);
      console.log("Updated available authors:", availableAuthors); // Логування оновлених авторів

      console.log("Author created:", newAuthor);
    } catch (error) {
      console.error("Error creating author:", error);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (title.trim().length < 2)
      errors.title = "Title must be at least 2 characters long.";
    if (description.trim().length < 2)
      errors.description = "Description must be at least 2 characters long.";
    if (!duration || isNaN(duration) || duration <= 0)
      errors.duration = "Duration must be a number greater than 0.";
    if (authors.length === 0)
      errors.authors = "At least one author must be selected.";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await createCourse(courseData);
        navigate("/courses");
      } catch (error) {
        console.error("Error creating course:", error);
      }
    } else {
      console.log("Form contains errors:", errors);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Course edit or Create page</h2>

      <form>
        {/* reuse Input component for title field with data-testid="titleInput" */}
        <label>
          Course title
          <Input
            type="text"
            placeholder="Enter a course title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            data-testid="titleInput"
          />
          {formErrors.title && (
            <p className={styles.error}>{formErrors.title}</p>
          )}
        </label>
        <label>
          Description
          <textarea
            className={styles.description}
            data-testid="descriptionTextArea"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {formErrors.description && (
            <p className={styles.error}>{formErrors.description}</p>
          )}
        </label>

        <div className={styles.infoWrapper}>
          <div>
            <div className={styles.duration}>
              {/* // reuse Input component with data-testid='durationInput' for duration field */}
              <label>
                Duration
                <Input
                  type="text"
                  placeholder="Enter a course duration"
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                  data-testid="durationInput"
                />
              </label>
              {formErrors.duration && (
                <p className={styles.error}>{formErrors.duration}</p>
              )}
              <p>{getCourseDuration(duration)}</p>
              {/* <p> render duration. use getCourseDuration helper</p> */}
            </div>

            <h2>Authors</h2>
            {/* // use CreateAuthor component */}
            <CreateAuthor onCreateAuthor={handleCreateAuthor} />
            <div className={styles.authorsContainer}>
              <h3>Authors List</h3>

              {/* // use 'map' to display all available autors. Reuse 'AuthorItem' component for each author */}
              {availableAuthors.length > 0 ? (
                availableAuthors.map((author) => (
                  <AuthorItem
                    author={author}
                    key={author.id}
                    isCourseAuthor={false}
                    onAddAuthor={() => {
                      setAuthors([...authors, author.id]);
                      setAvailableAuthors(
                        availableAuthors.filter((a) => a.id !== author.id)
                      );
                    }}
                    onDeleteAuthor={() => {
                      setAuthors(authors.filter((id) => id !== author.id));
                      setAvailableAuthors([...availableAuthors, author]);
                      console.log(author);
                    }}
                    data-testid={"authorItem" + author.id}
                  />
                ))
              ) : (
                <p className={styles.notification}>List of authors is empty</p>
              )}
            </div>
          </div>

          <div className={styles.courseAuthorsContainer}>
            <h2>Course authors</h2>
            {/* // use 'map' to display course autors. Reuse 'AuthorItem' component for each author */}
            {courseData.authors.length > 0 ? (
              courseData.authors
                .map((authorId) =>
                  authorsList.find((author) => author.id === authorId)
                )
                .map((author) => (
                  <AuthorItem
                    author={author}
                    key={author.id}
                    isCourseAuthor={true}
                    onDeleteAuthor={() => {
                      setAuthors(authors.filter((id) => id !== author.id));
                      setAvailableAuthors([...availableAuthors, author]);
                    }}
                    data-testid={"authorItem" + author.id}
                  />
                ))
            ) : (
              // {/* display this paragraph if there are no authors in the course */}
              <p className={styles.notification}>List is empty</p>
            )}
          </div>
        </div>
        {formErrors.authors && (
          <p className={styles.error}>{formErrors.authors}</p>
        )}

        <div className={styles.buttonsContainer}>
          {/* // reuse Button component for 'CREATE/UPDATE COURSE' button with */}
          <Button
            handleClick={(event) => handleSubmit(event)}
            buttonText="CREATE/UPDATE COURSE"
            data-testid="courseForm.createCourseButton"
          />
          {/* // reuse Button component for 'CANCEL' button with */}
          <Button
            handleClick={(event) => {
              event.preventDefault();
              setTitle("");
              setDescription("");
              setDuration("");
              setAuthors([]);
              setFormErrors({});
            }}
            buttonText="CANCEL"
            data-testid="courseForm.cancelButton"
          />
        </div>
      </form>
    </div>
  );
};

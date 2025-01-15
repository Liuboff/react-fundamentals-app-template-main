// // Module 1.
// // You don't need this component for Module 1.

// // Module 2.
// // * Uncomment component code with imports
// // * Use this component for author creation functionality
// // * Pass callback 'onCreateAuthor' from CourseForm.jsx to return author's info {id: string, name: string}

// // Module 3.
// // Remove 'onCreateAuthor' from props => use 'dispatch' and 'saveAuthor' from 'authorsSlice.js' to save new author to the store

import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import { Button, Input } from "../../../../common";

import styles from "./styles.module.css";
import { saveAuthor } from "../../../../store/slices/authorsSlice";
import { createAuthor } from "../../../../services";

export const CreateAuthor = () => {
  // write your code here
  const [authorName, setAuthorName] = React.useState("");
  const [formError, setFormError] = React.useState({});

  const nameRef = useRef("");

  const dispatch = useDispatch();

  const validateForm = () => {
    const errors = {};
    if (authorName.trim().length < 2)
      errors.authorName = "Author name must be at least 2 characters long.";
    return errors;
  };

  const handleCreateAuthor = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormError(errors);
    if (Object.keys(errors).length === 0 && authorName.trim()) {
      try {
        // const newAuthor = await createAuthor(authorName);
        // dispatch(saveAuthor(newAuthor));
        dispatch(saveAuthor({ name: authorName, id: `${Date.now()}` }));
      } catch (error) {
        console.error("Error creating author:", error);
      }
      setAuthorName("");
      nameRef.current.value = "";
      setFormError({});
    } else {
      console.log("Form contains errors:", errors);
    }
  };

  return (
    <div className={styles.newAuthorContainer}>
      <h2>Author Name</h2>
      {/* // reuse Input component with data-testid="createAuthorInput" attribute */}
      <Input
        type="text"
        placeholder="Enter an author name"
        value={authorName}
        ref={nameRef}
        onChange={(e) => {
          setAuthorName(e.target.value);
          setFormError({});
        }}
        data-testid="createAuthorInput"
      />
      {formError.authorName && (
        <p className={styles.error}>{formError.authorName}</p>
      )}

      {/* //reuse Button component with data-testid="createAuthorButton" attribute */}
      <Button
        handleClick={handleCreateAuthor}
        buttonText="Create author"
        data-testid="createAuthorButton"
      />
    </div>
  );
};

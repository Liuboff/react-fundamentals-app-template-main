import React from "react";
import { Button } from "../../../../common";

import styles from "./styles.module.css";

export const AuthorItem = ({
  author,
  onAddAuthor,
  onDeleteAuthor,
  isCourseAuthor,
}) => (
  <div className={styles.authorItem} data-testid="authorItem">
    <span>{author.name}</span>

    {/* // reuse Button component for 'Add author' button with data-testid="addAuthor" attribute */}
    {!isCourseAuthor && (
      <Button
        handleClick={(event) => {
          event.preventDefault();
          onAddAuthor(author);
        }}
        buttonText="Add"
        data-testid="addAuthor"
      />
    )}

    <Button
      handleClick={(event) => {
        event.preventDefault();
        onDeleteAuthor(author);
      }}
      buttonText="Delete"
      data-testid="deleteAuthor"
    />
  </div>
);

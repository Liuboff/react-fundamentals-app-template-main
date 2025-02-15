// Module 1.
// ** TASK DESCRIPTION ** - https://ebook.learn.epam.com/react-fundamentals/docs/module-1/home-task/components#create-input-component

import React from "react";

import styles from "./styles.module.css";

export const Input = React.forwardRef(
  (
    {
      placeholderText,
      labelText,
      onChange,
      onKeyDown,
      "data-testid": dataTestId,
    },
    ref
  ) => (
    <label className={styles.label}>
      {labelText}
      <input
        onChange={onChange}
        placeholder={placeholderText}
        className={styles.input}
        data-testid={dataTestId}
        onKeyDown={onKeyDown}
        ref={ref}
      />
    </label>
  )
);

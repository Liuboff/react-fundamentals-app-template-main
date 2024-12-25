import styles from "./styles.module.css";
import { Button } from "../../../../common";

export const EmptyCourseList = () => {
  return (
    <div className={styles.emptyContainer} data-testid="emptyContainer">
      <p className={styles.emptyContainer__title}>Your List Is Empty</p>
      <p className={styles.emptyContainer__subtitle}>
        Please use "Add New Course" button to add your first course
      </p>
      <Button
        buttonText="ADD NEW COURSE"
        handleClick={() => console.log("Add course clicked")}
        data-testid="addCourse"
      />
    </div>
  );
};

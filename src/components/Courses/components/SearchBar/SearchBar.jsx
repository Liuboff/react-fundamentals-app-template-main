import React from "react";
import { Input } from "../../../../common/Input/Input";
import { Button } from "../../../../common/Button/Button";

import styles from "./styles.module.css";

export function SearchBar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div className={styles.searchBar}>
      <Input
        type="text"
        placeholder="Enter a course name..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (!e.target.value) {
            handleSearch(searchTerm);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(searchTerm);
          }
        }}
        data-testid="searchBar.input"
      />
      <Button
        className="search-button"
        buttonText="Search"
        handleClick={() => handleSearch(searchTerm)}
        data-testid="searchBar.search.button"
      />
    </div>
  );
}

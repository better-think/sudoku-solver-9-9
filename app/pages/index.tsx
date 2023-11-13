// pages/index.js

import React from "react";
import SudokuBoard from "../components/SudokuBoard";
import styles from "../styles/main.module.scss";

const SudokuHome = () => {
  return (
    <div className={styles["sudoku-main"]}>
      <div className={styles["sudoku-main-title"]}>
        <h1>Sudoku Solver</h1>
        <SudokuBoard />
      </div>
    </div>
  );
};

export default SudokuHome;

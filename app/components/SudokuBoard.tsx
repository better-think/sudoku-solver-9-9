"use client";
// components/SudokuBoard.js
import React, { useEffect, useState } from "react";
import SudokuCell from "./SudokuCell";
import styles from "../styles/main.module.sass";
import sudoku from "../module/sudoku";

const SudokuBoard = () => {
  const [board, setBoard] = useState<number[][]>(initializeBoard);
  const [solutions, setSolutions] = useState<number[][][]>();
  function initializeBoard() {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
  }

  function fillRandomNumbers() {
    const newBoard: number[][] = board;
    sudoku.fillRandomRecursively(newBoard);

    setBoard(newBoard);
  }

  const changeValue = (rowIndex: number, colIndex: number, value: number) => {
    const tempBoard = [...board];
    tempBoard[rowIndex] = [...tempBoard[rowIndex]];
    tempBoard[rowIndex][colIndex] = value;
    setBoard(tempBoard);
  };

  function handleSolveClick() {
    const newBoard = JSON.parse(JSON.stringify(board));

    if (sudoku.isBoardValid(newBoard)) {
      if (sudoku.findAllSolutions(newBoard)) {
        console.log(sudoku.findAllSolutions(newBoard));
      } else {
        alert("No Solution");
      }
    } else {
      alert("Bad State");
    }
  }

  const handleRestClick = () => {
    setBoard(initializeBoard());
  };

  return (
    <div>
      <div className={styles["sudoku-board"]}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={styles["sudoku-row"]}>
            {row.map((cell, columnIndex) => (
              <SudokuCell
                key={columnIndex}
                value={cell}
                row={rowIndex}
                col={columnIndex}
                isEdited={false}
                changeValue={changeValue}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles["control-button-group"]}>
        <button
          onClick={handleSolveClick}
          className={styles["sudoku-solve-button"]}
        >
          Solve
        </button>
        <button
          onClick={handleRestClick}
          className={styles["sudoku-reset-button"]}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SudokuBoard;

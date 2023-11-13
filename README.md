# Sudoku Solver

A Sudoku Solver web application built with Next.js and Sass.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Demo

[https://sudoke-solver.vercel.app/](https://sudoke-solver.vercel.app/) 

## Features

- **Sudoku Solving:** Efficiently solves Sudoku puzzles.
- **Next.js:** Built using the Next.js framework for React applications.
- **Sass:** Styled using Sass for a maintainable and modular stylesheet.
- **Responsive Design:** Ensures a seamless experience across different devices.

## Solution Algorithm

This Sudoku Solver uses a [insert algorithm name] algorithm to efficiently solve Sudoku puzzles. Here's a brief overview of how the solver works:

1. **Input Grid:**

   - The solver takes a partially filled Sudoku grid as input, with empty cells represented by zeros.

2. **Backtracking Algorithm:**

   - It employs a recursive backtracking algorithm to explore possible solutions.
   - The solver starts from the first empty cell and attempts to fill it with a valid digit (1 to 9).
   - If a digit is valid for the current cell, it moves on to the next empty cell.
   - If a digit is not valid, it backtracks to the previous cell and tries a different digit.

3. **Validation:**

   - The solver validates each digit placement against the Sudoku rules (no repeated digits in rows, columns, and subgrids).

   ```typescript
   usedInRow(board: number[][], row: number, num: number) {
    return board[row].includes(num);
   }

   usedInCol(board: number[][], col: number, num: number) {
    return board.some((row) => row[col] === num);
   }

   usedInSubgrid(
    board: number[][],
    startRow: number,
    startCol: number,
    num: number
   ) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return true;
        }
      }
    }
    return false;
   }
   ```

4. **Completion:**

   - The process continues until the entire grid is filled, and a valid solution is found.

   ```typescript
   solveSudoku(board: number[][]) {
   const emptyCell = this.findEmptyCell(board);
   if (!emptyCell) {
     return true;
   }

   const [row, col] = emptyCell;

   for (let num = 1; num <= 9; num++) {
     if (this.isSafe(board, row, col, num)) {
       board[row][col] = num;

       if (this.solveSudoku(board)) {
         return true;
       }

       board[row][col] = 0;
     }
   }

   return false;
   }
   ```

Feel free to explore the source code in the `app/` directory for more details on the implementation.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sudoku-solver.git
   ```

2. Install dependencies:

   ```bash
   cd sudoku-solver
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

3. You can input sodoku values by double click each cells.

4. Then click solve to solve the puzzle.

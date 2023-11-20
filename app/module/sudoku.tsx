export class Sudoku {

  findAllSolutions(board: number[][]): number[][][] {
    const solutions: number[][][] = [];
    this.solveSudoku(board, solutions);
    console.log('123');
    return solutions;
  }

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

  isSafe(board: number[][], row: number, col: number, num: number) {
    return (
      !this.usedInRow(board, row, num) &&
      !this.usedInCol(board, col, num) &&
      !this.usedInSubgrid(board, row - (row % 3), col - (col % 3), num)
    );
  }

  existsMultipleTimes(arr: number[], num: number) {
    const count = arr.filter((value) => value === num).length;
    return count >= 2;
  }

  existsMultipleTimesInRow(board: number[][], row: number, num: number) {
    return this.existsMultipleTimes(board[row], num);
  }

  existsMultipleTimesInCol(board: number[][], col: number, num: number) {
    const count = board.reduce(
      (acc, row) => acc + (row[col] === num ? 1 : 0),
      0
    );
    return count >= 2;
  }

  existsMultipleTimesInSubgrid(
    board: number[][],
    startRow: number,
    startCol: number,
    num: number
  ) {
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          count++;
        }
      }
    }
    return count >= 2;
  }

  isBoardSafe(board: number[][], row: number, col: number, num: number) {
    return (
      !this.existsMultipleTimesInRow(board, row, num) &&
      !this.existsMultipleTimesInCol(board, col, num) &&
      !this.existsMultipleTimesInSubgrid(
        board,
        row - (row % 3),
        col - (col % 3),
        num
      )
    );
  }

  findEmptyCell(board: number[][]) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  fillRandomRecursively(board: number[][]) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const randomNum = Math.floor(Math.random() * 9) + 1;
          if (this.isSafe(board, row, col, randomNum)) {
            board[row][col] = randomNum;

            if (this.fillRandomRecursively(board)) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  isBoardValid(board: number[][]) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = board[row][col];
        if (num !== 0)
          if (!this.isBoardSafe(board, row, col, num)) {
            return false;
          }
      }
    }
    return true;
  }

  solveSudoku(board: number[][], solutions: number[][][]) {
    const emptyCell = this.findEmptyCell(board);
    if (!emptyCell) {
      return true;
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (this.isSafe(board, row, col, num)) {
        board[row][col] = num;

        this.solveSudoku(board, solutions);

        board[row][col] = 0;
      }
    }
  }
}

const sudoku = new Sudoku();
export default sudoku;

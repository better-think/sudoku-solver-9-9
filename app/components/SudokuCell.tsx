// components/SudokuCell.tsx

import React, { useEffect, useState } from "react";
import styles from "../styles/main.module.sass";

interface SudokuCellProps {
  value: number;
  row: number;
  col: number;
  isEdited: boolean;
  changeValue: (rowIndex: number, colIndex: number, value: number) => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  row,
  col,
  isEdited,
  changeValue,
}) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(isEdited);

  useEffect(() => {
    if (value === 0) setEdited(false);
  }, [value]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let tempValue;

    if (value === "") {
      tempValue = 0;
    } else {
      tempValue = parseInt(value, 10);
    }

    if (!isNaN(tempValue) && tempValue >= 0 && tempValue <= 9) {
      changeValue(row, col, tempValue);
      setEdited(true);
    }
  };

  return (
    <div
      className={edited ? styles["sudoku-cell-edited"] : styles["sudoku-cell"]}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={value === 0 ? "" : value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={(e) => e.target.select()}
          autoFocus
          className={styles["sudoku-cell-input"]}
        />
      ) : value ? (
        value
      ) : (
        ""
      )}
    </div>
  );
};

export default SudokuCell;

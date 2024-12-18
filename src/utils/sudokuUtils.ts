interface checkArgumetns {
    grid: number[][];
    row: number;
    col: number;
    num: number;
}

const checkRow = ({ grid, row, col, num }: checkArgumetns): boolean => {
    if (col >= 9) return true;
    if (grid[row][col] === num) return false;
    return checkRow({ grid, row, col: col + 1, num });
};

const checkCol = ({ grid, row, col, num }: checkArgumetns): boolean => {
    if (row >= 9) return true;
    if (grid[row][col] === num) {
        return false;
    }
    return checkCol({ grid, row: row + 1, col, num });
};

const recRow = (
    grid: number[][],
    row: number,
    endRow: number,
    col: number,
    endCol: number,
    num: number
): boolean => {
    if (row == endRow) return true;
    let flag = recCol(grid, row, col, endCol, num);
    return flag && recRow(grid, row + 1, endRow, col, endCol, num);
};

const recCol = (
    grid: number[][],
    row: number,
    col: number,
    endCol: number,
    num: number
): boolean => {
    if (col == endCol) return true;
    if (grid[row][col] === num) return false;
    return recCol(grid, row, col + 1, endCol, num);
};

const checkSubgrid = ({ grid, row, col, num }: checkArgumetns): boolean => {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    const endRow = startRow + 3;
    const endCol = startCol + 3;
    return recRow(grid, startRow, endRow, startCol, endCol, num);
};

const checkGrid = (
    grid: number[][],
    validator: ({ grid, row, col, num }: checkArgumetns) => boolean,
    row: number,
    col: number,
    num: number
): boolean => validator({ grid, row, col, num });

const isSafe = (
    grid: number[][],
    row: number,
    col: number,
    num: number
): boolean => {
    // console.log(checkRow, row, col, num);
    return (
        checkGrid(grid, checkRow, row, 0, num) &&
        checkGrid(grid, checkCol, 0, col, num) &&
        checkGrid(grid, checkSubgrid, row, col, num)
    );
};

const findEmptyCell = (
    grid: number[][],
    row = 0,
    col = 0
): [number, number] | null => {
    if (row >= 9) return null;

    if (grid[row][col] === 0) return [row, col];

    if (col < 8) {
        return findEmptyCell(grid, row, col + 1);
    } else {
        return findEmptyCell(grid, row + 1, 0);
    }
};

const solveSudoku = (
    grid: number[][],
    steps: number[][][] = []
): [boolean, number[][][]] => {
    let emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
        return [true, steps]; // Puzzle solved
    }

    const [row, col] = emptyCell;

    // Try placing digits 1-9
    let tryNumbers = (num: number): [boolean, number[][][]] => {
        if (num > 9) return [false, steps];
        if (isSafe(grid, row, col, num)) {
            const newGrid = grid.map((row) => [...row]); // Create a deep copy of the grid to make it functional paradigm
            newGrid[row][col] = num; // Update the copy
            steps.push(newGrid); // Save the current state of the new grid

            // Recursively attempt to solve the next empty cell
            const [solved, newSteps] = solveSudoku(newGrid, steps);
            if (solved) {
                return [true, newSteps]; // Puzzle solved
            }
        }
        return tryNumbers(num + 1);
    };
    return tryNumbers(1);
};
export { solveSudoku, isSafe, findEmptyCell };

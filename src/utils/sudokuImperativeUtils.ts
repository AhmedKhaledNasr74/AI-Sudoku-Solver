const isSafe = (
    grid: number[][],
    row: number,
    col: number,
    num: number
): boolean => {
    // Check row
    for (let c = 0; c < 9; c++) {
        if (grid[row][c] === num) {
            return false;
        }
    }
    // Check column
    for (let r = 0; r < 9; r++) {
        if (grid[r][col] === num) {
            return false;
        }
    }
    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (grid[r][c] === num) {
                return false;
            }
        }
    }
    return true;
};

const findEmptyCell = (grid: number[][]): [number, number] | null => {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (grid[r][c] === 0) {
                return [r, c];
            }
        }
    }
    return null;
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
    for (let num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            steps.push([...grid.map((row) => [...row])]);

            // Recursively attempt to solve the next empty cell
            const [solved, newSteps] = solveSudoku(grid, steps);
            if (solved) {
                return [true, newSteps]; // Puzzle solved
            }

            // Backtrack if placing 'num' doesn't lead to a solution
            grid[row][col] = 0;
            steps.push([...grid.map((row) => [...row])]); // Save the current state of the grid
        }
    }

    return [false, steps]; // Trigger backtracking
};
export { solveSudoku, isSafe, findEmptyCell };

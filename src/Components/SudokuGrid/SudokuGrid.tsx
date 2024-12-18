const SudokuGrid = ({
    grid,
    initialGrid,
}: {
    grid: number[][];
    initialGrid: number[][];
}) => {
    return (
        <div
            className="grid"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(9, 30px)",
                gap: "5px",
                margin: "auto",
            }}
        >
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const isInitial = initialGrid[rowIndex][colIndex] !== 0; // Check if the cell is from the initial grid
                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            style={{
                                width: "30px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: isInitial
                                    ? "#E0E0E0" // Color for cells with initial values
                                    : "#fff", // Color for empty cells
                                border: "1px solid black",
                                borderTop:
                                    rowIndex % 3 === 0
                                        ? "3px solid #44AC99"
                                        : "",
                                borderLeft:
                                    colIndex % 3 === 0
                                        ? "3px solid #44AC99"
                                        : "",
                                borderBottom:
                                    rowIndex % 3 === 2
                                        ? "3px solid #44AC99"
                                        : "",
                                borderRight:
                                    colIndex % 3 === 2
                                        ? "3px solid #44AC99"
                                        : "",
                            }}
                        >
                            {cell !== 0 ? cell : ""}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default SudokuGrid;

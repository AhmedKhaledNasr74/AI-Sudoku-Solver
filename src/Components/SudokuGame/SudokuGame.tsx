import React, { useState, useEffect } from "react";
import grids from "../../grids.json";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
// import { solveSudoku } from "../../utils/sudokuUtils";
import { solveSudoku } from "../../utils/sudokuImperativeUtils";

// Main SudokuGame component
export const SudokuGame = () => {
    const [initialGrid, setIntialGrid] = useState([...grids[0]]);
    const [grid, setGrid] = useState([...initialGrid]);
    // const [solvedGrid, setSolvedGrid] = useState<number[][] | null>(null);
    const [steps, setSteps] = useState<number[][][]>([]); // Store each step of the grid
    const [speed, setSpeed] = useState(1);

    const solve = () => {
        const newGrid = JSON.parse(JSON.stringify(grid));
        const [solved, solutionSteps] = solveSudoku(newGrid);
        if (solved) {
            setSteps(solutionSteps); // Save the steps to display later
            // setSolvedGrid(newGrid);
            console.log(solutionSteps); // this line
        } else {
            alert("No solution exists.");
        }
    };

    const generateRandomSudoku = (): number[][] => {
        return [...grids[Math.floor(Math.random() * grids.length)]];
    };

    const resetGame = () => {
        const randomGrid = generateRandomSudoku();
        setGrid([...randomGrid]);
        setIntialGrid([...randomGrid]);
        // setSolvedGrid(null);
        setSteps([]); // Reset the steps
        setCurrentStep(0);
    };

    const instantSolve = () => {
        const newGrid = JSON.parse(JSON.stringify(grid));
        const [solved, solutionSteps] = solveSudoku(newGrid);
        if (solved) {
            setSteps([solutionSteps[solutionSteps.length - 1]]);
            // setSolvedGrid(newGrid);
            console.log(solutionSteps); // this line
        } else {
            alert("No solution exists.");
        }
    };

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (steps.length > 0) {
            const interval = setInterval(() => {
                if (currentStep < steps.length - 1) {
                    setCurrentStep((prevStep) => prevStep + 1);
                } else {
                    clearInterval(interval);
                }
            }, speed); // Change step every 1 second

            return () => clearInterval(interval); // Clean up the interval on component unmount
        }
    }, [steps, currentStep, speed]);

    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(Number(e.target.value));
        // e.target.value = speed.toString();
    };

    return (
        <div
            style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
            }}
        >
            <div
                className="controls"
                style={{
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                }}
            >
                <div
                    className="buttons"
                    style={{
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "space-around",
                        gap: "10px",
                    }}
                >
                    <button onClick={instantSolve}>Instant Solve</button>
                    <button onClick={solve}>Solve Sudoku</button>
                    <button onClick={resetGame}>Reset Game</button>
                </div>

                <div className="inputRange">
                    <input
                        type="range"
                        min={1}
                        max={1000}
                        onChange={handleSpeedChange}
                        defaultValue={1}
                    />
                    <span>Speed: {speed}ms</span>
                </div>
            </div>
            <SudokuGrid
                grid={steps[currentStep] || grid}
                initialGrid={initialGrid}
            />
        </div>
    );
};

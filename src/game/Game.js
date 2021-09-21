import React, { useState, useEffect } from 'react';
import styles from "./Game.module.css";
import Board from "./board/Board";

function Game({isPvP, playerA, playerB, onResult}) {
    if (!isPvP) playerB = "Computer"

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [boardEnabled, setBoardEnabled] = useState(true);

    const nextSymbol = isXTurn ? "X" : "O";
    const nextPlayer = isXTurn ? playerA : playerB;
    const winner = getWinner(squares);
    const isBoardFull = getIsBoardFull(squares);
    const isGameOver = isBoardFull || winner !== null;

    let message = `${nextSymbol}: ${nextPlayer}'s Turn`;
    if (isBoardFull) message = "Draw!";
    if (winner) message = `${winner} Won!`;

    const makeMove = i => {
        if (squares[i] != null || winner != null || !boardEnabled) return;

        //mark clicked square
        const nextSquares = squares.slice();
        nextSquares[i] = nextSymbol;
        setSquares(nextSquares);

        setIsXTurn(!isXTurn)
    }

    const computerMakeMove = () => {
        setBoardEnabled(false);

        setTimeout(() => {
            const availableSquares = getAvailableSquares(squares);
            const random = Math.floor(Math.random() * availableSquares.length);
            makeMove(availableSquares[random]);

            setBoardEnabled(true);
        }, 1000);
    }

    const resetGame = () => setSquares(Array(9).fill(null));

    useEffect(() => {
        if (!isXTurn && !isPvP) computerMakeMove();
    }, [isXTurn])

    useEffect(() => {
        if (isGameOver) onResult(message);
    }, [isGameOver])

    return (
        <div className={styles.game}>
            <h2>{message}</h2>
            <Board squares={squares} onClick={makeMove}/>
            {isGameOver &&
                <button onClick={resetGame}>New Game</button>
            }
        </div>
    );
}

/**
 * Calculates whether there's a winner
 * @param {(string|null)[]} squares
 * @returns {null|string} winner - null if no winner, otherwise symbol of winning player
 */
function getWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const winningLine = lines.find(([i, j, k]) =>
        squares[i]
        && squares[i] === squares[j]
        && squares[i] === squares[k]
    );

    if (!winningLine) return null;
    return squares[winningLine[0]];
}

/**
 * Determines whether all squares have a value
 * @param {(string|null)[]} squares
 * @returns {boolean} isBoardFull
 */
function getIsBoardFull(squares) {
    return squares.every(square => square !== null);
}

/**
 * Returns indices of all squares available for a move
 * @param {(string|null)[]} squares
 * @returns {number[]} indices
 */
function getAvailableSquares(squares) {
    return squares.reduce((prev, current, i) => {
        return current === null ? [...prev, i] : prev
    }, []);
}

export default Game;
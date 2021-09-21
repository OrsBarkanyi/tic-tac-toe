import React, { useState, useEffect } from 'react';
import styles from "./Game.module.css";
import Board from "./Board";
import * as utils from "./utils";

function Game({isPvP, playerA, playerB, onResult}) {
    if (!isPvP) playerB = "Computer"

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [boardEnabled, setBoardEnabled] = useState(true);

    const nextSymbol = isXTurn ? "X" : "O";
    const nextPlayer = isXTurn ? playerA : playerB;
    const winner = utils.calculateWinner(squares);
    const isBoardFull = utils.calculateIsBoardFull(squares);
    const isGameOver = isBoardFull || winner !== null;

    let message = `${nextSymbol}: ${nextPlayer}'s Turn`;
    if (isBoardFull) message = "Draw!";
    if (winner) message = `${winner} (${winner === "X" ? playerA : playerB}) Won!`;

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
            const availableSquares = utils.calculateAvailableSquares(squares);
            const random = Math.floor(Math.random() * availableSquares.length);
            makeMove(availableSquares[random]);

            setBoardEnabled(true);
        }, 1000);
    }

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setIsXTurn(true)
    }

    useEffect(() => {
        if (!isXTurn && !isPvP) computerMakeMove();
    }, [isXTurn])

    useEffect(() => {
        if (isGameOver) onResult(message);
    }, [isGameOver])

    return (
        <div className={styles.game}>
            <h1>{message}</h1>
            <Board squares={squares} onClick={makeMove}/>
            {isGameOver &&
                <button onClick={resetGame}>New Game</button>
            }
        </div>
    );
}

export default Game;
/**
 * Calculates whether there's a winner
 * @param {(string|null)[]} squares
 * @returns {null|string} winner - null if no winner, otherwise symbol of winning player
 */
export function calculateWinner(squares) {
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
export function calculateIsBoardFull(squares) {
    return squares.every(square => square !== null);
}

/**
 * Returns indices of all squares available for a move
 * @param {(string|null)[]} squares
 * @returns {number[]} indices
 */
export function calculateAvailableSquares(squares) {
    return squares.reduce((prev, current, i) => {
        return current === null ? [...prev, i] : prev
    }, []);
}
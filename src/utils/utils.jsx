import { players } from "./GameReducer";

/**
 * Method that helps to avoid mutation in the array
 *
 * @param {[]} array
 * @param {number} position
 * @param {number} el
 * @returns []
 */
export const replaceArray = (array, position, el) => [...array.slice(0, position), el, ...array.slice(position + 1)];

export const checkWinner = (board) => {
    let winner = "";
    // check the rows
    board.forEach((row) => {
        if (row.every((cell) => cell === "X")) winner = players.playerOne;
        else if (row.every((cell) => cell === "O")) winner = players.playerTwo;
    });

    // check the columns
    for (let i = 0; i < 3; i++) {
        const column = board.map((row) => row[i]);
        if (column.every((cell) => cell === "X")) winner = players.playerOne;
        else if (column.every((cell) => cell === "O")) winner = players.playerTwo;
    }

    // check the diagonals

    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];

    if (diagonal1.every((cell) => cell === "O")) winner = players.playerTwo;
    else if (diagonal1.every((cell) => cell === "X")) winner = players.playerOne;
    else if (diagonal2.every((cell) => cell === "O")) winner = players.playerTwo;
    else if (diagonal2.every((cell) => cell === "X")) winner = players.playerOne;
    else if (board.flat().every((cell) => cell !== "")) winner = "Draw";
    return winner;
};
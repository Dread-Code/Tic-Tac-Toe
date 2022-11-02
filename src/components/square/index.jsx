import React, { useContext, useCallback } from 'react';
import { GameContext } from '../../Context/GameProvider';

const squareStyle = {
    width: "60px",
    height: "60px",
    backgroundColor: "#ddd",
    margin: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    color: "white",
};

const Square = React.memo(({ position }) => {
    const { game, togglePosition, nextPlayer } = useContext(GameContext);
    const { board, winner } = game;
    const { row, col } = position;

    const handleOnClick = useCallback(() => {
        if (board[row][col] === "" && winner === "") {
            togglePosition(position);
            nextPlayer();
        }
    }, [position]);

    return (
        <div className="square" onClick={handleOnClick} style={squareStyle}>
            {board[row][col]}
        </div>
    );
});

export default Square

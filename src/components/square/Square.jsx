import React, { useContext, useCallback } from "react";
import { GameContext } from "../../Context/GameProvider";
import "./Square.styles.css";

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
    <div className="square" onClick={handleOnClick}>
      {board[row][col]}
    </div>
  );
});

export default Square;

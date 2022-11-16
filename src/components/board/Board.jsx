import React, { useContext, useEffect } from "react";
import { GameContext } from "../../Context/GameProvider";
import { checkWinner } from "../../utils/utils";
import Square from "../square";
import "./Board.styles.css";

function Board() {
  const { game, resetGame, setWinner } = useContext(GameContext);
  const { currentPlayer } = game;

  useEffect(() => {
    const winner = checkWinner(game.board);
    setWinner(winner);
  }, [game.board]);

  return (
    <div className="gameBoard">
      <div id="statusArea" className="status">
        Next player: <span>{currentPlayer}</span>
      </div>
      <div id="winnerArea" className="winner">
        {game.winner === "Draw" && game.winner}
        {game.winner !== "" && game.winner !== "Draw" && (
          <span>Winner: {game.winner}</span>
        )}
      </div>
      <button className="resetButton" onClick={resetGame}>
        Reset
      </button>
      <div className="boardStyle">
        <div className="board-row">
          <Square position={{ row: 0, col: 0 }} />
          <Square position={{ row: 0, col: 1 }} />
          <Square position={{ row: 0, col: 2 }} />
        </div>
        <div className="board-row">
          <Square position={{ row: 1, col: 0 }} />
          <Square position={{ row: 1, col: 1 }} />
          <Square position={{ row: 1, col: 2 }} />
        </div>
        <div className="board-row">
          <Square position={{ row: 2, col: 0 }} />
          <Square position={{ row: 2, col: 1 }} />
          <Square position={{ row: 2, col: 2 }} />
        </div>
      </div>
    </div>
  );
}

export default Board;

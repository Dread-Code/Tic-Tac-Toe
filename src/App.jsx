import Board from "./components/Board";
import { GameProvider } from "./Context/GameProvider";

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <GameProvider>
          <Board />
        </GameProvider>
      </div>
    </div>
  );
}

export default Game;

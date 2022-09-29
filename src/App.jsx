import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const rowStyle = {
  display: "flex",
};

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

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const winnAreaStyle = {
  ...instructionsStyle,
  height: "20px"
}

// Utils

/**
 * Method that helps to avoid mutation in the array
 *
 * @param {[]} array
 * @param {number} position
 * @param {number} el
 * @returns []
 */
const replaceArray = (array, position, el) => {
  return [...array.slice(0, position), el, ...array.slice(position + 1)];
};

const checkWinner = (board) => {
  let winner = "";
  // check the rows
  board.forEach((row) => {
    if (row.every((cell) => cell === "X")) {
      winner = players.playerOne;
    } else if (row.every((cell) => cell === "O")) {
      winner = players.playerTwo;
    }
  });

  // check the columns
  for (let i = 0; i < 3; i++) {
    const column = board.map((row) => row[i]);
    if (column.every((cell) => cell === "X")) {
      winner = players.playerOne;
    } else if (column.every((cell) => cell === "O")) {
      winner = players.playerTwo;
    }
  }

  // check the diagonals

  const diagonal1 = [board[0][0], board[1][1], board[2][2]];
  const diagonal2 = [board[0][2], board[1][1], board[2][0]];

  if (diagonal1.every((cell) => cell === "O")) {
    winner = players.playerTwo;
  } else if (diagonal1.every((cell) => cell === "X")) {
    winner = players.playerOne;
  } else if (diagonal2.every((cell) => cell === "O")) {
    winner = players.playerTwo;
  } else if (diagonal2.every((cell) => cell === "X")) {
    winner = players.playerOne;
  } else if (board.flat().every((cell) => cell !== "")) {
    winner = "Draw";
  }
  return winner;
};

// Reducer, Actions and initialState
const actions = {
  SET_POSITION: "SET_POSITION",
  NEXT_PLAYER: "NEXT_PLAYER",
  SET_WINNER: "SET_WINNER",
  RESET_GAME: "RESET_GAME",
};

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const players = {
  playerOne: "playerOne",
  playerTwo: "playerTwo",
};

const initialState = {
  board,
  currentPlayer: players.playerOne,
  winner: "",
  nextPlayer: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_POSITION:
      let sym = !state.nextPlayer ? "X" : "O";
      let { row, col } = action.payload;
      return {
        ...state,
        board: replaceArray(
          state.board,
          row,
          replaceArray(state.board[row], col, sym)
        ),
      };
    case actions.RESET_GAME:
      return initialState;
    case actions.NEXT_PLAYER:
      let currentPlayer = state.nextPlayer
        ? players.playerOne
        : players.playerTwo;
      return { ...state, nextPlayer: !state.nextPlayer, currentPlayer };
    case actions.SET_WINNER:
      return { ...state, winner: action.payload };
    default:
      return state;
  }
};

// Context and Provider
const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    game: state,
    togglePosition: (position) =>
      dispatch({ type: actions.SET_POSITION, payload: position }),
    resetGame: () => dispatch({ type: actions.RESET_GAME }),
    nextPlayer: () => dispatch({ type: actions.NEXT_PLAYER }),
    setWinner: (player) =>
      dispatch({ type: actions.SET_WINNER, payload: player }),
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

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

function Board() {
  const { game, resetGame, setWinner } = useContext(GameContext);
  const { currentPlayer } = game;

  useEffect(() => {
    const winner = checkWinner(game.board);
    setWinner(winner);
  }, [game.board]);

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{currentPlayer}</span>
      </div>
      <div id="winnerArea" className="winner" style={winnAreaStyle}>
        {game.winner === "Draw" && game.winner}
        {game.winner !== "" && game.winner !== "Draw" && <span>Winner: {game.winner}</span>}
      </div>
      <button style={buttonStyle} onClick={resetGame}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square position={{ row: 0, col: 0 }} />
          <Square position={{ row: 0, col: 1 }} />
          <Square position={{ row: 0, col: 2 }} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square position={{ row: 1, col: 0 }} />
          <Square position={{ row: 1, col: 1 }} />
          <Square position={{ row: 1, col: 2 }} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square position={{ row: 2, col: 0 }} />
          <Square position={{ row: 2, col: 1 }} />
          <Square position={{ row: 2, col: 2 }} />
        </div>
      </div>
    </div>
  );
}

export default Game;

import { replaceArray } from "./utils";

export const actions = {
  SET_POSITION: "SET_POSITION",
  NEXT_PLAYER: "NEXT_PLAYER",
  SET_WINNER: "SET_WINNER",
  RESET_GAME: "RESET_GAME",
};

export const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export const players = {
  playerOne: "playerOne",
  playerTwo: "playerTwo",
};

export const initialState = {
  board,
  currentPlayer: players.playerOne,
  winner: "",
  nextPlayer: false,
};

export const reducer = (state, action) => {
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

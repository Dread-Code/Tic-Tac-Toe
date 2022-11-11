import React, { createContext, useReducer } from "react";
import { reducer, initialState, actions } from "../utils/GameReducer";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
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

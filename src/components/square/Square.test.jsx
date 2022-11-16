import React from "react";
import { render, screen } from "@testing-library/react";
import Square from ".";
import Board from "../board";
import { GameProvider } from "../../Context/GameProvider";

test("Square should render", () => {
  render(
    <GameProvider>
      <Board />
    </GameProvider>
  );
  expect(asFragment()).toBeTruthy();
});

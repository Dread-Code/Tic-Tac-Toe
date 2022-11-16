import { checkWinner } from "../../../utils/utils";
import { players } from "../../../utils/GameReducer";
import { playerOneMoves, playerTwoMoves } from "./mockPlayers";

test("Should not return winner", () => {
  // Arrange
  const mockBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // Act
  const reponse = checkWinner(mockBoard);

  // Assert
  expect(reponse).toBe("");
});

test("Should win Player One", () => {
  const firstMove = checkWinner(playerTwoMoves.diagonalOne);
  expect(firstMove).toBe(players.playerTwo);

  const secondMove = checkWinner(playerTwoMoves.diagonalTwo);
  expect(secondMove).toBe(players.playerTwo);

  const thirdMove = checkWinner(playerTwoMoves.diagonalTwo);
  expect(thirdMove).toBe(players.playerTwo);
});

test("Should win Player Two", () => {
  const firstMove = checkWinner(playerOneMoves.diagonalOne);
  expect(firstMove).toBe(players.playerOne);

  const secondMove = checkWinner(playerOneMoves.diagonalTwo);
  expect(secondMove).toBe(players.playerOne);

  const thirdMove = checkWinner(playerOneMoves.diagonalTwo);
  expect(thirdMove).toBe(players.playerOne);
});

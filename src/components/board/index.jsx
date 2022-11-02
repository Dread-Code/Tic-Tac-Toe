import React, { useContext, useEffect } from 'react';
import { GameContext } from '../../Context/GameProvider';
import { checkWinner } from '../../utils/utils';
import Square from '../square';

const rowStyle = { display: "flex" };

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

const winnAreaStyle = { ...instructionsStyle, height: "20px" }

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
            <button style={buttonStyle} onClick={resetGame}>Reset</button>
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

export default Board
import { useState } from "react";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (b) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];

    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    const win = checkWinner(newBoard);

    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(win);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setWinner(null);
  };

  const status =
    winner
      ? `🎉 Winner: ${winner}`
      : board.every(Boolean)
      ? "🤝 Draw!"
      : `Turn: ${isXNext ? "X" : "O"}`;

  return (
    <div className="game">
      <h1>🎮 Tic Tac Toe</h1>
      <h2>{status}</h2>

      <div className="board">
        {board.map((cell, i) => (
          <button key={i} className="cell" onClick={() => handleClick(i)}>
            {cell}
          </button>
        ))}
      </div>

      <button className="restart" onClick={restartGame}>
        Restart 🔄
      </button>
    </div>
  );
}
import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  // Winner check function
  const checkWinner = (board) => {
    const winningPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const winner = checkWinner(board);

  const handleClick = (index) => {
    const newBoard = [...board];

    if (newBoard[index] || winner) return;

    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      <h2>
        {winner
          ? `Winner: ${winner}`
          : board.every(cell => cell !== null)
          ? "It's a Draw!"
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </h2>

      <div className="board">
        {board.map((value, index) => (
          <button key={index} onClick={() => handleClick(index)}>
            {value}
          </button>
        ))}
      </div>

      <button
        className="reset"
        onClick={() => {
          setBoard(Array(9).fill(null));
          setIsXTurn(true);
        }}
      >
        Restart Game
      </button>
    </div>
  );
}

export default App;
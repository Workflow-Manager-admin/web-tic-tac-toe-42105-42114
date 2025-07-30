import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * App is the main Tic Tac Toe UI for two human players. Minimalistic, centered, responsive, light theme,
 * uses palette: accent (#FF5722), primary (#2196F3), secondary (#FFC107).
 * Features: Display board, status (whose turn, winner, draw), restart button.
 */
function App() {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(sq => sq !== null);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || winner) return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function getStatus() {
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (isDraw) {
      return "It's a Draw!";
    }
    return `Turn: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="ttt-app-root">
      <div className="ttt-game-container">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-status">{getStatus()}</div>
        <Board board={board} onSquareClick={handleSquareClick} winner={winner} />
        <button className="ttt-restart-btn" onClick={handleRestart}>Restart</button>
        <div className="ttt-credits">
          <span>Player 1: <b className="ttt-x">X</b> &nbsp;|&nbsp; Player 2: <b className="ttt-o">O</b></span>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function Board({ board, onSquareClick, winner }) {
  return (
    <div className="ttt-board">
      {board.map((val, i) => (
        <Square
          key={i}
          value={val}
          onClick={() => onSquareClick(i)}
          highlight={winner && winner.line && winner.line.includes(i)}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`ttt-square${highlight ? ' highlight' : ''}`}
      onClick={onClick}
      aria-label={`cell-${value || 'empty'}`}
    >
      <span className={value === 'X' ? 'ttt-x' : value === 'O' ? 'ttt-o' : ''}>
        {value}
      </span>
    </button>
  );
}

// Game logic
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  // Returns: {winner: 'X'|'O', line: [idx,idx,idx]} or null
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];
  for (let line of lines) {
    const [a,b,c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

export default App;

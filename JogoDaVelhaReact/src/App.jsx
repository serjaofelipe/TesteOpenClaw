import React, { useState, useEffect } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const getBotMove = (squares) => {
  const emptySquares = squares.map((sq, i) => (sq === null ? i : null)).filter((val) => val !== null);
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board = ({ squares, onClick }) => (
  <div className="board-row">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState(null); // 'single' or 'multi'
  const winner = calculateWinner(board);

  useEffect(() => {
    if (mode === 'single' && !xIsNext && !winner && board.includes(null)) {
      const botMove = getBotMove(board);
      setTimeout(() => handleClick(botMove), 500);
    }
  }, [board, xIsNext, mode, winner]);

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const renderStatus = () => {
    if (winner) {
      return `Vencedor: ${winner}`;
    } else if (!board.includes(null)) {
      return 'Empate!';
    } else {
      return `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="game">
      <h1>Jogo da Velha</h1>
      {!mode ? (
        <div className="mode-selection">
          <button onClick={() => setMode('single')}>Singleplayer (vs Bot)</button>
          <button onClick={() => setMode('multi')}>Multiplayer (2 Players)</button>
        </div>
      ) : (
        <>
          <div className="game-board">
            <Board squares={board} onClick={handleClick} />
          </div>
          <div className="game-info">
            <div>{renderStatus()}</div>
            <button onClick={resetGame}>Reiniciar Jogo</button>
            <button onClick={() => setMode(null)}>Mudar Modo</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

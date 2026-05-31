// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [player, setPlayer] = useState('X');

  const handleClick = (index) => {
    if (board[index] === '') {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = checkWinner();

  return (
    <div className="app">
      <h1>Jogo da Velha</h1>
      <div className="app-header">
        <div className="board">
          {board.map((cell, index) => (
            <div key={index} className="cell" onClick={() => handleClick(index)}>
              {cell}
            </div>
          ))}
        </div>
        {winner && <p>Player {winner} wins!</p>}
      </div>
    </div>
  );
}

export default App;

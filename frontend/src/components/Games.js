import React, { useState } from 'react';
import '../App.css';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const newGameFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const Games = () => {
  const [fen, setFen] = useState(newGameFen);
  const [chess] = useState(new Chess(newGameFen));

  const handleMove = (move) => {
    try {
      if (chess.move(move)) {
        setTimeout(() => {
          const moves = chess.moves();
          if (moves.length > 0) {
            const computerMove = moves[Math.floor(Math.random() * moves.length)];
            chess.move(computerMove);
            setFen(chess.fen());
          }
        }, 300);
        setFen(chess.fen());
      }
      else{
        alert('Game over');
      }
    } catch {
      alert('Illegal move!');
    }
  };

  const handleNewGame = () => {
    chess.load(newGameFen);
    setFen(newGameFen);
  };

    

  return (
    <div className="flex-center">
      <h1 className="title">Computer v1.0</h1>
      <div style={{ boxShadow: '5px 5px 20px 10px' }}>
        <Chessboard
          width={400}
          position={fen}
          onDrop={(move) => {
            handleMove({
              from: move.sourceSquare,
              to: move.targetSquare,
              promotion: 'q',
            });
            //checkGameStatus(); // Check the game status after each move
          }}
        />
      </div>
      <button className="new-game-button" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
};

export default Games;

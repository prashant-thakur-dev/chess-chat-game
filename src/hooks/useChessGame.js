import { useState, useEffect } from 'react';
import { INITIAL_BOARD } from '../utils/constants';
import { isValidMove, makeMove } from '../utils/chessLogic';

export const useChessGame = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [gameTime, setGameTime] = useState({ white: 600, black: 600 }); // 10 minutes each
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'checkmate', 'draw'

  // Timer effect
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const timer = setInterval(() => {
      setGameTime(prev => ({
        ...prev,
        [currentPlayer]: Math.max(0, prev[currentPlayer] - 1)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayer, gameStatus]);

  // Check for time out
  useEffect(() => {
    if (gameTime.white <= 0) {
      setGameStatus('timeout-black-wins');
    } else if (gameTime.black <= 0) {
      setGameStatus('timeout-white-wins');
    }
  }, [gameTime]);

  const handleSquareClick = (row, col) => {
    if (gameStatus !== 'playing') return;

    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare;
      
      // Clicking same square deselects
      if (fromRow === row && fromCol === col) {
        setSelectedSquare(null);
        return;
      }
      
      // Attempt to make move
      const piece = board[fromRow][fromCol];
      if (piece && isValidMove(board, fromRow, fromCol, row, col, currentPlayer)) {
        const newBoard = makeMove(board, fromRow, fromCol, row, col);
        setBoard(newBoard);
        setSelectedSquare(null);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        
        // Add to move history
        const moveNotation = `${String.fromCharCode(97 + fromCol)}${8 - fromRow}-${String.fromCharCode(97 + col)}${8 - row}`;
        setMoveHistory(prev => [...prev, moveNotation]);
      } else {
        // Invalid move, try selecting the clicked square
        if (board[row][col]) {
          const piece = board[row][col];
          const isWhitePiece = piece === piece.toUpperCase();
          if ((currentPlayer === 'white' && isWhitePiece) || (currentPlayer === 'black' && !isWhitePiece)) {
            setSelectedSquare([row, col]);
          } else {
            setSelectedSquare(null);
          }
        } else {
          setSelectedSquare(null);
        }
      }
    } else {
      // Select piece if it belongs to current player
      if (board[row][col]) {
        const piece = board[row][col];
        const isWhitePiece = piece === piece.toUpperCase();
        if ((currentPlayer === 'white' && isWhitePiece) || (currentPlayer === 'black' && !isWhitePiece)) {
          setSelectedSquare([row, col]);
        }
      }
    }
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD);
    setSelectedSquare(null);
    setCurrentPlayer('white');
    setGameTime({ white: 600, black: 600 });
    setMoveHistory([]);
    setGameStatus('playing');
  };

  return {
    board,
    selectedSquare,
    currentPlayer,
    gameTime,
    moveHistory,
    gameStatus,
    onSquareClick: handleSquareClick,
    resetGame,
  };
};
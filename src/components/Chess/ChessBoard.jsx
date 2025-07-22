import React from 'react';
import ChessSquare from './ChessSquare';
import { PIECE_SYMBOLS } from '../../utils/constants';

const ChessBoard = ({ 
  board, 
  selectedSquare, 
  onSquareClick, 
  size = 'desktop' 
}) => {
  const sizeClasses = {
    mobile: 'w-10 h-10 text-2xl',
    tablet: 'w-12 h-12 text-3xl', 
    desktop: 'w-16 h-16 text-4xl'
  };

  const boardSizeClasses = {
    mobile: 'p-2',
    tablet: 'p-3',
    desktop: 'p-4'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`bg-gradient-to-br from-amber-100 to-amber-200 ${boardSizeClasses[size]} rounded-xl shadow-2xl`}>
        <div className="grid grid-cols-8 gap-0 border-4 border-amber-800 rounded-lg overflow-hidden">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const isSelected = selectedSquare && 
                selectedSquare[0] === rowIndex && 
                selectedSquare[1] === colIndex;

              return (
                <ChessSquare
                  key={`${rowIndex}-${colIndex}`}
                  piece={piece}
                  isLight={(rowIndex + colIndex) % 2 === 0}
                  isSelected={isSelected}
                  size={sizeClasses[size]}
                  onClick={() => onSquareClick(rowIndex, colIndex)}
                />
              );
            })
          )}
        </div>
        
        {/* Board coordinates for desktop */}
        {size === 'desktop' && (
          <>
            {/* File letters (a-h) */}
            <div className="flex justify-center mt-2">
              <div className="grid grid-cols-8 gap-0 w-full max-w-[544px]">
                {'abcdefgh'.split('').map(letter => (
                  <div key={letter} className="text-center text-amber-800 font-bold text-sm">
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Rank numbers (1-8) for desktop */}
      {size === 'desktop' && (
        <div className="flex flex-col justify-center ml-2">
          {[8,7,6,5,4,3,2,1].map(num => (
            <div key={num} className="h-16 flex items-center">
              <span className="text-white font-bold text-sm">{num}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChessBoard;
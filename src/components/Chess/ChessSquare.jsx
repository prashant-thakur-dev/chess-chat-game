import React from 'react';
import { PIECE_SYMBOLS } from '../../utils/constants';

const ChessSquare = ({ 
  piece, 
  isLight, 
  isSelected, 
  size, 
  onClick 
}) => {
  return (
    <div
      className={`${size} flex items-center justify-center cursor-pointer transition-all duration-200 select-none ${
        isLight ? 'bg-amber-100 hover:bg-amber-200' : 'bg-amber-800 hover:bg-amber-700'
      } ${
        isSelected 
          ? 'ring-4 ring-purple-400 ring-inset' 
          : 'hover:ring-2 hover:ring-purple-300 hover:ring-inset'
      } active:scale-95`}
      onClick={onClick}
    >
      {piece && (
        <span 
          className={`
            ${piece === piece.toUpperCase() ? 'text-gray-800' : 'text-gray-900'} 
            drop-shadow-lg transition-transform duration-150 hover:scale-110
            ${isSelected ? 'animate-pulse' : ''}
          `}
        >
          {PIECE_SYMBOLS[piece]}
        </span>
      )}
    </div>
  );
};

export default ChessSquare;
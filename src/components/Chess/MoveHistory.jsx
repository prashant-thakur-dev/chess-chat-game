import React from 'react';
import { ScrollText } from 'lucide-react';

const MoveHistory = ({ moves, variant = 'default' }) => {
  const isCompact = variant === 'compact';

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 ${isCompact ? 'h-full' : ''}`}>
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <ScrollText className="w-4 h-4" />
        Move History
      </h3>
      
      <div className={`space-y-2 overflow-y-auto scrollbar-thin ${
        isCompact ? 'max-h-24' : 'max-h-96'
      }`}>
        {moves.length === 0 ? (
          <div className="text-gray-400 text-sm italic text-center py-8">
            No moves yet. Start playing!
          </div>
        ) : (
          <div className="space-y-1">
            {moves.map((move, index) => (
              <div
                key={index}
                className={`text-sm text-gray-300 bg-slate-700/50 p-2 rounded flex justify-between items-center hover:bg-slate-700/70 transition-colors ${
                  isCompact ? 'text-xs p-1' : ''
                }`}
              >
                <span className="font-mono text-purple-300">
                  {Math.floor(index / 2) + 1}{index % 2 === 0 ? '.' : '...'}
                </span>
                <span className="font-mono flex-1 text-center">{move}</span>
                <span className="text-xs opacity-60">
                  {index % 2 === 0 ? '♔' : '♚'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {moves.length > 0 && !isCompact && (
        <div className="mt-4 pt-4 border-t border-slate-600">
          <div className="text-xs text-gray-400 text-center">
            Total moves: {moves.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoveHistory;
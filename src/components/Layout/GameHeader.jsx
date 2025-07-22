import React from 'react';
import { Crown, Menu, MessageCircle } from 'lucide-react';
import GameTimer from '../Chess/GameTimer';
import { useResponsive } from '../../hooks/useResponsive';

const GameHeader = ({ 
  currentPlayer, 
  gameTime, 
  onToggleChat, 
  isChatOpen 
}) => {
  const { isMobile, isTablet } = useResponsive();

  const getCurrentPlayerIndicator = () => (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 ${
      currentPlayer === 'white' ? 'bg-white text-black' : 'bg-slate-700 text-white'
    }`}>
      <div className={`w-3 h-3 rounded-full ${currentPlayer === 'white' ? 'bg-black' : 'bg-white'}`}></div>
      <span className="text-sm sm:text-base">
        {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} to move
      </span>
    </div>
  );

  if (isMobile) {
    return (
      <div className="bg-slate-800/80 backdrop-blur-sm p-4 border-b border-purple-500/20">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            Chess Master
          </h1>
          <button
            onClick={onToggleChat}
            className={`p-2 rounded-lg transition-colors ${
              isChatOpen ? 'bg-purple-600 text-white' : 'bg-slate-700 text-gray-300'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center">
          {getCurrentPlayerIndicator()}
        </div>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="bg-slate-800/80 backdrop-blur-sm p-4 border-b border-purple-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Crown className="w-7 h-7 text-yellow-400" />
              Chess Master
            </h1>
            {onToggleChat && (
              <button
                onClick={onToggleChat}
                className={`p-2 rounded-lg transition-colors ${
                  isChatOpen ? 'bg-purple-600 text-white' : 'bg-slate-700 text-gray-300'
                }`}
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>
          {getCurrentPlayerIndicator()}
        </div>
      </div>
    );
  }

  // Desktop Header
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm p-6 border-b border-purple-500/20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Crown className="w-8 h-8 text-yellow-400" />
          Chess Master
        </h1>
        <div className="flex gap-4">
          <GameTimer 
            time={gameTime.black}
            label="Black"
            isActive={currentPlayer === 'black'}
          />
          <GameTimer 
            time={gameTime.white}
            label="White"
            isActive={currentPlayer === 'white'}
          />
        </div>
      </div>
      
      <div className="text-center">
        {getCurrentPlayerIndicator()}
      </div>
    </div>
  );
};

export default GameHeader;
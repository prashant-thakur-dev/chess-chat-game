import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ChatComponent from '../Chat/ChatComponent';
import ChessBoard from '../Chess/ChessBoard';
import GameHeader from './GameHeader';
import GameTimer from '../Chess/GameTimer';
import MoveHistory from '../Chess/MoveHistory';
import { useChessGame } from '../../hooks/useChessGame';
import { useChat } from '../../hooks/useChat';
import { useResponsive } from '../../hooks/useResponsive';

const ResponsiveLayout = ({ userInfo }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  const chessGame = useChessGame();
  const chat = useChat(userInfo); // Pass userInfo to chat hook

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  if (isMobile) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
        <GameHeader 
          currentPlayer={chessGame.currentPlayer}
          gameTime={chessGame.gameTime}
          onToggleChat={toggleChat}
          isChatOpen={isChatOpen}
          userInfo={userInfo}
        />
        
        {/* Mobile Chat Overlay */}
        <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
          isChatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="bg-black/20 backdrop-blur-sm w-full h-full" onClick={toggleChat}>
            <div className="bg-slate-800 w-4/5 h-full ml-auto" onClick={e => e.stopPropagation()}>
              <ChatComponent {...chat} isMobile={true} onClose={toggleChat} userInfo={userInfo} />
            </div>
          </div>
        </div>

        {/* Mobile Game Area */}
        <div className="flex-1 p-2 flex flex-col">
          <div className="flex justify-between mb-4">
            <GameTimer 
              time={chessGame.gameTime.black}
              label="Black"
              isActive={chessGame.currentPlayer === 'black'}
              variant="compact"
            />
            <GameTimer 
              time={chessGame.gameTime.white}
              label="White"
              isActive={chessGame.currentPlayer === 'white'}
              variant="compact"
            />
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <ChessBoard 
              {...chessGame}
              size="mobile"
            />
          </div>
          
          <div className="mt-4 max-h-32 overflow-y-auto">
            <MoveHistory 
              moves={chessGame.moveHistory}
              variant="compact"
            />
          </div>
        </div>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
        <GameHeader 
          currentPlayer={chessGame.currentPlayer}
          gameTime={chessGame.gameTime}
          onToggleChat={toggleChat}
          isChatOpen={isChatOpen}
        />
        
        <div className="flex-1 flex">
          {/* Tablet Chat Sidebar */}
          <div className={`transform transition-transform duration-300 ${
            isChatOpen ? 'translate-x-0 w-80' : '-translate-x-full w-0'
          }`}>
            <ChatComponent {...chat} onClose={toggleChat} userInfo={userInfo} />
          </div>

          {/* Tablet Game Area */}
          <div className="flex-1 p-4 flex">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex gap-4 mb-4">
                <GameTimer 
                  time={chessGame.gameTime.black}
                  label="Black"
                  isActive={chessGame.currentPlayer === 'black'}
                />
                <GameTimer 
                  time={chessGame.gameTime.white}
                  label="White"
                  isActive={chessGame.currentPlayer === 'white'}
                />
              </div>
              
              <ChessBoard 
                {...chessGame}
                size="tablet"
              />
            </div>
            
            <div className="w-64 ml-4">
              <MoveHistory 
                moves={chessGame.moveHistory}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex overflow-hidden">
      {/* Desktop Chat Section - 30% */}
      <div className="w-[30%] min-w-[320px] max-w-[400px]">
        <ChatComponent {...chat} userInfo={userInfo} />
      </div>

      {/* Desktop Game Section - 70% */}
      <div className="flex-1 flex flex-col">
        <GameHeader 
          currentPlayer={chessGame.currentPlayer}
          gameTime={chessGame.gameTime}
          userInfo={userInfo}
        />
        
        <div className="flex-1 p-6 flex gap-6">
          <div className="flex-1 flex flex-col items-center justify-center">
            <ChessBoard 
              {...chessGame}
              size="desktop"
            />
          </div>
          
          <div className="w-64">
            <MoveHistory 
              moves={chessGame.moveHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveLayout;
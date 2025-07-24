import React from 'react';
import { MessageCircle, Users, X } from 'lucide-react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const ChatComponent = ({ 
  messages, 
  newMessage, 
  setNewMessage, 
  sendMessage,
  isMobile = false,
  onClose,
  userInfo 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={`${isMobile ? 'h-full' : 'h-full'} bg-slate-800/50 backdrop-blur-sm ${!isMobile && 'border-r border-purple-500/20'} flex flex-col`}>
      {/* Chat Header */}
      <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            <div>
              <h2 className="font-bold text-lg">Game Chat</h2>
              <p className="text-sm opacity-90 flex items-center gap-1">
                <Users className="w-4 h-4" />
                Playing as: {userInfo?.getUserBadge()} {userInfo?.getDisplayName()}
              </p>
            </div>
          </div>
          {(isMobile || onClose) && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-slate-700/50">
        <MessageInput
          value={newMessage}
          onChange={setNewMessage}
          onSend={sendMessage}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default ChatComponent;
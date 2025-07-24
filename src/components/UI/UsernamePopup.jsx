import React, { useState } from 'react';
import { User, UserCheck, Crown } from 'lucide-react';
import Button from './Button';

const UsernamePopup = ({ isOpen, onSubmit, onClose }) => {
  const [username, setUsername] = useState('');
  const [isGuest, setIsGuest] = useState(false);

  const handleSubmit = () => {
    const finalUsername = isGuest ? 'Guest' : (username.trim() || 'Anonymous');
    onSubmit(finalUsername, isGuest);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (username.trim() || isGuest)) {
      handleSubmit();
    }
  };

  const handleGuestMode = () => {
    setIsGuest(true);
    onSubmit('Guest', true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* Popup */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-purple-500/20 animate-bounce-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to Chess Master!</h2>
          <p className="text-gray-300 text-sm">Enter your game name to start playing</p>
        </div>

        {/* Username Input */}
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Your Game Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsGuest(false);
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter your username..."
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
              maxLength={20}
              autoFocus
            />
            <div className="text-xs text-gray-400 mt-2">
              {username.length}/20 characters
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Start Game Button */}
            <Button
              onClick={handleSubmit}
              disabled={!username.trim() && !isGuest}
              variant="primary"
              size="lg"
              className="w-full justify-center gap-2 font-semibold"
            >
              <UserCheck className="w-5 h-5" />
              Start Game as {username.trim() || 'Player'}
            </Button>

            {/* Guest Mode Button */}
            <Button
              onClick={handleGuestMode}
              variant="outline"
              size="lg"
              className="w-full justify-center gap-2"
            >
              <User className="w-5 h-5" />
              Continue as Guest
            </Button>
          </div>

          {/* Info Text */}
          <div className="text-center">
            <p className="text-xs text-gray-400">
              Your username will be visible to other players in the chat
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default UsernamePopup;
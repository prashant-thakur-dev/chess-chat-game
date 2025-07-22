import React from 'react';
import { Clock } from 'lucide-react';

const GameTimer = ({ 
  time, 
  label, 
  isActive, 
  variant = 'default' 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = time < 60; // Less than 1 minute
  const isCriticalTime = time < 30; // Less than 30 seconds

  const getTimerClasses = () => {
    const baseClasses = `
      flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-all duration-300
      ${variant === 'compact' ? 'text-sm' : 'text-base'}
    `;

    if (label === 'White') {
      return `${baseClasses} ${
        isActive 
          ? 'bg-white text-black shadow-lg ring-2 ring-yellow-400' 
          : 'bg-gray-300 text-gray-700'
      }`;
    } else {
      return `${baseClasses} ${
        isActive 
          ? 'bg-slate-700 text-white shadow-lg ring-2 ring-purple-400' 
          : 'bg-slate-600 text-gray-300'
      }`;
    }
  };

  const getTimeClasses = () => {
    if (isCriticalTime && isActive) {
      return 'text-red-400 animate-pulse';
    } else if (isLowTime && isActive) {
      return 'text-yellow-400';
    }
    return '';
  };

  return (
    <div className={getTimerClasses()}>
      <Clock className={`w-4 h-4 ${isActive ? 'animate-pulse-slow' : ''}`} />
      <div className="flex flex-col items-center">
        <span className="text-xs opacity-80">{label}</span>
        <span className={`font-mono ${getTimeClasses()}`}>
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
};

export default GameTimer;